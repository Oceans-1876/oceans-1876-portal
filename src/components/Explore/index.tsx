import React from 'react';
import maplibre from 'maplibre-gl';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { MapControl } from '../Map/Control';

import stationsGeoJSON from '../../files/stations.geojson';

maplibre.accessToken = MAPBOX_TOKEN || '';

const useStyle = makeStyles((theme) => ({
    main: {
        height: '100%',
        margin: 0
    },
    mapContainer: {
        width: '100%',
        height: '100%'
    },
    sidebar: {
        background: '#fff',
        width: 300,
        padding: theme.spacing(1)
    },
    searchInput: {
        marginLeft: theme.spacing(1),
        flex: 1
    }
}));

interface StationProperties {
    station_id: number;
    station: string;
    name: string;
    species: string;
    date: string;
    air_temperature_noon: number;
    air_temperature_daily_mean: number;
    water_temperature_bottom: number;
    water_temperature_surface: number;
    water_density_bottom_60f: number;
    water_density_surface_60f: number;
}

const Explore = (): JSX.Element => {
    const classes = useStyle();

    const mapContainer = React.useRef<HTMLDivElement>(null);
    let map: maplibre.Map;

    const sidebar = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (mapContainer.current && maplibre.accessToken) {
            map = new maplibre.Map({
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
                        const {
                            station,
                            name,
                            species,
                            air_temperature_noon,
                            air_temperature_daily_mean,
                            water_temperature_bottom,
                            water_temperature_surface,
                            water_density_bottom_60f,
                            water_density_surface_60f
                        } = e.features[0].properties as StationProperties;
                        const speciesList = JSON.parse(species).map((sp: string) => `<li>${sp}</li>`);
                        const content = `
                            <div>
                                ${station} - ${name}<br />
                                Air temperature (noon): ${air_temperature_noon}&deg;<br />
                                Air temperature (daily mean): ${air_temperature_daily_mean}&deg;<br />
                                Water temperature (bottom): ${water_temperature_bottom}&deg;<br />
                                Water temperature (surface): ${water_temperature_surface}&deg;<br />
                                Water density (bottom - 60F): ${water_density_bottom_60f}&deg;<br />
                                Water density (surface - 60F): ${water_density_surface_60f}&deg;<br />
                                Species: <ul>${speciesList.join('')}</ul>
                            </div>
                        `;
                        new maplibre.Popup().setLngLat(e.lngLat).setHTML(content).addTo(map);
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

                if (sidebar.current) {
                    map.addControl(new MapControl(sidebar.current), 'top-left');
                }
            });
        }
    }, []);

    return (
        <Grid className={classes.main} container item xs={12} justify="center" alignContent="space-around" spacing={5}>
            <div className={classes.mapContainer} ref={mapContainer} />
            <Grid className={`hidden ${classes.sidebar}`} ref={sidebar}>
                <Grid item component={Box} display="flex">
                    <InputBase className={classes.searchInput} placeholder="Search..." />
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Explore;
