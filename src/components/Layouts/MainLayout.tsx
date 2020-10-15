import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import banner from '../../images/banner_small.png';

export const headerHeight = '75px';
export const footerHeight = '60px';

const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1
    },
    header: {
        'height': headerHeight,
        'minHeight': headerHeight,
        'backgroundImage': `url(${banner})`,
        'backgroundSize': 'cover',
        'background-repeat': 'no-repeat round',
        'color': theme.palette.secondary.contrastText,
        'textDecoration': 'none',
        'border': '1px solid #555',
        '& a': {
            margin: 5
        },
        '& h5': {
            fontSize: '1.75rem'
        }
    },
    headerToolbar: {
        minHeight: headerHeight
    },
    footer: {
        'height': footerHeight,
        'background': '#f4f0ea',
        '& h5': {
            fontSize: '1.75rem'
        }
    },
    footerText: {
        'maxWidth': 365,
        'marginTop': 20,
        '& span': {
            lineHeight: '1rem'
        }
    },
    main: {
        position: 'relative',
        height: `calc(100vh - ${headerHeight} - ${footerHeight})`
    }
}));

type Props = {
    children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }: Props) => {
    const classes = useStyles();

    return (
        <Grid className={classes.container} container component="main">
            <Grid item xs={12}>
                <AppBar className={classes.header} position="relative" elevation={0}>
                    <Toolbar className={classes.headerToolbar}>
                        <Typography variant="h4">Oceans 1876 Portal</Typography>
                    </Toolbar>
                </AppBar>
            </Grid>

            <Grid className={classes.main} container item xs={12} alignItems="center">
                {children}
            </Grid>

            <Grid className={classes.footer} item xs={12} component="footer">
                <Grid container item xs={12} justify="center" spacing={2}>
                    <Grid className={classes.footerText} item xs={4}>
                        <Typography variant="caption">iLorem ipsum dolor sit amet</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

Layout.defaultProps = {
    children: undefined
};

export default Layout;
