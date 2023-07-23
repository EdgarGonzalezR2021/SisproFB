import { textFilter } from 'react-bootstrap-table2-filter';
import React from 'react';

/* METODO 3 */
export function CallBackImagen(cell) {
  // eslint-disable-next-line
  const image = ''.concat('./public/estilos/uploads/', cell.image) 
  // console.log('CallBackImagen image ', image);
  const http = new XMLHttpRequest();
  http.open('HEAD', image, false);
  http.send();
  if (http.status !== 404) {
    return <img src={image} alt="FotoEstilo" width="50px" height="50px" />;
  };
  // eslint-disable-next-line
  return 'Imagen no existe en serv.: ' + image;
}


/* eslint-enable */


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
    dataField: 'nombreestilo',
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

  // MOLDE
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

  // ESTADO
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

  // FOTOGRAFIA
  {
    dataField: 'fotografia',
    text: 'Fotografia',
    sort: false,
    // eslint-disable-next-line
    formatter: (cell) => <CallBackImagen image={cell} />,
  },

  // OBSERVACIONES
  {
    dataField: 'observaciones',
    text: 'Observaciones',
    sort: false,
    headerStyle: {
      minWidth: 'calc(1em + 10vw)',
      maxWidth: '50%',
    },
  },
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
