import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../actions/type.actions";

/* État initial de l'authentification */
const initialState = {
    status: "VOID",        // État initial (aucune action encore effectuée)
    isConnected: false,    // Indique si l'utilisateur est connecté
    token: null,           // Jeton d'authentification (null par défaut)
    error: null,           // Message d'erreur (null par défaut)
}

/* Reducer pour gérer les actions liées à l'authentification */
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: // Connexion réussie
            return {
                ...state,
                status: "SUCCEEDED",  // Mise à jour de l'état
                isConnected: true,    // L'utilisateur est connecté
                token: action.payload, // Stocke le jeton
                error: null           // Réinitialise les erreurs
            }
        
        case LOGIN_FAIL: // Échec de la connexion
            return {
                ...state,
                status: "FAILED",     // Mise à jour de l'état
                isConnected: false,   // L'utilisateur n'est pas connecté
                error: action.payload // Stocke le message d'erreur
            }
        
        case LOGOUT: // Déconnexion
            return initialState; // Réinitialise l'état à sa valeur initiale
        
        default: // Action non reconnue
            return state; // Retourne l'état actuel sans modification
    }
}