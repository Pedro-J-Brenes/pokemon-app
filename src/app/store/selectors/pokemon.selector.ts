import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { PokemonState } from '../reducers/pokemon.reducer';

export const selectPokemon = (state: AppState) => state.pokemon;
export const selectAllPokemon = createSelector(
  selectPokemon,
  (state: PokemonState) => state.pokemon
);
export const selectPokemonById = createSelector(
  selectPokemon,
  (state: PokemonState) => state.detailPokemon
);
