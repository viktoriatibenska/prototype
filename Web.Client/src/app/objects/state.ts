import { Transition } from './transition';

export class State {
    id: number;
    variationId: number;
    name: string;
    description: string;
    positionX: number;
    positionY: number;
    
    transitions: Transition[];
}
