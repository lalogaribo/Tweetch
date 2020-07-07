import React from 'react';
import {connect} from 'react-redux'
import {createStream} from "../../redux/actions";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {

	submitForm = (values) => {
		this.props.createStream(values)
	}

	render() {
		return (
			<div>
				<h3>Create new stream</h3>
				<StreamForm onSubmit={this.submitForm} />
			</div>
		)
	}
};

export default connect(null, {createStream})(StreamCreate)
