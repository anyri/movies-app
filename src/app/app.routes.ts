import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { CreateUpdateMovieComponent } from './movies/create-update-movie/create-update-movie.component';
import { ErrorPageComponent } from './error-page/error-page.component';


export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'movies',
        pathMatch: 'full'
    },
    {
        path: 'movies', 
        component: MoviesComponent
    },
    {
        path: 'movie/:id', 
        component: CreateUpdateMovieComponent
    },
    {
        path: 'error/:type',
        component: ErrorPageComponent
    }
]