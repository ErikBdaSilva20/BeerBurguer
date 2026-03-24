---
description: Especialista senior em pagamentos
---

# 🔧 Payment Gateway Migration Agent (Mercado Pago → Asaas)

## 🎯 Objetivo

Migrar completamente o sistema de pagamentos do projeto, substituindo o Mercado Pago pelo Asaas, com suporte a **Pix e Cartão de Crédito**, mantendo arquitetura limpa e preparada para SaaS.

---

## 💳 Métodos de Pagamento Suportados

O sistema deve suportar:

- ⚡ Pix
- 💳 Cartão de crédito

---

## 💳 Fluxos de Pagamento

### ⚡ Pix (Prioridade Alta)

Implementar:

```ts
createPixPayment(input: CreatePaymentDTO): PaymentResponseDTO
```

Deve:

1. Criar cliente no Asaas (se necessário)
2. Criar cobrança com método PIX
3. Retornar:
   - QR Code
   - código copia e cola
   - paymentId

---

### 💳 Cartão de Crédito

Implementar:

```ts
createCreditCardPayment(input: CreateCardPaymentDTO): PaymentResponseDTO
```

---

### 🔀 Estratégia de Implementação (IMPORTANTE)

#### 🟢 Fase 1 (MVP - recomendado)

- Implementar **checkout via link do Asaas**
- Backend apenas gera cobrança
- Frontend redireciona usuário

👉 Mais simples, mais rápido, menos erro

---

#### 🔵 Fase 2 (Avançado)

- Implementar pagamento direto via API
- Coletar dados de cartão no frontend
- Enviar token/dados para backend

👉 Mais controle (estilo Stripe), mas mais complexo

---

## 🧠 Interface de Gateway

Atualizar interface:

```ts
interface IPaymentGateway {
  createPixPayment(input: CreatePaymentDTO): Promise<PaymentResponseDTO>;
  createCreditCardPayment(input: CreateCardPaymentDTO): Promise<PaymentResponseDTO>;
}
```

---

## 🧾 Modelo de Dados (Atualização)

Entidade `Payment` deve suportar:

- id
- externalId
- amount
- status
- method (PIX | CREDIT_CARD)
- qrCode (opcional)
- copyPasteCode (opcional)
- checkoutUrl (para cartão)

---

## 🔔 Webhook

Endpoint:

```ts
POST / webhooks / asaas;
```

Deve tratar:

- PAYMENT_RECEIVED
- PAYMENT_CONFIRMED
- PAYMENT_OVERDUE
- PAYMENT_FAILED

---

## 🔄 Fluxo Final Esperado

### Pix:

1. Front solicita pagamento
2. Backend cria cobrança Pix
3. Retorna QR Code
4. Usuário paga
5. Webhook confirma

---

### Cartão:

1. Front solicita pagamento
2. Backend cria cobrança
3. Retorna checkoutUrl
4. Usuário paga via checkout
5. Webhook confirma

---

## ⚠️ Requisitos Importantes

- Priorizar simplicidade no MVP
- Implementar primeiro Pix
- Cartão via checkout antes de API direta
- Código desacoplado (DDD)
- Fácil troca futura de gateway

---

## ✅ Checklist

- [ ] Pix funcionando
- [ ] Cartão funcionando (via checkout)
- [ ] Webhook funcionando
- [ ] Mercado Pago removido
- [ ] Ambiente sandbox configurado

---

## 🚀 Resultado Esperado

Sistema de pagamento completo com Pix e Cartão via Asaas, com fluxo simples, escalável e pronto para SaaS.
