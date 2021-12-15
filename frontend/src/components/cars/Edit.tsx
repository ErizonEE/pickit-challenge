import { useState } from 'react';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core'
import { Grid } from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add';

import httpClient from '../../tools/httpClient';

function Edit({car, onCancel, onSaved}) {
  const [state, setState] = useState({ 
    brand: car.brand,
    model: car.model,
    year: car.year,
    color: car.color,
    patent: car.patent,
    ownerId: car.ownerId
  });

  function onSave (){
    httpClient.patch('/cars/' + car.id, state)
      .then(res => {
        onSaved(res.data)
      })
  }

  return (
    <>
      <hr></hr>
      <h3 style={{ textAlign: 'center' }}>Editar Automotor <small>(Propietario: {car.ownerName })</small></h3>
      <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="patent"
            label="Patente"
            variant="standard"
            value={state.patent}
            onChange={e => (setState({ ...state, patent: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="brand"
            label="Fabricante"
            variant="standard"
            value={state.brand}
            onChange={e => (setState({ ...state, brand: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="model"
            label="Modelo"
            variant="standard"
            value={state.model}
            onChange={e => (setState({ ...state, model: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            type="number"
            id="year"
            label="Año"
            variant="standard"
            value={state.year}
            onChange={e => (setState({ ...state, year: parseInt(e.target.value) }))}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="color"
            label="Color"
            variant="standard"
            value={state.color}
            onChange={e => (setState({ ...state, color: e.target.value }))}
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

export default Edit;