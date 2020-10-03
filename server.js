const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

//solicitud get para la tabla
app.get( '/', (req, res)=>{
    const json = require('./data/tabla.json');
    const body = {
        status:200,
        data: json.data
    }
    res.status(200).send(body);
});

//solicitud get para detalles
app.get( '/:id', (req,res)=>{
    const id = req.params.id;
    const json = require('./data/detail.json');
    const data = json.data;
    const body = {
        status:200,
        data: ''
    }
    data.map( (user)=>{
        if(user.id == id){
            body.data = user;
        }
    }) 
    res.status(200).send(body)
});

app.listen(port, ()=>{
    console.log('Server Listen in port:' + port);

})