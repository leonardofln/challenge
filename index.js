var app = require("./config/server");
var request = require("request");
var dotenv = require("dotenv");

dotenv.config();

function getRecipes(ingredients) {
    return new Promise((resolve, reject) => {
        request(process.env.API_RECIPE_PUPPY_URL+'/?i='+ingredients, { json: true }, (error, response, body) => {
            if (error || response && response.statusCode != 200) {
                console.error('error:', error);
                console.log('statusCode:', response && response.statusCode);
                console.log('body:', body);
                reject('Erro ao buscar receitas: servidor de receitas indisponível!');
            } else {
                var recipes = [];
                var promises = [];
                for (var result of body.results) {
                    let recipe = {
                        title: result.title,
                        ingredients: result.ingredients.split(', ').sort(),
                        link: result.href,
                    };
                    promises.push(
                        getImage(recipe.title).then(url => {
                            recipe.gif = url;
                            recipes.push(recipe);
                        }, error => {
                            reject(error);
                        })
                    );
                }
                Promise.all(promises).then(() => {
                    resolve(recipes);
                });
            }
            
        });
    });
}

function getImage(title) {
    return new Promise((resolve, reject) => {
        request(process.env.API_GIPHY_URL+'/gifs/search?api_key='+process.env.API_GIPHY_KEY+'&q='+title+'&limit=1&offset=0&rating=g&lang=en', { json: true }, (error, response, body) => {
            if (error || response && response.statusCode != 200) {
                console.error('error:', error);
                console.log('statusCode:', response && response.statusCode);
                console.log('body:', body);
                reject('Erro ao buscar imagem: servidor de imagens indisponível!');
            } else {
                resolve(body.data[0].images.original.url);
            }
        });
	});
}

app.get('/', function (req, res) {
    res.send('Exemplo de uso da API: '+process.env.HOST+':'+process.env.PORT+'/recipes/?i=onions,tomato,garlic');
})

app.get('/recipes', function (req, res) {
    var ingredients = req.query.i;
    var keywords = ingredients.split(',');
    if (keywords.length > 3) {
        res.send('Você deve passar no máximo 3 ingredientes como parâmetro');
    } else {
        getRecipes(ingredients).then(recipes => {
            res.send({
                keywords: keywords,
                recipes: recipes
            });
        }, error => {
            console.log(error);
            res.send(error);
        });
    }
})

app.listen(process.env.PORT, function() {
    console.log('Servidor rodando na porta '+process.env.PORT);
});