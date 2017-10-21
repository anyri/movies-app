import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';

import { APP_ROUTES } from './app.routes';
import { MoviesService } from './services/movies.service';
import { ShortenPipe } from './shorten.pipe';
import { DateFormat } from './date.pipe';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MoviesComponent } from './movies/movies.component';
import { CreateUpdateMovieComponent } from './movies/create-update-movie/create-update-movie.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ConfirmContentComponent } from './confirmation/confirm.content.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesComponent,
    CreateUpdateMovieComponent,
    ErrorPageComponent,
    ShortenPipe,
    DateFormat,
    ConfirmContentComponent
  ],
  entryComponents:[ConfirmContentComponent],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
