import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

mapboxgl.accessToken = process.env.MAPBOX_TOKEN || '';

const useStyle = makeStyles(() => ({
    main: {
        height: '100%',
        margin: 0
    },
    mapContainer: {
        width: '100%',
        height: '100%'
    }
}));

const Home: React.FC = () => {
    const classes = useStyle();

    const mapContainer = React.useRef<HTMLDivElement>(null);
    let map;

    React.useEffect(() => {
        if (mapContainer.current && mapboxgl.accessToken) {
            map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [0, 0],
                zoom: 1
            });
            console.warn(map);
        }
    }, []);

    return (
        <Grid className={classes.main} container item xs={12} justify="center" alignContent="space-around" spacing={5}>
            <div className={classes.mapContainer} ref={mapContainer} />
        </Grid>
    );
};

export default Home;
