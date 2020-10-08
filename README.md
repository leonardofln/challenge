# Delivery Much Tech Challenge

Este repositório é uma tentativa de resolução de um desafio proposto pela Delivery Much (https://github.com/delivery-much/challenge).

## Pré-requisitos

- Ter o docker instalado na máquina
- Obter uma API KEY no site https://developers.giphy.com/docs/

## Arquivo de configuração e API KEY

Após ter clonado este repositório, você deve:

- fazer uma cópia do arquivo **.env.exemplo** e renomeá-lo para: **.env**
- dentro do arquivo .env, substituir a string **YOUR_API_KEY** pela API KEY obtida no site https://developers.giphy.com/docs/

## Construção da máquina docker

No diretório raiz do projeto, você deve criar a máquina docker a partir do seguinte comando:

```shell
docker build -t deliverymuch-test .
```

Após finazar a criação da máquina docker, executá-la através do comando:

```shell
docker run -p 3000:3000 -d --restart unless-stopped deliverymuch-test
```

## Utilização

A API possui apenas um endpoint (recipes), e pode ser acessada através da seguinte URL (via método GET):

`http://localhost:3000/recipes/?i=onions,tomato,garlic`

Você chama a API passando os ingredientes, e ela retorna receitas que utilizam os ingredientes informados.

*** Atenção: É possível passar no máximo 3 ingredientes a cada requisição!

A resposta dessa requisição deve ser algo semelhante a isso:

```
{
	"keywords": ["onion", "tomato"],
	"recipes": [{
		"title": "Greek Omelet with Feta",
		"ingredients": ["eggs", "feta cheese", "garlic", "red onions", "spinach", "tomato", "water"],
		"link": "http://www.kraftfoods.com/kf/recipes/greek-omelet-feta-104508.aspx",
		"gif": "https://media.giphy.com/media/xBRhcST67lI2c/giphy.gif"
	   },{
		"title": "Guacamole Dip Recipe",
		"ingredients": ["avocado", "onions", "tomato"],
		"link":"http://cookeatshare.com/recipes/guacamole-dip-2783",
		"gif":"https://media.giphy.com/media/I3eVhMpz8hns4/giphy.gif"
	   }
	]
}
```
