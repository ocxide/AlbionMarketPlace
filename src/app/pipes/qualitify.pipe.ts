import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'qualitify'
})
export class QualitifyPipe implements PipeTransform {

  qualities: string[] = ['Normal', 'Bueno', 'Sobresaliente', 'Excelente', 'Obra maestra'];

  transform(value: number): string {
    return this.qualities[value-1];
  }

}
