const axios=require('axios')



const weather=({lat,lon},callback)=>{

let url=`http://api.weatherstack.com/current?access_key=5d59a18788366d7acccaf9fad4d577d6&query=${encodeURIComponent(lat)},${encodeURIComponent(lon)}`
axios.post(url).then((response)=>{
    //console.log(response)
    if(response.data.error){
        callback(response.data.error.info)
        return;
    }

    //console.log(response.data)
    //console.log({DAAAATA:response.data.current})
    callback(null,
        `${response.data.current.weather_descriptions} with temperatures of ${response.data.current.temperature} `)

}).catch((error)=>{
callback(error)
})

}

module.exports=weather