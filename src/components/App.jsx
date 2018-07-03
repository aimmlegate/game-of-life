import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Field from './Field';
import Control from './Control';

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md="12">
            <Field size='20'/>
            <Control/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
