import { PizzaEffects } from './pizza.effect';
import { ToppingsEffects } from './toppings.effect';

// Array of effects that we can import to our module and register them as a whole, not as a pieces
export const effects: any[] = [PizzaEffects, ToppingsEffects]; // <- This goes to ProductModule

export * from './pizza.effect';
export * from './toppings.effect';
