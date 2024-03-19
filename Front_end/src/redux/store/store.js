import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import rootReducer from "../reducer/reducer"; // Asegúrate de tener la ruta correcta a tus reducers

// Middleware personalizado si lo necesitas en el futuro
const customMiddleware = store => next => action => {
  // Puedes agregar lógica personalizada aquí si es necesario
  return next(action);
};

// Utiliza composeWithDevTools para habilitar la extensión de Redux DevTools
const composeEnhancers = composeWithDevTools({
  // opciones si es necesario
});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk, customMiddleware)
    // Puedes agregar más middlewares si es necesario
  )
);

export default store;
