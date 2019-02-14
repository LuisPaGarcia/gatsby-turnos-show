//@ts-check
import React, { Component } from 'react';
import '../css/style.css';
import { Header, Table, Loader, Button } from 'semantic-ui-react';
import FilaVendidos from './FilaVendidos';
import FilaNoVendidos from './FilaNoVendidos';

export default class Acciones extends Component {
	state = {
		tiposDeTurno: [],
		loading: false,
		tipoSeleccionado: null
	};
	// Método para asignar los turnos a la sede seleccionada
	asignar = ({ seleccionadosNoVendidos, seleccionadosVendidos, tipoSeleccionado }) => {
		let sede = seleccionadosNoVendidos.value;
		let returnArray = seleccionadosVendidos.map((turno) => {
			return {
				movement: 'return',
				item_id: turno.item_id,
				quantity: turno.quantity,
				client_id: turno.client_id,
				invoice_id: turno.invoice_id
			};
		});
		let reassignArray = seleccionadosVendidos.map((turno) => {
			return {
				movement: 'reasign',
				item_id: sede,
				quantity: turno.quantity,
				client_id: turno.client_id,
				invoice_id: turno.invoice_id
			};
		});

		this.send([ ...reassignArray, ...returnArray ]);
	};

	// Método que hace una petición a mockbin
	send = (dataArrays) => {
		var data = JSON.stringify(dataArrays);
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener('readystatechange', function() {
			if (this.readyState === this.DONE) {
				console.log({ data: dataArrays });
				console.log(this.responseText);
			}
		});

		xhr.open('POST', 'https://mockbin.com/request');
		xhr.setRequestHeader('accept', 'application/json');
		xhr.setRequestHeader('content-type', 'application/json');
		xhr.setRequestHeader('x-pretty-print', '2');

		xhr.send(data);
	};

	render() {
		let { loading } = this.state;
		let { seleccionadosNoVendidos, seleccionadosVendidos, tipoSeleccionado } = this.props;
		if (loading) {
			return <Loader active inline="centered" />;
		} else
			return (
				<div className="pt-8">
					<Header>Acciones</Header>
					{tipoSeleccionado !== null ? (
						<React.Fragment>
							<Header as="h3">Tipo seleccionado</Header>
							<Table>
								<Table.Header>
									<Table.Cell>Tipo Seleccionado</Table.Cell>
								</Table.Header>
								<Table.Body>
									<Table.Cell>{tipoSeleccionado.todo.name}</Table.Cell>
								</Table.Body>
							</Table>
						</React.Fragment>
					) : (
						<Header as="h2">No has seleccionado tipo</Header>
					)}
					{seleccionadosVendidos.length > 0 ? (
						<React.Fragment>
							<Header as="h3">Turnos seleccionados</Header>
							<Table>
								<Table.Header>
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
									{seleccionadosVendidos.map((s) => {
										return <FilaVendidos key={s.id} turno={s} view />;
									})}
								</Table.Body>
							</Table>
						</React.Fragment>
					) : (
						<Header as="h2">No has seleccionado turnos vendidos</Header>
					)}
					{seleccionadosNoVendidos.turno ? (
						<React.Fragment>
							<Header as="h3">Sede seleccionada</Header>
							<Table>
								<Table.Header>
									<Table.Cell>Código</Table.Cell>
									<Table.Cell>Nombre</Table.Cell>
									<Table.Cell>Disponible</Table.Cell>
								</Table.Header>
								<Table.Body>
									{[ ...seleccionadosNoVendidos.turno ].map((t) => {
										return <FilaNoVendidos key={t.item_code} turno={t} view />;
									})}
								</Table.Body>
							</Table>
						</React.Fragment>
					) : (
						<Header as="h2">No has seleccionado sede de no vendidos</Header>
					)}
					<Button
						size="massive"
						primary
						disabled={
							!seleccionadosNoVendidos.turno ||
							!(seleccionadosVendidos.length > 0) ||
							!(tipoSeleccionado !== null)
						}
						onClick={() => {
							this.asignar({ seleccionadosNoVendidos, seleccionadosVendidos, tipoSeleccionado });
						}}
					>
						Asignar turnos liberados (resultado en la consola)
					</Button>
				</div>
			);
	}
}
