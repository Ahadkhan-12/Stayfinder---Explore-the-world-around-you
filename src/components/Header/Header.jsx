import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar,Toolbar,Typography, InputBase ,Box } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles';

const Header = ({onLoad , onPlaceChanged}) =>{
    const classes=useStyles();
    

    return(
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Stayfinder 
                </Typography>

                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore the world around you
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} renderInput>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase placeholder="Search..." classes={{root:classes.inputRoot,input:classes.inputInput}}/>
                        </div>
                    </Autocomplete>
                </Box>

            </Toolbar>
        </AppBar>
    );
}

export default Header;