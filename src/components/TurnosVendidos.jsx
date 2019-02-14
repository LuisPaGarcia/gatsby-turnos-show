//@ts-check
import React, { Component } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import '../css/style.css';
import Axios from 'axios';
import { ENDPOINTS } from '../utils/utils';
import { Header, Table, Loader, Pagination } from 'semantic-ui-react';
import FilaVendidos from './FilaVendidos';

export default class TurnosVendidos extends Component {
	state = {
		turnosVendidos: [],
		seleccionados: [],
		seleccionadosId: [],
		paginaSeleccionada: 1,
		cantidadPaginas: 0,
		first: 40,
		offset: 0,
		step: 40
	};

	// Método para seleccionar o des seleccionar checkbox de turnos
	seleccionar = (turno) => {
		let seleccionados = [];
		let seleccionadosId = [];
		if (this.state.seleccionadosId.includes(turno.id)) {
			seleccionados = this.state.seleccionados.filter((s) => s.id !== turno.id);
			seleccionadosId = this.state.seleccionadosId.filter((s) => s !== turno.id);
		} else {
			seleccionados = [ ...this.state.seleccionados, turno ];
			seleccionadosId = [ ...this.state.seleccionadosId, turno.id ];
		}
		this.setState(
			{
				seleccionados,
				seleccionadosId
			},
			() => {
				this.props.guardar('seleccionadosVendidos', this.state.seleccionados);
				this.props.guardar('seleccionadosVendidosID', this.state.seleccionadosId);
			}
		);
	};
	componentDidMount() {
		let user = netlifyIdentity.currentUser();
		if (user !== null) {
			let { guardar, valores, seleccionadosVendidosID } = this.props;
			if (valores.length === 0) {
				this.setState({
					loading: true
				});

				Axios.get(ENDPOINTS.turnosVendidos)
					.then(({ data }) => {
						guardar('turnosVendidos', data);
						this.setState({
							turnosVendidos: data,
							loading: false,
							seleccionadosId: seleccionadosVendidosID,
							cantidadPaginas: Math.floor(data.length / this.state.first) + 1
						});
					})
					.catch((error) => {
						console.error(error);
					});
			} else {
				this.setState({
					turnosVendidos: valores,
					seleccionadosId: seleccionadosVendidosID,
					cantidadPaginas: Math.floor(valores.length / this.state.first) + 1
				});
			}
		}
	}

	// Método para cambiar de página de turnos
	cambioDePagina = (e, { activePage }) => {
		let offset = (activePage - 1) * this.state.step;
		let first = offset + this.state.step;
		this.setState({ paginaSeleccionada: activePage, offset, first });
	};

	render() {
		let {
			turnosVendidos,
			loading,
			seleccionadosId,
			paginaSeleccionada,
			first,
			cantidadPaginas,
			offset
		} = this.state;

		if (loading) {
			return <Loader active inline="centered" />;
		} else
			return (
				<div className="pt-8">
					<Header>Turnos Vendidos</Header>
					<div>
						<Pagination
							activePage={paginaSeleccionada}
							boundaryRange={1}
							//@ts-ignore
							onPageChange={this.cambioDePagina}
							size="big"
							siblingRange={4}
							totalPages={cantidadPaginas}
							ellipsisItem={true ? undefined : null}
							firstItem={true ? undefined : null}
							lastItem={true ? undefined : null}
							prevItem={true ? undefined : null}
							nextItem={true ? undefined : null}
						/>
					</div>
					<Table>
						<Table.Header>
							<Table.Cell>Selector</Table.Cell>
							<Table.Cell>Factura</Table.Cell>
							<Table.Cell>Orden</Table.Cell>
							<Table.Cell>Fecha</Table.Cell>
							<Table.Cell>Código</Table.Cell>
							<Table.Cell>Item</Table.Cell>
							<Table.Cell>Cantidad</Table.Cell>
							<Table.Cell>Precio Unitario</Table.Cell>
							<Table.Cell>Precio</Table.Cell>
							<Table.Cell>Cliente</Table.Cell>
							<Table.Cell>Cod. Cliente</Table.Cell>
						</Table.Header>
						<Table.Body>
							{turnosVendidos
								.slice(offset, first)
								.map((t) => (
									<FilaVendidos
										key={t.id}
										turno={t}
										seleccionar={this.seleccionar}
										seleccionado={seleccionadosId.includes(t.id)}
									/>
								))}
						</Table.Body>
					</Table>
				</div>
			);
	}
}
