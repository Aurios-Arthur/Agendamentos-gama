Link no index para pagina de agendamento
cadastro de usuario com criptografia hash (jwt)[
    Usuario:
    Senha:
    email: 
    confirmação da senha:
    ]
Validação com jwt
redirecionamento para pagina de agendamentos 
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

usuario deve receber uma confirmação via e-mail ou wpp 


Dependencias utilizadas: 
express(); 
nodemon();
mongoose();


Estrutura do projeto 
app.js -> Responsavel pela logica. 
server.js -> Liga o servidor remoto.
dir routes -> Define todas as rotas 
dir Models -> Guarda todos os modelos 
database -> Banco de dados 

