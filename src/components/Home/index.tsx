import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { headerHeight } from '../Layouts/styles';

const useStyle = makeStyles(() => ({
    main: {
        height: `calc(100vh - ${headerHeight})`,
        margin: 0
    }
}));

const Home: React.FC = () => {
    const classes = useStyle();

    return (
        <Grid className={classes.main} container item xs={12} justify="center" alignContent="space-around" spacing={5}>
            Oceans 1876
        </Grid>
    );
};

export default Home;
