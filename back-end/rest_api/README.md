# re:connet RESTful API

API RESTful para o projeto re:connet, faz a interface com o banco de dados MongoDB. Desenvolvido por Ideware Sistemas LTDA, como parte do projeto re:connet.

Consiste em:

  * [API RESTful](https://bitbucket.org/ideware/recon_file_parser)

### Versão
1.0.0

### Tecnologia envolvida

Lista de tecnologias e linguagens de programação envolvidas:

* [NodeJS](https://nodejs.org)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](http://mongoosejs.com/)

### Instalação

Antes de baixar o repositório, tenha certeza que sua máquina possui [NodeJS](https://nodejs.org/en/) e [MongoDB](https://www.mongodb.com/) instalados.

Clone o repositório em sua máquina:

```sh
$ git clone [url-do-repositorio]
$ cd [pasta-do-repositorio]
```

Então, prepare a plataforma e baixe os módulos:

```sh
$ npm install # instala todos os módulos do npm
```

Verifique a existência do banco de dados ```reconnet``` em sua máquina, para que seja possível realizar a interface, e execute a API:

```sh
$ npm start # executa o arquivo index.js
```

A API estará disponível em ```localhost:porta_configurada```.

**Ideware Sistemas LTDA - 2017**