import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

    transform(value: any, arg: any) {
        const cutTo: number = +arg || 15;

        if (value.length > cutTo) {
            if (value.split(' ').length > 1) {
                let str = value.substr(cutTo, value.length);
                let isSpace = str.indexOf(" ") !== -1;
                let end = cutTo + ( isSpace ? str.indexOf(" ") : value.length );

                return value.substr(0, end) + (isSpace ? "..." : "");
            }

            return value.substr(0, cutTo) + "...";
        }
        return value;
    }

}