import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto-service';
import { ResumoPipe } from '../../pipes/resumo-pipe';

@Component({
  selector: 'app-produtos',
  imports: [FormsModule, CurrencyPipe, ResumoPipe],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})
export class Produtos {
  // Injeção de dependência do serviço
  private readonly produtoService = inject(ProdutoService);

  // Lista de produtos (signal somente leitura vindo do serviço)
  protected readonly produtos = this.produtoService.produtos;

  // Estado da tela
  protected readonly modalAberto = signal(false);
  protected readonly idEmEdicao = signal<number | null>(null);
  protected readonly erro = signal('');

  // Campos do formulário, ligados aos inputs com [(ngModel)]
  protected readonly nome = signal('');
  protected readonly descricao = signal('');
  protected readonly preco = signal<number | null>(null);

  // ---------- Controle do modal ----------
  protected abrirModalInclusao(): void {
    this.idEmEdicao.set(null);
    this.preencherFormulario('', '', null);
    this.modalAberto.set(true);
  }

  protected abrirModalEdicao(produto: Produto): void {
    this.idEmEdicao.set(produto.id);
    this.preencherFormulario(produto.nome, produto.descricao, produto.preco);
    this.modalAberto.set(true);
  }

  protected fecharModal(): void {
    this.modalAberto.set(false);
  }

  private preencherFormulario(nome: string, descricao: string, preco: number | null): void {
    this.nome.set(nome);
    this.descricao.set(descricao);
    this.preco.set(preco);
    this.erro.set('');
  }

  // ---------- Salvar (CREATE e UPDATE) ----------
  protected salvar(): void {
    const nome = this.nome().trim();
    const preco = Number(this.preco());

    if (!nome) {
      this.erro.set('Informe o nome do produto.');
      return;
    }
    if (Number.isNaN(preco) || preco <= 0) {
      this.erro.set('Informe um preço válido, maior que zero.');
      return;
    }

    const dados = { nome, descricao: this.descricao().trim(), preco };
    const id = this.idEmEdicao();

    if (id === null) {
      this.produtoService.adicionar(dados);
    } else {
      this.produtoService.alterar(id, dados);
    }

    this.fecharModal();
  }

  // ---------- DELETE ----------
  protected excluirProduto(produto: Produto): void {
    const confirmou = window.confirm(`Deseja realmente excluir o produto "${produto.nome}"?`);
    if (confirmou) {
      this.produtoService.excluir(produto.id);
    }
  }

  // ---------- RESTAURAR PADRÃO ----------
  protected restaurarPadrao(): void {
    const confirmou = window.confirm(
      'Todas as alterações serão perdidas e o catálogo original será restaurado. Continuar?',
    );
    if (confirmou) {
      this.produtoService.restaurarPadrao();
    }
  }
}
