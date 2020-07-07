import React from 'react';
import {BrowserRouter, Route, Router} from 'react-router-dom'
import StreamList from "./components/streams/StreamList";
import StreamEdit from "./components/streams/StreamEdit";
import StreamCreate from "./components/streams/StreamCreate";
import StreamDelete from "./components/streams/StreamDelete";
import StreamShow from "./components/streams/StreamShow";
import Header from "./components/Header";
import history from './history'

function App() {
	return (
		<div className='ui container'>
			<Router history={history}>
			<Header />
				<div>
					<Route path='/' exact component={StreamList}/>
					<Route path='/streams/new' exact component={StreamCreate}/>
					<Route path='/streams/show' exact component={StreamShow}/>
					<Route path='/streams/edit/:id' exact component={StreamEdit}/>
					<Route path='/streams/delete/:id' exact component={StreamDelete}/>
				</div>
			</Router>
		</div>
	);
}

export default App;
