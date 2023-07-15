import { textFilter } from 'react-bootstrap-table2-filter';
import React from 'react';
import image from './foto1.jpg';

// eslint-disable-next-line
export const CallBackImagen = (cell) => {
  // eslint-disable-next-line
  //  cell = './' + cell;
  // alert(cell);
    // eslint-disable-next-line
    // image = require('./foto1.jpg');
  return (
    <img
      src={image}
      alt="FotoEstilo"
      width="50px"
      height="50px"
    />
  );
};
/*


export const CallBackImagen = (cell) => {
  return (
    <img src={foto1} alt="FotoEstilo"/>
  )
}
*/

// Estilos Definition
const dataEstilosCol = [
  {
    dataField: 'estilo',
    text: 'Estilo',
    sort: true,
    filter: textFilter({
      placeholder: 'Buscar',
    }),
    // filterPosition: 'top',
    classes: 'cellWeight600',
    headerStyle: {
      minWidth: 'calc(1em + 8vw)',
      maxWidth: '50%',
    },
  },
  {
    dataField: 'nombre',
    text: 'Descripcion del Estilo',
    sort: true,
    filter: textFilter({
      placeholder: 'Buscar',
    }),
    classes: 'pointer',
    headerStyle: {
      minWidth: 'calc(6em + 1vw)',
      maxWidth: '50%',
    },
  },
  {
    dataField: 'linea',
    text: 'Linea',
    sort: true,
    filter: textFilter({
      placeholder: 'Buscar',
    }),
    headerStyle: {
      minWidth: 'calc(1em + 1vw)',
      maxWidth: '50%',
    },
  },
  {
    dataField: 'horma',
    text: 'Horma',
    sort: true,
    filter: textFilter({
      placeholder: 'Buscar',
    }),
    headerStyle: {
      minWidth: 'calc(1em + 1vw)',
      maxWidth: '50%',
    },
  },
  {
    dataField: 'molde',
    text: 'Molde',
    sort: true,
    filter: textFilter({
      placeholder: 'Buscar',
    }),
    headerStyle: {
      minWidth: 'calc(1em + 1vw)',
      maxWidth: '50%',
    },
  },
  {
    dataField: 'estado',
    text: 'Estado',
    sort: true,
    classes: function callback(cell) {
      return cell;
    },
    headerStyle: {
      maxWidth: '30%',
    },
  },
  {
    dataField: 'fotografia',
    text: 'Fotografia',
    sort: true,
    // eslint-disable-next-line
    formatter: (cell) => <CallBackImagen image={cell} />,
    // formatter: (cellContent, row) => {
    //    return (
    //        <img src="foto1.jpg" alt="FotoEstilo"/>
    //    )
    // },
  },
  {
    dataField: 'observaciones',
    text: 'Observaciones',
    sort: false,
    headerStyle: {
      minWidth: 'calc(1em + 10vw)',
      maxWidth: '50%',
    },
  },
  /*
  {
    dataField: 'observaciones3',
    text: 'Observaciones3',
    sort: true,
    filter: textFilter({
      placeholder: 'Buscar',
    }),
  },
  {
    dataField: 'observaciones4',
    text: 'Observaciones4',
    sort: true,
    filter: textFilter({
      placeholder: 'Buscar',
    }),
  },
  */
  {
    dataField: 'state',
    text: 'State',
    isDummyField: true,
    hidden: true,
  },
  {
    dataField: 'id',
    text: 'Id',
    sort: false,
    classes: 'cellWeight600',
    hidden: false,
  },
];
export default dataEstilosCol;
