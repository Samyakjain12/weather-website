const request = require("request");


const forecast = (location = '' , callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=40cf8a28b56490ae70f8c5a19fa2506e&query='+location;
    request({url:url , json:true} , (error , response) =>{
            if(error){
                callback('Unable to connect' , undefined);
            }
            else if(response.body.error){
                callback({error:response.body.error.info } , undefined);
            }
            else{
                callback(undefined , {
                    temperature: response.body.current.temperature , 
                    feelslike: response.body.current.feelslike
                });
            }
        });
}

module.exports = forecast;

