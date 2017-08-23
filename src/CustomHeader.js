import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';


class CustomHeader extends Component {

  render()
  {
    return(

      <div className="container-fluid">
      {this.renderNavBar()}
      {this.renderTabs()}
      <br/>
      {this.renderCriteria()}

      </div>


      // onClick = {() => this.props.onClick(batchinfo)} />
    )
  }


renderNavBar()
{
  return(
  <nav className="navbar navbar-inverse" >

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
)
}

renderTabs()
{
  switch(this.props.page){
  case "/history.html":
    return ("history");
  break;
  case "/index.html":
    return (
      <div className="container-fluid text-left">
      <ul className="nav nav-tabs">
        <li role="presentation" className="active"><a href="#">All</a></li>
        <li role="presentation"><a href="#">Claims</a></li>
        <li role="presentation"><a href="#">Policy</a></li>
        <li role="presentation"><a href="#">Accounting</a></li>
        <li role="presentation"><a href="#">+</a></li>
      </ul>
      </div>);
  break;
  default:
  return ("other");
}
}
renderCriteria()
{
  switch(this.props.page){
  case "/history.html":
    return ("history");
  break;
  case "/index.html":
    return (
          <div className="row text-left" >
            <div className="col-md-4">
            <form className="form-inline">
              <div className="form-group form-group-sm">
                <label htmlFor="exampleInputName2">Criteria&nbsp;</label>
                <input type="text" className="form-control" id="filterCriteria" placeholder="part of batch name" />
              </div>
              <button type="submit" className="btn btn-default btn-sm">Filter</button>
            </form>
            </div>
          </div>);
  break;
  default:
  return ("other");
  }
}

}


export default CustomHeader;
