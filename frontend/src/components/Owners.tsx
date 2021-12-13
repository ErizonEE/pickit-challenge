import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import axios from 'axios';

class Owners extends React.Component<{}, any> {
  constructor(props) {
    super(props);
    this.state = { owners: [], addingOwner: false, editing: false, showingCars: false, showingJobs: false };
  }

  UNSAFE_componentWillMount(): void {
    axios.get('http://localhost:8000/owners')
      .then(res => {
        this.setState({
          ...this.state,
          owners: res.data
        })
      })
  }

  render() {
    if(this.state.addingOwner) {
      return (
        <>
          Nuevo Propietario
          <br/>
          <Button
            color="secondary"
            onClick={() => this.setState({ ...this.state, addingOwner: false })}
          >
            <CancelIcon></CancelIcon>
            Cancelar
          </Button>
        </>
      )
    }
    return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Apellido</TableCell>
              <TableCell align="center">DNI</TableCell>
              <TableCell align="center">Total Autos</TableCell>
              <TableCell align="center">Total Trabajos Realizados</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.owners.map((owner) => (
              <TableRow key={owner.name}>
                <TableCell align="center">{owner.name}</TableCell>
                <TableCell align="center">{owner.lastName}</TableCell>
                <TableCell align="center">{owner.documentNumber}</TableCell>
                <TableCell align="center">{owner.totalCars}</TableCell>
                <TableCell align="center">{owner.totalTransactions}</TableCell>
                <TableCell align="center">Ver autos, Ver Trabajos</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        style={{position: 'absolute', bottom: '10%', right: '10%' }}
        color="primary"
        onClick={() => this.setState({ ...this.state, addingOwner: true })}
      >
        <AddIcon fontSize="large"></AddIcon>
        Agregar
      </Button>
    </>)
  }
}

export default Owners;