import { Pipe, PipeTransform } from '@angular/core';
import { Tasks } from 'src/app/models/tasks';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Tasks[], filter: any){
    if(!!value && filter !== ''){
      return value.filter((result:any) =>{
        return JSON.stringify(result).toLocaleLowerCase().includes(filter.toLocaleLowerCase());
      })
    }else{
      return value;
    }
  }

}
