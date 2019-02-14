//@ts-check
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import '../css/style.css';
import { Header } from './Header';
class Layout extends Component {
	render() {
		return (
			<div>
				<Header />
				<div className="pt-8">
					<Container>{this.props.children}</Container>
				</div>
			</div>
		);
	}
}

export { Layout };
