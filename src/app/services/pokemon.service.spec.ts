import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PokemonService);

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all pokemon', () => {
    const expectedPokemon: Pokemon[] = [
      {
        id: '1',
        name: 'bulbasaur',
        sprite:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        abilities: [],
      },
      {
        id: '2',
        name: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
        sprite: '',
        abilities: [],
      },
    ];

    httpClientSpy.get.and.returnValue(expectedPokemon);

    service.getAllPokemon().subscribe((allPokemon) => {
      expect(allPokemon).toEqual(expectedPokemon);
    });
  });

  it('should get pokemon by id 1', () => {
    const mockResponse: any = {
      id: '1',
      name: 'bulbasaur',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/pokemon/1.png',
      abilities: [],
      height: 20,
      weight: 20,
      types: [
        {
          slot: 1,
          type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
        },
        {
          slot: 2,
          type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
        },
      ],
    };

    const expectedPokemon: Pokemon = {
      id: '1',
      name: 'bulbasaur',
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      abilities: [],
      height: 20,
      weight: 20,
      types: [
        {
          type: {
            name: 'grass',
            url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/12.png',
          },
        },
        {
          type: {
            name: 'poison',
            url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/4.png',
          },
        },
      ],
    };

    httpClientSpy.get.and.returnValue(mockResponse);

    service.getPokemonById('1').subscribe((pokemon) => {
      expect(pokemon).toEqual(expectedPokemon);
    });

    const mockReq = httpTestingController.expectOne(
      'https://pokeapi.co/api/v2/pokemon/1'
    );

    mockReq.flush(mockResponse);

    httpTestingController.verify();
  });
});
