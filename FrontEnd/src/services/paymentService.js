import api from './api.js';

/**
 * Cria um pagamento no Asaas.
 *
 * @param {{
 *   products: { id: string; quantity: number; price: number; name: string }[];
 *   paymentMethod: 'pix' | 'credit_card';
 *   customer: { name: string; email: string; cpfCnpj: string };
 * }} payload
 *
 * @returns {Promise<{
 *   paymentId: string;
 *   method: 'pix' | 'credit_card';
 *   status: string;
 *   value: number;
 *   qrCode?: { encodedImage: string; payload: string; expirationDate: string };
 *   checkoutUrl?: string;
 * }>}
 */
export async function createPayment(payload) {
  const { data } = await api.post('/create-payment', payload);
  return data;
}

/**
 * Consulta o status de um pagamento pelo ID retornado pelo Asaas.
 * @param {string} paymentId
 */
export async function getPaymentStatus(paymentId) {
  const { data } = await api.get(`/payment-status/${paymentId}`);
  return data;
}
