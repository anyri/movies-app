import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'match'
})
export class MatchPipe implements PipeTransform {

    transform(value: any, arg: any) {
        let temp_val = value;
       
        let ind = value.toLowerCase().indexOf(arg.toLowerCase());

        if (arg && ind != -1) {                        
            return `${value.substr(0, ind)}<span class='match'>${arg}</span>${value.substr(ind + arg.length, value.length)}`;
        }
        return value;
    }

}