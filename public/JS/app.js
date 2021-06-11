

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message');

message1.textContent='';

weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault();
    console.log('Button pressed');
    fetch('http://api.weatherstack.com/current?access_key=40cf8a28b56490ae70f8c5a19fa2506e&query='+search.value).then((response) => {
    response.json().then((data) => {

        if(data.error){
            console.log({error:data.error.info});
            message1.textContent = data.error.info;
            return;
        }

        message1.textContent = 'The temperature is '+data.current.temperature +' and feels like ' + data.current.feelslike+'.';
        console.log({
            temperature: data.current.temperature,
            feelslike: data.current.feelslike
            });
        });
    });
});
