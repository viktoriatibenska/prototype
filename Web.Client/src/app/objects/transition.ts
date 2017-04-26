export class Transition {
    id: number;
    name: string;
    description: string;
    stateFromId: number;
    stateToId: number;

    constructor(
        id: number,
        name: string,
        description: string,
        stateFromId: number,
        stateToId: number
    ){
        this.id = id;
        this.name = name;
        this.description = description;
        this.stateFromId = stateFromId;
        this.stateToId = stateToId;
    }
}
