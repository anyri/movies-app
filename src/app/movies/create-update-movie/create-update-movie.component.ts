import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import { Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../movie.model';
import { Notification } from '../../notification/notification.model';
import { NotificationMessages } from '../../notification/notification.messages';

@Component({
  selector: 'app-create-update-movie',
  templateUrl: './create-update-movie.component.html',
  styleUrls: ['./create-update-movie.component.css']
})
export class CreateUpdateMovieComponent implements OnInit {
  subscription: Subscription;
  movie: Movie = new Movie();
  isEditMode: boolean = true;
  isCorrectDate: boolean = true;
  pending: boolean;
  _bsValue: Date;
  alert: Notification = new Notification();
  
  get bsValue(): Date {
    return this._bsValue;
  }
 
  set bsValue(v: Date) {    
    this._bsValue = v;
  }

  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'new_movie') {
        this.pending = true;
        this.getMovie(id);
      } else {
        this.isEditMode = false;
      }
    });
  }

  private getMovie(id) {
    this.subscription = this.moviesService.getMovie(id).subscribe(
      data => {
        this.movie = new Movie(data);
        this.bsValue = new Date(this.movie.releaseDate);
        this.pending = false;
        this.subscription.unsubscribe();
      },
      error => {
        this.router.navigate(['error/movie_not_found']);
        this.subscription.unsubscribe();
      }
    )
  }

  onChange(val) {
      let pattern = /(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d/;
      this.isCorrectDate = val.search(pattern) == -1 ? false : true;
  }

  onSubmit() {
    this.pending = true;

    if (this.isEditMode)
      this.upadteMovie(this.movie);
    else
      this.addMovie(this.movie);
  }

  private upadteMovie(movie) {
    this.subscription = this.moviesService.updateMovie(movie).subscribe(
      data => {
        this.pending = false;        
        this.alert = new Notification(NotificationMessages.SUCCESS_UPDATE);
        this.subscription.unsubscribe();
        setTimeout(() => this.router.navigate(['/']), 2000);        
      },
      error => {
        this.pending = false;        
        this.alert = new Notification(NotificationMessages.ERROR_UPDATE);
        this.subscription.unsubscribe();        
      }
    )
  }

  private addMovie(movie: Movie) {
    movie = this.setMovieProperties(movie);

    this.subscription = this.moviesService.addMovie(movie).subscribe(
      data => {
        this.pending = false;
        this.subscription.unsubscribe();
        this.alert = new Notification(NotificationMessages.SUCCESS_CREATE);
        setTimeout(() => this.router.navigate(['/']), 2200);        
      },
      error => {
        this.pending = false;
        this.alert = new Notification(NotificationMessages.ERROR_CREATE);
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
