import { Component, output } from '@angular/core';
import { Pagina } from '../../models/pagina';

interface Recurso {
  titulo: string;
  texto: string;
}

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly navegar = output<Pagina>();

  protected readonly recursos: Recurso[] = [
    {
      titulo: 'Cadastre',
      texto: 'Inclua novos produtos informando nome, descrição e preço.',
    },
    {
      titulo: 'Edite',
      texto: 'Altere qualquer produto com o formulário já preenchido.',
    },
    {
      titulo: 'Exclua',
      texto: 'Remova itens com confirmação para evitar acidentes.',
    },
    {
      titulo: 'Persista',
      texto: 'Suas alterações ficam salvas no navegador (localStorage).',
    },
  ];
}
