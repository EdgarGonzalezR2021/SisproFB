import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from "@material-ui/core/FormHelperText";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import districts from "./districts.json";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import InputLabel from "@material-ui/core/InputLabel";
// import { FormGroup } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function TLMIdForm(props) {
  const classes = useStyles();
  const [tlmId, setTlmId] = useState('');

  // const areas = districts.filter(entry => {
  //  return entry.PROVINCE_ID === 1;
  // });

  const handleClose = () => {
    console.log('close');
    props.onCancel();
  };

  const handleSave = () => {
    props.onSave(tlmId);
  };

  return (
    <div>
      <Dialog
        // open={props.open}
        open={props}
        // onClose={handleClose}
        onCancel={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">texto1 TLM</DialogTitle>
        <DialogContent>
          <DialogContentText>texto2 TLM ID (texto3 TLM Unit)</DialogContentText>

          <FormControl className={classes.formControl}>
            <TextField
              autoFocus
              id="transformer-id-input"
              label="text4"
              type="text"
              value={tlmId}
              onChange={(e) => setTlmId(e.target.value)}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
