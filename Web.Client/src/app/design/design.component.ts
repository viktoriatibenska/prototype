import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
const joint = require('../../../node_modules/jointjs/dist/joint.js');

@Component({
	selector: 'app-design',
	templateUrl: './design.component.html',
	styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {

	constructor() { }

	ngOnInit() {
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

		var states = {

			s0: new uml.StartState({
				position: { x: 215, y: 20 },
				size: { width: 30, height: 30 },
				attrs: {
					'circle': {
						fill: '#4b4a67',
						stroke: 'none'
					}
				}
			}),

			s1: new uml.State({
				position: { x: 150, y: 100 },
				size: { width: 160, height: 100 },
				name: "state 1",
				events: [joint.util.breakText('Creating the architecture document',  {width: breakWidth})],
				attrs: {
					'.uml-state-body': {
						fill: 'rgba(48, 208, 198, 0.1)',
						stroke: 'rgba(48, 208, 198, 0.5)',
						'stroke-width': 1.5
					},
					'.uml-state-separator': {
						stroke: 'rgba(48, 208, 198, 0.4)'
					}
				}
			}),

			s2: new uml.State({
				position: { x: 150, y: 280 },
				size: { width: 160, height: 100 },
				name: "state 2",
				events: [joint.util.breakText("Making some implementation according to the architecture document",  {width: breakWidth})],
				attrs: {
					'.uml-state-body': {
						fill: 'rgba(48, 208, 198, 0.1)',
						stroke: 'rgba(48, 208, 198, 0.5)',
						'stroke-width': 1.5
					},
					'.uml-state-separator': {
						stroke: 'rgba(48, 208, 198, 0.4)'
					}
				}
			}),

			s3: new uml.State({
				position: { x: 20, y: 480 },
				size: { width: 160, height: 100 },
				name: "state 3",
				events: [joint.util.breakText("Solving the problems with implementation",  {width: breakWidth})],
				attrs: {
					'.uml-state-body': {
						fill: 'rgba(48, 208, 198, 0.1)',
						stroke: 'rgba(48, 208, 198, 0.5)',
						'stroke-width': 1.5
					},
					'.uml-state-separator': {
						stroke: 'rgba(48, 208, 198, 0.4)'
					}
				}
			}),

			s4: new uml.State({
				position: { x: 250, y: 480 },
				size: { width: 160, height: 100 },
				name: "state 4",
				events: [joint.util.breakText("Adapting the architecture document to correspond to the implementation",  {width: breakWidth})],
				attrs: {
					'.uml-state-body': {
						fill: 'rgba(48, 208, 198, 0.1)',
						stroke: 'rgba(48, 208, 198, 0.5)',
						'stroke-width': 1.5
					},
					'.uml-state-separator': {
						stroke: 'rgba(48, 208, 198, 0.4)'
					}
				}
			}),

			s5: new uml.State({
				position: { x: 450, y: 100 },
				size: { width: 160, height: 100 },
				name: "state 5",
				events: [joint.util.breakText("Discussing the implementation problems with the developer",  {width: breakWidth})],
				attrs: {
					'.uml-state-body': {
						fill: 'rgba(48, 208, 198, 0.1)',
						stroke: 'rgba(48, 208, 198, 0.5)',
						'stroke-width': 1.5
					},
					'.uml-state-separator': {
						stroke: 'rgba(48, 208, 198, 0.4)'
					}
				}
			}),

			s6: new uml.State({
				position: { x: 450, y: 250 },
				size: { width: 160, height: 100 },
				name: "state 6",
				events: [joint.util.breakText("Resolving the implementation problems together with developer",  {width: breakWidth})],
				attrs: {
					'.uml-state-body': {
						fill: 'rgba(48, 208, 198, 0.1)',
						stroke: 'rgba(48, 208, 198, 0.5)',
						'stroke-width': 1.5
					},
					'.uml-state-separator': {
						stroke: 'rgba(48, 208, 198, 0.4)'
					}
				}
			}),

			s7: new uml.State({
				position: { x: 450, y: 400 },
				size: { width: 160, height: 100 },
				name: "state 7",
				events: [joint.util.breakText('Deciding how to deal with the errors in the architecture document',  {width: breakWidth})],
				attrs: {
					'.uml-state-body': {
						fill: 'rgba(48, 208, 198, 0.1)',
						stroke: 'rgba(48, 208, 198, 0.5)',
						'stroke-width': 1.5
					},
					'.uml-state-separator': {
						stroke: 'rgba(48, 208, 198, 0.4)'
					}
				}
			}),

			s8: new uml.State({
				position: { x: 450, y: 550 },
				size: { width: 160, height: 100 },
				name: "state 8",
				events: [joint.util.breakText("Gaining expertise for future architectural decisions",  {width: breakWidth})],
				attrs: {
					'.uml-state-body': {
						fill: 'rgba(48, 208, 198, 0.1)',
						stroke: 'rgba(48, 208, 198, 0.5)',
						'stroke-width': 1.5
					},
					'.uml-state-separator': {
						stroke: 'rgba(48, 208, 198, 0.4)'
					}
				}
			}),

			s9: new uml.State({
				position: { x: 750, y: 250 },
				size: { width: 160, height: 100 },
				name: "state 9",
				events: [joint.util.breakText("Losing insight into the implementation restrictions",  {width: breakWidth})],
				attrs: {
					'.uml-state-body': {
						fill: 'rgba(48, 208, 198, 0.1)',
						stroke: 'rgba(48, 208, 198, 0.5)',
						'stroke-width': 1.5
					},
					'.uml-state-separator': {
						stroke: 'rgba(48, 208, 198, 0.4)'
					}
				}
			}),

			se: new uml.EndState({
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
				}
			})

		};
		_.each(states, function (c) { graph.addCell(c); });

		var transitons = [
			new uml.Transition({
				source: { id: states.s0.id },
				target: { id: states.s1.id },
				attrs: { '.connection': linkAttrs }
			}),
			new uml.Transition({
				source: { id: states.s1.id },
				target: { id: states.s2.id },
				attrs: { '.connection': linkAttrs }
			}),
			new uml.Transition({
				source: { id: states.s2.id },
				target: { id: states.s3.id },
				attrs: { '.connection': linkAttrs }
			}),
			new uml.Transition({
				source: { id: states.s3.id },
				target: { id: states.s4.id },
				attrs: { '.connection': linkAttrs }
			}),
			new uml.Transition({
				source: { id: states.s4.id },
				target: { id: states.s2.id },
				attrs: { '.connection': linkAttrs }
			}),
			new uml.Transition({
				source: { id: states.s2.id },
				target: { id: states.s5.id },
				attrs: { '.connection': linkAttrs }
			}),
			new uml.Transition({
				source: { id: states.s5.id },
				target: { id: states.s6.id },
				attrs: { '.connection': linkAttrs }
			}),
			new uml.Transition({
				source: { id: states.s5.id },
				target: { id: states.s9.id },
				attrs: { '.connection': linkAttrs }
			}),
			new uml.Transition({
				source: { id: states.s6.id },
				target: { id: states.s7.id },
				attrs: { '.connection': linkAttrs }
			}),
			new uml.Transition({
				source: { id: states.s7.id },
				target: { id: states.s6.id },
				attrs: { '.connection': linkAttrs }
			}),
			new uml.Transition({
				source: { id: states.s7.id },
				target: { id: states.s9.id },
				attrs: { '.connection': linkAttrs }
			}),
			new uml.Transition({
				source: { id: states.s7.id },
				target: { id: states.s8.id },
				attrs: { '.connection': linkAttrs }
			}),
			new uml.Transition({
				source: { id: states.s9.id },
				target: { id: states.se.id },
				attrs: { '.connection': linkAttrs }
			}),
			new uml.Transition({
				source: { id: states.s8.id },
				target: { id: states.se.id },
				attrs: { '.connection': linkAttrs }
			}),
		];

		graph.addCells(transitons);
	}

}
