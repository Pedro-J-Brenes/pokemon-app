import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'id',
})
export class IdPipe implements PipeTransform {
  transform(value: string | undefined): string | undefined {
    if (value) {
      while (value.length < 4) {
        value = `0${value}`;
      }
      return value;
    }
    return value;
  }
}
