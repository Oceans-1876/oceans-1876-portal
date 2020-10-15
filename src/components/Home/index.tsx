import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import stationsGeoJSON from '../../files/stations.geojson';

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

interface StationProperties {
    id: number;
    station: string;
    location_name: string;
    location_original_text: string;
}

const Home: React.FC = () => {
    const classes = useStyle();

    const mapContainer = React.useRef<HTMLDivElement>(null);
    let map: mapboxgl.Map;

    React.useEffect(() => {
        if (mapContainer.current && mapboxgl.accessToken) {
            map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [0, 0],
                zoom: 1
            });
            map.on('load', () => {
                map.addSource('stations', {
                    type: 'geojson',
                    data: stationsGeoJSON
                });
                map.addLayer({
                    id: 'stations',
                    type: 'circle',
                    source: 'stations',
                    paint: {
                        'circle-color': '#088'
                    }
                });
                map.on('click', 'stations', (e) => {
                    if (e.features && e.features[0]) {
                        const { station, location_name, location_original_text } = e.features[0]
                            .properties as StationProperties;
                        const content = `<div>Station ${station}<br />${location_name}<br />${location_original_text}</div>`;
                        new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(content).addTo(map);
                    }
                });

                // Change the cursor to a pointer when the mouse is over the states layer.
                map.on('mouseenter', 'stations', () => {
                    map.getCanvas().style.cursor = 'pointer';
                });

                // Change it back to a pointer when it leaves.
                map.on('mouseleave', 'stations', () => {
                    map.getCanvas().style.cursor = '';
                });
            });
        }
    }, []);

    return (
        <Grid className={classes.main} container item xs={12} justify="center" alignContent="space-around" spacing={5}>
            <div className={classes.mapContainer} ref={mapContainer} />
        </Grid>
    );
};

export default Home;
