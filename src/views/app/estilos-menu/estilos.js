// BIBLIOGRAFIA tablas en react https://codesandbox.io/s/tlmcrud-5qi1t?file=/src/components/ReactBootstrapTableTLM.jsx
// BIBLIOGRAFIA fotos en tablas https://codesandbox.io/s/react-bootstrap-table-next-with-filter-and-image-show-on-row-i1bo0?file=/src/index.js:1524-1668
// BIBLIOGRAFIA images in react https://www.youtube.com/watch?v=U07wzhfu66M
// BIBLIOGRAFIA EXCEL https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Export%20CSV&selectedStory=Basic%20Export%20CSV&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
// BIBLIOGRAFIA https://www.thecodehubs.com/crud-operation-using-axios-in-react/

/* eslint-disable */
import React, { useState, useEffect } from 'react';
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
// import cellEditFactory from 'react-bootstrap-table2-editor';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-contexify/dist/ReactContexify.min.css';
import './estilos.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// de formik
// import { theme, ThemeProvider } from '@chakra-ui/core';
import {
  FormikContainer,
  FormikContainerEditar,
} from './components/FormikContainer';
import dataEstilosColBase from './dataEstilosCol';

const { ExportCSVButton } = CSVExport;
const defaultSorted = [
  {
    dataField: 'estilo',
    order: 'asc',
  },
];

// FUNCION ESTILOS PRINCIPAL
function Estilos({ match }) {
  const [dataEstilos, setdataEstilos] = useState([]);
  const [modalEditar, setmodalEditar] = useState(false);
  const [modalInsertar, setmodalInsertar] = useState(false);
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

  const handleCloseModalInsertar = () => setmodalInsertar(false); // setShowModal(false)
  const handleCloseModalEditar = () => setmodalEditar(false);
  const handleEstiloSeleccionado = (estilo) => {
    setEstiloSeleccionado(estilo);
  };
  // const handleShowModal = () => setShowModal(true);

  // eslint-disable-next-line
  const getEstilos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/estilos');
      // console.log('getEstilos response.data:', response.data);
      setdataEstilos(response.data);
    } catch (error) {
      console.log('error en getEstilos ', error);
    }
  };

  // eslint-disable-next-line
  const handleAfterDeleteRow = (rowId) => {
    // const newData = dataEstilos.filter((row) => row.id !== rowId);
    console.log('handleAfterDeleteRow');
    setdataEstilos(getEstilos());
  };

  const eliminarEstilo = (estiloSel) => {
    // console.log('en eliminarestilo dataEstilos=', dataEstilos);
    Swal.fire({
      title: '¿Estás seguro de eliminar este estilo?',
      text: 'Una vez eliminado, no se podrá recuperar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        // ELIMINA ESTILO DE LA BD CON AXIOS
        axios
          .delete('http://localhost:4000/api/estilos/' + estiloSel.id)
          .then((res) => {
            Swal.fire(
              'Eliminado!',
              'El estilo ha sido eliminado con éxito.',
              'success'
            );
            setdataEstilos(getEstilos());
          })
          .catch((err) => {
            Swal.fire(
              'Error!',
              // eslint-disable-next-line
              'Ocurrió un error al eliminar el estilo <br><br>' + err,
              'error'
            );
          });
      }
    });
  };

  // SELECCIONA ESTILO PARA EDITAR O ELIMINAR
  const seleccionarEstilo = (elemento, caso) => {
    setestiloSeleccionado(elemento);
    return caso === 'Editar' ? setmodalEditar(true) : eliminarEstilo(elemento);
  };

  /*
  const handleChange = (e) => {
    const { name, value } = e.target;
    setestiloSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const editar = () => {
    const dataNueva = dataEstilos;
    dataNueva.map((elemento) => {
      if (elemento.id === estiloSeleccionado.id) {
        elemento.estilo = estiloSeleccionado.estilo;
        elemento.nombreestilo = estiloSeleccionado.nombreestilo;
      }
    });
    setdataEstilos(dataNueva);
    setmodalEditar(false);
  };
  */

  // ABRE MODAL INSERTAR
  /*
  const abrirModalInsertar = () => {
    setestiloSeleccionado(null);
    setmodalInsertar(true);
  };
  */

  // hide checkbox for selection
  const selectRowProp = {
    mode: 'checkbox',
    hideSelectColumn: true,
  };

  // Prepara Columnas para acciones de editar/eliminar en la Tabla
  const dataEstilosCol = [...dataEstilosColBase];
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

  // Actualiza la pantalla en cada accion
  useEffect(() => {
    getEstilos();
  }, []);

  /* eslint-disable */
  return (
    <>
      <Row>
        <Colxx xxs="4">
          <Breadcrumb EstilosMenu="menu-estilos" match={match} />
          <Separator className="mb-2" />
        </Colxx>
      </Row>
      {/* PARA OTROS IDIOMAS
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
          data={Array.isArray(dataEstilos) ? dataEstilos : []}
          columns={dataEstilosCol}
          exportCSV={{ onlyExportFiltered: true, exportAll: false }}
        >
          {(props) => (
            <div>
              {/* AGREGAR */}
              <Button
                className="btn btn-success uppercase"
                onClick={() => {
                  setestiloSeleccionado(null);
                  setmodalInsertar(true);
                  getEstilos;
                }}
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
                data={dataEstilos}
                columns={dataEstilosCol}
                // para eliminar row sel
                selectRow={selectRowProp}
                // classes="customBootStrapClasses"
                // classes="react-bootstrap-table-next"
                onAfterDeleteRow={handleAfterDeleteRow}
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
                // editable={{ validator: jobStatusValidator }}
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
                /*
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
                })} */
              />
            </div>
          )}
        </ToolkitProvider>
      </div-horizontal>

      <Modal isOpen={modalEditar}></Modal>

      {/* INICIA MODAL PARA INSERTAR */}
      <Modal
        isOpen={modalInsertar}
        onClose={handleCloseModalInsertar}
        className="modal-content"
      >
        <ModalHeader>
          <label className="btn-block bold">AGREGAR ESTILO</label>
          <button
            type="button"
            className="btn btn-warning btn-xs uppercase"
            onClick={() => {
              setdataEstilos(getEstilos);
              setmodalInsertar(false);
            }}
          >
            Regresar
          </button>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <FormikContainer />
          </div>
        </ModalBody>
      </Modal>
      {/* FIN DE MODAL PARA INSERTAR */}

      {/* INICIA MODAL PARA EDITAR */}
      <Modal
        isOpen={modalEditar}
        onClose={handleCloseModalEditar}
        className="modal-content"
      >
        <ModalHeader>
          <label className="btn-block bold">EDITAR ESTILO</label>
          <button
            type="button"
            className="btn btn-warning btn-xs uppercase"
            onClick={() => {
              setdataEstilos(getEstilos);
              setmodalEditar(false);
            }}
          >
            Regresar
          </button>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <FormikContainerEditar estiloSeleccionado={estiloSeleccionado} />
          </div>
        </ModalBody>
      </Modal>
      {/* FIN DE MODAL PARA EDITAR */}
    </>
  );
}

/* eslint-disable */

export default Estilos;

/* eslint-enable */
// eslint-disable-next-line
