import React, { Component } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import { navigate } from 'gatsby';
import { Layout } from '../components/Layout';
import '../css/style.css';

export default class Index extends Component {
	componentDidMount() {
		let user = netlifyIdentity.currentUser();

		if (user !== null) navigate('/app');
	}
	render() {
		return (
			<Layout>
				<div className="pt-8">
					<h1>Gatsby-turnos.netlify.com</h1>
				</div>
			</Layout>
		);
	}
}
