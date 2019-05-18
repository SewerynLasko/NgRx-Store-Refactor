import { PizzaEffects } from './pizza.effect';

// Array of effects that we can import to our module and register them as a whole, not as a pieces
export const effects: any[] = [PizzaEffects];

export * from './pizza.effect';

