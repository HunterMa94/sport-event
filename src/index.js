import React from 'react';
import ReactDOM from 'react-dom/client';
// import { firebase } from './firebase';
import store from './Redux/store';
import { Provider } from 'react-redux';

import "./Resources/css/app.css"
import App from './App';
// import { BrowserRouter } from 'react-router-dom';

// const Routes = (props) => {
//   return (
//     <App {...props} />
//   )
// }



// firebase.auth().onAuthStateChanged((user) => {
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
// })




