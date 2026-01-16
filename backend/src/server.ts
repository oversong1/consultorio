import "reflect-metadata"; // Necessário para o TypeORM lidar com decoradores
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

// Middleware para permitir requisições de diferentes origens (Frontend)
app.use(cors());

// Middleware para que o Express entenda corpo de requisições em formato JSON
app.use(express.json());

/**
 * Rota de verificação de integridade (Health Check)
 * Utilizada para validar se a API está respondendo corretamente.
 */
app.get('/', (req: Request, res: Response) => {
  return res.json({ 
    servico: "Home",
    status: "operante",
  });
});

app.get('/status', (req: Request, res: Response) => {
  return res.json({ 
    servico: "MedSchedule Hub API",
    status: "operante",
    timestamp: new Date().toISOString()
  });
});

// Inicialização do servidor na porta 3333
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});