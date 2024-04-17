export interface SelectPokemon {
  url: string;
  name: string;
  sprite: string;
}

export interface FetchPokemon {
  count: number;
  next: string;
  results: SelectPokemon[];
}

export interface Pokemon {
  id: string;
  name: string;
  sprite: string;
  abilities: PokemonAbility[];
  types?: PokemonType[];
  height?: number;
  weight?: number;
}

export interface Type {
  name: string;
  url: string;
}

export interface Ability {
  name: string;
  url: string;
}

export interface PokemonType {
  type: Type;
}

export interface PokemonAbility {
  ability: Ability;
}
