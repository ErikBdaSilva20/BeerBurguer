<h1 align="center">
  🍔 DevBurguer
</h1>

<p align="center">
  <strong>Plataforma completa de e-commerce para hamburgueria artesanal</strong><br/>
  Com painel administrativo, pagamento integrado via Mercado Pago e autenticação Firebase.
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-Sequelize-336791?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img alt="Firebase" src="https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"/>
  <img alt="MercadoPago" src="https://img.shields.io/badge/Mercado%20Pago-Payments-009EE3?style=for-the-badge&logo=mercadopago&logoColor=white"/>
</p>

---

## 🖼️ Screenshots do Projeto

### Página Inicial
![Home](./ProjectPrints/Home.png)

### Seção de Destaques
![Home 2](./ProjectPrints/Home2.png)

### Tela de Login
![Login](./ProjectPrints/Login.png)

### Cardápio / Menu
![Menu](./ProjectPrints/Menu.png)

### Checkout & Pagamento
![Checkout](./ProjectPrints/Checkout.png)

### Página de Contato
![Contato](./ProjectPrints/Contato.png)

### Painel Admin — Dashboard
![Dashboard](./ProjectPrints/dashboard.png)

### Painel Admin — Gerenciar Produtos
![Produtos Admin](./ProjectPrints/adminproducts.png)

### Painel Admin — Novo Produto
![Novo Produto](./ProjectPrints/newproduct.png)

### Painel Admin — Pedidos
![Pedidos Admin](./ProjectPrints/adminorders.png)

---

