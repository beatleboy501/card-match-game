import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import MainMenu from './MainMenu';
import { persistor, store } from '../../redux/store/configureStore';
import LoadingView from './LoadingView';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<LoadingView />} persistor={persistor}>
      <MainMenu />
    </PersistGate>
  </Provider>
);

export default App;
