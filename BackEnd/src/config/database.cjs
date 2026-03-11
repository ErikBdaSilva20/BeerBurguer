require('dotenv/config');

// Em produção (Render), a variável DATABASE_URL é injetada automaticamente.
// Em desenvolvimento local, usa as variáveis individuais como fallback.
module.exports = process.env.DATABASE_URL
  ? {
      dialect: 'postgres',
      url: process.env.DATABASE_URL,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Necessário para Render/Heroku
        },
      },
      define: {
        timestamps: true,
        underscored: true,
      },
    }
  : {
      // Configuração local (desenvolvimento)
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASS || '123456',
      database: process.env.DB_NAME || 'dev-burguer-api',
      define: {
        timestamps: true,
        underscored: true,
      },
    };
