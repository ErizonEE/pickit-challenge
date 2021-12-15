import { useState } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import BackIcon from '@material-ui/icons/ArrowBack';
import Create from '../cars/Create';

function Show({owner, onBack}) {
  const [addCar, setAddCar] = useState(false);
  const [localTotalCars, setLocalTotalCars] = useState(owner.totalCars)

  const onAddCar = function() {
    setAddCar(false);
    setLocalTotalCars(prevState => (prevState + 1))
  }
  return (
    <>
      <Button onClick={() => (onBack(localTotalCars))}><BackIcon></BackIcon></Button>

      <h2 style={{ textAlign: 'center'}}>Detalle del Propietario</h2>

      <p>
        <strong>Nombre:</strong> {owner.name}
      </p>
      <p>
        <strong>Apellido:</strong> {owner.lastName}
      </p>
      <p>
        <strong>DNI:</strong> {owner.documentNumber}
      </p>
      <p>
        <strong>E-mail:</strong> {owner.email}
      </p>
      <hr />
      <p>
        <strong>Total Automotores:</strong> {localTotalCars}
      </p>
      <p>
        <strong>Total Trabajos Realizados:</strong> {owner.totalTransactions}
      </p>

      {
        !addCar && (
          <Button
          style={{position: 'absolute', bottom: '10%', right: '10%' }}
          color="primary"
          onClick={() => (setAddCar(true))}
          >
          <AddIcon fontSize="large"></AddIcon>
            Agregar Automotor
          </Button>
        )
      }

      {
        addCar && (<Create ownerId={owner.id} ownerName={owner.name} onCancel={() => (setAddCar(false))} onSaved={onAddCar}/>)
      }
    </>
  );
}

export default Show;