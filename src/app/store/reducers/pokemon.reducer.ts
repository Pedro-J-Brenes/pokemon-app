import { createReducer, on } from '@ngrx/store';
import { Pokemon } from 'src/app/models/pokemon.model';
import {
  loadAllPokemon,
  loadAllPokemonFailure,
  loadAllPokemonSuccess,
  loadPokemonById,
  loadPokemonByIdFailure,
  loadPokemonByIdSuccess,
} from '../actions/pokemon.actions';

export interface PokemonState {
  pokemon: Pokemon[];
  detailPokemon: Pokemon;
  error?: string;
}

export const initialSate: PokemonState = {
  pokemon: [],
  detailPokemon: {
    id: '',
    abilities: [],
    name: '',
    sprite: '',
  },
};

export const PokemonReducer = createReducer(
  initialSate,
  on(loadAllPokemon, (state) => state),
  on(loadAllPokemonSuccess, (state, { pokemon }) => ({
    ...state,
    pokemon,
  })),
  on(loadAllPokemonFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(loadPokemonById, (state) => ({
    ...state,
    detailPokemon: initialSate.detailPokemon,
  })),
  on(loadPokemonByIdSuccess, (state, { pokemon }) => ({
    ...state,
    pokemon: state.pokemon.some(
      (statePokemon) => statePokemon.id.toString() === pokemon.id.toString()
    )
      ? state.pokemon.map((statePokemon) =>
          statePokemon.id.toString() === pokemon.id.toString()
            ? pokemon
            : statePokemon
        )
      : [...state.pokemon, pokemon],
    detailPokemon: pokemon,
  })),
  on(loadPokemonByIdFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
