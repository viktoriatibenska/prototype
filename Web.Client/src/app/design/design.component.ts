import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
const joint = require('../../../node_modules/jointjs/dist/joint.js');

import { PatternService } from '../pattern.service';
import { State } from '../objects/state';
import { Transition } from '../objects/transition';

@Component({
	selector: 'app-design',
	templateUrl: './design.component.html',
	styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {

	public states: State[] = [];
	public transitions: Transition[] = [];
	variationId: number;
	startStateId: number;

	constructor(
		private patternService: PatternService,
		private router: Router,
    	private _route: ActivatedRoute
	) { }

	ngOnInit() {
		this.variationId = parseInt(this._route.snapshot.params['variationId']);
		this.patternService
			.getStates(this.variationId)
			.subscribe(states => {
				this.states = states;
				console.log('States get success', this.states);

				this.patternService
					.getTransitionsByVariation(this.variationId)
					.subscribe(transitions => {
						this.transitions = transitions;
						console.log('Transitions get success', this.transitions);

						this.patternService
							.getStartState(this.variationId)
							.subscribe(stateId => {
								this.startStateId = stateId;
								console.log('Start state is:', this.startStateId);

								let breakWidth = 120;
								let graph = new joint.dia.Graph;

								let paper = new joint.dia.Paper({
									el: jQuery("#paper"),
									width: 1000,
									height: 800,
									model: graph,
									gridSize: 1
								});

								var uml = joint.shapes.uml;
								var linkAttrs = {
									'fill': 'none',
									'stroke-linejoin': 'round',
									'stroke-width': '2',
									'stroke': '#4b4a67'
								};
								var attributes = {
									'.uml-state-body': {
										fill: 'rgba(48, 208, 198, 0.1)',
										stroke: 'rgba(48, 208, 198, 0.5)',
										'stroke-width': 1.5
									},
									'.uml-state-separator': {
										stroke: 'rgba(48, 208, 198, 0.4)'
									}
								}

								var graphStates = [];

								graphStates.push(
									new uml.StartState({
										position: { x: 215, y: 20 },
										size: { width: 30, height: 30 },
										attrs: {
											'circle': {
												fill: '#4b4a67',
												stroke: 'none'
											}
										},
										modelStateId: null,
										fullDescription: null
									}),
									new uml.EndState({
										position: { x: 820, y: 585 },
										size: { width: 30, height: 30 },
										attrs: {
											'.outer': {
												stroke: "#4b4a67",
												'stroke-width': 2
											},
											'.inner': {
												fill: '#4b4a67'
											}
										},
										modelStateId: null,
										fullDescription: null
									})
								)

								for (let state of this.states){
									graphStates.push(new uml.State({
										position: { x: state.positionX, y: state.positionY },
										size: { width: state.width, height: state.height },
										name: state.name,
										events: [joint.util.breakText(state.description.substring(0, 65)+'...',  {width: state.width - 50})],
										attrs: attributes,
										modelStateId: state.id,
										fullDescription: state.description
									}))
								}
								console.warn(graphStates);
								_.each(graphStates, (c) => { graph.addCell(c); });

								var graphTransitions = [];

								// all transitions connecting information carrying states
								for (let transition of this.transitions) {
									var source = graphStates.filter((state) => {
										if (state.attributes.modelStateId == transition.stateFromId){
											return true;
										} else {
											return false;
										}
									})[0];
									var target = graphStates.filter((state) => {
										if (state.attributes.modelStateId == transition.stateToId){
											return true;
										} else {
											return false;
										}
									})[0];
									console.log(source.id);
									console.log(target.id);

									graphTransitions.push(
										new uml.Transition({
											source: { id: source.id },
											target: { id: target.id },
											attrs: { '.connection': linkAttrs },
											modelTransition: transition
										})
									);
								}

								// transition for start state
								var startState = graphStates.filter((state) => {
									if (state.attributes.modelStateId == this.startStateId){
										return true;
									} else {
										return false;
									}
								})[0];
								graphTransitions.push(
									new uml.Transition({
										source: { id: graphStates[0].id },
										target: { id: startState.id },
										attrs: { '.connection': linkAttrs },
										modelTransition: null
									})
								);

								// transitions for end states
								var endStates = graphStates.filter((state) => {
									if (state.attributes.modelStateId == this.startStateId){
										return true;
									} else {
										return false;
									}
								})

								graph.addCells(graphTransitions);
							})
					});
			});


		
	}

}
