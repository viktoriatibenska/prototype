import { Variation } from './variation';

export class Pattern {
    id: number;
    primaryVariationId: number;
    name: string;
    context: string;
    forces: string;
    solution: string;
    discussion: string;
    patlet: string;
    rating: number;
    isPublished: boolean;

    variations: Variation[];
}
