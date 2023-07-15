/* eslint-disable */
import React, { useState } from 'react';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import {
  Row,
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from 'reactstrap';
/* eslint-enable */

/* eslint-disable */
const dataPaises = [
  { id: 1, nombre: 'Filipinas', minutos: 241 },
  { id: 2, nombre: 'Brasil', minutos: 225 },
  { id: 3, nombre: 'Colombia', minutos: 216 },
  { id: 4, nombre: 'Nigeria', minutos: 216 },
  { id: 5, nombre: 'Argentina', minutos: 207 },
  { id: 6, nombre: 'Indonesia', minutos: 195 },
  { id: 7, nombre: 'Emiratos Árabes Unidos', minutos: 191 },
  { id: 8, nombre: 'México', minutos: 190 },
  { id: 9, nombre: 'Sudáfrica', minutos: 190 },
  { id: 10, nombre: 'Egipto', minutos: 186 },
];

const [data, setData] = useState(dataPaises);

/*
const [modalEditar, setModalEditar] = useState(false);
const [modalEliminar, setModalEliminar] = useState(false);
const [modalInsertar, setModalInsertar] = useState(false);

const [paisSeleccionado, setPaisSeleccionado] = useState({
  id: '',
  nombre: '',
  minutos: '',
});
*/

import React from 'react'

export const second = () => {
  return (
    <div>second</div>
  )
}


/* eslint-disable */
const Second = ({ match }) => (
  
  <>
    <Row>
      <Colxx xxs="12">
        <Breadcrumb SecondMenu="menu.second" match={match} />
        <Separator className="mb-5" />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="12" className="mb-4">
        <p>
          <IntlMessages id="menu.second" />
        </p>
      </Colxx>
    </Row>

    <button className="btn btn-success">Insertar</button>
    <br />
    <br />
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Minutos (por día)</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
          {dataPaises.map((element) => (
            <tr>
              <td>{element.id}</td>
              <td>{element.nombre}</td>
              <td>{element.minutos}</td>
              <td>
                <button
                  className="btn btn-primary"
                                  >
                  Editar
                </button>{" "}
                {"   "}
                <button
                  className="btn btn-danger"
                  
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>

    </table>
  </>
);
/* eslint-disable */

export default Second;
