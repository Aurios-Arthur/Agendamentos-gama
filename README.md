Link no index para pagina de agendamento
cadastro de usuario com criptografia hash (jwt)[
    Usuario:
    Senha:
    email: 
    confirmação da senha:
    ]
Validação com jwt
redirecionamento para pagina de agendamentos 

usuario deve receber uma confirmação via e-mail ou wpp 


Dependencias utilizadas: 
express(); 
nodemon();
mongoose();
bcryptjs();
jsonwebtoken();
cors();

Estrutura do projeto 
app.js -> Responsavel pela logica. 
server.js -> Liga o servidor remoto.
dir routes -> Define todas as rotas 
dir Models -> Guarda todos os modelos 
database -> Banco de dados 


FEITOS:

campos para agenda: [
    Empresa: puxara do cadastro
    data do agendamento: Inserido pelo proprio usuario
    data de nascimento: 
    CPF: 
    Sexo: 
    Setor e cargo: sera colocado alguns e ira virar uma lista 
    Matricula e-social(nao obrigatorio); 
    EXames realizados: puxara de um banco de dados atribuido por setor
]


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2M5YjA2YmE0MDcxZDY0NjVlYmZiZmQiLCJpYXQiOjE3NDEyNzExNzMsImV4cCI6MTc0MTI3NDc3M30.mSp01azDZi_6gDU-Q1ciG2QsVWAtj4Qi5788PWXordI




Sistema de Agendamento com Autenticação
Este é um sistema de gerenciamento de agendamentos com autenticação de usuários. Ele foi desenvolvido usando Node.js, Express, MongoDB e Mongoose. O sistema permite:

Registrar e autenticar usuários.

Criar, listar, editar e deletar agendamentos.

Proteger rotas de agendamento com autenticação JWT.

Pré-requisitos
Antes de começar, certifique-se de que você tem instalado:

Node.js (versão 16 ou superior)

MongoDB (rodando localmente ou uma URL de conexão)

Git (opcional, para clonar o repositório)

Como Rodar o Projeto
Siga os passos abaixo para configurar e rodar o projeto no seu computador.

1. Clonar o Repositório
Se você ainda não clonou o repositório, execute o seguinte comando:

bash
Copy
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
2. Instalar Dependências
Instale as dependências do projeto usando o npm:

bash
Copy
npm install
3. Configurar o Banco de Dados
Certifique-se de que o MongoDB está rodando. Se estiver usando o MongoDB localmente, inicie o servidor com:

bash
Copy
mongod
Se estiver usando um banco de dados remoto, atualize a URL de conexão no arquivo src/database.js.

4. Configurar Variáveis de Ambiente (Opcional)
Crie um arquivo .env na raiz do projeto para configurar variáveis de ambiente, como o segredo do JWT:

env
Copy
JWT_SECRET=seuSegredoJWT
MONGO_URI=mongodb://localhost:27017/Agendamentos
5. Rodar o Servidor
Inicie o servidor com o seguinte comando:

bash
Copy
npm start
O servidor estará rodando em http://localhost:3000.

Rotas da API
Aqui estão as principais rotas disponíveis no sistema:

Autenticação
Registrar um novo usuário:

Método: POST

URL: /auth/register

Body:

json
Copy
{
    "email": "usuario@example.com",
    "password": "senha123"
}
Fazer login:

Método: POST

URL: /auth/login

Body:

json
Copy
{
    "email": "usuario@example.com",
    "password": "senha123"
}
Resposta:

json
Copy
{
    "token": "seuTokenJWT"
}
Agendamentos (Protegidas por autenticação)
Listar todos os agendamentos:

Método: GET

URL: /schedules

Headers:

Copy
Authorization: <seuTokenJWT>
Criar um novo agendamento:

Método: POST

URL: /schedules

Headers:

Copy
Authorization: <seuTokenJWT>
Body:

json
Copy
{
    "empresa": "Empresa X",
    "nome": "João Silva",
    "dataNasc": "1990-01-01",
    "dataAgn": "2023-10-15T10:00:00Z",
    "CPF": "12345678901",
    "sexo": "Masculino",
    "setor": "TI",
    "cargo": "Desenvolvedor",
    "matriculaEsocial": "12345"
}
Editar um agendamento existente:

Método: PUT

URL: /schedules/:id

Headers:

Copy
Authorization: <seuTokenJWT>
Body:

json
Copy
{
    "empresa": "Empresa Y",
    "nome": "João Silva",
    "dataNasc": "1990-01-01",
    "dataAgn": "2023-10-15T10:00:00Z",
    "CPF": "12345678901",
    "sexo": "Masculino",
    "setor": "TI",
    "cargo": "Desenvolvedor Sênior",
    "matriculaEsocial": "12345"
}
Deletar um agendamento:

Método: DELETE

URL: /schedules/:id

Headers:

Copy
Authorization: <seuTokenJWT>
Estrutura do Projeto
Copy
Agendamentos/
├── src/
│   ├── models/
│   │   ├── Schedule.js          # Modelo de agendamento
│   │   └── User.js              # Modelo de usuário
│   ├── routes/
│   │   ├── AuthRoutes.js        # Rotas de autenticação
│   │   └── ScheduleRoutes.js    # Rotas de agendamento
│   ├── middleware/
│   │   └── auth.js              # Middleware de autenticação
│   ├── database.js              # Conexão com o MongoDB
│   └── app.js                   # Configuração do servidor
├── server.js                    # Inicialização do servidor
├── .env                         # Variáveis de ambiente (opcional)
├── package.json                 # Dependências e scripts
└── README.md                    # Este arquivo
Dependências
bcryptjs: Para criptografar senhas.

jsonwebtoken: Para gerar tokens JWT.

express: Framework para criar o servidor.

mongoose: Para interagir com o MongoDB.

Instale todas as dependências com:

bash
Copy
npm install
Contribuição
Se você quiser contribuir para o projeto, siga os passos abaixo:

Faça um fork do repositório.

Crie uma branch para sua feature (git checkout -b feature/nova-feature).

Commit suas mudanças (git commit -m 'Adicionando nova feature').

Push para a branch (git push origin feature/nova-feature).

Abra um Pull Request.

Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

Contato
Se tiver dúvidas ou sugestões, entre em contato:

Nome: [Seu Nome]

Email: [seu-email@example.com]

GitHub: seu-usuario

Agora é só colocar esse README.md no seu repositório do GitHub! Se precisar de mais ajustes, é só avisar. 😊