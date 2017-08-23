import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import * as api from './api';

class LogRow extends Component {

  constructor() {
    super();
    console.log("constructor")
    this.state = {clicked: false}
    //this.state.batchList = getUserList (this.props.filter);
  }

  render() {

    let rows = [];
    rows.push(
      <Row key="batchLog">
      <Col md="4" className="text-left">
        <a href="#" ><label className="text-muted" onClick={()=>this.setState({clicked: true})}><h4>
        {this.props.batchinfo.name}</h4></label></a>
      </Col>
      <Col md="3">
        <label><h4>{this.props.batchinfo.date.start}</h4></label>
      </Col>
      <Col md="3">
      <label><h4>{this.props.batchinfo.date.end}</h4></label>
      </Col>
      <Col md="2" className='text-left'>
        <h4>{this.props.batchinfo._id}</h4>
      </Col>
    </Row>
  );
  if (this.state.clicked) {
    rows.push("test");
    <Row key="batchRunOutput">
      <Col md="10">
      <p>this.props.batchinfo.log</p>
      </Col>
    </Row>

  }

    return (
      <Container fluid={true}>
        {rows}
      </Container>
    )
  }
}


export default LogRow;
