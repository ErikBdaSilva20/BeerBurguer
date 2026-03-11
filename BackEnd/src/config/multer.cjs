const multer = require('multer');
const { v4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Configura o cloudinary com as chaves do .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configura o storage do multer para enviar pro Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'devburguer', // Nome da pasta lá no Cloudinary
    format: async (req, file) => {
      // Pega a extensão original do arquivo ou força um formato padrão (ex: 'png')
      const format = file.mimetype.split('/')[1];
      return ['jpeg', 'png', 'jpg', 'webp'].includes(format) ? format : 'png';
    },
    public_id: (req, file) => {
      const uniqueName = v4().concat(`-${file.originalname.split('.')[0]}`);
      return uniqueName;
    },
  },
});

module.exports = {
  storage: storage,
  cloudinary: cloudinary // exportado caso precise em outro lugar
};
