import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './reducers/auth.reducer.jsx';
import { userReducer } from './reducers/user.reducer.jsx';

// Combine les reducers pour gérer différentes parties de l'état global
const rootReducer = combineReducers({
   auth: authReducer, // Gère l'état lié à l'authentification
   user: userReducer  // Gère l'état lié aux données utilisateur
})

// Configure le store Redux
const store = configureStore({
    reducer: rootReducer, // Définit le reducer principal
    devTools: true        // Active les outils de développement Redux ( à desactiver pour d'eventuelles failles de sécurité)
})

export default store; // Exporte le store pour l'utiliser dans l'application