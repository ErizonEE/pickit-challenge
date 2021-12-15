import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import List from '../components/owners/List';
import Create from '../components/owners/Create';
import Show from '../components/owners/Show';

import httpClient from '../tools/httpClient';

class Owners extends React.Component<{}, any> {
  constructor(props) {
    super(props);
    this.state = { 
      owners: [], 
      selectedOwner: null,
      addOwner: false, 
      showOwner: false
    };

    this.onCancel = this.onCancel.bind(this);
    this.onSaved = this.onSaved.bind(this);
    this.onShowOwner = this.onShowOwner.bind(this);
    this.onBackToList = this.onBackToList.bind(this);
  }

  componentDidMount(): void {
    httpClient.get('/owners')
      .then(res => {
        this.setState({
          ...this.state,
          owners: res.data
        })
      })
  }

  onCancel () {
    this.setState({
      ...this.state,
      addOwner: false,
      showOwner: false,
      selectedOwner: null
    })
  }

  onSaved (newOwner) {
    const owners = this.state.owners
    owners.push(newOwner);

    this.setState({
      ...this.state,
      owners  
    })

    this.onCancel();
  }
  onShowOwner (owner) {
    this.setState({
      ...this.state,
      selectedOwner: owner,
      showOwner: true
    })
  }

  onBackToList (updatedTotalCars) {
    const ownerIndex = this.state.owners.findIndex(owner => owner.id === this.state.selectedOwner.id);

    const owners = this.state.owners;

    owners[ownerIndex].totalCars = updatedTotalCars;

    this.setState({
      ...this.state,
      owners: owners
    })

    this.onCancel()
  }

  render() {
    if(this.state.addOwner) {
      return (
        <Create onCancel={this.onCancel} onSaved={this.onSaved}></Create>
      )
    }
    if(this.state.showOwner) {
      return (
        <Show owner={this.state.selectedOwner} onBack={this.onBackToList}></Show>
      )
    }
    return (
    <>
      <List owners={this.state.owners} onShowOwner={this.onShowOwner}></List>
      <Button
        style={{position: 'absolute', bottom: '10%', right: '10%' }}
        color="primary"
        onClick={() => this.setState({ ...this.state, addOwner: true })}
      >
        <AddIcon fontSize="large"></AddIcon>
        Agregar Propietario
      </Button>
    </>)
  }
}

export default Owners;