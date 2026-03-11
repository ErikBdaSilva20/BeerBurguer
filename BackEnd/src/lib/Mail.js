import nodemailer from 'nodemailer';

class Mail {
  constructor() {
    this.transporter = null;
    this.init();
  }

  async init() {
    // Para testes locais, usamos o Ethereal (fake email service)
    const testAccount = await nodemailer.createTestAccount();

    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    console.log('📬 [Mail] Test account created:', testAccount.user);
  }

  async sendReceipt(userEmail, orderData) {
    if (!this.transporter) await this.init();

    const info = await this.transporter.sendMail({
      from: '"DevBurguer 🍔" <no-reply@devburguer.com>',
      to: userEmail,
      subject: 'Seu comprovante de pagamento - PIX 🚀',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h1 style="color: #ffee00; background: #000; padding: 10px; display: inline-block;">DevBurguer 🍔</h1>
          <h2>Pagamento Confirmado!</h2>
          <p>Olá, recebemos seu pagamento via <strong>PIX</strong> com sucesso.</p>
          <hr />
          <h3>Resumo do Pedido:</h3>
          <ul>
            ${orderData.products.map((p) => `<li>${p.quantity}x ${p.name} - R$ ${(p.price / 100).toFixed(2)}</li>`).join('')}
          </ul>
          <p><strong>Total: R$ ${(orderData.products.reduce((acc, p) => acc + p.price * p.quantity, 0) / 100).toFixed(2)}</strong></p>
          <hr />
          <p>Seu pedido já está em preparação! 🛵</p>
          <br />
          <p style="font-size: 12px; color: #999;">Este é um e-mail de teste gerado pelo sistema.</p>
        </div>
      `,
    });

    console.log('✨ [Mail] Email sent: %s', info.messageId);
    console.log('🔗 [Mail] Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return nodemailer.getTestMessageUrl(info);
  }
}

export default new Mail();
