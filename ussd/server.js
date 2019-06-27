import {Service} from services/services;
const app =  require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')


const port = process.env.PORT || 5000
const Service =  new Service();
ussd = Service.initializeUssd();

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('*', (req, res) => {
    res.send(`Welcome to PesaMobie!!`)
})

app.post('*', (req, res) =>{
    let {sessionId, serviceCode, phoneNumber, text} = req.body
    if(text === ''){
        //This is the initial request 
        let response_text = `Welcome to PESAMOBIE. Kindly select an option
        1. Login
        2. Register
        `
        let response = ussd.connect(response_text);
        res.send(response);
    }
    else if(text === `1`){
        //First level response for business logic
        let response_text = '';
    }
})