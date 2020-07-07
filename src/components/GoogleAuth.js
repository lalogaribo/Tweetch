import React, {Component} from 'react';
import {connect} from 'react-redux'
import {signIn, signOut} from "../redux/actions";

class GoogleAuth extends Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client.init({
				clientId: '139557397634-jtbth60lahnsiuiq8kp9gbinkhia6hnt.apps.googleusercontent.com',
				scope: 'email'
			}).then(() => {
				this.auth = window.gapi.auth2.getAuthInstance();
				this.onAuthChange(this.auth.isSignedIn.get())
				this.auth.isSignedIn.listen(this.onAuthChange)
			})
		})
	}

	renderButton = () => {
		if (this.props.isSignedIn) {
			return (
				<button className='ui red google button' onClick={() => this.auth.signOut()}>
					<i className="google icon"/>
					Sign Out
				</button>
			)
		} else {
			return (
				<button className='ui red google button' onClick={() => this.auth.signIn()}>
					<i className="google icon"/>
					Sign In</button>
			)
		}
	}

	onAuthChange = (isSignedIn) => {
		if (isSignedIn){
			this.props.signIn(this.auth.currentUser.get().getId())
		} else {
			this.props.signOut()
		}
	}

	render() {
		return (
			<div>
				<p>{this.renderButton()}</p>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isSignedIn: state.auth.isSignedIn
})
export default connect(mapStateToProps, {signOut, signIn})(GoogleAuth);
