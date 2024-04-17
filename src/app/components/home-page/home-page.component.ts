import { CommonModule, NgIf } from '@angular/common';
import {
  Component,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { IdPipe } from 'src/app/pipes/id.pipe';
import { loadAllPokemon } from 'src/app/store/actions/pokemon.actions';
import { PokemonState } from 'src/app/store/reducers/pokemon.reducer';
import { selectAllPokemon } from 'src/app/store/selectors/pokemon.selector';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, IdPipe, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private router: Router = inject(Router);
  private store: Store<{ pokemon: PokemonState }> = inject(Store);

  pokemonList$: Observable<Pokemon[]> | undefined;
  allPokemon: Pokemon[] = [];
  pokemonListToShow: Signal<Pokemon[]> = computed(() =>
    this.resolvePokemonList()
  );
  amountToShow: WritableSignal<number> = signal(0);

  searching: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.pokemonList$ = this.store.select(selectAllPokemon);

    this.pokemonList$.subscribe((pokemonList) => {
      this.allPokemon = pokemonList;
      if (this.allPokemon.length > 10) {
        this.amountToShow.update(() => 36);
      } else {
        this.store.dispatch(loadAllPokemon());
      }
    });
  }

  navigateById(pokemonId: string): void {
    this.router.navigateByUrl(`details/${pokemonId}`);
  }
  showMore(): void {
    this.amountToShow.update((value) => value + 36);
  }

  resolvePokemonList(): Pokemon[] {
    if (this.searching()) {
      return this.allPokemon.filter(
        (pokemon) =>
          pokemon.name.includes(this.searching()) ||
          pokemon.id.includes(this.searching())
      );
    }
    return this.allPokemon?.slice(0, this.amountToShow());
  }
}
