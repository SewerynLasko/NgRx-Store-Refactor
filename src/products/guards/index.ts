import { PizzaExistsGuard } from './pizza-exists.guard';
import { PizzasGuard } from './pizzas.guard';

export const guards: any[] = [PizzasGuard, PizzaExistsGuard];

export * from './pizzas.guard';
export * from './pizza-exists.guard';
