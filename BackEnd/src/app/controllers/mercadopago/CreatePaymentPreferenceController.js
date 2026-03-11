import 'dotenv/config';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import * as Yup from 'yup';

// Inicializa Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

class CreatePaymentPreferenceController {
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
      paymentMethod: Yup.string().nullable(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { products, paymentMethod } = request.body;

    // Formato esperado pelo Mercado Pago
    const items = products.map((product) => ({
      id: product.id,
      title: product.name || `Produto ${product.id}`,
      quantity: product.quantity,
      unit_price: product.price / 100,
      currency_id: 'BRL',
    }));

    // Configuração de métodos de pagamento
    let paymentMethods = {
      installments: 12,
    };

    if (paymentMethod === 'pix') {
      paymentMethods = {
        excluded_payment_types: [{ id: 'credit_card' }, { id: 'debit_card' }, { id: 'ticket' }],
      };
    }

    if (paymentMethod === 'credit_card') {
      paymentMethods = {
        installments: 12,
        excluded_payment_types: [{ id: 'ticket' }, { id: 'bank_transfer' }],
      };
    }

    try {
      const preference = new Preference(client);

      const result = await preference.create({
        body: {
          items,

          payment_methods: paymentMethods,

          back_urls: {
            success: 'http://localhost:5173/complete',
            failure: 'http://localhost:5173/complete',
            pending: 'http://localhost:5173/complete',
          },

          // auto_return: 'approved', // Desativado para localhost (requer HTTPS para funcionar)

          external_reference: `order_${Date.now()}`,

          // quando for produção
          // notification_url: 'https://seu-backend.com/mercadopago/webhook'
        },
      });

      return response.json({
        id: result.id,
        init_point: result.init_point,
      });
    } catch (error) {
      console.error('Erro ao criar preferência do MP:', error);

      return response.status(500).json({
        error: 'Erro ao gerar pagamento',
      });
    }
  }
}

export default new CreatePaymentPreferenceController();
