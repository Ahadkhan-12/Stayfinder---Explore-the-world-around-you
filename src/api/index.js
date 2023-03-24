import axios from "axios";

export const getPlacesData = async (type, sw, ne)=> {
    try{
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            'X-RapidAPI-Key': '5d7baebc97mshdbca2c587858d81p18164cjsnd1c87c3c5058',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }
        });

        return data;
    }catch(error){
        console.log("error");
    }
}

