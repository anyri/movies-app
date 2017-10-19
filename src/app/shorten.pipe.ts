import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

    transform(value) {
        const cutTo: number = 15;

        if (value.length > cutTo) {
            if (value.split(' ').length > 1) {
                let str = value.substr(cutTo, value.length);
                let end = cutTo + str.indexOf(" ");
                return value.substr(0, end) + "...";
            }

            return value.substr(0, cutTo) + "...";
        }
        return value;
    }

}