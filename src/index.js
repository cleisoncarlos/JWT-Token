
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

const SECRET = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMjkwMzY4MCwiaWF0IjoxNzAyOTAzNjgwfQ.XZcQ32EGU4ovakJaMP8ghG_l5F77pMEDOQvQdtaUm4U'

const port = 3000
app.use(express.json())

//middleware para fazer verificação de acesso as rotas
function verifyJwt(req, res, next){
    const token = req.headers['x-access-token']
    jwt.verify(token, SECRET, (err, decoded)=> {
        if(err) return res.status(401).end();
        // guarda o ID do usuario caso o token seja verdadeiro
        req.userId = decoded.userId;
        next();
    })
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/clientes', verifyJwt, (req, res) => {
    res.json({id: 1, nome: 'Cleison Carlos' })
  })

app.post('/login', (req, res) => {
    if (req.body.user === 'Cleison Carlos' && req.body.password === '123456') {
        // identifica usuario // senha secret do server // tempo que o token ficará disponivel
     const token =  jwt.sign({userId: 1}, SECRET, {expiresIn: 300})
        return res.json({ auth: true, token})
    }
    // 401 - Não autorizado
    res.status(401).end()
  })

app.post('/logout', (req, res) => {
    res.end()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

