const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let produtos = []
let i = 0
let total = 0

function formatMoney(n, c, d, t) {
    c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

function tiraCaracteres(numero){
    const novo = numero.split(' ')
    return parseFloat(novo[1].replace('.','').replace(',','.'))
}

// Usando o BodyParser para vim no formato certo de urlencode
app.use(bodyParser.urlencoded({extended: true}))

// Estou dizendo para meu app que a view engine será EJS
app.set('view engine','ejs')

// Estou dizendo quero usa arquivos estáticos no Express
app.use(express.static('public'))


app.get('/',(req,res,next)=>{
    res.render('index',{
        produtos,
        total,
        formatMoney
    })
})

app.get('/cadastro',(req,res)=>{
    res.render('cadastro')
})

app.post('/cadastro',(req,res)=>{
    total += tiraCaracteres(req.body.preco) * parseFloat(req.body.qtd)
    produtos[i] = req.body
    res.redirect('/')
    i++
})



app.listen(8080,()=>[
    console.log('Rodando o Servidor.....')
])