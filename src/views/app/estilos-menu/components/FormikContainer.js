/* eslint-disable */
import React from 'react';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
// import { useHistory } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  estilo: Yup.string().required('El estilo es obligatorio'),
  // fotografia: Yup.mixed().required('La fotografía es obligatoria'),
});

// INICIA FormikContainer PARA AGREGAR ESTILOS
export const FormikContainer = () => {
  const initialValues = {
    estilo: '',
    nombreestilo: '',
    linea: '',
    horma: '',
    molde: '',
    estado: 'Vigente',
    fotografia: null,
    observaciones: '',
    state: '',
  };

  /* SI FUNCIONA PERO SIN IMAGENES 
  const onSubmit = async (values, { resetForm }) => {
    try {
      // no tiene datos
      const formData = new FormData();
      formData.append('estilo', values.estilo);
      formData.append('fotografia', values.fotografia);
      
      console.log('onsubmit', values);
      // si funciona el form con este axios para
      await axios.post('http://localhost:4000/api/estilos', values);
      resetForm();
      Swal.fire(
        '¡Estilo creado!',
        'El estilo se ha creado correctamente',
        'success'
      );
    } catch (error) {
      Swal.fire('¡Error!', 'Ha ocurrido un error al crear el estilo', 'error');
    }
  };


  /* FUNCIONAL CON DATOS PERO SIN FOTO 
  const onSubmit = async (values, { resetForm }) => {
    try {
      // no tiene datos
      // const formData = new FormData();
      // formData.append('estilo', values.estilo);
      // formData.append('fotografia', values.fotografia);
      
      console.log('onsubmit', values);
      // si funciona el form con este axios para
      await axios.post('http://localhost:4000/api/estilos', values);

      //, {
      //  headers: {
      //    'Content-Type': 'multipart/form-data'
      //  }
      // }
      // );
      
      //    console.log('FormikContainer, onSubmit response.data ',response.data);
      resetForm();
      Swal.fire(
        '¡Estilo creado!',
        'El estilo y fotografia se ha creado correctamente',
        'success'
      );
    } catch (error) {
      Swal.fire('¡Error!', 'Ha ocurrido un error al crear el estilo con fotografia', 'error');
    }
  };
  */

  // EN PROCESO CON FOTO
  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('fotografia', values.fotografia); // 'file' es el archivo que deseas enviar
    formData.append('estilo', values.estilo);

    // SUBE LA FOTO DEL ESTILO PRIMERO Y SI NO HAR ERROR SUBE DATOS A SQL
    axios
      .post('http://localhost:4000/upload', formData)
      .then((response) => {
        // Manejar la respuesta del servidor si es necesario
        console.log(
          'EN formikcontainer onsubmit response.data del upload',
          response.data
        );
      })
      .catch((error) => {
        // Manejar el error si la solicitud falla
        console.error(error);
        Swal.fire(
          '¡Error!',
          'Ha ocurrido un error al subir la fotografía<br><br>Error: ' +
            error.message,
          'error'
        );
      });

    // SUBE EL ESTILO A SQL
    try {
      const formData = new FormData();
      formData.append('estilo', values.estilo);
      formData.append('nombreestilo', values.nombreestilo);
      formData.append('linea', values.linea);
      formData.append('horma', values.horma);
      formData.append('molde', values.molde);
      formData.append('estado', values.estado);
      formData.append('fotografia', values.fotografia.name);
      formData.append('observaciones', values.observaciones);
      formData.append('state', values.state);

      // Obtener el iterador de pares clave/valor
      const entries = formData.entries();

      // Recorrer el iterador y mostrar los valores
      for (const pair of entries) {
        console.log('entries',pair[0], pair[1]);
      }

      const valorFotografia = formData.get('fotografia');
      console.log('onsubmit valorFotografia  ', valorFotografia);
      console.log(
        'en formikcontainer antes de post onsubmit TODO BIEN values',
        values
      );

      axios
        .post('http://localhost:4000/api/estilos', formData)
        .then((response) => {
          // Manejar la respuesta del servidor si es necesario
          console.log(
            'EN formikcontainer onsubmit response.data',
            response.data
          );
          console.log(
            'EN formikcontainer onsubmit response.file',
            response.file
          );
        });
      resetForm();
      Swal.fire(
        '¡Estilo creado!',
        'El estilo y fotografia se ha creado correctamente',
        'success'
      );
    } catch (error) {
      Swal.fire(
        '¡Error!',
        'Ha ocurrido un error al crear el estilo </b><br><br> Error > ' +
          error.message,
        'error'
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form
          className="bg-white shadow-md px-8 pt-0 pb-6 mb-4"
          action="/upload"
          enctype="multipart/form-data"
          method="POST"
        >
          <link
            href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
            rel="stylesheet"
          />

          {/* ESTILO */}
          <div className="mb-4">
            <label
              className="block text-blue-700 text-sm font-bold mb-1"
              htmlFor="estilo"
            >
              Estilo
            </label>
            <Field
              type="text"
              id="estilo"
              name="estilo"
              className="col-6 col-sm-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="estilo" />
          </div>
          {touched.estilo && errors.estilo ? (
            <div className="mx-2 my-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-1">
              <p className="font-bold">Error</p>
              <p>{errors.estilo}</p>
            </div>
          ) : null}

          {/* NOMBREESTILO */}
          <div className="mb-4">
            <label
              className="block text-blue-700 text-sm font-bold mb-2"
              htmlFor="nombreestilo"
            >
              Nombre Estilo
            </label>
            <Field
              type="text"
              id="nombreestilo"
              name="nombreestilo"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="nombreestilo" />
          </div>

          {/* HORMA */}
          <div className="mb-4">
            <label
              className="block text-blue-700 text-sm font-bold mb-1"
              htmlFor="horma"
            >
              Horma
            </label>
            <Field
              type="text"
              id="horma"
              name="horma"
              className="col-6 col-sm-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="horma" />
          </div>
          {touched.horma && errors.horma ? (
            <div className="mx-2 my-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-1">
              <p className="font-bold">Error</p>
              <p>{errors.horma}</p>
            </div>
          ) : null}

          <div className="form-row">
            {/* LINEA */}
            <div className="mb-4">
              <label
                className="block text-blue-700 text-sm font-bold mb-1"
                htmlFor="linea"
              >
                Linea
              </label>
              <Field
                type="text"
                id="linea"
                name="linea"
                className="col-6 col-sm-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="linea" />
            </div>
            {touched.linea && errors.linea ? (
              <div className="mx-2 my-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-1">
                <p className="font-bold">Error</p>
                <p>{errors.linea}</p>
              </div>
            ) : null}

            {/* MOLDE */}
            <div className="mb-4">
              <label
                className="block text-blue-700 text-sm font-bold mb-1"
                htmlFor="molde"
              >
                Molde
              </label>
              <Field
                type="text"
                id="molde"
                name="molde"
                className="col-6 col-sm-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="molde" />
            </div>
            {touched.molde && errors.molde ? (
              <div className="mx-2 my-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-1">
                <p className="font-bold">Error</p>
                <p>{errors.molde}</p>
              </div>
            ) : null}

            {/* Estado  */}
            <div className="form-group">
              <label>Estado Actual</label>
              <br />
              <div className="form-check form-check-inline">
                <Field
                  className="form-check-input"
                  type="radio"
                  name="estado"
                  value="Vigente"
                  id="inlineRadio1"
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Vigente
                </label>
              </div>
              <div className="form-check form-check-inline">
                <Field
                  className="form-check-input"
                  type="radio"
                  name="estado"
                  value="Obsoleto"
                  id="inlineRadio2"
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Obsoleto
                </label>
              </div>
            </div>
          </div>

          {/* observaciones */}
          <div className="mb-4">
            <label
              className="block text-blue-700 text-sm font-bold mb-2"
              htmlFor="observaciones"
            >
              Observaciones
            </label>
            <Field
              type="text"
              id="observaciones"
              name="observaciones"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="observaciones" />
          </div>

          {/* FOTOGRAFIA */}
          <div>
            <label htmlFor="fotografia">Fotografía 1:</label>
            <img src="fotografia" alt="fotografía"></img>
            <input
              type="file"
              id="fotografia"
              name="fotografia"
              accept="image/*"
              // className="form-control-file"
              className="file-field input-field"
              // value={formik.values.fotografia}
              onChange={(event) => {
                // setFieldValue('fotografia', event.currentTarget.files[0]);
                setFieldValue(
                  'fotografia',
                  event.currentTarget.files[0],
                  () => {
                    console.log(
                      '1en formikcontainer onChange fotografia=',
                      fotografia
                    );
                  }
                );
                /*
                console.log(
                  'event.currentTarget.files[0]=',
                  event.currentTarget.files[0]
                );
                console.log(
                  '2en formikcontainer onChange fotografia=',
                  fotografia
                );
                */
              }}
            />
            <ErrorMessage name="fotografia" />
          </div>

          {/* FINALIZA FORM */}
          <div className="btn-group">
            <input
              type="submit"
              className="bg-green-500 btn-xs rounded w-100 mt-2 mb-5 ml-5 mr-2 p-2 text-white uppercase hover:cursor-pointer hover:bg-green-700"
              value="Agregar Estilo"
            />
            <button
              type="reset"
              className="bg-blue-400 btn-xs rounded w-100 mt-2 mb-5 ml-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-blue-700"
            >
              Limpiar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
// FINALIZA FORMIKCONTAINER PARA AGREGAR ESTILOS

// INICIA FormikContainer PARA EDITAR ESTILOS
export const FormikContainerEditar = ({ estiloSeleccionado }) => {
  const [showForm, setShowForm] = useState(true);
  const history = useHistory();

  console.log(
    'en formikcontainereditar estiloSeleccionado=',
    estiloSeleccionado
  );

  /*
    const initialValues = {
    estilo: estiloSeleccionado.estilo,
    nombreestilo: estiloSeleccionado.nombreestilo,
    linea: 'hola',
    horma: '',
    molde: '',
    estado: 'Vigente',
    fotografia: null,
    observaciones: '',
    state: '',
  };
  */

  const onSubmit = async (values, { resetForm }) => {
    try {
      // Lógica para guardar los cambios en el formulario utilizando Axios
      // const response = await axios.put('/api/estilos/' + values.id, values);

      console.log(
        'http://localhost:4000/api/estilos/' + values.id,
        'values=',
        values
      );
      axios
        .put('http://localhost:4000/api/estilos/' + values.id, values)
        .then((response) => {
          console.log('response.data=', response.data); // Datos de respuesta
          // Lógica después de la respuesta exitosa
          // Mostrar notificación de éxito con SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Cambios guardados',
            text: 'Los cambios se han guardado correctamente.',
          });
          setShowForm(false);
          resetForm();
          // Redirigir o cerrar el formulario después de guardar los cambios
          // Puedes utilizar useHistory() de react-router-dom o cualquier otra lógica de redirección
          // Redireccionar a la página de destino
          // history.push('localhost:3000/app/estilos-menu/estilos');
          // history.push('/app/estilos-menu/estilos');
          history.push(history);
        })
        .catch((error) => {
          console.error(error); // Error de solicitud
          // Lógica para manejar el error
          // Mostrar notificación de error con SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar los cambios',
            text: 'Ha ocurrido un error al guardar los cambios. Por favor, inténtalo de nuevo.',
          });
        });

      // Redirigir o cerrar el formulario después de guardar los cambios
      // Puedes utilizar useHistory() de react-router-dom o cualquier otra lógica de redirección
    } catch (error) {
      // Mostrar notificación de error con SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar los cambios',
        text: 'Ha ocurrido un error al guardar los cambios. Por favor, inténtalo de nuevo.',
      });
    }
  };

  return (
    <>
      {showForm && (
        // Renderizar el formulario aquí
        <Formik
          initialValues={estiloSeleccionado}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form
              className="bg-white shadow-md px-8 pt-0 pb-6 mb-4"
              action="/stats"
              encType="multipart/form-data"
              method="post"
            >
              <link
                href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
                rel="stylesheet"
              />

              {/* ESTILO */}
              <div className="mb-4">
                <label
                  className="block text-blue-700 text-sm font-bold mb-1"
                  htmlFor="estilo"
                >
                  Estilo
                </label>
                <Field
                  type="text"
                  id="estilo"
                  name="estilo"
                  className="col-6 col-sm-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="estilo" />
              </div>
              {touched.estilo && errors.estilo ? (
                <div className="mx-2 my-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-1">
                  <p className="font-bold">Error</p>
                  <p>{errors.estilo}</p>
                </div>
              ) : null}

              {/* NOMBREESTILO */}
              <div className="mb-4">
                <label
                  className="block text-blue-700 text-sm font-bold mb-2"
                  htmlFor="nombreestilo"
                >
                  Nombre Estilo
                </label>
                <Field
                  type="text"
                  id="nombreestilo"
                  name="nombreestilo"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="nombreestilo" />
              </div>

              {/* HORMA */}
              <div className="mb-4">
                <label
                  className="block text-blue-700 text-sm font-bold mb-1"
                  htmlFor="horma"
                >
                  Horma
                </label>
                <Field
                  type="text"
                  id="horma"
                  name="horma"
                  className="col-6 col-sm-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="horma" />
              </div>
              {touched.horma && errors.horma ? (
                <div className="mx-2 my-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-1">
                  <p className="font-bold">Error</p>
                  <p>{errors.horma}</p>
                </div>
              ) : null}

              <div className="form-row">
                {/* LINEA */}
                <div className="mb-4">
                  <label
                    className="block text-blue-700 text-sm font-bold mb-1"
                    htmlFor="linea"
                  >
                    Linea
                  </label>
                  <Field
                    type="text"
                    id="linea"
                    name="linea"
                    className="col-6 col-sm-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="linea" />
                </div>
                {touched.linea && errors.linea ? (
                  <div className="mx-2 my-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-1">
                    <p className="font-bold">Error</p>
                    <p>{errors.linea}</p>
                  </div>
                ) : null}

                {/* MOLDE */}
                <div className="mb-4">
                  <label
                    className="block text-blue-700 text-sm font-bold mb-1"
                    htmlFor="molde"
                  >
                    Molde
                  </label>
                  <Field
                    type="text"
                    id="molde"
                    name="molde"
                    className="col-6 col-sm-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="molde" />
                </div>
                {touched.molde && errors.molde ? (
                  <div className="mx-2 my-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-1">
                    <p className="font-bold">Error</p>
                    <p>{errors.molde}</p>
                  </div>
                ) : null}

                {/* Estado  */}
                <div className="form-group">
                  <label>Estado Actual</label>
                  <br />
                  <div className="form-check form-check-inline">
                    <Field
                      className="form-check-input"
                      type="radio"
                      name="estado"
                      value="Vigente"
                      id="inlineRadio1"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      Vigente
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <Field
                      className="form-check-input"
                      type="radio"
                      name="estado"
                      value="Obsoleto"
                      id="inlineRadio2"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      Obsoleto
                    </label>
                  </div>
                </div>
              </div>

              {/* observaciones */}
              <div className="mb-4">
                <label
                  className="block text-blue-700 text-sm font-bold mb-2"
                  htmlFor="observaciones"
                >
                  Observaciones
                </label>
                <Field
                  type="text"
                  id="observaciones"
                  name="observaciones"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="observaciones" />
              </div>

              {/* FOTOGRAFIA */}
              <div>
                <label htmlFor="fotografia">Fotografía 1:</label>
                <img src="fotografia" alt="fotografía"></img>
                <input
                  type="file"
                  id="fotografia"
                  name="fotografia"
                  accept="image/*"
                  className="form-control-file"
                  onChange={(event) => {
                    setFieldValue(
                      'fotografia',
                      event.currentTarget.files[0].name
                    );
                    console.log(
                      'fotografia=',
                      event.currentTarget.files[0].name
                    );
                  }}
                />
                <ErrorMessage name="fotografia" />
              </div>

              {/* FINALIZA FORM */}
              <div className="btn-group">
                <input
                  type="submit"
                  className="bg-green-500 btn-xs rounded w-100 mt-2 mb-5 ml-5 mr-2 p-2 text-white uppercase hover:cursor-pointer hover:bg-green-700"
                  value="Modificar Estilo"
                />
                {/*
                <button
                  type="reset"
                  className="bg-blue-400 btn-xs rounded w-100 mt-2 mb-5 ml-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-blue-700"
                >
                  Limpiar
                </button>
                */}
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};
// FINALIZA FORMIKCONTAINER PARA EDITAR ESTILOS

// export default FormikContainer;
