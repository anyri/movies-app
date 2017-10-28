import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

    transform(array: any[], sortBy: string, direction: string = 'asc'): any[] {
        console.log(array.length);

        if (!sortBy || sortBy.trim() == "")
            return array;

        if (sortBy == 'title' || sortBy == 'releaseCountry') {
            array = Array.from(array).sort((a, b) => {
                
                let valA = a[sortBy].toUpperCase();
                let valB = b[sortBy].toUpperCase();
                if (valA < valB)
                    return -1;
                if (valA > valB)
                    return 1;
                return 0;
            });
        }
        if (sortBy == 'releaseDate') {
            array = Array.from(array).sort((a, b) => {
                let dateA = new Date(a[sortBy]);
                let dateB = new Date(b[sortBy]);
                if (dateA < dateB)
                    return -1;
                if (dateA > dateB)
                    return 1;
                return 0;
            });
        }
        if(direction != 'asc')
            array.reverse();

        return array;
    }

}