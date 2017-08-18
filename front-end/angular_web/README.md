# NG4-MEAN Website Front-End

Website Front-End para o projeto NG4-MEAN, usando AngularJS. Desenvolvido por Bruno Duarte Brito, como parte do projeto NG4-MEAN.

Consiste em:

  * [Website Front-End](https://github.com/brunodb3/ng4_mean)

### Versão
1.0.0

### Tecnologia envolvida

Lista de tecnologias e linguagens de programação envolvidas:

* [CSS3](http://www.w3schools.com/css/css3_intro.asp)
* [HTML5](http://www.w3schools.com/html/html5_intro.asp)
* [NodeJS](https://nodejs.org)
* [TypeScript](https://www.typescriptlang.org/)
* [Angular CLI](https://cli.angular.io/)
* [AngularJS 4.0.0](https://angular.io/)

### Instalação

Antes de baixar o repositório, tenha certeza que sua máquina possui [NodeJS](https://nodejs.org/en/) e [Angular CLI](https://cli.angular.io/)

Clone o repositório em sua máquina:

```sh
$ git clone [url-do-repositorio]
$ cd [pasta-do-repositorio]
```

Então, prepare a plataforma, baixe os módulos e abra o projeto no navegador:

```sh
$ npm install # instala todos os módulos do npm
$ ng serve # abre um servidor local de desenvolvimento
```

Os arquivos do website estarão na pasta ```src```.

### Produção

Para realizar a build final do projeto (versão para produção, minificada), execute o seguinte comando:

```sh
$ ng build --prod  # realiza a build em ambiente produção do projeto
```


Os arquivos minificados e prontos para envio ao servidor estarão na pasta ```dist```.

*Passe o argumento ```--aot``` para realizar a compilação [ahead-of-time](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html)*

Para abrir um servidor local em modo produção, basta executar:

```sh
$ ng serve --prod
```

*Para saber mais sobre o processo de build utilizado, visite [Angular CLI](https://cli.angular.io/)*

**Bruno Duarte Brito - 2017**