// BIBLIOGRAFIA tablas en react https://codesandbox.io/s/tlmcrud-5qi1t?file=/src/components/ReactBootstrapTableTLM.jsx
// BIBLIOGRAFIA fotos en tablas https://codesandbox.io/s/react-bootstrap-table-next-with-filter-and-image-show-on-row-i1bo0?file=/src/index.js:1524-1668
// BIBLIOGRAFIA images in react https://www.youtube.com/watch?v=U07wzhfu66M
// BIBLIOGRAFIA EXCEL https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Export%20CSV&selectedStory=Basic%20Export%20CSV&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
// BIBLIOGRAFIA https://www.thecodehubs.com/crud-operation-using-axios-in-react/

// eslint-disable-next-line
import React, { useState, useEffect } from 'react';

// eslint-disable-next-line
import axios from 'axios';

import {
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
// import DeleteIcon from '@material-ui/icons/Delete';
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-contexify/dist/ReactContexify.min.css';
import './estilos.css';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// de formik
// import { theme, ThemeProvider } from '@chakra-ui/core';
import FormikContainer from './components/FormikContainer';

// import dataEstilos from './dataEstilos';
import dataEstilosCol from './dataEstilosCol';
// import { async } from 'rxjs';

const { ExportCSVButton } = CSVExport;
// const key = dataEstilos.map((el) => el.id);
let ejecutarSoloUnaVez = false;

function jobStatusValidator(value) {
  const nan = Number.isNaN(parseInt(value, 10));
  if (nan) {
    return 'Job Status must be a integer!';
  }
  return true;
}

const defaultSorted = [
  {
    dataField: 'estilo',
    order: 'asc',
  },
];

function Estilos({ match }) {
  const [dataTable, setdataTable] = useState([]); // dataEstilos
  const [modalEditar, setModalEditar] = useState(false);
  // const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  // To delete rows you be able to select rows
  const [state, setState] = useState({
    row: null,
    state: null,
    oldValue: null,
  });
  const [estiloSeleccionado, setestiloSeleccionado] = useState({
    id: 0,
    estilo: '',
    nombreestilo: '',
    linea: '',
    horma: '',
    molde: '',
    estado: '',
    fotografia: '',
    observaciones: '',
    state: '',
    actions: '',
  });

  // hace la conexion con el backend para consultar estilos
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/estilos')
      .then((response) => {
        console.log('exito', response.data);
        setdataTable(response.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  // ELIMINA ESTILO
  const eliminar = (estiloSel) => {
    console.log(estiloSel.id);
    Swal.fire({
      title: ''.concat(
        'Eliminar estilo ',
        estiloSel.estilo,
        '.\n',
        'Está usted seguro?'
      ),
      text: 'No podrá revertir el proceso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        /* con arreglos si elimina
        setdataTable(
          dataTable.filter((elemento) => {
            return elemento.id !== estiloSel.id;
          })
        );
        // setModalEliminar(false);
        */

        // ELIMINA ESTILO DE LA BD CON AXIOS
        axios
          // eslint-disable-next-line
          .delete('http://localhost:4000/api/estilos/' + estiloSel.id)
          .then((response) => {
            console.log('exito al borrar', response.data);
            Swal.fire(
              'Eliminado!',
              ''.concat('El estilo ', estiloSel.estilo, ' ha sido eliminado.'),
              'success'
            );
            setdataTable(
              dataTable.filter((elemento) => {
                return elemento.id !== estiloSel.id;
              })
            );
          })
          .catch((error) => {
            console.log('error', error);
          });
      }
    });
  };

  // SELECCIONA ESTILO PARA EDITAR O ELIMINAR
  const seleccionarEstilo = (elemento, caso) => {
    setestiloSeleccionado(elemento);
    return caso === 'Editar' ? setModalEditar(true) : eliminar(elemento);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setestiloSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /* eslint-disable */
  const editar = () => {
    const dataNueva = dataTable;
    dataNueva.map((elemento) => {
      if (elemento.id === estiloSeleccionado.id) {
        elemento.estilo = estiloSeleccionado.estilo;
        elemento.nombreestilo = estiloSeleccionado.nombreestilo;
      }
    });
    setdataTable(dataNueva);
    setModalEditar(false);
  };
  /* eslint-enable */

  // ABRE MODAL INSERTAR
  const abrirModalInsertar = () => {
    setestiloSeleccionado(null);
    setModalInsertar(true);
  };

  /*
  const insertar = () => {
    const valorInsertar = estiloSeleccionado;
    valorInsertar.id = dataTable[dataTable.length - 1].id + 1;
    const dataNueva = dataTable;
    dataNueva.push(valorInsertar);
    // console.log(dataNueva);
    setdataTable(dataNueva);
    setModalInsertar(false);
  };
  */

  // hide checkbox for selection
  const selectRowProp = {
    mode: 'checkbox',
    hideSelectColumn: true,
  };

  // Agrega botones editar, eleiminar a dataEstilosCol
  if (ejecutarSoloUnaVez === false) {
    ejecutarSoloUnaVez = true;

    dataEstilosCol.push({
      text: '',
      dataField: 'actions',
      editable: false,
      isDummyField: true,
      formatExtraData: state,
      formatter: (cellContent, row) => {
        return (
          <div className="btn-group">
            <button
              type="button"
              className="flex btn btn-primary btn-xs"
              onClick={() => seleccionarEstilo(row, 'Editar')}
            >
              Editar
            </button>
            <button
              type="button"
              className="flex btn btn-danger btn-xs"
              onClick={() => seleccionarEstilo(row, 'Eliminar')}
            >
              Eliminar
            </button>
          </div>
        );
      },
    });
  }

  /*
  // a function to save the old value
  const handleStartEdit = (row) => {
    setState((prev) => {
      let newVal = { ...prev, oldValue: { ...row } };
      return newVal;
    });
  };
  */
  /* eslint-disable */
  return (
    <>
      <Row>
        <Colxx xxs="4">
          <Breadcrumb EstilosMenu="menu-estilos" match={match} />
          <Separator className="mb-2" />
        </Colxx>
      </Row>
      {/*
      <Row>
        <Colxx xxs="12" className="mb-4">
          <p>
          <IntlMessages id="menu-estilos" />
            ESTILOS 2
          </p>
        </Colxx>
      </Row>
      */}
      <h2>Estilos</h2>
      <div-horizontal>
        <ToolkitProvider
          keyField="id"
          data={dataTable}
          columns={dataEstilosCol}
          exportCSV={{ onlyExportFiltered: true, exportAll: false }}
        >
          {(props) => (
            <div>
              {/* AGREGAR */}
              <Button
                className="btn btn-success uppercase"
                onClick={() => abrirModalInsertar()}
              >
                AGREGAR
              </Button>
              {/* EXCELL */}
              <ExportCSVButton
                className="btn btn-success uppercase"
                {...props.csvProps}
              >
                EXPORTAR
              </ExportCSVButton>
              {/* EXCELL */}
              <Button className="btn btn-success uppercase">PDF</Button>
              <BootstrapTable
                {...props.baseProps}
                id="table-employee-compensation"
                data={dataTable}
                columns={dataEstilosCol}
                // para eliminar row sel
                selectRow={selectRowProp}
                // classes="customBootStrapClasses"
                // classes="react-bootstrap-table-next"
                bordered={true}
                bootstrap4
                hover
                wrapperClasses="table-responsive"
                // rowClasses="text-nowrap"
                // rowClasses="custom-row-classes"
                // keyField="driver"
                keyField="id"
                striped
                defaultSorted={defaultSorted}
                filter={filterFactory()}
                condensed
                editable={{ validator: jobStatusValidator }}
                pagination={paginationFactory({
                  page: 1,
                  sizePerPage: 7,
                  lastPageText: '>>',
                  firstPageText: '<<',
                  nextPageText: '>',
                  prePageText: '<',
                  totalText: 'Mostrando ',
                  showTotal: true,
                  alwaysShowAllBtns: true,
                })}
                cellEdit={cellEditFactory({
                  mode: 'dbclick',
                  blurToSave: true,
                  onStartEdit: (row, column, rowIndex, columnIndex) => {
                    console.log('start to edit!!!');
                    if (row.state !== 'edited') {
                      console.log(row.state);
                      handleStartEdit(row);
                    }
                  },
                  beforeSaveCell: (oldValue, newValue, row, column) => {
                    console.log('Before Saving Cell!!');
                  },
                  afterSaveCell: (oldValue, newValue, row, column) => {
                    console.log('After Saving Cell!!');
                    if (oldValue !== newValue) {
                      row.state = 'edited';
                      setState({ ...state, row: row, state: row.state });
                    }
                  },
                  nonEditableRows: () =>
                    state.row ? key.filter((el) => el !== state.row.id) : [],
                })}
              />
            </div>
          )}
        </ToolkitProvider>
      </div-horizontal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar País</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={estiloSeleccionado && estiloSeleccionado.id}
            />
            <br />
            <label>Estilo</label>
            <input
              className="form-control"
              type="text"
              name="estilo"
              value={estiloSeleccionado && estiloSeleccionado.id}
              onChange={handleChange}
            />
            <br />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalInsertar} className="modal-content">
        <ModalHeader>
          <label className="">VENTANA PARA AGREGAR ESTILO</label>
          <button
            type="button"
            className="btn btn-warning btn-xs uppercase"
            onClick={() => setModalInsertar(false)}
          >
            Regresar
          </button>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            {/* <ThemeProvider theme={theme}> */}
            {/* <div className="App"> */}
            <FormikContainer />

            {/* </div> */}
            {/* </ThemeProvider> */}

            {/* <label>ID</label> 
            <input
              className="form-control"
              readOnly
              type="text"
              value={dataTable[dataTable.length - 1].id + 1}
              name="id"
            />
            */}
            {/*
            <br />
            <label>Estilo</label>
            <input
              className="form-control"
              type="text"
              name="estilo"
              value={estiloSeleccionado ? estiloSeleccionado.name : ''}
              onChange={handleChange}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombreestilo"
              value={estiloSeleccionado ? estiloSeleccionado.vehicle : ''}
              onChange={handleChange}
            />
        <br />
        */}
          </div>
        </ModalBody>
        {/*
        <ModalFooter>
          
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => insertar()}
          >
            Insertar
          </button>
      
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setModalInsertar(false)}
          >
            Regresar
          </button>
        </ModalFooter>
        */}
      </Modal>
    </>
  );
}

/* eslint-disable */

export default Estilos;

/* eslint-disable */
// eslint-disable-next-line
