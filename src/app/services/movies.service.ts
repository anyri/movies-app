import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Movie } from '../movies/movie.model';
import { DateFormatHelper } from '../helpers/date-format.helper';

@Injectable()
export class MoviesService {
  webApi: string = 'http://movies-db.herokuapp.com/api/movies/';
  moviesSource: Movie[];
  searchFields = ['imdbId', 'title', 'releaseDate', 'releaseCountry'];

  constructor(private http: Http) { }

  search(value) {
    let output = this.moviesSource.map(movie => {
      let clone = Object.assign({}, movie);
      return clone;
    });

    value.toLowerCase();

    output = output.filter(movie =>
      movie['title'].toLowerCase().indexOf(value) >= 0 || movie['imdbId'].toLowerCase().indexOf(value) >= 0 || DateFormatHelper.format(movie['releaseDate']).indexOf(value) >= 0 || movie['releaseCountry'].toLowerCase().indexOf(value) >= 0);

    return Observable.of(output);
  }

  getMovies() {
    return this.http.get(this.webApi)
      .map(result => result.json() || [])
      .catch(error => Observable.throw(error.json().error || 'Server error'))
  }

  getMovie(id: string) {
    return this.http.get(this.webApi + id)
      .map(res => res.json())
      .catch(error =>
        Observable.throw(error.json().error || 'Server error')
      )
  }

  addMovie(movie: Movie) {
    return this.http.post(this.webApi, movie)
      .map(res => res.json())
      .catch(error =>
        Observable.throw(error.json().error || 'Server error')
      )
  }

  updateMovie(movie) {
    return this.http.put("http://movies-db.herokuapp.com/api/movies/" + movie.imdbId, movie);
  }

  removeMovie(id: string) {
    return this.http.delete(this.webApi + id);
  }

}
