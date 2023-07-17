import { textFilter } from 'react-bootstrap-table2-filter';
// import React from 'react';
// import { existsSync } from 'fs';
// import { fs, access } from 'electron';
// import * as fs from 'fs-extra';
// import fs from 'fs';

/* eslint-disable */
export const CallBackImagen = (cell) => {
  console.log(cell.image);
  // const image = require(''.concat('./',cell.image)).default;
  if (cell.image === '' || cell.image === undefined || cell.image === null) {
    //return <img src={require('./img/sinfoto.jpg').default} alt="FotoEstilo" width="50px" height="50px" />;
    return '';
  }

  // VERIFICA QUE LA FOTO EXISTA
  // BIBLIOGRAFIA https://stackoverflow.com/questions/51816914/reading-from-filefile-system-without-node-js
  function readSingleFile(f) {
    // var f = evt.target.files[0];
    if (f) {
      var r = new FileReader();
      r.onload = function (e) {
        var contents = e.target.result;
      };
      try {
        r.readAsText(f);
      } catch (error) {
        // console.log('error', error);
        return '';
      }
    } else {
      alert('Failed to load file');
    }
  }
  const path = `./src/views/app/estilos-menu/img/${cell.image}`;
  readSingleFile(path);

  /*
  // VERIFICA QUE LA FOTO EXISTA
  const path = `./src/views/app/estilos-menu/img/${cell.image}`;
  // const fs = require('fs-extra');
  const fs = require('fs');
  // With Promises:
  fs.existsSync(path)
    .then(() => {
      console.log('success!');
    })
    .catch((err) => {
      console.error(err);
      return '';
    });
    */

  /*
  //const path = `./src/views/app/estilos-menu/img/${cell.image}`;
  !fs.existsSync('./src/views/app/estilos-menu/img/SachaMotoShort3.jpg')
    ? console.log('NO EXISTE')
    : console.log('EXISTE');

  /*
    const fs = require('electron').remote.require('fs')
    // const path = `./src/views/app/estilos-menu/img/${cell.image}`;
    fs.access("somefile", error => {
      if (!error) {
          // file exists
          console.log('EXISTE');
      } else {
          // file does not exist
          console.log('NO EXISTE');
      }
  });
  */

  console.log('en DATAESTILOS CallBackImagen', cell.image);
  const image = require(''.concat('./img/', cell.image)).default;
  return <img src={image} alt="FotoEstilo" width="50px" height="50px" />;
};
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
  /*
  {
    dataField: "file",
    text: "File",
    formatter: (cell, row) => (
      <img alt={row.file} style={{ maxWidth: "100%" }} src={row.file} />
    )
  },
  */
  {
    dataField: 'fotografia',
    text: 'Fotografia',
    sort: false,
    // eslint-disable-next-line
    formatter: (cell) => <CallBackImagen image={cell} />,
    // formatter: (cellContent, row) => {
    //    return (
    //        <img src="foto1.jpg" alt="FotoEstilo"/>
    //    )
    // },
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
