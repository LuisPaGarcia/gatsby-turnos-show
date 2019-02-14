//@ts-check
import React, { Component } from 'react';
import { Step, Icon } from 'semantic-ui-react';

export default class Steps extends Component {
	state = {};

	render() {
		let step = this.props.active;
		return (
			<Step.Group fluid>
				<Step
					active={step === 1}
					onClick={() => {
						this.props.cambiarStep(1);
					}}
				>
					<Icon name="th" />
					<Step.Content>
						<Step.Title>Tipo de turno</Step.Title>
						<Step.Description>Elige el tipo de turno</Step.Description>
					</Step.Content>
				</Step>
				<Step
					active={step === 2}
					onClick={() => {
						this.props.cambiarStep(2);
					}}
				>
					<Icon name="qq" />
					<Step.Content>
						<Step.Title>Turnos vendidos</Step.Title>
						<Step.Description>Selecciona los turnos vendidos</Step.Description>
					</Step.Content>
				</Step>
				<Step
					active={step === 3}
					onClick={() => {
						this.props.cambiarStep(3);
					}}
				>
					<Icon name="gg" />
					<Step.Content>
						<Step.Title>Turnos no vendidos</Step.Title>
						<Step.Description>Selecciona los turnos no vendidos</Step.Description>
					</Step.Content>
				</Step>
				<Step
					active={step === 4}
					onClick={() => {
						this.props.cambiarStep(4);
					}}
				>
					<Icon name="money" />
					<Step.Content>
						<Step.Title>Tareas</Step.Title>
						<Step.Description>Ejecuta acciones</Step.Description>
					</Step.Content>
				</Step>
			</Step.Group>
		);
	}
}
