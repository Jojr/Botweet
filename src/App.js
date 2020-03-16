/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Platform, NativeModules } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { I18n } from '@aws-amplify/core';
import Router from './router';
import { store, persistor } from './store';

import portuguese from './config/i18n/i18n_pt_BR';

I18n.putVocabularies(portuguese);

class App extends Component {
    componentDidMount = () => {
      /* Set language for each platform */
      let lang;
      if (Platform.OS === 'ios') {
        /* Aquire language on ios devices */
        lang = NativeModules.SettingsManager.settings.AppleLocale;
      } else {
        /* Aquire language on Android devices */
        lang = NativeModules.I18nManager.localeIdentifier;
      }
      I18n.setLanguage(lang);
    }

    render() {
      console.disableYellowBox = true;
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router />
          </PersistGate>
        </Provider>
      );
    }
}
export default App;
