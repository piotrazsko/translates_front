import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './assets/jss/theme.js';
import AppContainer from 'containers/App';
import { store, persistor } from 'store';
import MomentContainer from 'containers/MomentContainer';

import Viewport from 'containers/ViewPort';

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <AppContainer />
                    <Viewport />
                    <MomentContainer />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
