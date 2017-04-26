export class Variation {
    id: number;
    startStateId: number;
    createdById: number;
    name: string;
    note: string;
    createdTime: Date;

    constructor(
        id: number,
        startStateId: number,
        createdById: number,
        name: string,
        note: string,
        createdTime: Date
    ){
        this.id = id;
        this.startStateId = startStateId;
        this.createdById = createdById;
        this.name = name;
        this.note = note;
        this.createdTime = createdTime;
    }

    getStartStateId(){
        return this.startStateId;    
    }
}
