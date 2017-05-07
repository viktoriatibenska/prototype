import { Pattern } from './objects/pattern';
import { Variation } from './objects/variation';
import { State } from './objects/state';
import { Transition } from './objects/transition';

export function toPatternWithVariation(r: any): Pattern {
    let pattern = new Pattern(
        r.pattern_pk_id,
        r.primary_variation_id,
        new Variation(
            r.variation_pk_id,
            r.start_state_id,
            r.created_by_id,
            r.variation_name,
            r.note,
            r.created_time
        ),
        r.pattern_name,
        r.context,
        r.forces,
        r.solution,
        r.discussion,
        r.patlet,
        r.rating,
        r.is_published
    );
    console.log('Parsed pattern:', pattern);
    return pattern;
}

export function toPattern(r: any): Pattern {
    let pattern = new Pattern(
        r.id,
        r.primary_variation_id,
        null,
        r.name,
        r.context,
        r.forces,
        r.solution,
        r.discussion,
        r.patlet,
        r.rating,
        r.is_published
    );
    console.log('Parsed pattern:', pattern);
    return pattern;
}

export function toState(r: any): State {
    let state = new State(
        r.id,
        r.variation_id,
        r.name,
        r.description,
        r.positionX,
        r.positionY,
        r.width,
        r.height
    );
    console.log('Parsed state:', state);
    return state;
}

export function toTransition(r: any): Transition {
    let transition = new Transition(
        r.id,
        r.name,
        r.description,
        r.state_from_id,
        r.state_to_id
    );
    console.log('Parsed transition:', transition);
    return transition;
}