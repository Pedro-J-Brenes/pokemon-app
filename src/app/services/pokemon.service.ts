import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FetchPokemon, Pokemon, PokemonType } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private _http: HttpClient = inject(HttpClient);

  private apiUrl: string = 'https://pokeapi.co/api/v2/';

  getAllPokemon(): Observable<Pokemon[]> {
    return this._http
      .get<FetchPokemon>(`${this.apiUrl}pokemon?limit=2000`)
      .pipe(map(this.completePokemonInfo));
  }

  getPokemonById(id: string): Observable<Pokemon> {
    return this._http.get<Pokemon>(`${this.apiUrl}pokemon/${id}`).pipe(
      map((result) => {
        const sprite: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.id}.png`;

        return {
          id: `${result.id}`,
          sprite: sprite,
          name: result.name,
          abilities: result.abilities,
          types: this.resolveTypes(result),
          height: result.height,
          weight: result.weight,
        };
      })
    );
  }

  private completePokemonInfo(response: FetchPokemon): Pokemon[] {
    const pokemonList: Pokemon[] = response.results.map((pokemon) => {
      const id: string = pokemon.url.split('/')[6];
      const sprite: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      return {
        id,
        sprite,
        name: pokemon.name,
        abilities: [],
      };
    });
    return pokemonList;
  }

  private resolveTypes(response: Pokemon): PokemonType[] {
    return (
      response.types?.map((type) => {
        console.log(type.type.url);

        const id: string = type.type.url.split('/')[6];
        return {
          type: {
            name: type.type.name,
            url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/${id}.png`,
          },
        };
      }) || []
    );
  }
}
