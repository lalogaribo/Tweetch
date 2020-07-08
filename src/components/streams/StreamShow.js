import React from 'react';
import {connect} from 'react-redux'
import {fetchStream} from "../../redux/actions";

class StreamShow extends React.Component {
	componentDidMount() {
		const {fetchStream} = this.props
		const {id} = this.props.match.params
		fetchStream(id)
	}

	render() {
		const {stream} = this.props
		if(!stream) return <div>Loading..</div>

		return (
			<div>
				<h1>{stream.title}</h1>
				<p>{stream.description}</p>
			</div>
		)
	}
};

const mapStateToProps = (state, ownProps) => {
	const {id} = ownProps.match.params
	return {
		stream: state.streams[id]
	}

}
export default connect(mapStateToProps, {fetchStream})(StreamShow);
