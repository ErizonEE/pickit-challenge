import React from 'react';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

export default function Panel() {
  return (
      <div className='panel'>
        <h3 style={{textAlign: 'center'}}>Opciones</h3>
    
            <Button
              fullWidth
              component={RouterLink}
              to="/propietarios"
              style={{margin: '2px 2px'}}
              variant="outlined"
              color="primary"
              >
                Propietarios
            </Button>
            <Button
              fullWidth
              component={RouterLink}
              to="/automotores"
              style={{margin: '2px 2px'}}
              variant="outlined"
              color="primary"
              >
                Automotores
            </Button>
            <Button 
              fullWidth
              component={RouterLink}
              to="/trabajos"
              style={{margin: '2px 2px'}}
              variant="outlined"
              color="primary"
              >
                Trabajos Realizados
            </Button>
      </div>
  );
}