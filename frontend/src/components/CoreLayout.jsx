import { BrowserRouter } from 'react-router-dom';
import Header from './Header/Header';
import React from 'react';
import Routes from './Routes';

export default class CoreLayout extends React.Component {
	render() {
		return (
			<div>
				<BrowserRouter> 
				
					<Header />

					<Routes />	
				</BrowserRouter>
				
			</div>
		);
	}    
}
