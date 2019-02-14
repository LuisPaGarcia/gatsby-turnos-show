//@ts-check
import React, { Component } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import '../css/style.css';
import Axios from 'axios';
import { ENDPOINTS } from '../utils/utils';
import { Header, Loader, Dropdown } from 'semantic-ui-react';

export default class TiposDeTurno extends Component {
	state = {
		tiposDeTurno: [],
		loading: false,
		tipoSeleccionado: null
	};

	// Convierte el array de tipos en formato legible para el componente de semantic
	trataTipos = (tipos) => {
		return tipos.map((t) => ({
			key: t.id,
			value: t.id,
			text: t.name,
			todo: t
		}));
	};

	componentDidMount() {
		let user = netlifyIdentity.currentUser();
		if (user !== null) {
			let { guardar, valores, tipoSeleccionado } = this.props;
			if (valores.length === 0) {
				this.setState({
					loading: true,
					tipoSeleccionado
				});

				Axios.get(ENDPOINTS.tiposDeTurno)
					.then(({ data }) => {
						guardar('tiposDeTurno', data);
						this.setState({
							tiposDeTurno: this.trataTipos(data.filter((d) => d.virtual === false)),
							loading: false
						});
					})
					.catch((error) => {
						console.error(error);
					});
			} else {
				this.setState({
					tiposDeTurno: this.trataTipos(valores),
					tipoSeleccionado
				});
			}
		}
	}

	// Método para asignar el valor seleccionado del Dropdown
	seleccionaTipo = (e, item) => {
		this.setState(
			{
				tipoSeleccionado: item.value
			},
			() => {
				let completo = item.options.filter((f) => f.value === item.value)[0];
				this.props.guardar('tipoSeleccionado', completo);
			}
		);
	};
	render() {
		let { tiposDeTurno, loading, tipoSeleccionado } = this.state;
		if (loading) {
			return <Loader active inline="centered" />;
		} else
			return (
				<div className="pt-8">
					<Header>Tipos de turno</Header>
					<Dropdown
						value={tipoSeleccionado}
						onChange={this.seleccionaTipo}
						placeholder="Selecciona el tipo"
						fluid
						search
						selection
						options={tiposDeTurno}
					/>
				</div>
			);
	}
}
