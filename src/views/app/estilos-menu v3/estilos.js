// ANALIZAR EJEMPLO https://codesandbox.io/s/tlmcrud-5qi1t?file=/src/components/ReactBootstrapTableTLM.jsx

import React, { useState } from 'react';
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
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-contexify/dist/ReactContexify.min.css';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import dataEstilos from './dataEstilos';
import dataEstilosCol from './dataEstilosCol';

// eslint-disable-next-line
// import image from './foto1.jpg';

const key = dataEstilos.map((el) => el.id);
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
  const [dataTable, setdataTable] = useState(dataEstilos);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
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
    nombre: '',
    linea: '',
    Horma: '',
    Molde: '',
    Estado: '',
    Fotografia: '',
    state: '',
    actions: '',
    Observaciones: '',
  });

  const seleccionarEstilo = (elemento, caso) => {
    setestiloSeleccionado(elemento);
    return caso === 'Editar' ? setModalEditar(true) : setModalEliminar(true);
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
        elemento.nombre = estiloSeleccionado.nombre;
      }
    });
    setdataTable(dataNueva);
    setModalEditar(false);
  };

  const eliminar = () => {
    // estiloSeleccionado.id=1;
    setdataTable(
      dataTable.filter((elemento) => {
        return elemento.id !== estiloSeleccionado.id;
      })
    );
    setModalEliminar(false);
  };
  /* eslint-enable */

  // eslint-disable-next-line
  const abrirModalInsertar = () => {
    setestiloSeleccionado(null);
    setModalInsertar(true);
  };

  const insertar = () => {
    const valorInsertar = estiloSeleccionado;
    valorInsertar.id = dataTable[dataTable.length - 1].id + 1;
    const dataNueva = dataTable;
    dataNueva.push(valorInsertar);
    // console.log(dataNueva);
    setdataTable(dataNueva);
    setModalInsertar(false);
  };

  // hide checkbox for selection
  const selectRowProp = {
    mode: 'checkbox',
    hideSelectColumn: true,
  };

  /* eslint-enable */
  //  delected the selected row
  /* no funciono el delete
  const handleDelete = (rowId) => {
    console.log('antes');
    console.log(dataTable);
    setdataTable(dataTable.filter((el) => el.id !== rowId));
    console.log('despues');
    console.log(dataTable);
    // const nuevoData = dataTable.filter(el => el.id !== rowId)
    // setdataTable(nuevoData);
    // console.log(nuevoData);
  };
  */

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
        /*
        {
        if (row.state)
          return (
            <div>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setState((prev) => {
                    // eslint-disable-next-line no-param-reassign
                    row.state = null;
                    const newState = { ...prev, state: row.state, row: null };
                    return newState;
                  });
                }}
              >
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setdataTable((prev) => {
                    const newVal = prev.map((el) => {
                      if (el.id === row.id) {
                        return state.oldValue;
                      }
                      return el;
                    });
                    return newVal;
                  });
                  setState((prev) => {
                    // eslint-disable-next-line no-param-reassign
                    row.state = null;
                    const newState = { ...prev, state: row.state, row: null };
                    return newState;
                  });
                }}
              >
                Cancelar
              </button>
            </div>
          );
              
        }
        */

        return (
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => seleccionarEstilo(row, 'Editar')}
            >
              EditarN
            </button>{' '}
            {'   '}
            <button
              type="button"
              className="btn-sm  btn-danger"
              onClick={() => seleccionarEstilo(row, 'Eliminar')}
            >
              Eliminar
            </button>
            {/* NO FUNCIONÓ
            <button
              type="button"
              className="btn btn-danger"
                onClick={() => handleDelete(row.id)}
              >
                DeleteRecm
              </button>
            */}
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
      <Button className="btn btn-success" onClick={() => abrirModalInsertar()}>
        Insertar
      </Button>
      {/* 
      <Button className="btn btn-success" onClick={AddEdit}>
        Insertar
      </Button>
      <br />
      */}

      <div-horizontal>
        <BootstrapTable
          id="table-employee-compensation"
          data={dataTable}
          columns={dataEstilosCol}
          // para eliminar row sel
          selectRow={selectRowProp}
          // classes="customBootStrapClasses"
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
          // egr
          pagination={paginationFactory({
            page: 1,
            sizePerPage: 7,
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

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el Estilo{' '}
          {estiloSeleccionado && estiloSeleccionado.id}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Agregar Estilo</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={dataTable[dataTable.length - 1].id + 1}
              name="id"
            />
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
              name="nombre"
              value={estiloSeleccionado ? estiloSeleccionado.vehicle : ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
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
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}

/* eslint-disable */

export default Estilos;

/* eslint-disable */
// eslint-disable-next-line
