import React, { Component } from 'react';
import { Button } from 'reactstrap';


class BatchRunButton extends Component {

	getButton(){
		switch (this.props.status){
			case "Idle":
			case "Failed":
			case "Successful": return <Button color="success" size="sm" onClick={this.props.onClick}>Run</Button>;
			case "Running": return <Button color="danger" size="sm" onClick={this.props.onClick}>Stop</Button>;
			case "Disabled": return <Button color="default" size="sm" disabled={true}>Run</Button>;
			default: return "Error";
		}
	}

	render() {
		console.log(this.props)
		return (
    	<h4>
    		{this.getButton()}
    	</h4>
		)
	}
}

export default BatchRunButton;
