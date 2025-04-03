'use client';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import '../../app/styles/relatorio.css'; // Corrige o caminho para o CSS

export default function Page() {
  const [relatorio, setRelatorioPedidos] = useState([]);

  async function fetchRelatorioPedidos() {
    try {
      let res = await fetch('http://localhost:3002/api/pedido');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      let data = await res.json();
      setRelatorioPedidos(data.data);
    } catch (error) {
      console.error('Erro ao buscar relatório de pedidos:', error);
    }
  }

  async function recusarClick(idpedido) {
    try {
      await fetch(`http://localhost:3002/api/pedido/${idpedido}`, {
        method: 'DELETE',
      });
      fetchRelatorioPedidos();
    } catch (err) {
      alert('Erro ao recusar pedido:', err);
    }
  }

  function aprovarClick(event) {
    event.preventDefault();
    alert('Pedido aprovado!');
    window.location.href = '/'; // Redireciona para outra página
  }

  useEffect(() => {
    fetchRelatorioPedidos();
  }, []);

  return (
    <div>
      <Header />
      <div className="relatorio-container">
        <h1 className="relatorio-title">Relatório de Pedidos</h1>
        <table className="relatorio-tabela">
          <thead>
            <tr className="linha-cabecalho">
              <th className="celula">ID do pedido</th>
              <th className="celula">Data do pedido</th>
              <th className="celula">Tipo</th>
              <th className="celula">Tamanho</th>
              <th className="celula">Valor total</th>
              <th className="celula">Ações</th>
            </tr>
          </thead>
          <tbody>
            {relatorio.map((item) => (
              <tr className="linha" key={item.id_pedido}>
                <td className="celula">{item.id_pedido}</td>
                <td className="celula">{item.data_pedido}</td>
                <td className="celula">{item.tipo}</td>
                <td className="celula">{item.tamanho}</td>
                <td className="celula">R${item.valor_total}</td>
                <td className="celula-botao">
                  <button
                    className="botao botao-aprovar"
                    onClick={aprovarClick}
                  >
                    Aprovar
                  </button>
                  <button
                    className="botao botao-reprovar"
                    onClick={() => recusarClick(item.id_pedido)}
                  >
                    Recusar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
