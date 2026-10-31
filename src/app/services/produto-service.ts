import { Service, signal } from '@angular/core';
import { Produto } from '../models/produto';
import produtosIniciais from '../data/produtos.json';

// Nome da chave usada no localStorage
const CHAVE_STORAGE = 'catalogo-produtos';

// Dados enviados pelo formulário (tudo, exceto o id)
export type DadosProduto = Omit<Produto, 'id'>;

@Service()
export class ProdutoService {
  // Estado privado: somente o serviço pode alterá-lo
  private readonly listaProdutos = signal<Produto[]>(this.carregar());

  // Versão somente leitura, exposta aos componentes
  readonly produtos = this.listaProdutos.asReadonly();

  // Leitura inicial: localStorage primeiro; se não houver, usa o JSON
  private carregar(): Produto[] {
    try {
      const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);
      if (dadosSalvos) {
        return JSON.parse(dadosSalvos) as Produto[];
      }
    } catch (erro) {
      console.error('Não foi possível ler o localStorage:', erro);
    }
    return [...produtosIniciais];
  }

  // Atualiza a tela (signal) e persiste no navegador
  private atualizar(lista: Produto[]): void {
    this.listaProdutos.set(lista);
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista));
  }

  // CREATE: novo objeto com ID gerado por timestamp
  adicionar(dados: DadosProduto): void {
    const novoProduto: Produto = { id: Date.now(), ...dados };
    this.atualizar([...this.listaProdutos(), novoProduto]);
  }

  // UPDATE: substitui apenas o item com o ID informado
  alterar(id: number, dados: DadosProduto): void {
    this.atualizar(
      this.listaProdutos().map((item) => (item.id === id ? { ...item, ...dados } : item)),
    );
  }

  // DELETE: mantém todos, exceto o item com o ID informado
  excluir(id: number): void {
    this.atualizar(this.listaProdutos().filter((item) => item.id !== id));
  }

  // RESET: limpa o cache e volta aos dados do arquivo JSON
  restaurarPadrao(): void {
    localStorage.removeItem(CHAVE_STORAGE);
    this.listaProdutos.set([...produtosIniciais]);
  }
}
