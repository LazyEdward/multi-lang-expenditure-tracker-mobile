import React, { useState, useEffect } from 'react';

import { Provider } from 'react-redux';
// import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';

import Main from './pages/main';
import Splash from './components/Splash';

export default function App() {

  const [splash, setSplash] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSplash(false);
  //   }, 1500);
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<Splash/>} persistor={persistor} onBeforeLift={() => setTimeout(() => {
        setSplash(false);
      }, 1500)}>
        <Main splash={splash}/>
      </PersistGate>
    </Provider>
  );
}
