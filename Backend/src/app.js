import express from 'express';
import cors from 'cors';
import productRoutes from './routes/products.routes';
import estiloRoutes from './routes/estilos.routes';
import morgan from 'morgan';

import config from './config';

const app = express();
// const multer = require('multer');
// const upload = multer();

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

/*
app.post('/upload-image', upload.single('fotografia'), async (req, res) => {
  console.log('en app.post(/upload-image');
  try {
    const pool = await sql.connect(config);
    const fotografia = req.file.buffer;
    const query = `INSERT INTO dbo.Estilos (fotografia) VALUES (@fotografia)`;
    const result = await pool
      .request()
      .input('fotografia', sql.VarBinary(sql.MAX), fotografia)
      .query(query);
    res.send('Imagen subida correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al subir la imagen');
  }
});

// Endpoint para subir una imagen METODO ANTERIOR
/*
app.post('/upload', async (req, res) => {
    const base64Data = req.body.imagen.replace(/^data:image\/png;base64,/, '');
  
    const imagePath = 'uploads/';
    const imageName = Date.now() + '.png';
    const fullPath = imagePath + imageName;
  
    fs.writeFile(fullPath, base64Data, 'base64', (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al guardar la imagen');
        return;
      }
  
      sql.connect(dbConfig, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error al conectar a la base de datos');
          return;
        }
  
        const request = new sql.Request();
        request.query(
          `INSERT INTO Imagenes (Ruta) VALUES ('/${fullPath}')`,
          (err) => {
            if (err) {
              console.log(err);
              res.status(500).send('Error al guardar la ruta de la imagen');
              return;
            }
  
            res.send('Imagen subida exitosamente');
          }
        );
      });
    });
  });
  */

export default app;
