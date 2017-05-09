/**
 * Component for graphical representation of game scenarios using UML statechart diagram
 */

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
	endingStates: string[] = [];
	variationId: number;
	startStateId: number;

	graph = new joint.dia.Graph;

	paper;

	uml = joint.shapes.uml;
	linkAttrs = {
		'fill': 'none',
		'stroke-linejoin': 'round',
		'stroke-width': '2',
		'stroke': '#4b4a67'
	};
	attributes = {
		'.uml-state-body': {
			fill: 'rgba(48, 208, 198, 0.1)',
			stroke: 'rgba(48, 208, 198, 0.5)',
			'stroke-width': 1.5
		},
		'.uml-state-separator': {
			stroke: 'rgba(48, 208, 198, 0.4)'
		}
	}

	graphStates = [];
	graphTransitions = [];

	constructor(
		private patternService: PatternService,
		private router: Router,
    	private _route: ActivatedRoute
	) { }

	ngOnInit() {
		this.paper = new joint.dia.Paper({
			el: jQuery("#paper"),
			width: 1000,
			height: 800,
			model: this.graph,
			gridSize: 1
		});

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

						this.assignTransitions();

						this.patternService
							.getStartState(this.variationId)
							.subscribe(stateId => {
								this.startStateId = stateId;
								console.log('Start state is:', this.startStateId);

								this.initGraph();
							})
					});
			});
	}

	goToEdit() {
		this.router.navigate(['design','scenario',this.variationId]);
	}

	saveDiagram() {

	}

	addState() {
		var newState = new this.uml.State({
				position: { x: 200, y: 200 },
				size: { width: 160, height: 100 },
				name: "Added state",
				events: ["Added state description"],
				attrs: this.attributes,
				modelStateId: null,
				fullDescription: null
			})
		this.graphStates.push(newState);
		this.graph.addCell(newState);
	}

	playPattern() {
		this.router.navigate(['play',this.startStateId]);
	}

	assignTransitions() {
		for (let state of this.states) {
		state.transitions = [];
		}
		for (let transition of this.transitions) {
		transition.stateTo = this.states.filter((state) => {
			if (state.id == transition.stateToId){
			return true;
			} else {
			return false;
			}
		})[0];
		console.log(transition.stateTo);

		this.states.filter((state) => {
			if (state.id == transition.stateFromId){
			return true;
			} else {
			return false;
			}
		})[0].transitions.push(transition);
		}
	}

	initGraph() {
		this.graphStates.push(
			new this.uml.StartState({
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
			new this.uml.EndState({
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
			this.graphStates.push(new this.uml.State({
				position: { x: state.positionX, y: state.positionY },
				size: { width: state.width, height: state.height },
				name: state.name,
				events: [joint.util.breakText(state.description.substring(0, 65)+'...',  {width: state.width - 50})],
				attrs: this.attributes,
				modelStateId: state.id,
				fullDescription: state.description
			}));

			if (state.transitions.length == 0) {
				this.endingStates.push(this.graphStates[this.graphStates.length-1].id);
			}
		}
		//console.warn(this.graphStates);
		_.each(this.graphStates, (c) => { this.graph.addCell(c); });

		// all transitions connecting information carrying states
		for (let transition of this.transitions) {
			var source = this.graphStates.filter((state) => {
				if (state.attributes.modelStateId == transition.stateFromId){
					return true;
				} else {
					return false;
				}
			})[0];
			var target = this.graphStates.filter((state) => {
				if (state.attributes.modelStateId == transition.stateToId){
					return true;
				} else {
					return false;
				}
			})[0];
			// console.log(source.id);
			// console.log(target.id);

			this.graphTransitions.push(
				new this.uml.Transition({
					source: { id: source.id },
					target: { id: target.id },
					attrs: { '.connection': this.linkAttrs },
					modelTransition: transition
				})
			);
		}

		// transition for start state
		var startState = this.graphStates.filter((state) => {
			if (state.attributes.modelStateId == this.startStateId){
				return true;
			} else {
				return false;
			}
		})[0];
		this.graphTransitions.push(
			new this.uml.Transition({
				source: { id: this.graphStates[0].id },
				target: { id: startState.id },
				attrs: { '.connection': this.linkAttrs },
				modelTransition: null
			})
		);

		for (let sid of this.endingStates) {
			this.graphTransitions.push(
				new this.uml.Transition({
					source: { id: sid },
					target: { id: this.graphStates[1].id },
					attrs: { '.connection': this.linkAttrs },
					modelTransition: null
				})
			);
		}

		this.graph.addCells(this.graphTransitions);
	}

	
}
