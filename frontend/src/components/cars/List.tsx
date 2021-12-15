import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function List({cars, onDeleteIntention, onAddJobIntention, onEditIntention, onShowJobs}) {
  return (
    <>
    <h2 style={{ textAlign: 'center'}}>Lista de Automotores</h2>
    <TableContainer component={Paper}>
        <Table aria-label="Vista de Propietarios">
          <TableHead>
            <TableRow>
              <TableCell align="center">Propietario</TableCell>
              <TableCell align="center">Patente</TableCell>
              <TableCell align="center">Fabricante</TableCell>
              <TableCell align="center">Model</TableCell>
              <TableCell align="center">Año</TableCell>
              <TableCell align="center">Color</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map(car => (
              <TableRow key={car.id}>
                <TableCell align="center">{car.ownerName}</TableCell>
                <TableCell align="center">{car.patent}</TableCell>
                <TableCell align="center">{car.brand} {car.model}</TableCell>
                <TableCell align="center">{car.model}</TableCell>
                <TableCell align="center">{car.year}</TableCell>
                <TableCell align="center">{car.color}</TableCell>
                <TableCell align="center">
                  <a href="#" onClick={() => (onAddJobIntention(car))}>Agregar Trabajo</a>
                  <br/>
                  <a href="#" onClick={() => (onShowJobs(car))}>Ver Trabajos</a>
                  <br/>
                  <a href="#" onClick={() => (onEditIntention(car))}>Modificar</a>
                  <br/>
                  <a href="#" onClick={
                    () => (onDeleteIntention(car.id, `${car.brand} ${car.model} ${car.year}`, car.ownerName))
                  }>
                    Eliminar
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default List;