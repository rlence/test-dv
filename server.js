const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const body_parser = require('body-parser');

app.use(cors());
app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());

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

//CREATE ELEMENT
app.post('/create', (req,res) => {
    try{
        const {name, rol, group, permissions} = req.body;
        const id = Math.floor(Math.random() * 100);
        const new_obj = {
            id,
            name,
            rol,
            group,
            permissions
        }
        const json = require('./data/tabla.json');
        console.log(json)
        json.data.push(new_obj);
        res.status(200).send(json);
    }catch(err){
        res.status(400).send('Bad Request');
    }
})

app.listen(port, ()=>{
    console.log('Server Listen in port:' + port);

})