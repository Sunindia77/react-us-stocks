import React from 'react';
import { Provider } from 'react-redux';
import HomePage from './pages/HomePage';
import store from './store/store';
import './styles/main.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <HomePage />
      </div>
    </Provider>
  );
};

export default App;
