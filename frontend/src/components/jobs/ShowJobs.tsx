import React from 'react';
import List from './List';

import httpClient from '../../tools/httpClient';

class ShowJobs extends React.Component<{ car, onCancel }, any> {
  constructor(props) {
    super(props);

    this.state = {
      jobs: []
    }
  }
  componentDidMount(): void {
      httpClient.get('/transactions?car=' + this.props.car.id)
        .then(res => {
          this.setState({
            ...this.state,
            jobs: res.data
          })
        })
  }
  render () {
    return (
      <List jobs={this.state.jobs}/>
    )
  }
}

export default ShowJobs;