import { trigger, state, style, transition, animate } from '@angular/core';

export const animationFade = trigger('animationFade', [
    state('void', style({ opacity: 0 })),
    state('*', style({ opacity: 1 })),
    transition('void => *', animate('1s ease-in-out')),
    transition('* => void', animate('3s 3s'))
]);