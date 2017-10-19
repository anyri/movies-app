import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MoviesService } from '../services/movies.service';
import { Movie } from './movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  subscription: Subscription;
  pending: boolean;
  movies: Movie[];
  removeMode: boolean = false;

  constructor(private moviesService: MoviesService, private router: Router) {
    this.pending = true;
   }

  ngOnInit() {
    this.subscription = this.moviesService.getMovies().subscribe(
      data => {        
        this.movies = data;
        this.pending = false;
        this.moviesService.moviesSource = this.movies.map(movie => {
          let clone = Object.assign({}, movie);
          return clone;
        });
        this.subscription.unsubscribe();
      },
      error => this.router.navigate(['error/bad_request'])
    )
  }

  search(val) {    
    if(!val)
      return;
    this.moviesService.search(val.toLowerCase()).subscribe(
      data => this.movies = data,
      error => console.log('oops')
    );
  }

  showAll() {
    this.movies = this.moviesService.moviesSource.map(movie => {
      let clone = Object.assign({}, movie);
      return clone;
    });

  }

  removeMovie(movie: Movie) {
    let id = movie.imdbId;
    
    this.subscription = this.moviesService.removeMovie(id).subscribe(
      data => {
        console.log("Movie was removed");
        this.movies = this.movies.filter(movie => movie.imdbId != id);
        this.subscription.unsubscribe();
      },
      err => {
        console.log("Error! Movie was not removed");
        this.subscription.unsubscribe();
      }
    )
  }


}
