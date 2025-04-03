import '../../styles/home.css'; // Certifique-se de que o CSS global está sendo importado
import Header from '../../components/Header';

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="home-content">
        <h1>Bem-vindo à Açaiteria!</h1>

        </div>
      </div>
  );
}
