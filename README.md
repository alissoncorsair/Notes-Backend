# Como rodar a aplicação

* faça um clone do projeto  
```
git clone https://github.com/alissoncorsair/Notes-Backend
```
* entre no diretório do projeto e dê o comando ```npm install``` para instalar as dependências/bibliotecas utilizadas.
* faça uma cópia do arquivo .env.example e o renomeie para .env 
```
#bash
cp .env.example .env
```
* é necessário preencher ao menos as variáveis MONGO_USERNAME e MONGO_PASSWORD para poder rodar o projeto. para isso, será necessário criar uma conta em https://www.mongodb.com/cloud/atlas/lp/try4 e fazer algumas configurações por lá.
* agora, para inicializar a aplicação em modo de desenvolvimento : ```npm run dev ```.

