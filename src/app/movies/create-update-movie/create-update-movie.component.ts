import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import { Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-create-update-movie',
  templateUrl: './create-update-movie.component.html',
  styleUrls: ['./create-update-movie.component.css']
})
export class CreateUpdateMovieComponent implements OnInit {
  subscription: Subscription;
  movie: Movie = new Movie();
  isEditMode: boolean = true;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'new_movie')
        this.getMovie(id);
      else
        this.isEditMode = false;
    });
  }

  private getMovie(id) {
    this.subscription = this.moviesService.getMovie(id).subscribe(
      data => {
        this.movie = new Movie(data);
        this.subscription.unsubscribe();
      },
      error => {
        this.router.navigate(['error/movie_not_found']);
        this.subscription.unsubscribe();
      }
    )
  }

  onSubmit() {
    if (this.isEditMode)
      this.upadteMovie(this.movie);
    else
      this.addMovie(this.movie);

  }

  private upadteMovie(movie) {
     
    console.log("To update " + JSON.stringify(movie));

    this.subscription = this.moviesService.updateMovie(movie).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/']);
        this.subscription.unsubscribe();
      },
      error => {
        console.log("Error update");
        this.subscription.unsubscribe();
      }
    )
  }

  private addMovie(movie: Movie) {
    movie = this.setMovieProperties(movie);
    console.log("Add new movie " + JSON.stringify(movie));

    this.subscription = this.moviesService.addMovie(movie).subscribe(
      data => {
        console.log("OK 200");
        this.router.navigate(['/']);
        this.subscription.unsubscribe();
      },
      error => {
        console.log("Error update");
        this.subscription.unsubscribe();        
      }
    )
  }

  private setMovieProperties(movie: Movie) {
    let date = new Date(this.movie.releaseDate);
    movie.releaseYear = +date.getFullYear();
    movie.releaseMonth = +date.getMonth();
    movie.releaseDay = +date.getDate();
    return movie;
  }


}
