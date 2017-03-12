import { Transition } from './transition';

export class State {
    id: number;
    name: string;
    description: string;
    transitions: Transition[];
}
