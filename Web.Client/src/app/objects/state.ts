import { Transition } from './transition';

export class State {
    id: number;
    variationId: number;
    name: string;
    description: string;
    positionX: number;
    positionY: number;
    
    transitions: Transition[];

    constructor(
        id: number,
        variationId: number,
        name: string,
        description: string,
        positionX: number,
        positionY: number
    ){
        this.id = id;
        this.variationId = variationId;
        this.name = name;
        this.description = description;
        this.positionX = positionX;
        this.positionY = positionY;
    }

    setTransitions(transitions: Transition[]){
        this.transitions = transitions;
    }
}
