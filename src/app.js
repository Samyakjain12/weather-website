const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/weather.js');

//console.log(__dirname);
//console.log(path.join(__dirname , '../public'));

const  app = express();

const publicDir = path.join(__dirname , '../public');
const partialsPath = path.join(__dirname,'../templates/partials');

const viewPath = path.join(__dirname,'../templates/views');


app.set('views', viewPath);

hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

app.get('/' , (req , res) => {
    res.render('index.hbs' , {
        title:'Weather App',
        name: 'Samyak Jain'
    });
});

app.get('/about' , (req , res) => {
    res.render('about.hbs' , {
        title:'About Me',
        name: 'Samyak Jain'
    });
});

app.get('/help' , (req , res) => {
    res.render('help.hbs' , {
        title:'Help',
        helpText: 'Helper Page',
        Name: 'Samyak Jain'
    });
});

app.get('/weather' , (req , res) => {

    if(!req.query.address){
        res.send({
            error: 'error',
            info: 'Address is missing'
        });

        return;
    }


    forecast(req.query.address , (error , data = '') => {
        if(error){
            res.send(error);
            return;
        }

        console.log(data);
       // data = data + {address:req.query.address};
        
        res.send({
            forecast:data,
            address:req.query.address
        });

    });
    
});



app.get('/products' , (req , res) =>{

    if(!req.query.search){
        res.send({error: 'Provide search option!'})
        return;
    }else{

    }
    console.log(req.query.search);
    res.send({Products:[]});
});


app.get('*' , (req , res)=> {
    res.render('error.hbs' , {
        title: 'Error 404'
    });
});

app.listen(3000 , (err) =>{

    if(err)
    {
        console.log(err);
    }

    console.log('Listening to port 3000...');
});