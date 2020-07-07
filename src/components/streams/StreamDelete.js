import React from 'react';
import Modal from "../Modal";
import {connect} from 'react-redux'
import history from "../../history";
import {fetchStream, deleteStream} from "../../redux/actions";

class StreamDelete extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id)
	}

	render() {
		const actions = (
			<>
				<button className="ui button negative"
								onClick={(id) => this.props.deleteStream(this.props.match.params.id)}>Delete
				</button>
				<button className="ui button">Cancel</button>
			</>
		)
		if (!this.props.stream) {
			return <div>Loading stream</div>
		}
		return (
			<div>
				<h3>Delete Stream</h3>
				<Modal
					title={`${this.props.stream.title} Stream`}
					content={`Do you want to delete ${this.props.stream.title}`}
					path='/'
					actions={actions}
					onDismiss={() => history.push('/')}
				/>
			</div>
		)
	}
};

const mapStateToProps = (state, ownProps) => {
	console.log(ownProps.match.params.id)
	return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);
