import { Variation } from './variation';

export class Pattern {
    id: number;
    primaryVariationId: number;
    primaryVariation: Variation;
    name: string;
    context: string;
    forces: string;
    solution: string;
    discussion: string;
    patlet: string;
    rating: number;
    isPublished: boolean;

    variations: Variation[];

    constructor(
        id: number,
        primaryVariationId: number,
        primaryVariation: Variation,
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
        this.primaryVariation = primaryVariation;
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

    getPrimaryVariation(){
        return this.primaryVariation;
    }
}
