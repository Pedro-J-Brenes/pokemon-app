import { createAction, props } from '@ngrx/store';
import { Pokemon } from 'src/app/models/pokemon.model';

export const loadAllPokemon = createAction('[Home] Load All Pokemon');

export const loadAllPokemonSuccess = createAction(
  '[Home] Load All Pokemon Success',
  props<{ pokemon: Pokemon[] }>()
);
export const loadAllPokemonFailure = createAction(
  '[Home] Load All Pokemon Failure',
  props<{ error: string }>()
);

export const loadPokemonById = createAction(
  '[Detail] Load Pokemon By Id',
  props<{ id: string }>()
);
export const loadPokemonByIdSuccess = createAction(
  '[Detail] Load Pokemon By Id Success',
  props<{ pokemon: Pokemon }>()
);
export const loadPokemonByIdFailure = createAction(
  '[Detail] Load Pokemon By Id Failure',
  props<{ error: string }>()
);
