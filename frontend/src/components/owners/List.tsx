import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function List({owners, onShowOwner}) {
  return (
    <>
      <h2 style={{ textAlign: 'center'}}>Lista de Propietarios</h2>
      <TableContainer component={Paper}>
          <Table aria-label="Vista de Propietarios">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Apellido</TableCell>
                <TableCell align="center">Total Autos</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {owners.map((owner) => (
                <TableRow key={owner.name}>
                  <TableCell align="center">{owner.name}</TableCell>
                  <TableCell align="center">{owner.lastName}</TableCell>
                  <TableCell align="center">{owner.totalCars}</TableCell>
                  <TableCell align="center">
                    <a onClick={() => (onShowOwner(owner))} href="#">+ Info</a>
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