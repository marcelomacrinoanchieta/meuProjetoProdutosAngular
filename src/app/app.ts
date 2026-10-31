import { Component, signal } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Home } from './pages/home/home';
import { Produtos } from './pages/produtos/produtos';
import { Pagina } from './models/pagina';

@Component({
  selector: 'app-root',
  imports: [Navbar, Home, Produtos],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Guarda qual "página" está visível: 'home' ou 'produtos'
  protected readonly paginaAtual = signal<Pagina>('home');

  protected navegar(pagina: Pagina): void {
    this.paginaAtual.set(pagina);
  }
}
