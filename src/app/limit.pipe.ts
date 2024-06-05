import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit',
  standalone: true
})
export class LimitPipe implements PipeTransform {

  transform(desc:string, limits:number): string {
    return desc?.split('').slice(0, limits).join('');
  }

}
