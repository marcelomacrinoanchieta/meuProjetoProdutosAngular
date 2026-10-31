import { Pipe, PipeTransform } from '@angular/core';

// Limita o tamanho de um texto exibido na tela
@Pipe({
  name: 'resumo',
})
export class ResumoPipe implements PipeTransform {
  transform(texto: string | null | undefined, limite = 90): string {
    if (!texto || !texto.trim()) {
      return 'Sem descrição.';
    }
    const limpo = texto.trim();
    return limpo.length > limite ? `${limpo.slice(0, limite).trimEnd()}...` : limpo;
  }
}
