// BIBLIOGRAFIA https://www.thecodehubs.com/crud-operation-using-axios-in-react/
// BIBLIOGRAFIA UPLOADS https://www.geeksforgeeks.org/file-upload-in-electronjs/
// BIBLIOGRAFIA FOTOS https://codesandbox.io/s/lkkjpr5r7?file=/index.js
/* eslint-disable */

import React from 'react';
// import { render } from 'react-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import axios from 'axios';
import * as tus from "tus-js-client";

function FormikContainer() {
  class Thumb extends React.Component {
    state = {
      loading: false,
      thumb: undefined,
    };

    componentWillReceiveProps(nextProps) {
      if (!nextProps.fotografia) {
        return;
      }

      if (
        typeof nextProps.fotografia === undefined ||
        nextProps.fotografia === null ||
        nextProps.fotografia.size === 0
      ) {
        return;
      }

      /*
      // const Path = require('path') ;
      const Fs = require('@supercharge/filesystem');
      const exists = Fs.exists('file.text');
      console.log('resultado=', exists);
      // const path = Path.join(__dirname, "existing-file.txt");
      */
      /*
      if (Fs.existsSync(path)) {
        console.log('EXISTE');
      } else {
        console.log('NO EXISTE');
      };
      */

      /*
      // VERIFICA QUE LA FOTO EXISTA
      const fs = require('fs');
      const path = `./src/views/app/estilos-menu/img/${nextProps.fotografia.name}`;
      if (fs.existsSync(path)) {
        // file exists
        console.log('EXISTE');
      } else {
        // file does not exist
        console.log('NO EXISTE');
        return;
      }
      */

      this.setState({ loading: true }, () => {
        let reader = new FileReader();
        reader.onloadend = () => {
          this.setState({ loading: false, thumb: reader.result });
        };

        if (
          // VERIFICA QUE LA FOTO NO ESTE VACIA Y QUE EXISTA
          typeof nextProps.fotografia.name === undefined ||
          nextProps.fotografia.name === null ||
          nextProps.fotografia.size === 0 ||
          nextProps.fotografia.size === undefined ||
          nextProps.fotografia.size === null ||
          nextProps.fotografia.size === '' ||
          nextProps.fotografia.size === '0' ||
          nextProps.fotografia.size === '0 bytes'
        ) {
          // NO HACE NADA
        } else {
          /* MUESTRA FOTO, TAMAÑO Y TIPO
          console.log(JSON.stringify(
            {
              nombrearchivo: nextProps.fotografia.name,
              type: nextProps.fotografia.type,
              size: `${nextProps.fotografia.size} bytes`,
            },
            null,
            2
          ));
          */
          
          try {
            reader.readAsDataURL(nextProps.fotografia);
          } catch (error) {
            console.log(error);
          }
        }
      });
    }

    render() {
      const { fotografia } = this.props;
      const { loading, thumb } = this.state;

      if (!fotografia) {
        return null;
      }

      if (loading) {
        return <p>loading...</p>;
      }

      return (
        <img
          src={thumb}
          alt={fotografia.name}
          className="img-thumbnail mt-2"
          height={200}
          width={200}
        />
      );
    }
  }

  // INICIALIZACION DE VALORES
  const initialValues = {
    id: '',
    estilo: '',
    nombreestilo: '',
    linea: '',
    horma: '',
    molde: '',
    fotografia: 'upload.png',
    /*
    fotografia: {
      nombrearchivo: '../upload.png',
      type: 'png',
      size: 0,
    },
      */
    observaciones: '',
    estado: 'Vigente',
  };

  // VALIDACIONES
  const validationSchema = Yup.object({
    estilo: Yup.string()
      .required('El código del estilo es requerido')
      .test('len', 'Debe ser alfanumérico máximo 10 caracteres', (val) => {
        if (val == undefined) {
          return true;
        }
        return val.length == 0 || (val.length >= 1 && val.length <= 10);
      }),
    nombreestilo: Yup.string()
      .nullable()
      .notRequired()
      .test('len', 'Debe ser alfanumérico máximo 50 caracteres', (val) => {
        if (val == undefined) {
          return true;
        }
        return val.length == 0 || (val.length >= 0 && val.length <= 50);
      }),
    linea: Yup.string()
      .required('La línea del estilo es requerida')
      .test('len', 'Debe ser alfanumérico máximo 10 caracteres', (val) => {
        if (val == undefined) {
          return true;
        }
        return val.length == 0 || (val.length >= 0 && val.length <= 10);
      }),
    horma: Yup.string()
      .required('La horma del estilo es requerida')
      .test('len', 'Debe ser alfanumérico máximo 10 caracteres', (val) => {
        if (val == undefined) {
          return true;
        }
        return val.length == 0 || (val.length >= 0 && val.length <= 10);
      }),
    molde: Yup.string()
      .nullable()
      .notRequired()
      .test('len', 'Debe ser alfanumérico máximo 10 caracteres', (val) => {
        if (val == undefined) {
          return true;
        }
        return val.length == 0 || (val.length >= 0 && val.length <= 10);
      }),
    fotografia: Yup.mixed().notRequired(),
  });

  // SUBMIT
  const onSubmit = (values) => {
    console.log('Form data', values);
    console.log('Saved data', JSON.parse(JSON.stringify(values)));

    axios.post('http://localhost:4000/api/estilos', values).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    /*
    {
      alert(
        JSON.stringify(
          {
            nombrearchivo: values.fotografia.name,
            type: values.fotografia.type,
            size: `${values.fotografia.size} bytes`,
          },
          null,
          2
        )
      );
    }
    */

    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: ''.concat('El estilo ', values.estilo, ' ha sido creado'),
      showConfirmButton: false,
      timer: 1500,
    });

    // return { values };
  };

  /*
  const salirForm = () => {
    alert('en salirForm');
    return {};
  };
  */

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      render={({
        values,
        handleSubmit,
        handleBlur,
        handleChange,
        setFieldValue,
        touched,
        errors,
      }) => {
        return (
          <>
            <Form className="bg-white shadow-md px-8 pt-0 pb-6 mb-4">
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
                <input
                  className="col-6 col-sm-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="estilo"
                  type="text"
                  placeholder="Codigo del estilo"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.estilo}
                />
              </div>
              {touched.estilo && errors.estilo ? (
                <div className="mx-2 my-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-1">
                  <p className="font-bold">Error</p>
                  <p>{errors.estilo}</p>
                </div>
              ) : null}
              {/* NOMBRE DEL ESTILO */}
              <div className="mb-4">
                <label
                  className="block text-blue-700 text-sm font-bold mb-2"
                  htmlFor="nombreestilo"
                >
                  Nombre Estilo
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombreestilo"
                  type="text"
                  placeholder="Nombre o descripcion del estilo"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nombreestilo}
                />
              </div>
              {touched.nombreestilo && errors.nombreestilo ? (
                <div className="mx-2 my-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-1">
                  <p className="font-bold">Error</p>
                  <p>{errors.nombreestilo}</p>
                </div>
              ) : null}
              <div className="form-row">
                {/* linea */}
                <div className="mb-4">
                  <label
                    className="block text-blue-700 text-sm font-bold mb-2"
                    htmlFor="linea"
                  >
                    Linea
                  </label>
                  <input
                    className="col-6 col-sm-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="linea"
                    type="text"
                    placeholder="Linea del estilo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.linea}
                  />
                </div>
                {touched.linea && errors.linea ? (
                  <div className="mx-2 my-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-1">
                    <p className="font-bold">Error</p>
                    <p>{errors.linea}</p>
                  </div>
                ) : null}
                {/* HORMA */}
                <div className="mb-4">
                  <label
                    className="block text-blue-700 text-sm font-bold mb-2"
                    htmlFor="horma"
                  >
                    Horma
                  </label>
                  <input
                    className="col-6 col-sm-9 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="horma"
                    type="text"
                    placeholder="Horma del estilo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.horma}
                  />
                </div>
                {touched.horma && errors.horma ? (
                  <div className="mx-2 my-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-1">
                    <p className="font-bold">Error</p>
                    <p>{errors.horma}</p>
                  </div>
                ) : null}
                {/* molde */}
                <div className="mb-4">
                  <label
                    className="block text-blue-700 text-sm font-bold mb-2"
                    htmlFor="molde"
                  >
                    Molde
                  </label>
                  <input
                    className="col-6 col-sm-9 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="molde"
                    type="text"
                    placeholder="Molde del estilo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.molde}
                  />
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
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="observaciones"
                  type="text"
                  placeholder="Observaciones del estilo"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.observaciones}
                />
              </div>
              {touched.observaciones && errors.observaciones ? (
                <div className="mx-2 my-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-1">
                  <p className="font-bold">Error</p>
                  <p>{errors.observaciones}</p>
                </div>
              ) : null}
              {/* LEE FOTOGRAFIA*/}
              <div className="form-group">
                <label forhtml="file">Cargar Foto</label>
                <input
                  id="fotografia"
                  name="fotografia"
                  type="file"
                  onChange={(event) => {
                    if (event.currentTarget.files[0]) {
                      // GUARDA EL NOMBRE DE LA FOTO
                      console.log(event.currentTarget.files[0]);
                      setFieldValue(
                        'fotografia',
                        event.currentTarget.files[0].name
                      );

                      //UPLOAD DE LA FOTO HACIA src\views\app\estilos-menu\img
                      // Create a new tus upload
                      // REFERENCIA https://github.com/tus/tus.io/blob/master/assets/javascripts/upload-demo.js
                      // const tus = require('tus-js-client')
                      var upload = new tus.Upload(fotografia, {
                        endpoint: 'http://localhost:4000/img/',
                        retryDelays: [0, 3000, 5000, 10000, 20000],
                        metadata: {
                          filename: fotografia.name,
                          filetype: fotografia.type,
                        },
                        onError: function (error) {
                          console.log('Failed because: ' + error);
                        },
                        onProgress: function (bytesUploaded, bytesTotal) {
                          var percentage = (
                            (bytesUploaded / bytesTotal) *
                            100
                          ).toFixed(2);
                          console.log(
                            bytesUploaded,
                            bytesTotal,
                            percentage + '%'
                          );
                        },
                        onSuccess: function () {
                          console.log(
                            'Download %s from %s',
                            upload.file.name,
                            upload.url
                          );
                        },
                      });

                      // Check if there are any previous uploads to continue.
                      upload
                        .findPreviousUploads()
                        .then(function (previousUploads) {
                          // Found previous uploads so we select the first one.
                          if (previousUploads.length) {
                            upload.resumeFromPreviousUpload(previousUploads[0]);
                          }

                          // Start the upload
                          upload.start();
                        });
                      //FIN UPLOAD DE LA FOTO
                    }
                  }}
                  className="form-control"
                />
                <Thumb file={values.fotografia} />
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

                {/*
              <button 
                type="button"
                className="bg-red-800 w-100 mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-red-500"
                onClick={() => salirForm()}
              >
                Cancelar
              </button>
            */}
              </div>
            </Form>
          </>
        );
      }}
    >
      {/*}
      {(formik) => (
        <>
          <Form className="bg-white shadow-md px-8 pt-0 pb-6 mb-4">
            {/* file fotografia 
            <div className="form-group">
              <label
                htmlFor="file"
                className="block text-blue-700 text-sm font-bold mb-2"
              >
                Fotografía del Estilo
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="file"
                name="file"
                type="file"
                placeholder="Seleccione fotografia jpg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.file}
              />
              value={formik.values.file}
              onChange=
              {(event) => {
                setFieldValue('file', event.currentTarget.files[0]);
              }}
              <Thumb file={formik.values.file} />
            </div>
            {formik.touched.file && formik.errors.file ? (
              <div className="mx-2 my-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-1">
                <p className="font-bold">Error</p>
                <p>{formik.errors.file}</p>
              </div>
            ) : null}
                        
          </Form>
        </>
      )}
      */}
    </Formik>
  );
}

export default FormikContainer;
/* eslint-enable */
