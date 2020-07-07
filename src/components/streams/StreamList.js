import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchStreams} from "../../redux/actions";

class StreamList extends React.Component {
	componentDidMount() {
		this.props.fetchStreams()
	}

	renderAdminButtons(stream) {
		if (stream.userId === this.props.currentUser.userId) {
			return (
				<div className="right floated content">
					<Link className="ui button primary" to={`/streams/edit/${stream.id}`}>Edit</Link>
					<Link className="ui button negative" to={`/streams/delete/${stream.id}`}>Delete</Link>
				</div>
			)
		}
	}

	renderList() {
		return this.props.streams.map(stream => {
			return (
				<div className="item" key={stream.id}>
					{this.renderAdminButtons(stream)}
					<i className="large middle aligned icon camera"/>
					<div className="content">
						{stream.title}
						<div className="description">{stream.description}</div>
					</div>
				</div>
			)
		})
	}

	renderCreate() {
		if (this.props.currentUser.isSignedIn) {
			return (
				<div>
					<Link to='/streams/new' className='ui button primary'>
						Create Stream
					</Link>
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				<header>Streams</header>
				<div className="ui celled list">
					{this.renderList()}
				</div>
				{this.renderCreate()}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		streams: Object.values(state.streams),
		currentUser: state.auth
	}
}

export default connect(mapStateToProps, {fetchStreams})(StreamList);
