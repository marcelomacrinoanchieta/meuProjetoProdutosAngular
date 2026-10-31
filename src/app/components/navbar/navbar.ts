import { Component, input, output } from '@angular/core';
import { Pagina } from '../../models/pagina';

interface LinkMenu {
  id: Pagina;
  rotulo: string;
}

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  // Dado recebido do componente pai (App)
  readonly paginaAtual = input.required<Pagina>();

  // Evento emitido para o componente pai
  readonly navegar = output<Pagina>();

  protected readonly links: LinkMenu[] = [
    { id: 'home', rotulo: 'Início' },
    { id: 'produtos', rotulo: 'Produtos' },
  ];
}
