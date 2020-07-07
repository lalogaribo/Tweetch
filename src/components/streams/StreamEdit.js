import _ from 'lodash'
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchStream, updateStream} from "../../redux/actions";
import StreamForm from "./StreamForm";

class StreamEdit extends Component {
	componentDidMount() {
		const streamID = this.props.match.params.id
		this.props.fetchStream(streamID)
	}

	onSubmit = (values) => {
		const streamID = this.props.match.params.id
		this.props.updateStream(streamID, values)
	}

	render() {
		if (!this.props.stream) {
			return <div>Loading....</div>
		}

		return (
			<div>
				<h3>Edit Stream</h3>
				<StreamForm initialValues={_.pick(this.props.stream, 'title', 'description')} onSubmit={this.onSubmit}/>
			</div>
		)
	}
};

const mapStateToProps = (state, ownProps) => {
	const streamId = ownProps.match.params.id
	return {
		stream: state.streams[streamId]
	}
}

export default connect(mapStateToProps, {fetchStream, updateStream})(StreamEdit);
