# Web CHAT AngularJS O.o.

Web Chat para fins de avaliação tecnica, que tem como principal objetivo consumir os serviços da API REST e do Websocket API em Node JS.

# Variaveis de Ambiente .env

Variaveis de ambiente que devem ser declaradas no arquivo `.env`

| Envs                           |                                          Descrição | Exemplos                |
| ------------------------------ | -------------------------------------------------: | ----------------------- |
| WEBSOCKET_URL                  |                                   URL DO WEBSOCKET | ws://localhost:8986     |
| GENERAL_CHANNEL                |          Canal em que todos os usuários logados serão inseridos a princípio | general                    |
| USER_ENDPOINT                  |                         endpoint base dos usuários | http://localhost:8986/api/users                            |
| MESSAGE_ENDPOINT              |         endpoint base das mensagens | http://localhost:8986/api/messages                            |
| CHANNEL_ENDPOINT               |       endpoint base dos canais   | http://localhost:8986/api/channels                            |
| IMAGE_ENDPOINT                 |       endpoint base das imagens  | http://localhost:8986/api/images                            |
                


## Instalação
Instalar os pacotes do npm e do bower;

```
npm install
npm install -g bower
bower install
```

## Scripts do sistema
Todos os scripts rodam com  `npm run [script]`, por exemplo: `npm run dev`.


`build`        - utiliza o webpack para transpilar o código no diretório `build`  
`dev`          - Roda a aplicação em modo de desenvolvimento utilizando o webpack-dev-server  
`test`         - Executa todos os testes 

Os scripts de execução estão todos no `package.json`. 


## Executando dentro do container DOCKER

Para executar a aplicação dentro de um container é necessário executar os seguintes comandos:

`docker-compose build`        - gera a imagem da API a partir do `Dockerfile`  
`docker-compose up -d`          - Orquestra os containers da API e do MongoDB e levanta a aplicação
   
