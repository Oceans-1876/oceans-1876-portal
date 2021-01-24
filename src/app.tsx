import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';

import { theme } from './theme';
import routes from './routes';
import Loading from './components/Loading';

const App = (): JSX.Element => (
    <Container className="fillContainer" disableGutters maxWidth={false}>
        <Suspense fallback={<Loading />}>
            {Object.entries(routes).map(([path, props]) => (
                <Route key={path} path={path} {...props} />
            ))}
        </Suspense>
    </Container>
);

ReactDOM.render(
    <Router>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Router>,
    document.getElementById('root')
);
