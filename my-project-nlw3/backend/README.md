# API 

*De: 12/10/2020 Até:18/10/2020*

Desenvolvidade durante a **NLW#3** oferecido pela [Rocketseat](https://app.rocketseat.com.br/).


## Tecnologias e ferramentas

- [X] Typescript
- [X] Node.js
- [X] Express.js
- [X] [Beekeper](https://www.beekeeperstudio.io)
- [X] Postman



## Alguns comandos


Para geração de migrations, pode acontecer alguns erros.
Para resolver esses erros pode ser necessário executar as seguintes ações:

- Limpar o cache:

*npm cache clean --force*

- Executar algum dos comandos abaixo:

*npx run migration:run*
*npm run migration:run*

- Se persistir o problema, execute as seguinta ações:

*npm install -g ts-node typescript*

- Depois :
*npx typeorm migration:run*




## Executar Projeto

**Para executar esse projeto após baixá-lo, execute os comandos:**

* 1° `npm i `
* 2° `npm run dev`

*Abra o navegador em:*

Principal: 

    http://localhost:3333

Endpoints: 
 - /orphanages
 - /orphanagesList
 - /orphanagesList/:id

Exemplo:

    http://localhost:3333/orphanages

        

