import React from 'react';

import List from '../components/jobs/List';

import httpClient from '../tools/httpClient';

class Jobs extends React.Component<{}, any> {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    };
  }

  componentDidMount(): void {
    httpClient.get('/transactions')
      .then(res => {
        this.setState({
          jobs: res.data
        })
      })
  }

  render() {
    return (
    <>
      <List jobs={this.state.jobs}></List>
    </>)
  }
}

export default Jobs;