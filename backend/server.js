import express from 'express';
import router from './routes/routes.js'; // Certifique-se de que o caminho está correto
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Rotas
app.use('/', router);

// Inicialização do servidor
const PORT = 3002; // Alterar para uma porta disponível
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
