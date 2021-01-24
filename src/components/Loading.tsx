import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import React from 'react';

const Loading = (): JSX.Element => (
    <Box className="fillContainer" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
    </Box>
);

export default Loading;
