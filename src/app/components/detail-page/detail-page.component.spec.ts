import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPageComponent } from './detail-page.component';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { PokemonState } from 'src/app/store/reducers/pokemon.reducer';
import { Store } from '@ngrx/store';
import * as fromFeature from '../../store/reducers/pokemon.reducer';
import { ActivatedRouteMock } from 'src/app/mocks/ActivatedRouteMock';
import { RouterTestingModule } from '@angular/router/testing';
import { loadPokemonById } from 'src/app/store/actions/pokemon.actions';

describe('DetailPageComponent', () => {
  let component: DetailPageComponent;
  let fixture: ComponentFixture<DetailPageComponent>;
  let store: Store<fromFeature.PokemonState>;

  let router: Router;

  const initialState: PokemonState = {
    pokemon: [],
    detailPokemon: {
      id: '',
      abilities: [],
      name: '',
      sprite: '',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPageComponent, RouterTestingModule],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: ActivatedRouteMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home', () => {
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => null));

    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith([]);
  });

  it('should dispatch load pokemon by id action', () => {
    spyOn(store, 'dispatch');
    component.pokemonId = '3';

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(loadPokemonById({ id: '3' }));
  });
});
