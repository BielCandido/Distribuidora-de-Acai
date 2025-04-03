import Link from 'next/link';
import './styles/home.css'; // Corrige o caminho para o CSS
import Header from '../components/Header'; // Corrige o caminho para o Header

export default function Page() {
  return (
    <div>
      <Header />
      <div className="about-us">
        <h2>Quem Nós Somos?</h2>
        <p>
          Nascemos no coração do Pará, onde o açaí é mais do que um alimento, é cultura, energia e tradição.
          <br />
          Começamos no interior, de forma simples, mas com um grande propósito: levar o verdadeiro sabor da Amazônia para cada vez mais pessoas.
          <br />
          Com dedicação e compromisso, crescemos sem abrir mão da qualidade e da autenticidade. Nosso açaí é puro, fresco e respeita as raízes de onde viemos.
          <br />
          Hoje, estamos expandindo nossos horizontes, levando essa experiência única para novos mercados, sempre mantendo a essência do que nos fez começar.
          <br />
          Seja para revender, empreender ou simplesmente saborear, estamos aqui para garantir que cada colherada tenha o gostinho inconfundível da Amazônia.
          <br />
          <br />
          Peça agora e sinta o verdadeiro sabor da floresta!
        </p>
      </div>
      <div className="menu">
        {/* Submenu para "Fazer Pedido" */}
        <div className="submenu">
          <p>
            Clique aqui para montar o seu pedido em nossa distribuidora
          </p>
          <Link className="menu-button" key="pedido" href="/pedido">
            Fazer Pedido
          </Link>
        </div>
        {/* Submenu para "Relatório" */}
        <div className="submenu">
          <p>
            Clique aqui para visualizar o relatório de pedidos realizados
          </p>
          <Link className="menu-button" key="relatorio" href="/relatorio">
            Relatório
          </Link>
        </div>
      </div>
    </div>
  );
}
