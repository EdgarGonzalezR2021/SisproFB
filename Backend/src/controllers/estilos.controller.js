import { getConnection, querys, sql } from '../database';

const multer = require('multer');
// const upload = multer({ dest: './public/data/uploads/' });
const express = require('express');
const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

/* Oficial */
export const getEstilos = async (req, res) => {
  try {
    // console.log('getEstilos');
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllEstilos);
    res.json(result.recordset);

    // aqui se puede hacer un filtro de los datos que se quieren mostrar
    // ejemplo: solo mostrar el nombre y la descripcion de los estiloos
    // tambien se genera un nuevo arreglo con los datos para frontend

    // const Estilos = result.recordset;
    // const EstilosFiltered = Estilos.map((estilo) => {
    //   return { name: estilo.name, description: estilo.description };
    // });
    // res.json(EstilosFiltered);
  } catch (error) {
    res.status(500);
    res.send('getEstilos error.message', error.message);
  }
};

export const createNewEstilo = async (req, res) => {
  const {
    estilo,
    nombreestilo,
    linea,
    horma,
    molde,
    estado,
    fotografia,
    observaciones,
    state,
  } = req.body;

  // console.log('en createNewEstilo req.body fotografia > ', req.body.fotografia);

  try {
    const pool = await getConnection();
    // const fotografia = req.fotografia ? req.fotografia.filename : null;

    await pool
      .request()
      .input('estilo', sql.VarChar, estilo)
      .input('nombreestilo', sql.Text, nombreestilo)
      .input('linea', sql.VarChar, linea)
      .input('horma', sql.VarChar, horma)
      .input('molde', sql.VarChar, molde)
      .input('estado', sql.VarChar, estado)
      .input('fotografia', sql.VarChar, fotografia)
      .input('observaciones', sql.Text, observaciones)
      .input('state', sql.VarChar, state)
      .query(querys.addNewEstilo);

    res.json({
      estilo,
      nombreestilo,
      linea,
      horma,
      molde,
      estado,
      fotografia,
      observaciones,
      state,
    });
    console.log('en createNewEstilo antes de subir fotoGRAFIA', fotografia);

    /*
    try {

    
    app.post('/profile', upload.single('fotografia'), function(req, res, next) {
      try {
        const fotografia = req.file ? req.file.filename : null;
        // Hacer algo con la fotografia cargada
        res.send('Fotografía cargada exitosamente');
      } catch (error) {
        // Manejar cualquier error que se produzca durante la carga de archivos
        next(error);
      }
    }, function(error, req, res, next) {
      // Controlador de errores para manejar cualquier error que se produzca durante la carga de archivos
      res.status(500).send({ message: 'Error al cargar la fotografía', error });
    });

    console.log('en createNewEstilo despues de subir fotoGRAFIA', fotografia);
  }
  catch (error) {
    res.status(500);
    res.send('en createNewEstilo', error.message);
  }
  */
    // UPLOAD BASICO DE PRUEBAS
    // try {

    /*
    app.post(
      '/profile',
      upload.single('fotografia'),
      function (req, res, next) {
        // req.file is the `avatar` file
        // req.body will hold the text fields, if there were any
      }
    );
    */

    /*
    } catch (error) {
      console.log(error.message);
    }
    */

    /*
    console.log('antes de upload fotografia', fotografia);
    app.post('/upload', upload.single('fotografia'), (req, res) => {
      try {
        console.log('1req.file.filename =', req.file.filename);
        const fotografia = req.fotografia ? req.fotografia.filename : null;
        return res
          .status(200)
          .send({ message: 'Photo uploaded successfully', fotografia });
      } catch (error) {
        console.log('ERROR req.fotografia.filename=', req.fotografia.filename);
        console.log(error.message);
        console.error(error);
        return res.status(500).send({ message: 'Error uploading photo' });
      }
    });
    console.log('en createNewEstilo despues de sbuir foto estilo');
    */
  } catch (error) {
    res.status(500);
    res.send('en createNewEstilo', error.message);
  }
};

export const getEstiloById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input('id', req.params.id)
      .query(querys.getProducById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteEstiloById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input('id', req.params.id)
      .query(querys.deleteEstilo);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTotalEstilos = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(querys.getTotalEstilos);
  console.log(result);
  res.json(result.recordset[0]['']);
};

export const updateEstiloById = async (req, res) => {
  const {
    estilo,
    nombreestilo,
    linea,
    horma,
    molde,
    estado,
    fotografia,
    observaciones,
    state,
  } = req.body;

  // validating
  if (estilo == null || nombreestilo == null) {
    return res.status(400).json({ msg: 'Bad Request. Please fill all fields' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input('estilo', sql.VarChar, estilo)
      .input('nombreestilo', sql.Text, nombreestilo)
      .input('linea', sql.VarChar, linea)
      .input('horma', sql.VarChar, horma)
      .input('molde', sql.VarChar, molde)
      .input('estado', sql.VarChar, estado)
      .input('fotografia', sql.VarChar, fotografia)
      .input('observaciones', sql.Text, observaciones)
      .input('state', sql.VarChar, state)
      .input('id', req.params.id)
      .query(querys.updateEstiloById);
    res.json({
      estilo,
      nombreestilo,
      linea,
      horma,
      molde,
      estado,
      fotografia,
      observaciones,
      state,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
