const axios=require('axios')

const geocode=(address,callback)=>{

    geocodeURL=`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmtzYXdlIiwiYSI6ImNrZG13NWoxNDAwczcydHFvenJsaGt1bGoifQ.0nZfWjiBJhWEX6skrOVTpA&limit=1`

    axios.get(geocodeURL).then((response)=>{
        if(response.data.error){
            callback(response.error.info)
            return;
        }
        else{
            if(response.data.features.length==0){
                callback("Unable to find adress")
               return;
            }

            let coordinates={
                lat:response.data.features[0].center[1],
                lon:response.data.features[0].center[0]
            }
           callback(null,coordinates)
            
    }
}).catch((error)=>{
    callback(error)
})

}


module.exports=geocode