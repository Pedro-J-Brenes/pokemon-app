import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { HeightPipe } from 'src/app/pipes/height.pipe';
import { IdPipe } from 'src/app/pipes/id.pipe';
import { loadPokemonById } from 'src/app/store/actions/pokemon.actions';
import { PokemonState } from 'src/app/store/reducers/pokemon.reducer';
import { selectPokemonById } from 'src/app/store/selectors/pokemon.selector';

@Component({
  selector: 'app-detail-page',
  standalone: true,
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