## 📑 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura do Projeto](#️-arquitetura-do-projeto)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Modelos de Dados](#-modelos-de-dados)
- [Fluxos da Aplicação](#-fluxos-da-aplicação)
- [Rotas da API](#-rotas-da-api)
- [Rotas do FrontEnd](#-rotas-do-frontend)
- [Fluxo de Autenticação](#-fluxo-de-autenticação)
- [Variáveis de Ambiente](#️-variáveis-de-ambiente)
- [Como Rodar Localmente](#-como-rodar-localmente)
- [Deploy](#-deploy)
- [Autor](#-autor)

---

## 📌 Sobre o Projeto

O **DevBurguer** é uma aplicação web **full-stack** de e-commerce para uma hamburgueria artesanal. O sistema oferece uma experiência completa tanto para os **clientes** — que navegam pelo cardápio, montam o carrinho e finalizam o pedido com pagamento via Mercado Pago (PIX ou Cartão de Crédito) — quanto para os **administradores**, que gerenciam produtos, categorias, pedidos e acompanham métricas de desempenho em um dashboard analítico.

O projeto foi desenvolvido com uma arquitetura **monorepo**, separando claramente o **FrontEnd** (React + Vite) do **BackEnd** (Node.js + Express), utilizando dois bancos de dados: **PostgreSQL** (dados estruturados: usuários, produtos, categorias) e **MongoDB** (pedidos, dados semi-estruturados).

---

## ✅ Funcionalidades

### 👤 Área do Cliente
- [x] Cadastro e Login com **e-mail/senha** ou **Google (Firebase Auth)**
- [x] Visualização da página inicial com carrossel de **ofertas** e **categorias**
- [x] Navegação pelo **cardápio** completo com filtros por categoria
- [x] **Carrinho de compras** persistido no `localStorage`
- [x] Checkout com seleção de método de pagamento: **PIX** ou **Cartão de Crédito**
- [x] Integração com **Mercado Pago** para processamento do pagamento
- [x] Tela de **conclusão de pagamento** com feedback ao usuário
- [x] Histórico de **Meus Pedidos**
- [x] Página de **Contato**

### 🛠️ Área do Administrador
- [x] **Dashboard analítico** com gráficos: receita total, total de pedidos, top produtos, receita diária (Recharts)
- [x] Listagem, cadastro, edição e exclusão de **Produtos**
- [x] Listagem e gerenciamento de **Categorias**
- [x] Visualização e atualização de status dos **Pedidos**
- [x] Upload de imagens de produtos/categorias

> **Nota:** O painel Admin está acessível em modo **somente leitura** para visitantes (sem login de admin), exibindo um popup informativo ao tentar realizar alterações.

---

## 🚀 Tecnologias Utilizadas

### FrontEnd

| Tecnologia | Versão | Uso |
|---|---|---|
| **React** | 19 | Biblioteca de UI |
| **Vite** | 7 | Build tool e dev server |
| **React Router DOM** | 7 | Roteamento SPA |
| **Styled Components** | 6 | Estilização CSS-in-JS |
| **MUI (Material UI)** | 7 | Componentes de UI |
| **Axios** | 1.x | Requisições HTTP |
| **React Hook Form** | 7 | Gerenciamento de formulários |
| **Yup** | 1.x | Validação de schemas |
| **Recharts** | 3 | Gráficos e visualizações |
| **React Toastify** | 11 | Notificações |
| **React Multi Carousel** | 2.x | Carrosseis de produtos |
| **React Select** | 5.x | Selects customizados |
| **Firebase** | 12 | Autenticação de usuários |

### BackEnd

| Tecnologia | Versão | Uso |
|---|---|---|
| **Node.js + Express** | 5.x | Servidor HTTP e roteamento |
| **Sequelize** | 6 | ORM para PostgreSQL |
| **PostgreSQL** | - | Banco relacional (usuários, produtos, categorias) |
| **Mongoose** | 9 | ODM para MongoDB |
| **MongoDB** | Atlas | Banco de pedidos (dados semi-estruturados) |
| **Firebase Admin SDK** | 13 | Verificação de tokens JWT |
| **Mercado Pago SDK** | 2.x | Processamento de pagamentos |
| **Multer** | 2.x | Upload de arquivos/imagens |
| **Nodemailer** | 8 | Envio de e-mails |
| **UUID** | 13 | Geração de IDs únicos |
| **Yup** | 1.x | Validação de dados no servidor |
| **CORS** | 2.x | Cross-Origin Resource Sharing |
| **dotenv** | 17 | Gerenciamento de variáveis de ambiente |

---

## 🏗️ Arquitetura do Projeto

```
DevBurguer/                  ← Monorepo raiz
├── FrontEnd/                ← Aplicação React (Vite)
├── BackEnd/                 ← API REST (Node.js + Express)
├── ProjectPrints/           ← Screenshots do projeto
└── DEPLOY_GUIDE.md          ← Guia de deploy completo
```

### Visão Geral da Arquitetura

```mermaid
graph TD
    subgraph Cliente["🌐 Cliente (Browser)"]
        FE["⚛️ React App (Vite)"]
    end

    subgraph Backend["⚙️ BackEnd (Node.js + Express)"]
        API["🔀 API REST"]
        AUTH["🔒 Auth Middleware (Firebase)"]
        ADMIN["🛡️ Admin Middleware"]
    end

    subgraph Databases["🗄️ Bancos de Dados"]
        PG["🐘 PostgreSQL\n(Usuários, Produtos, Categorias)"]
        MONGO["🍃 MongoDB\n(Pedidos / Orders)"]
    end

    subgraph External["☁️ Serviços Externos"]
        FIREBASE["🔥 Firebase Auth"]
        MP["💳 Mercado Pago"]
        CLOUDINARY["🖼️ Cloudinary (Imagens)"]
    end

    FE -- "HTTP / REST" --> API
    FE -- "Login / Token" --> FIREBASE
    API -- "Verificar Token" --> FIREBASE
    API --> AUTH --> ADMIN
    API --> PG
    API --> MONGO
    API -- "Criar Preferência" --> MP
    API -- "Upload Imagens" --> CLOUDINARY
    MP -- "Redirect" --> FE
```

---

## 📂 Estrutura de Pastas

### FrontEnd (`/FrontEnd/src`)

```
src/
├── assets/               # Imagens e recursos estáticos
├── components/           # Componentes reutilizáveis
│   ├── Button/
│   ├── CardProduct/      # Card de produto no cardápio
│   ├── CartItems/        # Item do carrinho
│   ├── CartResume/       # Resumo do pedido
│   ├── CategoryCarousel/ # Carrossel de categorias
│   ├── Footer/
│   ├── Header/           # Cabeçalho com navegação
│   ├── MobileMenu/       # Menu mobile colapsável
│   ├── OffersCarousel/   # Carrossel de ofertas
│   └── SideNav/          # Barra lateral do admin
├── config/               # Configurações (Firebase, etc.)
├── hooks/
│   ├── CartContext.jsx   # Context API do carrinho
│   └── UserContext.jsx   # Context API do usuário autenticado
├── layouts/
│   ├── AdminLayout/      # Layout do painel admin (com SideNav)
│   └── UserLayout/       # Layout do cliente (com Header/Footer)
├── pages/
│   ├── Home/             # Página inicial
│   ├── Menu/             # Cardápio de produtos
│   ├── Cart/             # Carrinho de compras
│   ├── Checkout/         # Finalização do pedido e pagamento
│   ├── CompletePayment/  # Tela pós-pagamento
│   ├── MyOrders/         # Histórico de pedidos do cliente
│   ├── Contact/          # Página de contato
│   ├── Login/            # Autenticação
│   ├── Register/         # Cadastro de novo usuário
│   ├── NotFound/         # Página 404
│   └── Admin/
│       ├── Dashboard/    # Métricas e gráficos
│       ├── Products/     # Lista de produtos
│       ├── NewProduct/   # Formulário de novo produto
│       ├── EditProduct/  # Formulário de edição de produto
│       └── Orders/       # Gerenciamento de pedidos
├── routes/
│   ├── index.jsx         # Definição de todas as rotas
│   └── PrivateRoute.jsx  # HOC para rotas protegidas
├── services/
│   └── api.js            # Instância do Axios configurada
├── styles/               # Estilos globais
└── utils/                # Funções utilitárias
```

### BackEnd (`/BackEnd/src`)

```
src/
├── app/
│   ├── controllers/
│   │   ├── DashboardController.js    # Métricas do painel admin
│   │   ├── categoryController.js     # CRUD de categorias
│   │   ├── orderController.js        # CRUD de pedidos
│   │   ├── productController.js      # CRUD de produtos
│   │   ├── sessionController.js      # Login e verificação de sessão
│   │   ├── userController.js         # Cadastro de usuários
│   │   └── mercadopago/
│   │       └── CreatePaymentPreferenceController.js  # Integração MP
│   ├── middlewares/
│   │   ├── auth.js                   # Verificação do token Firebase JWT
│   │   └── admin.js                  # Verificação de privilégio admin
│   ├── models/ (Sequelize / PostgreSQL)
│   │   ├── User.js                   # Model de Usuário
│   │   ├── Product.js                # Model de Produto
│   │   └── Category.js               # Model de Categoria
│   └── schemas/ (Mongoose / MongoDB)
│       └── Orders.js                 # Schema de Pedido
├── config/
│   ├── database.cjs                  # Config do Sequelize/PostgreSQL
│   ├── multer.cjs                    # Config de upload de arquivos
│   ├── firebase-admin.js             # Inicialização do Firebase Admin
│   └── fileRoutes.cjs               # Config de rotas estáticas de arquivos
├── database/
│   └── index.js                      # Inicializa Sequelize + Mongoose
├── lib/                              # Helpers e bibliotecas customizadas
├── app.js                            # Config do Express (middlewares, rotas)
├── routes.js                         # Definição de todas as rotas da API
└── server.js                         # Ponto de entrada, inicializa o app
```

---

## 💾 Modelos de Dados

### PostgreSQL (Sequelize)

#### `users`
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | STRING (UUID Firebase) | Chave primária (UID do Firebase) |
| `name` | STRING | Nome do usuário |
| `email` | STRING | E-mail do usuário |
| `password_hash` | STRING | Hash da senha (null para usuários Google) |
| `admin` | BOOLEAN | Flag de administrador (default: `false`) |
| `google_user` | BOOLEAN | Flag de login via Google (default: `false`) |

#### `products`
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | UUID | Chave primária auto-gerada |
| `name` | STRING | Nome do produto |
| `price` | INTEGER | Preço em centavos |
| `path` | STRING | Caminho do arquivo de imagem |
| `url` | VIRTUAL | URL pública da imagem (gerada dinamicamente) |
| `offer` | BOOLEAN | Produto em oferta? |
| `category_id` | FK | Referência à Category |

#### `categories`
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | UUID | Chave primária auto-gerada |
| `name` | STRING | Nome da categoria |
| `path` | STRING | Caminho do arquivo de imagem |
| `url` | VIRTUAL | URL pública da imagem |

### MongoDB (Mongoose)

#### `orders` (Schema)
| Campo | Tipo | Descrição |
|---|---|---|
| `user.id` | String | ID do usuário |
| `user.name` | String | Nome do usuário |
| `products[]` | Array | Lista de produtos do pedido |
| `products[].id` | String | ID do produto |
| `products[].name` | String | Nome do produto |
| `products[].price` | Number | Preço unitário |
| `products[].category` | String | Categoria do produto |
| `products[].quantity` | Number | Quantidade comprada |
| `products[].url` | String | URL da imagem do produto |
| `status` | String | Status do pedido (ex: `Pendente`, `Em preparação`, `Entregue`) |
| `payment_intent_id` | String | ID do pagamento no Mercado Pago |
| `payment_method` | String | Método de pagamento (`pix` ou `credit_card`) |
| `createdAt` | Date | Data de criação (automático) |
| `updatedAt` | Date | Data de atualização (automático) |

---

## 🔄 Fluxos da Aplicação

### Fluxo de Compra do Cliente

```mermaid
flowchart TD
    A([Usuário Acessa o Site]) --> B{Está logado?}
    B -- Não --> C[Tela de Login / Cadastro]
    C --> D[Autenticação via Firebase\nE-mail/Senha ou Google]
    D --> E[Token Firebase gerado]
    E --> F[Token armazenado no localStorage]
    B -- Sim --> G[Página Inicial - Home]
    F --> G

    G --> H[Navega pelo Menu / Cardápio]
    H --> I[Adiciona produtos ao Carrinho]
    I --> J[Carrinho persistido no localStorage]
    J --> K[Acessa o Carrinho]
    K --> L[Vai para o Checkout]
    L --> M{Escolhe método de pagamento}
    M --> |PIX| N[Cria preferência PIX no Mercado Pago]
    M --> |Cartão de Crédito| O[Cria preferência Cartão no Mercado Pago]
    N --> P[Redireciona para o Mercado Pago]
    O --> P
    P --> Q{Pagamento aprovado?}
    Q --> |Sim| R[Pedido criado no MongoDB]
    R --> S[Tela de Confirmação de Pagamento]
    Q --> |Não| T[Tela de Erro / Retry]
```

### Fluxo Administrativo

```mermaid
flowchart TD
    A([Admin Acessa /admin]) --> B[Dashboard com Métricas]
    B --> C{Ação desejada}

    C --> D[Gerenciar Produtos]
    D --> D1[Listar Produtos]
    D --> D2[Adicionar Produto\n+ Upload de Imagem]
    D --> D3[Editar Produto]
    D --> D4[Excluir Produto]

    C --> E[Gerenciar Pedidos]
    E --> E1[Ver todos os Pedidos]
    E --> E2[Atualizar Status do Pedido]

    C --> F[Ver Dashboard]
    F --> F1[Receita Total]
    F --> F2[Total de Pedidos]
    F --> F3[Top Produtos]
    F --> F4[Receita Diária - Gráfico]
```

### Fluxo de Autenticação

```mermaid
sequenceDiagram
    participant U as Usuário (Browser)
    participant FE as FrontEnd (React)
    participant FIREBASE as Firebase Auth
    participant BE as BackEnd (Express)
    participant DB as PostgreSQL

    U->>FE: Insere e-mail e senha
    FE->>FIREBASE: signInWithEmailAndPassword()
    FIREBASE-->>FE: Retorna ID Token (JWT)
    FE->>FE: Salva token no localStorage
    FE->>BE: GET /session-verify (Authorization: Bearer <token>)
    BE->>FIREBASE: admin.auth().verifyIdToken(token)
    FIREBASE-->>BE: Decoded token (uid, email, name)
    BE->>DB: User.findByPk(uid) → verifica flag admin
    DB-->>BE: user.admin: true/false
    BE-->>FE: Retorna dados do usuário + isAdmin
    FE->>FE: Armazena userInfo no Context (UserContext)
    FE-->>U: Redireciona para Home
```

---

## 🛣️ Rotas da API

**Base URL (local):** `http://localhost:3001`

### Públicas (sem autenticação)
| Método | Rota | Controller | Descrição |
|---|---|---|---|
| `POST` | `/users` | UserController | Cadastrar novo usuário |
| `POST` | `/sessions` | SessionController | Fazer login / obter dados de sessão |

### Autenticadas (requer `Bearer Token` Firebase)
| Método | Rota | Controller | Descrição |
|---|---|---|---|
| `GET` | `/session-verify` | SessionController | Verificar se token é válido |
| `GET` | `/products` | ProductController | Listar todos os produtos |
| `GET` | `/categories` | CategoryController | Listar todas as categorias |
| `POST` | `/orders` | OrderController | Criar um novo pedido |
| `GET` | `/orders` | OrderController | Listar pedidos (do usuário ou todos se admin) |
| `POST` | `/create-payment-preference` | CreatePaymentPreferenceController | Gerar preferência de pagamento no Mercado Pago |

### Autenticadas + Admin (requer `admin: true` no banco)
| Método | Rota | Controller | Descrição |
|---|---|---|---|
| `POST` | `/products` | ProductController | Criar produto + upload de imagem |
| `PUT` | `/products/:id` | ProductController | Editar produto + upload de imagem |
| `DELETE` | `/products/:id` | ProductController | Excluir produto |
| `POST` | `/categories` | CategoryController | Criar categoria + upload de imagem |
| `PUT` | `/categories/:id` | CategoryController | Editar categoria + upload de imagem |
| `PUT` | `/orders/:id` | OrderController | Atualizar status de um pedido |
| `GET` | `/dashboard` | DashboardController | Obter métricas do dashboard |

---

## 🗺️ Rotas do FrontEnd

| Rota | Página | Proteção |
|---|---|---|
| `/login` | Login | Pública |
| `/cadastro` | Register | Pública |
| `/` | Home | Requer login |
| `/menu` | Menu (Cardápio) | Requer login |
| `/carrinho` | Cart | Requer login |
| `/complete` | CompletePayment | Requer login |
| `/meus-pedidos` | MyOrders | Requer login |
| `/contato` | Contact | Requer login |
| `/admin` | Admin Dashboard | Admin (view-only sem login admin) |
| `/admin/produtos` | Admin Products | Admin (view-only sem login admin) |
| `/admin/adicionar-produto` | Admin NewProduct | Admin (view-only sem login admin) |
| `/admin/editar-produto` | Admin EditProduct | Admin (view-only sem login admin) |
| `/admin/pedidos` | Admin Orders | Admin (view-only sem login admin) |
| `*` | NotFound (404) | Pública |

---

## 🔒 Fluxo de Autenticação

O projeto utiliza **Firebase Authentication** como único provedor de identidade, integrado ao backend via **Firebase Admin SDK**:

1. **Login**: O cliente autentica via Firebase (e-mail/senha ou Google OAuth).  
2. **Token**: O Firebase retorna um **ID Token JWT** assinado.  
3. **Requisições**: O FrontEnd envia o token em todas as requisições autenticadas via header `Authorization: Bearer <token>`.  
4. **Verificação**: O BackEnd valida o token usando `firebase-admin.auth().verifyIdToken()`.  
5. **Autorização Admin**: Após verificar o token, o backend busca o usuário no PostgreSQL e verifica o campo `admin: true` para rotas restritas.

---

## ⚙️ Variáveis de Ambiente

### BackEnd (`/BackEnd/.env`)

```env
# Servidor
PORT=3001

# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=seu_access_token_aqui

# MongoDB
MONGO_URL=mongodb+srv://usuario:senha@cluster.mongodb.net/DevBurguer?retryWrites=true&w=majority

# PostgreSQL
DATABASE_URL=postgresql://usuario:senha@host:5432/devburguer

# Firebase Admin
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json

# URLs (para produção)
APP_URL=https://api-devburguer.onrender.com
FRONTEND_URL=https://devburguer.vercel.app

# Cloudinary (para produção)
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
```

### FrontEnd (`/FrontEnd/.env`)

```env
# URL da API
VITE_API_URL=http://localhost:3001

# Mercado Pago
VITE_MERCADOPAGO_PUBLIC_KEY=sua_public_key

# Firebase
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto-id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=sua_app_id
```

> ⚠️ **ATENÇÃO:** Nunca comite arquivos `.env` ou `serviceAccountKey.json` no repositório. Certifique-se de que estão no `.gitignore`.

---

## 💻 Como Rodar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- [PostgreSQL](https://www.postgresql.org/) rodando localmente
- [MongoDB](https://www.mongodb.com/) local ou conta no MongoDB Atlas
- Conta no [Firebase Console](https://console.firebase.google.com/)
- Conta no [Mercado Pago Developers](https://www.mercadopago.com.br/developers/panel)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/devburguer.git
cd devburguer
```

### 2. Configure e inicie o BackEnd

```bash
cd BackEnd

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais

# Coloque o serviceAccountKey.json do Firebase na raiz do BackEnd

# Execute as migrations do banco (Sequelize)
npx sequelize-cli db:migrate

# Inicie o servidor de desenvolvimento
pnpm dev
```

O servidor estará disponível em: `http://localhost:3001`

### 3. Configure e inicie o FrontEnd

```bash
cd ../FrontEnd

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais do Firebase e Mercado Pago

# Inicie o servidor de desenvolvimento
pnpm dev
```

O FrontEnd estará disponível em: `http://localhost:5173`

---

## 🚀 Deploy

O projeto foi projetado para ser hospedado nas seguintes plataformas:

| Serviço | Plataforma | Detalhes |
|---|---|---|
| **FrontEnd** | [Vercel](https://vercel.com/) | Framework: `Vite`, Root: `FrontEnd`, Build: `pnpm build` |
| **BackEnd** | [Render](https://render.com/) | Root: `BackEnd`, Start: `node src/server.js` |
| **PostgreSQL** | [Render](https://render.com/) | Banco de dados gerenciado |
| **MongoDB** | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) | Cluster na nuvem |
| **Imagens** | [Cloudinary](https://cloudinary.com/) | Storage de imagens em produção |
| **Autenticação** | [Firebase](https://firebase.google.com/) | Auth + Admin SDK |
| **Pagamentos** | [Mercado Pago](https://www.mercadopago.com.br/developers) | PIX + Cartão |

> 📖 Consulte o [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md) para um guia passo a passo completo do processo de deploy.

---

## 👤 Autor

**Erik Silva**

Desenvolvido com ❤️ e muito ☕

---

<p align="center">
  <strong>DevBurguer</strong> — O melhor hambúrguer artesanal, agora online! 🍔
</p>
