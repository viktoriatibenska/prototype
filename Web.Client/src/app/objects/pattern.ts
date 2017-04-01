import { Variation } from './variation';

export class Pattern {
    private id: number;
    private primaryVariationId: number;
    private name: string;
    private context: string;
    private forces: string;
    private solution: string;
    private discussion: string;
    private patlet: string;
    private rating: number;
    private isPublished: boolean;

    private variations: Variation[];

    constructor(
        id: number,
        primaryVariationId: number,
        name: string,
        context: string,
        forces: string,
        solution: string,
        discussion: string,
        patlet: string,
        rating: number,
        isPublished: boolean
    ){
        this.id = id;
        this.primaryVariationId = primaryVariationId;
        this.name = name;
        this.context = context;
        this.forces = forces;
        this.solution = solution;
        this.discussion = discussion;
        this.patlet = patlet;
        this.rating = rating;
        this.isPublished = isPublished;
    }

    setVariations(variations: Variation[]){
        this.variations = variations;
    }

    getId(){
        return this.id;
    }

    getPrimaryVariationId(){
        return this.primaryVariationId;
    }

    getName(){
        return this.name;
    }
}
