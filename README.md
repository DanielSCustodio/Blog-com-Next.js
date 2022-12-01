# Blog Dev
![2022-09-10_00-57](https://user-images.githubusercontent.com/29557187/189467819-d4687fc8-0316-4077-9534-e7810a36aa11.png)



Blog sobre programação, consumindo uma API do Prismic (Headless CMS).<br>
O gerenciamento e criação do conteúdo que é consumido da API fica a cargo da pessoa desenvolvedora ou da pessoa responsável por criar conteúdo. E como o painel de criação dos posts tem a interface amigável, qualquer pessoa que esteja minimamente acostumada com algum editor de texto é capaz de criar os posts, automaticamente um novo post publicado é consumido pela aplicação web e fica disponível no blog. 

## Deploy
Deploy na Vercel: https://blogdev-three.vercel.app/

## Tecnologias usadas

Front-end:
> Desenvolvido usando: TypeScript, React, Next.js, SASS.

Back-end:
> Desenvolvido usando: Prismic Headless CMS.

## Variáveis de ambiente
Link para pegar os dados das variáveis: https://customwebsite.prismic.io/settings/apps/<br/>
No arquivo ``.env.development`` crie as seguintes variáveis de ambiente:<br/>
<br/>
```PRISMIC_ENDPOINT```   =  API endpoint<br/>
<br/>
 ```PRISMIC_ACESS_TOKEN``` = Generate an Access Token<br/>
<br/>
```NEXT_PUBLIC_SITE_URL``` = é a URL atual do seu projeto.
## Instalando Dependências

> Execute o comando na pasta raiz
```bash
npm install
``` 
## Executando a aplicação

> Execute o comando na pasta raiz
```bash
npm run dev
``` 

