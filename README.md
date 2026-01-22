# MedSchedule - Sistema de Agendamento Medico

Este e um projeto completo de agendamento medico, desenvolvido com foco em performance, escalabilidade e facilidade de deploy utilizando Docker.

## Tecnologias Utilizadas

### Frontend
* React 19 com TypeScript
* Vite (Build tool)
* Tailwind CSS (Estilizacao)
* Lucide React (Icones)
* React Router Dom (Navegacao)

### Backend
* Node.js com Express
* TypeORM (Persistencia de dados)
* MySQL 8.0 (Banco de dados relacional)
* Redis (Cache)
* Docker e Docker Compose (Orquestracao)

---

## Como Rodar o Projeto

A utilizacao do Docker elimina a necessidade de configurar banco de dados ou instalar dependencias localmente.

### Pre-requisitos
### Versao do Node (Desenvolvimento Local)
Caso opte por rodar o projeto fora do Docker, certifique-se de estar utilizando o Node.js v20 ou superior, devido as exigencias de compatibilidade do Vite.
* Docker instalado
* Docker Compose instalado

### Comando para subir a aplicacao
Na raiz do projeto, abra o terminal e execute:

docker-compose up --build

Este comando ira:
1. Subir o banco de dados MySQL.
2. Subir o servico de cache Redis.
3. Configurar o Backend, rodar as Migrations e realizar o Seed automatico do usuario administrador.
4. Subir o Frontend em Vite.

---

## Acesso ao Sistema

Apos o Docker finalizar o processo, voce podera acessar o sistema atraves dos seguintes links:

* Frontend: http://localhost:5173
* Backend API: http://localhost:3333

### Credenciais de Administrador (Auto-geradas)
Ao subir o container pela primeira vez, um usuario administrador e criado automaticamente:

* E-mail: admin@med.com.br
* Senha: admin123

---

## Estrutura do Projeto

* /backend: API REST em Node.js.
* /frontend: Interface web em React.
* docker-compose.yml: Configuracao da infraestrutura de containers.

---

## Decisoes Tecnicas
* TypeORM Migrations: Garante que o esquema do banco de dados seja consistente em qualquer ambiente.
* Automatic Seeding: O sistema detecta se o admin existe e o cria na primeira execucao, eliminando passos manuais de configuracao.
* Redis Integration: Preparado para lidar com cache de agendamentos e sessoes.