import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pixelPipe',
})
export class PixelPipePipe implements PipeTransform {
  transform(value: string): string {
    if (value && !value.includes('px')) {
      return value + 'px';
    } else {
      return value;
    }
  }
}
