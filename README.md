# Portfólio de Receitas Culinárias

Projeto desenvolvido para a disciplina de **Desenvolvimento Web Back-End**  
**Universidade Tecnológica Federal do Paraná — Câmpus Cornélio Procópio (UTFPR-CP)**

## 👥 Integrantes

- Renan Cáceres Anselmo  
- Lauren Marçulo  
- Manuella Vieira Reginatto  

## 📋 Descrição

Sistema web MVC que permite o cadastro e exibição de receitas culinárias por alunos,
com controle de acesso por perfil (administrador, aluno e usuário externo).

Desenvolvido com Node.js, Express, Sequelize, PostgreSQL e Express-Handlebars,
seguindo o padrão arquitetural MVC conforme conteúdo da disciplina.

## 🚀 Como executar

1. Criar o banco no PostgreSQL: `CREATE DATABASE portfolio_receitas;`
2. Ajustar credenciais em `config/db_sequelize.js`
3. Instalar dependências: `npm install`
4. Descomentar o bloco `sync` em `routers/route.js`, rodar uma vez e comentar novamente
5. Iniciar: `node app.js`
6. Acessar: http://localhost:8081

## 📦 Tecnologias

- Node.js + Express
- Sequelize + PostgreSQL
- Express-Handlebars
- Express-Session

## 📄 Licença

MIT License

Copyright (c) 2025 Renan Cáceres Anselmo, Lauren Marçulo, Manuella Vieira Reginatto

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
