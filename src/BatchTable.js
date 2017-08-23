import React, { Component } from 'react';
import BatchRow from './BatchRow';
import LogRow from './LogRow';
import * as api from './api';

class BatchTable extends Component
{

  constructor() {
    super();
    this.state = {batchList: null};
    this.onCriteriaChange = this.onCriteriaChange.bind(this);
    //this.state.batchList = getUserList (this.props.filter);
  }

  componentWillMount() {
    switch (this.props.type)
    {
      case "batches" :
        api.getUserlListAxios(this.props.filter)
        .then((response) => {
          this.setState({
            initialBatchList: response.data,
            batchList: response.data
          });
        }); break
      case "logs":

        api.getBatchLogsAxios(this.props.filter)
        .then((response) => {
          this.setState({
            initialBatchList: response.data,
            batchList: response.data
          });
        });
      break
      default: break
    }

  }

  onCriteriaChange(event) {

      let {initialBatchList} = this.state;
      let updatedBatchList = initialBatchList.filter((batch) =>
        batch.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
      this.setState({batchList : updatedBatchList});
  }


  render() {
    let renderedBatchList = [];
    let { batchList } = this.state;

    if (batchList) {
      switch (this.props.type)
      {
        case "batches" :
          renderedBatchList = batchList.map((rec, index) => <BatchRow key={index} batchinfo = {rec}/>);
          break
        case "logs":

          renderedBatchList = batchList.map((rec, index) => <LogRow key={index} batchinfo = {rec}/>);
          console.log("-----------><-------------");
          console.log(renderedBatchList);
          break
        default: break
      }
      
      return (
        <div>


        <div className="container-fluid text-left" >
          <div className="col-md-4">
            <form className="form-inline">
              <div className="form-group form-group-sm">
              <label htmlFor="exampleInputName2">Criteria&nbsp;</label>
              <input type="text" className="form-control" id="filterCriteria" placeholder="part of batch name"
                onChange={this.onCriteriaChange}/>
              </div>
            </form>
            </div>
            </div>
          <div>{renderedBatchList}</div>
        </div>
      )
    };
    return (
      <div>
        <div>{renderedBatchList}</div>
      </div>
      );
  }
}

export default BatchTable;
