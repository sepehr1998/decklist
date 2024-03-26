import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Hero } from '../../types';
import HeroPropIndicator from "../Hero Prop Indicator/hero-prop-indicator.component";
import './card.styles.scss';

interface CustomCardProps {
    hero: Hero;
    onShowMore: () => void;
}

const CustomCard: React.FC<CustomCardProps> = ({ hero, onShowMore }) => {
    const BASE_URL = 'https://ringsdb.com/';

    return (
        <Card>
            <CardActionArea onClick={onShowMore}>
                <CardMedia
                    component="img"
                    height="350"
                    image={`${BASE_URL}${hero?.imagesrc}`}
                    alt={hero.name}
                />
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ fontFamily: 'Caveat' }}>
                        {hero.name}
                    </Typography>
                    <div className="props-container">
                        <div className="indicator-container">
                            <HeroPropIndicator value={hero.attack} color="error" caption='attack'/>
                        </div>
                        <div className="indicator-container">
                            <HeroPropIndicator value={hero.defense} color="warning" caption='defense'/>
                        </div>
                        <div className="indicator-container">
                            <HeroPropIndicator value={hero.health} color="success" caption='health'/>
                        </div>
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button color="primary" variant="contained" onClick={onShowMore} fullWidth>
                    Show More
                </Button>
            </CardActions>
        </Card>
    );
};

export default CustomCard;
