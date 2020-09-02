console.log("Hahahaha")



const weatherForm=document.querySelector('form');
const enteredAddress=document.querySelector('input');
const weatherParagraph=document.querySelector('#weather-paragraph')
const message2=document.querySelector('#message2')
weatherForm.addEventListener('submit',(e)=>{
e.preventDefault();
console.log(enteredAddress.value)
weatherParagraph.textContent=''
message2.textContent='Loading'

fetch(`/weather?address=${enteredAddress.value}`).then((response)=>{
    
    response.json().then((data)=>{
        
        if(data.error){
            console.log(data.error)
            message2.textContent=''
           return  weatherParagraph.textContent=data.error
        }
        console.log(data)
        weatherParagraph.textContent=data.message
        message2.textContent=''
    })
})
})