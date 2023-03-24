import React,{useState,useEffect} from "react";
import { CssBaseline,Grid } from "@material-ui/core";


import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";

const App = () => {
    const [places,setPlaces] = useState([]);
    const [coordinates,setCoordinates]=useState({});
    const [bounds,setBoundary] =useState({});
    const [childClicked,setChildClicked] =useState(null);
    const [isLoading,setIsLoading]=useState(0);
    const [type,setType]=useState('restaurants');
    const [rating,setRating]=useState('');
    const [filteredPlaces , setFilteredPlaces]=useState([]);

    useEffect(() =>{
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}}) =>{
            setCoordinates({lat:latitude , lng:longitude});
        })
    },[]);

    useEffect(() =>{
        const filteredPlaces=places.filter((place) => (place.rating>rating));

        setFilteredPlaces(filteredPlaces);
    },[rating]);

    useEffect(() =>{
        setIsLoading(1);
        getPlacesData(type,bounds.sw,bounds.ne)
        .then((data) => {
            setPlaces(data);
            setFilteredPlaces([]);
            setIsLoading(0);
        })
    },[type,coordinates,bounds]);

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates}/>
            <Grid container spacing={3} style={{width:'100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                    places={filteredPlaces.length?filteredPlaces:places}
                    childClicked={childClicked}
                    isLoading={isLoading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                    setCoordinates={setCoordinates}
                    setBoundary={setBoundary}
                    coordinates={coordinates}
                    places={filteredPlaces.length?filteredPlaces:places}
                    setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>

        
        </>
    )
}

export default App;