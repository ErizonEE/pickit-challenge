import { useState } from 'react';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core'
import { Grid } from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add';

import httpClient from '../../tools/httpClient';

function Create({ownerName, ownerId, onCancel, onSaved}) {
  const [state, setState] = useState({ car: {
    brand: null,
    model: null,
    year: 0,
    color: null,
    patent: null
  }});

  function onSave (){
    httpClient.post('/cars', { ...state.car, ownerId })
      .then(res => {
        onSaved(res.data)
      })
  }

  return (
    <>
      <hr></hr>
      <h3 style={{ textAlign: 'center' }}>Agregar Automotor</h3>
      <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="patent"
            label="Patente"
            variant="standard"
            value={state.car.patent}
            onChange={e => (setState({ car: { ...state.car, patent: e.target.value } }))}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="brand"
            label="Fabricante"
            variant="standard"
            value={state.car.brand}
            onChange={e => (setState({ car: { ...state.car, brand: e.target.value } }))}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="model"
            label="Modelo"
            variant="standard"
            value={state.car.model}
            onChange={e => (setState({ car: { ...state.car, model: e.target.value } }))}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            type="number"
            id="year"
            label="Año"
            variant="standard"
            value={state.car.year}
            onChange={e => (setState({ car: { ...state.car, year: parseInt(e.target.value) } }))}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="color"
            label="Color"
            variant="standard"
            value={state.car.color}
            onChange={e => (setState({ car: { ...state.car, color: e.target.value } }))}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            color="primary"
            onClick={onSave}
          >
            <AddIcon fontSize="large"></AddIcon>
            Guardar
          </Button>

          <Button
            color="secondary"
            onClick={onCancel}
          >
            <CancelIcon fontSize="large"></CancelIcon>
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Create;