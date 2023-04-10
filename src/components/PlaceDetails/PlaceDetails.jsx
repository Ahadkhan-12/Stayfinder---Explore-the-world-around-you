import React from "react";
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import { Rating } from "@material-ui/lab/"; 

import useStyles from "./styles";

const PlaceDetails = ({ place ,selected , refProp}) => {
    const classes = useStyles();

    if(selected) refProp?.current?.scrollIntoView({  behaviour:'smooth' ,block :'start'  });
    return (
        <Card elevation={6}>
            <CardMedia style={{ height: 250 }}
                image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Rating value={Number(place.rating)} readOnly />
                    <Typography gutterBottom variant="caption">out of {place.num_reviews} reviews</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">Price</Typography>
                    <Typography gutterBottom variant="caption">{place.price_level}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">Ranking</Typography>
                    <Typography size="small" gutterBottom variant="caption">{place.ranking}</Typography>
                </Box>
                {place?.awards?.map((award) => (
                    <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
                        <img src={award.images.small} alt="award_img"/>
                        <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}
                {place?.cuisine?.map(({ key: key1, name: name1 }) => (
                    <Chip key={key1} size="small" label={name1} className={classes.chip} />
                ))}
                {place.address && (
                    <Typography gutterBottom variant="caption" color="textSecondary" className={classes.subtitle}>
                        <LocationOnIcon />{place.address_obj.street1}{place.address_obj.street2}{place.address_obj.city}
                    </Typography>
                )}
                {place.phone && (
                    <Typography gutterBottom variant="body2" color="textSecondary" className={classes.spacing}>
                        <PhoneIcon />{place.phone}
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                    Trip Advisor
                </Button>
                <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                    Website
                </Button>
            </CardActions>
        </Card>
    );
}

export default PlaceDetails;
