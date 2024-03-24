import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Hero } from '../../types';

interface CustomCardProps {
    hero: Hero;
    onShowMore: () => void;
}

const CustomCard: React.FC<CustomCardProps> = ({ hero, onShowMore }) => {
    const BASE_URL = 'https://ringsdb.com/';

    return (
        <Card sx={{ width: '25%' }}>
            <CardActionArea onClick={onShowMore}>
                <CardMedia
                    component="img"
                    height="350"
                    image={`${BASE_URL}${hero?.imagesrc}`}
                    alt={hero.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {hero.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={onShowMore}>
                    Show More
                </Button>
            </CardActions>
        </Card>
    );
};

export default CustomCard;
