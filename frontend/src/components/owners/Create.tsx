import { useState } from 'react';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core'
import { Grid } from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add';

import httpClient from '../../tools/httpClient';

function Create({onCancel, onSaved}) {
  const [state, setState] = useState({ owner: {
    name: null,
    lastName: null,
    documentNumber: null
  }});

  function onSave (){
    httpClient.post('/owners', state.owner)
      .then(res => {
        onSaved(res.data)
      })
  }

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Agregar Propietario</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="name"
            label="Nombre"
            variant="standard"
            value={state.owner.name}
            onChange={e => (setState({ owner: { ...state.owner, name: e.target.value } }))}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="lastName"
            label="Apellido"
            variant="standard"
            value={state.owner.lastName}
            onChange={e => (setState({ owner: { ...state.owner, lastName: e.target.value } }))}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            type="number"
            id="documentNumber"
            label="DNI"
            variant="standard"
            value={state.owner.documentNumber}
            onChange={e => (setState({ owner: { ...state.owner, documentNumber: parseInt(e.target.value) } }))}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            color="primary"
            onClick={onSave}
          >
            <AddIcon fontSize="large"></AddIcon>
            Guardar
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
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