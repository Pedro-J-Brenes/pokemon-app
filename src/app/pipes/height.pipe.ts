import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'height',
})
export class HeightPipe implements PipeTransform {
  transform(value: number | undefined): string | undefined {
    if (value) {
      return (value * 0.1).toFixed(1);
    }
    return;
  }
}
