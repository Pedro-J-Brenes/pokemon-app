import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PokemonActions from '../actions/pokemon.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon.model';

@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {}

  loadAllPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadAllPokemon),
      exhaustMap(() =>
        this.pokemonService.getAllPokemon().pipe(
          map((pokemon: Pokemon[]) =>
            PokemonActions.loadAllPokemonSuccess({ pokemon })
          ),
          catchError((error: any) =>
            of(PokemonActions.loadAllPokemonFailure({ error }))
          )
        )
      )
    )
  );

  loadPokemonById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemonById),
      exhaustMap(({ id }) =>
        this.pokemonService.getPokemonById(id).pipe(
          map((pokemon: Pokemon) => {
            return PokemonActions.loadPokemonByIdSuccess({ pokemon });
          }),
          catchError((error: any) =>
            of(PokemonActions.loadPokemonByIdFailure({ error }))
          )
        )
      )
    )
  );
}
