import React, { Component } from 'react';
import BatchRunButton from './BatchRunButton'
import { Container, Row, Col } from 'reactstrap';
import * as api from './api';

class Batchrow extends Component {

  constructor() {
    super();
    this.state = {output: null};
    //this.state.batchList = getUserList (this.props.filter);
  }

  renderBatchRunButton()
  {
    return(

      <BatchRunButton onClick = {() => api.runBatch(this.props.batchinfo.name).then((response)=>{
        console.log(response);
        this.setState({output: response.data});
      })
    }  status = {this.props.batchinfo.status}/>

      // onClick = {() => this.props.onClick(batchinfo)} />
    )
  }

  render() {
    console.log(this.props);
    let rows = [];
    rows.push(
      <Row key="batchInfo">
      <Col md="4" className="text-left">
        <a href="history.html" className="batchhref" ><label className="text-muted"><h4>
        {this.props.batchinfo.name}</h4></label></a>
      </Col>
      <Col md="3">
        <label><h4>{this.props.batchinfo.status}</h4></label>
      </Col>
      <Col md="2">
        {this.renderBatchRunButton()}
      </Col>
      <Col md="3">
        <h4>{this.props.batchinfo.lastdate}</h4>
      </Col>
    </Row>
  );

  let { output } = this.state;
  if (output) {
    rows.push(
      <Row key="batchRunOutput">
        <Col md="10">
        <p>{output}</p>
        </Col>
      </Row>
    )
  };

    return (
      <Container fluid={true}>
        {rows}
      </Container>
    )
  }
}


export default Batchrow;
