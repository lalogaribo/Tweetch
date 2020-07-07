import React from 'react';
import Modal from "../Modal";
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import history from "../../history";
import {fetchStream, deleteStream} from "../../redux/actions";

class StreamDelete extends React.Component {
	componentDidMount() {
		const {id} = this.props.match.params
		const {fetchStream} = this.props
		fetchStream(id)
	}

	render() {
		const {deleteStream} = this.props
		const {id} = this.props.match.params
		const {stream} = this.props
		const actions = (
			<>
				<button className="ui button negative"
								onClick={() => deleteStream(id)}>Delete
				</button>
				<Link className="ui button" to='/'>Cancel</Link>
			</>
		)
		if (!this.props.stream) {
			return <div>Loading stream</div>
		}
		return (
			<Modal
				title={`${stream.title} Stream`}
				content={`Do you want to delete ${stream.title}`}
				actions={actions}
				onDismiss={() => history.push('/')}
			/>
		)
	}
};

const mapStateToProps = (state, ownProps) => {
	return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);
