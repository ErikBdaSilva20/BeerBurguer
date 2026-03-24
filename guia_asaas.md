# 🟢 Guia: Criar Conta e Pegar as Chaves no Asaas

---

## 1. Criar sua conta no Asaas

1. Acesse **[https://www.asaas.com](https://www.asaas.com)**
2. Clique em **"Abrir conta grátis"**
3. Preencha seus dados (nome, e-mail, CPF/CNPJ)
4. Confirme seu e-mail (você vai receber um link)
5. Complete o cadastro com os dados da sua empresa/pessoa física

> [!NOTE]
> Você vai cair automaticamente no **ambiente Sandbox (testes)**. Ele é separado da produção, perfeito para desenvolveder sem riscos.

---

## 2. Acessar o painel Sandbox (para testes)

1. Após logar, no canto superior esquerdo, veja se está no modo **"Sandbox"** (ambiente de testes)
2. Se não estiver, clique no ícone de configurações ou no seletor de ambiente e mude para **Sandbox**

> [!IMPORTANT]  
> O Sandbox tem uma URL e chave **diferentes** da produção. Use sempre o Sandbox para testar antes de ir a produção.

---

## 3. Pegar a API Key (Sandbox)

1. No painel do Asaas, vá em **Configurações** (ícone de engrenagem, canto inferior esquerdo)
2. Clique em **"Integrações"** ou **"API"**
3. Você verá a sua **API Key do Sandbox** — algo como:
   ```
   $aact_YTU5YTE0M2M3YmYxNDE2ZDE4ZTMzNjJmZGNmNmFhMzQ6OjAwMDAwMDAwMDAwMDAwNzI0ODg6OiRhYWNoX2IxNzM3YmUwLWU3ZWQtNGIwNy1hMzQxLTE0MmNmYjUzYzBlNA==
   ```
4. **Copie esta chave**

---

## 4. Colar a chave no .env do BackEnd

Abra o arquivo [BackEnd/.env](file:///c:/____________________Projetos________/DevBurguer/BackEnd/.env) e substitua o valor:

```env
# Sandbox (testes) – chave que começa com $aact_...
ASAAS_API_KEY=COLOQUE_SUA_CHAVE_AQUI

# URL do Sandbox
ASAAS_API_URL=https://sandbox.asaas.com/api/v3
```

> [!TIP]
> Apenas troque `COLOQUE_SUA_CHAVE_AQUI` pela chave real. Não precisa mexer em mais nada no código.

---

## 5. Testar um pagamento Pix no Sandbox

O Asaas tem uma ferramenta para simular pagamentos:

1. No Sandbox, vá em **Cobranças** após gerar um pagamento pelo seu sistema
2. Encontre a cobrança criada
3. Clique nos **3 pontinhos (⋯)** → **"Simular recebimento"** (ou "Confirmar pagamento")
4. O status vai mudar para **RECEIVED** e o webhook será disparado

---

## 6. Configurar o Webhook (opcional para testes locais)

Para testes locais, você pode usar o **ngrok** para expor sua porta 3001:

```bash
# Instale o ngrok: https://ngrok.com/download
ngrok http 3001
```

Depois, no painel do Asaas (Sandbox):
1. Vá em **Integrações → Webhooks**
2. Adicione a URL:
   ```
   https://SEU-NGROK-URL/webhooks/asaas
   ```
3. Marque os eventos: `PAYMENT_RECEIVED`, `PAYMENT_CONFIRMED`, `PAYMENT_OVERDUE`

---

## 7. Ir para Produção (quando estiver pronto)

1. No painel do Asaas, mude para o ambiente de **Produção**
2. Vá em **Configurações → API** e copie a chave de **Produção**
3. No [BackEnd/.env](file:///c:/____________________Projetos________/DevBurguer/BackEnd/.env), substitua:

```env
# Produção
ASAAS_API_KEY=$aact_MzkwODA2MWY...  ← sua chave de PRODUÇÃO

# URL de Produção
ASAAS_API_URL=https://api.asaas.com/v3
```

> [!CAUTION]
> **Nunca** suba a [.env](file:///c:/____________________Projetos________/DevBurguer/BackEnd/.env) no Git. Ela já está no [.gitignore](file:///c:/____________________Projetos________/DevBurguer/BackEnd/.gitignore). Em produção (Render, Railway etc.), cadastre `ASAAS_API_KEY` e `ASAAS_API_URL` diretamente nas variáveis de ambiente do painel.

---

## ✅ Checklist Final

| Item | Status |
|------|--------|
| Conta Asaas criada | ☐ |
| API Key do Sandbox copiada | ☐ |
| `ASAAS_API_KEY` no [.env](file:///c:/____________________Projetos________/DevBurguer/BackEnd/.env) do BackEnd | ☐ |
| `ASAAS_API_URL` apontando para Sandbox | ☐ |
| Teste de Pix realizado (simular recebimento) | ☐ |
| Teste de Cartão realizado (link de checkout) | ☐ |
| Webhook configurado (ngrok ou deploy) | ☐ |

---

## 🔗 Links Úteis

- **Cadastro Asaas**: https://www.asaas.com
- **Documentação da API**: https://docs.asaas.com
- **Painel Sandbox**: https://sandbox.asaas.com
- **ngrok (para webhook local)**: https://ngrok.com
