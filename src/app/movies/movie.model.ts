export class Movie {    
    title?: string;
    imdbId: string;
    releaseDate?: string;
    releaseCountry?: string;
    releaseYear?: number;
    releaseMonth?: number;
    releaseDay?: number;

    constructor(movieSrc?: Movie) {
        if(movieSrc)
            Object.assign(this, movieSrc);
    };

}