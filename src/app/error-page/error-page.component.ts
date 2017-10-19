import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ErrorMessages } from './error.messages';

@Component({
  selector: 'error-page',
  templateUrl: './error-page.component.html',
})
export class ErrorPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => this.setMessage(params['type']) );   
  }

  message: string = ErrorMessages.ERROR_PAGE;

  private setMessage(type: string): void {
    switch(type) {
      case 'page_not_found':
        this.message = ErrorMessages.ERROR_PAGE;
        break;
      case 'bad_request':
        this.message = ErrorMessages.ERROR_REQUEST;
        break;
      case 'movie_not_found':
        this.message = ErrorMessages.ERROR_MOVIE;
        break;
      default:
        this.message = ErrorMessages.ERROR_PAGE;
    }
  }


}
