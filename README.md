# Projeto06-DW3 - Sistema CRUD com Factory Method

Este projeto é uma aplicação web desenvolvida em Node.js com persistência de dados em SQLite e consumo da API ViaCEP. O objetivo principal do projeto é aplicar o padrão de projeto criacional **Factory Method** para a instanciação dinâmica de diferentes perfis de pessoas.

---

## 🚀 Funcionalidades

- **Padrão Factory Method**: Instanciação de classes específicas (`Estudante`, `Professor`, `Administrativo`, `Terceiro` e `Visitante`) com base no tipo selecionado.
- **Integração com API ViaCEP**: Preenchimento automático de dados de endereço (logradouro, bairro, cidade e estado) ao digitar o CEP.
- **CRUD Completo**:
  - **Create**: Cadastro de pessoas com perfis e endereços.
  - **Read**: Listagem de pessoas cadastradas e consulta individual.
  - **Update**: Edição de dados existentes.
  - **Delete**: Remoção de registos.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript backend.
- **SQLite3**: Banco de dados relacional em ficheiro local.
- **HTML5 / CSS3 / JavaScript (ES6+)**: Front-end e consumo de APIs via `fetch`.
- **API ViaCEP**: Serviço para consulta de Código de Endereçamento Postal.

---

## 📁 Estrutura do Projeto

```text
Projeto06-DW3/
├── public/                 # Arquivos estáticos servidos ao cliente
│   ├── cadastrar.html      # Formulário de cadastro de pessoas
│   ├── editar.html         # Formulário de edição de pessoas
│   ├── index.html          # Página inicial / Menu principal
│   └── listar.html         # Tabela de consulta e ações CRUD
├── app.js                  # Servidor HTTP e rotas da API REST
├── cadastroPessoas.js      # Classes e Fábricas (Factory Method)
├── database.js             # Conexão e criação da tabela no SQLite
├── database.sqlite         # Ficheiro do banco de dados SQLite
└── package.json            # Configurações e dependências do projeto
