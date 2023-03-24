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

    useEffect(() =>{
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}}) =>{
            setCoordinates({lat:latitude , lng:longitude});
        })
    },[]);

    useEffect(() =>{
        setIsLoading(1);
        getPlacesData(bounds.sw,bounds.ne)
        .then((data) => {
            setPlaces(data);
            setIsLoading(0);
        })
    },[coordinates,bounds]);

    return (
        <>
            <CssBaseline />
            <Header/>
            <Grid container spacing={3} style={{width:'100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                    places={places}
                    childClicked={childClicked}
                    isLoading={isLoading}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                    setCoordinates={setCoordinates}
                    setBoundary={setBoundary}
                    coordinates={coordinates}
                    places={places}
                    setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>

        
        </>
    )
}

export default App;