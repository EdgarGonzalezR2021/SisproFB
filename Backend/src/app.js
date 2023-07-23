import express from 'express';
import cors from 'cors';
import productRoutes from './routes/products.routes';
import estiloRoutes from './routes/estilos.routes';
import morgan from 'morgan';
import config from './config';

const multer = require('multer');
const path = require('path');
const app = express();

// SECCION MULTER
const storageEstilos = multer.diskStorage({
  destination: './public/estilos/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

const uploadEstilos = multer({
  storage: storageEstilos,
  limits: { fileSize: 2000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
})

/*
// Middleware para capturar el error de límite de tamaño
function handleFileSizeError(err, req, res, next) {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      // Aquí puedes mostrar un mensaje de aviso al usuario
      return res.status(400).json({ error: 'El archivo excede el límite de tamaño permitido.' });
    }
    next(err);
  }
  
  // Agregar el controlador de errores personalizado al middleware de Multer
  app.use(handleFileSizeError);
  */

// TERMINA SECCION MULTER

// settings
app.set('port', config.port);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/api', productRoutes);
app.use('/api', estiloRoutes);

// sube imagenes con nombre de la fotografia original
app.post('/upload', uploadEstilos.single('fotografia'), function (req, res) {
  try {
    // req.file es el nombre de tu archivo en el formulario anterior, en este caso 'uploaded_file'
    // req.body contendrá los campos de texto, si los hubiera.
    console.log('en app.js app.post(/upload', req.file, req.body);

    // Resto de tu lógica de manejo de la solicitud POST aquí

    // Envía una respuesta al cliente si es necesario
    res.send('en app.js Archivo subido exitosamente fotografia');
  } catch (error) {
    // Captura cualquier error que ocurra durante el manejo de la solicitud
    console.error('En app.js Error al manejar la solicitud POST:', error);

    // Envía una respuesta de error al cliente
    res.status(500).send('En app.js Error al subir el archivo');
  } 
});


export default app;
