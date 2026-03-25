import 'dotenv/config';
import axios from 'axios';
import * as Yup from 'yup';

// ----------------------------------------------------------------
// Cliente HTTP para a API do Asaas
// ----------------------------------------------------------------
const asaasApi = axios.create({
  baseURL: process.env.ASAAS_API_URL || 'https://sandbox.asaas.com/api/v3',
  headers: {
    'access_token': process.env.ASAAS_API_KEY,
    'Content-Type': 'application/json',
  },
});

// ----------------------------------------------------------------
// Utilitário: busca ou cria cliente no Asaas pelo CPF/CNPJ
// ----------------------------------------------------------------
async function findOrCreateCustomer({ name, email, cpfCnpj }) {
  // Tenta buscar cliente existente pelo CPF/CNPJ
  try {
    const { data } = await asaasApi.get('/customers', {
      params: { cpfCnpj },
    });

    if (data.data && data.data.length > 0) {
      return data.data[0].id;
    }
  } catch {
    // ignora e cria novo
  }

  // Cria novo cliente
  const { data: created } = await asaasApi.post('/customers', {
    name,
    email,
    cpfCnpj,
  });

  return created.id;
}

// ----------------------------------------------------------------
// Controller principal
// ----------------------------------------------------------------
class AsaasPaymentController {
  // POST /create-payment
  async store(request, response) {
    const schema = Yup.object().shape({
      products: Yup.array()
        .min(1, 'O carrinho não pode estar vazio')
        .required()
        .of(
          Yup.object({
            id: Yup.string().required(),
            quantity: Yup.number().required(),
            price: Yup.number().required(),
            name: Yup.string(),
          })
        ),
      paymentMethod: Yup.string()
        .oneOf(['pix', 'credit_card'], 'Método de pagamento inválido')
        .required(),
      customer: Yup.object({
        name: Yup.string().required('Nome do cliente obrigatório'),
        email: Yup.string().email().required('E-mail obrigatório'),
        cpfCnpj: Yup.string().required('CPF/CNPJ obrigatório'),
      }).required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { products, paymentMethod, customer } = request.body;

    // Calcula valor total em reais (preços armazenados em centavos)
    const totalValue = products.reduce((acc, p) => acc + (p.price / 100) * p.quantity, 0);
    // Adiciona taxa de entrega: R$ 2,00
    const deliveryFee = 2.0;
    const totalWithDelivery = +(totalValue + deliveryFee).toFixed(2);

    try {
      // 🚀 [DEMO MODE] Pagamento desabilitado para demonstração em produção
      return response.status(403).json({
        error: 'Finalização de pedido desabilitada nesta versão de demonstração. Nenhuma cobrança real será feita.',
      });

      /* ====================================================================
         CÓDIGO DE PAGAMENTO REAL (COMENTADO PARA SEGURANÇA NA DEMONSTRAÇÃO)
         ====================================================================
      
      // 1. Garante que o cliente existe no Asaas
      const customerId = await findOrCreateCustomer(customer);

      // 2. Monta o método de pagamento para o Asaas
      const billingType = paymentMethod === 'pix' ? 'PIX' : 'CREDIT_CARD';

      // 3. Cria a cobrança
      const { data: charge } = await asaasApi.post('/payments', {
        customer: customerId,
        billingType,
        value: totalWithDelivery,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // vence em 24h
          .toISOString()
          .split('T')[0],
        description: `Pedido DevBurguer - ${products.length} item(s)`,
        externalReference: `order_${Date.now()}`,
        // Para cartão: redireciona ao checkout hosted do Asaas
        ...(billingType === 'CREDIT_CARD' && {
          callback: {
            successUrl: `${process.env.FRONTEND_URL}/complete`,
            autoRedirect: true,
          },
        }),
      });

      // 4. Para Pix: busca QR Code
      if (billingType === 'PIX') {
        const { data: qrData } = await asaasApi.get(`/payments/${charge.id}/pixQrCode`);

        return response.json({
          paymentId: charge.id,
          method: 'pix',
          status: charge.status,
          value: charge.value,
          qrCode: {
            encodedImage: qrData.encodedImage,   // base64 da imagem do QR Code
            payload: qrData.payload,             // código copia e cola
            expirationDate: qrData.expirationDate,
          },
        });
      }

      // 5. Para Cartão: retorna o link de checkout
      return response.json({
        paymentId: charge.id,
        method: 'credit_card',
        status: charge.status,
        value: charge.value,
        checkoutUrl: charge.invoiceUrl, // link de pagamento do Asaas
      });

      ==================================================================== */
    } catch (error) {
      console.error('Erro ao criar cobrança no Asaas:', error?.response?.data || error.message);
      return response.status(500).json({
        error: 'Erro ao gerar pagamento. Tente novamente.',
      });
    }
  }

  // GET /payment-status/:id
  async status(request, response) {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({ error: 'ID do pagamento obrigatório' });
    }

    try {
      const { data } = await asaasApi.get(`/payments/${id}`);

      return response.json({
        paymentId: data.id,
        status: data.status,         // PENDING | RECEIVED | CONFIRMED | OVERDUE | REFUNDED | RECEIVED_IN_CASH
        value: data.value,
        billingType: data.billingType,
        dueDate: data.dueDate,
        description: data.description,
      });
    } catch (error) {
      console.error('Erro ao consultar status no Asaas:', error?.response?.data || error.message);
      return response.status(500).json({ error: 'Erro ao consultar pagamento.' });
    }
  }

  // POST /webhooks/asaas
  async webhook(request, response) {
    const event = request.body;

    console.log('📩 Webhook Asaas recebido:', JSON.stringify(event, null, 2));

    // Tipos de evento tratados
    const handledEvents = [
      'PAYMENT_RECEIVED',
      'PAYMENT_CONFIRMED',
      'PAYMENT_OVERDUE',
      'PAYMENT_DELETED',
      'PAYMENT_REFUNDED',
    ];

    if (handledEvents.includes(event.event)) {
      const payment = event.payment;
      console.log(`✅ Evento: ${event.event} | Pagamento: ${payment?.id} | Status: ${payment?.status}`);

      // TODO: atualizar status do pedido no banco de dados com base em payment.externalReference
      // Exemplo: await Order.update({ status: ... }, { where: { paymentId: payment.id } });
    }

    // Asaas exige retorno 200 para confirmar recebimento
    return response.status(200).json({ received: true });
  }
}

export default new AsaasPaymentController();
