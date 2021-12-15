import React from 'react';
import { Button } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@material-ui/core'
import { Grid } from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add';

import httpClient from '../../tools/httpClient';

class Create extends React.Component<{car, services, onCancel}, any> {
  constructor(props){
    super(props);

    this.state = {
      carId: this.props.car.id,
      services: this.props.services,
      selectedServices: [],
      total: 0
    }

    this.onSave = this.onSave.bind(this);
    this.onSelectedService = this.onSelectedService.bind(this);
  }

  onSave (){
    httpClient.post('/transactions', { carId: this.state.carId, servicesId: this.state.selectedServices.map(service => service.id) })
      .then(res => {
        this.props.onCancel();
      })
  }

  componentDidMount(){
    httpClient.get('/services')
      .then(res => {
        this.setState({
          ...this.state,
          services: res.data
        })
      })
  }

  async onSelectedService(){
    let total;

    await this.state.selectedServices.forEach(service => total+=service.cost);

    this.setState({
      ...this.state,
      total: this.state.selectedServices.reduce((ac, service) => (ac + service.cost), 0)
    })
  }
  render() {
    return (<>
      <h2 style={{ textAlign: 'center' }}>Agregar Trabajo en { this.props.car.brand } { this.props.car.model } <small>({this.props.car.ownerName })</small></h2>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
        <Autocomplete
          multiple
          disablePortal
          onChange={(event: any, newValue: Array<string> | null) => {

            this.setState({
              ...this.state,
              selectedServices: newValue
            });

            this.onSelectedService()
          }}
          getOptionLabel={(option: any) => (option.name)}
          id="services"
          options={this.state.services}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Servicios" />}
        />
        <br/>
        <strong>Total: </strong> { this.state.total }
        </Grid>
        <Grid item xs={12}>
          <Button
            color="primary"
            onClick={this.onSave}
          >
            <AddIcon fontSize="large"></AddIcon>
            Guardar
          </Button>

          <Button
            color="secondary"
            onClick={this.props.onCancel}
          >
            <CancelIcon fontSize="large"></CancelIcon>
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </>
  );
  }
}

export default Create;