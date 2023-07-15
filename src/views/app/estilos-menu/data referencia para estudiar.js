import React from 'react';
import { textFilter } from 'react-bootstrap-table2-filter';
import Popup from 'reactjs-popup';

const selectOptions = {
  0: 'Dispatched',
  1: 'Finished',
};

const dataestilos = [
  {
    name: '13:30 Vardiyas',
    vehicle: 'Fenertepe',
    time: '13:12',
    driver: 'Tanr Nalbant',
    helper: '-',
    performance: '66 / 103',
    status: selectOptions[0],
  },
  {
    name: '13:30 Vardiyas',
    vehicle: 'Boğazköy',
    time: '13:11',
    driver: 'Selçuk Yurt',
    helper: '-',
    performance: '58 / 85',
    status: selectOptions[1],
  },
  {
    name: '07:30 Vardiyas',
    vehicle: 'Başakşehir',
    time: '07:30',
    driver: 'Emri Akça',
    helper: '-',
    performance: '108 / 148',
    status: selectOptions[1],
  },
  {
    name: '07:30 Vardiyas',
    vehicle: '4. 5. Etap',
    time: '07:30',
    driver: 'Yaşar Demir',
    helper: '-',
    performance: '121 / 138',
    status: selectOptions[1],
  },
  {
    name: '07:30 Vardiyas',
    vehicle: 'Kayaşehir',
    time: '07:30',
    driver: 'Ömer Osman Ekiz',
    helper: '-',
    performance: '97 / 146',
    status: selectOptions[1],
  },
  {
    name: '07:30 Vardiyas',
    vehicle: 'Bahçeşehir',
    time: '07:30',
    driver: 'Murat Uçanoğlu',
    helper: '-',
    performance: '55 / 107',
    status: selectOptions[1],
  },
  {
    name: '07:30 Vardiyas',
    vehicle: (
      <Popup
        trigger={<div className="menu-item">Bşk.&Ağa.</div>}
        position="right top"
        on="click"
        closeOnDocumentClick
        contentStyle={{ padding: '0px', border: 'none' }}
      >
        <div className="menu">
          <div className="menu-item">Change</div>
          <div className="menu-item">Swap</div>
        </div>
      </Popup>
    ),
    time: '07:30',
    driver: 'Mahmut Mercan',
    helper: '-',
    performance: '52 / 98',
    status: selectOptions[1],
  },
];
const columnsestilos = [
  {
    dataField: 'name',
    text: 'Name',
    sort: true,
    filter: textFilter({
      placeholder: 'Search',
    }),
    classes: 'cellWeight600',
  },
  {
    dataField: 'vehicle',
    text: 'Vehicle',
    sort: true,
    filter: textFilter({
      placeholder: 'Search',
    }),
    classes: 'pointer',
  },
  {
    dataField: 'time',
    text: 'Time',
    sort: true,
    filter: textFilter({
      placeholder: 'Search',
    }),
  },
  {
    dataField: 'driver',
    text: 'Driver',
    sort: true,
    filter: textFilter({
      placeholder: 'Search',
    }),
  },
  {
    dataField: 'helper',
    text: 'Helper',
    sort: true,
    filter: textFilter({
      placeholder: 'Search',
    }),
  },
  {
    dataField: 'performance',
    text: 'Performance',
    sort: true,
    filter: textFilter({
      placeholder: 'Search',
    }),
  },
  {
    dataField: 'status',
    text: 'Status',
    sort: true,
    filter: textFilter({
      placeholder: 'Search',
    }),
    classes: function callback(cell) {
      return cell;
    },
  },
];
export { dataestilos, columnsestilos };
