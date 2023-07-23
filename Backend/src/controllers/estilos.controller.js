import { getConnection, querys, sql } from '../database';


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

  console.log('createNewEstilo request.body', req.body)
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

  // console.log('en createNewEstilo req.body fotografia > ', fotografia);

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
      .input('fotografia', sql.NVarChar, fotografia)
      .input('observaciones', sql.Text, observaciones)
      .input('state', sql.VarChar, state)
      .query(querys.addNewEstilo);

      console.log('res.fotografia', res.fotografia);
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
    // console.log('en createNewEstilo');
  } catch (error) {
    res.status(500);
    res.send(error.message);
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
