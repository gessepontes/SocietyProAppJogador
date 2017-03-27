import {Pipe, PipeTransform} from '@angular/core';
 
@Pipe({
	name: 'data'
})
export class DataPipe implements PipeTransform{
	transform(value: string): string{
		return value.substr(8, 2) + '/' + value.substr(5, 2) + '/' + value.substr(0, 4);
	}
}