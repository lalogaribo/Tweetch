import React from 'react';
import flv from 'flv.js'
import {connect} from 'react-redux'
import {fetchStream} from "../../redux/actions";

class StreamShow extends React.Component {
	constructor(props) {
		super(props);

		this.videoRef = React.createRef()
	}

	componentDidMount() {
		const {fetchStream} = this.props
		const {id} = this.props.match.params
		fetchStream(id)
		this.generatePlayer()
	}

	componentDidUpdate() {
		this.generatePlayer()
	}

	generatePlayer() {
		const {id} = this.props.match.params
		if (this.player || !this.props.stream) {
			return;
		}
		this.player = flv.createPlayer({
			type: 'flv',
			url: `http://localhost:8000/live/${id}.flv`
		})
		this.player.attachMediaElement(this.videoRef.current)
		this.player.load()
	}

	render() {
		const {stream} = this.props
		if (!stream) return <div>Loading..</div>

		return (
			<div>
				<video ref={this.videoRef} style={{width: '100%'}} controls/>
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
