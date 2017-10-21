import { Pipe, PipeTransform } from '@angular/core';
import { DateFormatHelper } from './helpers/date-format.helper';

@Pipe({
    name: 'dateFormat'
})
export class DateFormat implements PipeTransform {
    transform(value:any, args:string[]):any {
        if (value)           
           return DateFormatHelper.format(value);       
    }    
}