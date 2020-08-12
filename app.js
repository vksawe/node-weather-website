const axios=require('axios')

//let url='http://api.weatherstack.com/current?access_key=5d59a18788366d7acccaf9fad4d577d6&query=Eldoret'

geocodeURL="https://api.mapbox.com/geocoding/v5/mapbox.places/Nairobi.json?access_token=pk.eyJ1IjoidmtzYXdlIiwiYSI6ImNrZG13NWoxNDAwczcydHFvenJsaGt1bGoifQ.0nZfWjiBJhWEX6skrOVTpA&limit=1"




axios.get(geocodeURL).then((response)=>{
        if(response.data.error){
            console.log(response.error.info)
            return;
        }
        else{
            if(response.data.features.length==0){
                console.log("Unable to find adress")
                return;
            }
            let lat=response.data.features[0].center[1]
            let lon=response.data.features[0].center[0]
            let url=`http://api.weatherstack.com/current?access_key=5d59a18788366d7acccaf9fad4d577d6&query=${lat},${lon}`
            axios.post(url).then((response)=>{
                //console.log(response)
                if(response.data.error){
                    console.log(response.data.error.info)
                    return;
                }
            
        console.log(`The temperature is ${response.data.current.temperature} AND cloud is ${response.data.current.weather_descriptions}`)
    }).catch((error)=>{
        console.log(error)
    })
    }
}).catch((error)=>{
    console.log(error)
})






