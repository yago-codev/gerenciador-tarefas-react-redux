import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';  // componente que irá atualizar o estado global da aplicação quando alguma variável da store for modificada
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';
import App from './App';
import mainReducer from './store';

// a função applyMiddleware() irá receber o "redux" como parâmetro,
// essa função applyMiddleware irá retornar uma função, 
// a qual utilizaremos pra chamar o "createStore",
// que também retornará uma função que vai receber o Reducer principal da aplicação.
const store = applyMiddleware(thunk)(createStore)(mainReducer);

// o componente Provider do "react-redux" irá envolver o componente raíz da aplicação ("App").
// para o Provider funcionar, ele precisa receber uma prop chamada "store", 
// que irá receber a constante store criada logo acima
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

serviceWorker.unregister();
