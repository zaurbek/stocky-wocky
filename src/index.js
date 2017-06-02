import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Root from './components/Root.jsx';
import configureStore from './store/configureStore';
import initialState from './store/initialState';


const store = configureStore(initialState);

render(
  <Provider store={store}>
      <Root />
    </Provider>, document.getElementById('root')
);