import { PizzaExistsGuard } from './pizza-exists.guard';
import { PizzasGuard } from './pizzas.guard';
import { ToppingsGuard } from './toppings.guard';

export const guards: any[] = [PizzasGuard, PizzaExistsGuard, ToppingsGuard];

export * from './pizza-exists.guard';
export * from './pizzas.guard';
export * from './toppings.guard';
