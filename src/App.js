import React, { Component } from 'react';
import BatchTable from './BatchTable';
import { Container, Row, Col } from 'reactstrap';

import './App.css';

class App extends Component {
  render() {

    switch(window.location.pathname)
    {
      case "/index.html":
          return (
            <div className="App">
              {this.renderHead()}
              <BatchTable filter="" type="batches"/>
            </div>
          );

      case "/history.html":
        return (
          <div className="App">
            {this.renderHeadHistory()}
            <BatchTable filter="" type="logs"/>
          </div>
        );
      default: break
    }
    return (

      <div className="App">
        {this.renderHead()}
        <BatchTable filter=""/>
      </div>
    );
  }
  renderHead(){
    return(
      <Container fluid ={true}>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
          <div className="title text-left">
	         <h1>Waypoint Batch Runner</h1>
	        </div>
	        <ul className="nav navbar-nav">
            <li><a href="index.html">Batch page</a></li>
            <li><a href="history.html">History</a></li>
            <li><a href="#">Logs</a></li>
	          <li><a href="#">My runs</a></li>
          </ul>
        </div>
      </nav>
      <div className="container-fluid">
      <ul className="nav nav-tabs">
        <li role="presentation" className="active"><a href="#">All</a></li>
        <li role="presentation"><a href="#">Claims</a></li>
        <li role="presentation"><a href="#">Policy</a></li>
        <li role="presentation"><a href="#">Accounting</a></li>
        <li role="presentation"><a href="#">+</a></li>
      </ul>
      </div>
      <br/>

    </Container>
    )
  }

  renderHeadHistory(){
    return(
      <Container fluid ={true}>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
          <div className="title text-left">
	         <h1>Waypoint Batch Run History</h1>
	        </div>
	        <ul className="nav navbar-nav">
            <li><a href="index.html">Batch page</a></li>
            <li><a href="history.html">History</a></li>
            <li><a href="#">Logs</a></li>
	          <li><a href="#">My runs</a></li>
          </ul>
        </div>
      </nav>
      <div className="container-fluid">
      <ul className="nav nav-tabs">
        <li role="presentation" className="active"><a href="#">All</a></li>
        <li role="presentation"><a href="#">Claims</a></li>
        <li role="presentation"><a href="#">Policy</a></li>
        <li role="presentation"><a href="#">Accounting</a></li>
        <li role="presentation"><a href="#">+</a></li>
      </ul>
      </div>
      <br/>

    </Container>
  )
}
}

export default App;
