import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coin'
})
export class CoinPipe implements PipeTransform {

  transform(value: number): string {
    let valueStr = value.toString();

    return valueStr.length > 6 ? valueStr.slice(0, -3) + "k" : valueStr;;
  }

}
