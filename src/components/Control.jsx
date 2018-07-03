import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Control extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center m-5">
        <Button className="m-2" color="primary">start</Button>
        <Button className="m-2" color="alert">stop</Button>
        <Button className="m-2" color="danger">reset</Button>
      </div>
    );
  }
}

export default Control;
