import React, { useState } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
// import "bootstrap/dist/css/bootstrap.min.css";
import 'assets/css/vendor/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';
// import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import transformers from './transformerStub';

import TLMIdForm from './TLMIdForm';

const key = transformers.map((el) => el.id);

// const { SearchBar } = Search;


const entry = {
  id: null,
  area: null,
  rating: null,
  voltage: null,
  lat: null,
  Long: null,
};


export default function ReactBootstrapTableTLM() {
  // To delete rows you be able to select rows
  const [state, setState] = useState({
    row: null,
    state: null,
    oldValue: null,
  });

  const [products, setProducts] = useState(transformers); // transformers products
  const [open, setOpen] = useState(false); // control for adding diaglog
  console.log(open);

  // hide checkbox for selection
  const selectRowProp = {
    mode: 'checkbox',
    hideSelectColumn: true,
  };

  // validator for number fields
  const numberValidator = (newValue, row, column) => {
    console.log(newValue, row, column);
    if (Number.isNaN(newValue)) {
      return {
        valid: false,
        message: 'This field should be numeric',
      };
    }
    return true;
  };

  // delected the selected row
   const handleDelete = (rowId) => {
    setProducts(products.filter((el) => el.id !== rowId));
   };

  const columns = [
    {
      dataField: 'id',
      text: 'TLM id',
      sort: true,
    },
    {
      dataField: 'area',
      text: 'Area Name',
      sort: true,
    },
    {
      dataField: 'rating',
      text: 'Power rating',
      type: 'number',
      validator: numberValidator,
      sort: true,
    },
    {
      dataField: 'voltage',
      text: 'Voltage',
      type: 'number',
      validator: numberValidator,
      sort: true,
    },
    {
      dataField: 'lat',
      text: 'Latitude',
      type: 'number',
      validator: numberValidator,
    },
    {
      dataField: 'Long',
      text: 'Longitude',
      type: 'number',
      validator: numberValidator,
    },
    {
      dataField: 'state',
      text: 'State',
      isDummyField: true,

      hidden: true,
    },
    {
      dataField: 'actions',
      text: 'Actions',
      editable: false,
      isDummyField: true,
      formatExtraData: state,
      formatter: function cualquiernombre (cellContent, row) {
      // formatter: (cellContent, row) => {
        if (row.state)
          return (
            <div>
              <button
                className="btn btn-secondary btn-xs"
                type="button" // EGR
                onClick={() => {
                  setState((prev) => {
                    // row.state = null;
                    // const newState = { ...prev, state: row.state, row: null };
                    const nuevoState= null; // EGR
                    const newState = { ...prev, state: nuevoState, row: null };
                    return newState;
                  });
                }}
              >
                Save
              </button>
              <button
                className="btn btn-primary btn-xs"
                type="button" // EGR
                onClick={() => {
                  setProducts((prev) => {
                    const newVal = prev.map((el) => {
                      if (el.id === row.id) {
                        return state.oldValue;
                      }
                      return el;
                    });
                    return newVal;
                  });
                  setState((prev) => {
                    // row.state = null;
                    // const newState = { ...prev, state: row.state, row: null };
                    const nuevoState= null; // EGR
                    const newState = { ...prev, state: nuevoState, row: null }; // EGR
                    return newState;
                  });
                }}
              >
                Cancel
              </button>
            </div>
          );
        // else
        return (
          <div>
            <button
              className="btn btn-danger btn-xs"
              type="button" // EGR
              onClick={() => handleDelete(row.id)}
            >
              <DeleteIcon />
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: 'name',
      order: 'ascd',
    },
  ];

  // a function to save the old value
  const handleStartEdit = (row) => {
    setState((prev) => {
      const newVal = { ...prev, oldValue: { ...row } };
      return newVal;
    });
  };

  // add a new row
  const handleNewRow = () => {
    setOpen(true);
  };

   const handleCancelAdd = () => {
     setOpen(false);
   };

  
  const handleSaveAdd = (tlmId) => {
    // check duplicated id
    if (products.filter((el) => el.id === tlmId).length) {
      // the same id is entered
      alert('the id you have entered is already taken!');
    } else {
      setProducts((prev) => {
        const newEntry = { ...entry, id: tlmId };
        const newVal = [newEntry, ...prev];
        return newVal;
      });
      setOpen(false);
    }
  };
  

  return (
    <>
      <div style={{ textAlign: 'left' }}>
        <Button class="btn btn-warning" onClick={handleNewRow}>
          <AddIcon fontSize="small" /> Add
        </Button>
      </div>
      <BootstrapTable
        keyField="id"
        selectRow={selectRowProp}
        data={products}
        columns={columns}
        defaultSorted={defaultSorted}
        pagination={paginationFactory()}
        cellEdit={cellEditFactory({
          mode: 'dbclick',
          blurToSave: true,
          onStartEdit: (row, column, rowIndex, columnIndex) => {
            console.log('start to edit!!!', row, column, rowIndex, columnIndex);
            if (row.state !== 'edited') {
              console.log(row.state);
              handleStartEdit(row);
            }
          },
          beforeSaveCell: (oldValue, newValue) => {
            console.log('Before Saving Cell!!', oldValue, newValue);
          },
          // afterSaveCell: (oldValue, newValue, row, column) => {
          afterSaveCell: (oldValue, newValue, row) => {
            console.log('After Saving Cell!!');
            if (oldValue !== newValue) {
              // row.state = 'edited';
              // setState({ ...state, row: row, state: row.state });
                const nuevoState= 'edited'; // EGR
                setState({ ...state, row, nuevoState }); // EGR
            }
          },
          nonEditableRows: () =>
            state.row ? key.filter((el) => el !== state.row.id) : [],
        })}
      />
    
      <TLMIdForm
        open={open}
        onCancel={handleCancelAdd}
        onSave={handleSaveAdd}
      />
    
    </>
  );
}
