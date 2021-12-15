import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function List({jobs}) {
  return (
    <>
      <h2 style={{ textAlign: 'center'}}>Lista de Trabajos Realizados</h2>
      <TableContainer component={Paper}>
          <Table aria-label="Vista de Propietarios">
            <TableHead>
              <TableRow>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Automotor</TableCell>
                <TableCell align="center">Propietario</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Servicios Realizados</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell align="center">{job.createAt}</TableCell>
                  <TableCell align="center">{job.car}</TableCell>
                  <TableCell align="center">{job.ownerName}</TableCell>
                  <TableCell align="center">${job.total}</TableCell>
                  <TableCell align="center">
                    {
                      job.services && job.services.map(service => (
                        <span>{service.name}, </span>
                      ))
                    }  
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