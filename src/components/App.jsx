import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Field from './Field';

const App = () =>
  <Container>
    <Row>
      <Col md="12">
        <Field size='30'/>
      </Col>
    </Row>
  </Container>;

export default App;
