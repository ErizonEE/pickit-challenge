import React from 'react';
import Create from '../components/jobs/Create';
import Edit from '../components/cars/Edit';
import List from '../components/cars/List';
import ShowJobs from '../components/jobs/ShowJobs';

import httpClient from '../tools/httpClient';

class Cars extends React.Component<{}, any> {
  constructor(props) {
    super(props);
    this.state = { cars: [], showJobs: false, addJob: false, editCar: false, selectedCar: null};

    this.onCancel = this.onCancel.bind(this);
    this.onDeleteIntention = this.onDeleteIntention.bind(this);
    this.onAddJobIntention = this.onAddJobIntention.bind(this);
    this.onEditIntention = this.onEditIntention.bind(this);
    this.onUpdatedCar = this.onUpdatedCar.bind(this);
    this.onShowJobs = this.onShowJobs.bind(this);
  }

  componentDidMount(): void {
    httpClient.get('/cars')
      .then(res => {
        this.setState({
          ...this.state,
          cars: res.data
        })
      })
  }

  onCancel () {
    this.setState({
      ...this.state,
      addJob: false,
      editCar: false,
    })
  }

  onDeleteIntention (carId: String, car: string, ownerName: string) {
    if(window.confirm(`¿Está seguro de eliminar el auto: ${car} \(${ownerName}\)?`)){
      httpClient.delete('/cars/' + carId)
        .then(() => {
          const carIndex = this.state.cars.findIndex(car => car.id === carId);
          const cars = this.state.cars;
          cars.splice(carIndex, 1);

          this.setState({
            ...this.state,
            cars
          });
        })
    }
  }

  onAddJobIntention (car) {
    this.setState({
      ...this.state,
      selectedCar: car,
      addJob: true
    })
  }
  onEditIntention (car) {
    this.setState({
      ...this.state,
      selectedCar: car,
      editCar: true,
      showJobs: true
    })
  }

  onUpdatedCar (updatedCar) {
    const carIndex = this.state.cars.findIndex(car => car.id === updatedCar.id);
    const cars = this.state.cars;
    cars[carIndex] = updatedCar;

    this.setState({
      ...this.state,
      cars
    })

    this.onCancel()
  }

  onShowJobs (car) {

    this.setState({
      ...this.state,
      selectedCar: car,
      showJobs: true
    })
  }

  render() {
    if (this.state.editCar) {
      return (
        <Edit car={this.state.selectedCar} onCancel={this.onCancel} onSaved={this.onUpdatedCar}
        />
      )
    }

    if(this.state.addJob) {
      return (
        <Create car={this.state.selectedCar} services={[]} onCancel={this.onCancel}/>
      )
    }
    if(this.state.showJobs) {
      return (
        <ShowJobs car={this.state.selectedCar} onCancel={this.onCancel}/>
      )
    }

    return (
        <List cars={this.state.cars}
        onDeleteIntention={this.onDeleteIntention}
        onAddJobIntention={this.onAddJobIntention}
        onEditIntention={this.onEditIntention}
        onShowJobs={this.onShowJobs}
        />
      )
    }
}

export default Cars;