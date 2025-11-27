import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pokemon } from '../../models/pokemon.model';
import { HeightPipe } from '../../pipes/height.pipe';
import { IdPipe } from '../../pipes/id.pipe';
import { loadPokemonById } from '../../store/actions/pokemon.actions';
import { PokemonState } from '../../store/reducers/pokemon.reducer';
import { selectPokemonById } from '../../store/selectors/pokemon.selector';

@Component({
  selector: 'app-detail-page',
  imports: [CommonModule, IdPipe, HeightPipe],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss',
})
export class DetailPageComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  private store: Store<{ pokemon: PokemonState }> = inject(Store);

  pokemonId: string | null = this.route.snapshot?.paramMap.get('id');
  pokemon$: Observable<Pokemon> = this.store.select(selectPokemonById);

  ngOnInit(): void {
    if (!this.pokemonId) {
      this.router.navigate([]);
    }
    this.store.dispatch(loadPokemonById({ id: this.pokemonId! }));
  }
}
