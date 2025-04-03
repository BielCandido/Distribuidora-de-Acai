'use client'

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import '../../app/styles/pedido.css'; // Corrige o caminho para o CSS

export default function Page() {
  const [tamanhos, setTamanhos] = useState([]);
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    async function fetchTamanhos() {
      try {
        let res = await fetch('http://localhost:3002/api/tamanhos');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        let data = await res.json();
        setTamanhos(data.data);
      } catch (error) {
        console.error('Erro ao buscar tamanhos:', error);
      }
    }
    fetchTamanhos();
  }, []);

  useEffect(() => {
    async function fetchTipos() {
      try {
        let res = await fetch('http://localhost:3002/api/tipos');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        let data = await res.json();
        setTipos(data.data);
      } catch (error) {
        console.error('Erro ao buscar tipos:', error);
      }
    }
    fetchTipos();
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch('http://localhost:3002/api/pedido', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData))
    });

    const data = await response.json();
    const confirmSubmit = window.confirm("Tem certeza que deseja enviar o pedido?");

    if (confirmSubmit) {
      alert("Pedido enviado com sucesso!");
    } else {
      alert("Envio cancelado.");
    }
  }

  return (
    <div>
      <Header />
      <div className="pedido-container">
        <form className="pedido-form" onSubmit={onSubmit}>
          <h2>FAÇA O SEU PEDIDO</h2>
          <div className="form-group">
            <label htmlFor="tamanho">Tamanhos</label>
            <select name="tamanho" id="tamanho" required>
              {tamanhos.map((tamanho) => (
                <option value={tamanho.id} key={tamanho.id}>
                  {tamanho.nome} - R${tamanho.valor}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="tipo">Tipos</label>
            <select name="tipo" id="tipo" required>
              {tipos.map((tipo) => (
                <option value={tipo.id} key={tipo.id}>
                  {tipo.nome} - R${tipo.valor}
                </option>
              ))}
            </select>
          </div>
          <button className="submit-button" type="submit">Enviar Pedido</button>
        </form>
      </div>
    </div>
  );
}