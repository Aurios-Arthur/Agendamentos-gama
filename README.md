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