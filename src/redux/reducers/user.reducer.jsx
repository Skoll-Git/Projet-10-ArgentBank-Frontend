import { GET_USERPROFILE, EDIT_USERNAME, LOGOUT } from "../actions/type.actions"

/* État initial de l'utilisateur */
const initialState = {
    status: 'VOID',       // Aucun état particulier (par défaut)
    userData: {}          // Données utilisateur (vide par défaut)
}

/* Reducer pour gérer les actions liées à l'utilisateur */
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERPROFILE: // Récupération du profil utilisateur
            return {
                ...state,
                status: 'SUCCEEDED',    // Mise à jour de l'état
                userData: action.payload // Stocke les données utilisateur
            }
        case EDIT_USERNAME: // Modification du nom d'utilisateur
            return {
                ...state,
                status: "MODIFIED",     // Indique que le profil a été modifié
                userData: {
                    ...state.userData,  // Conserve les autres données utilisateur (Mail et mdp conserver grace à l'Opérateur de décomposition "...")
                    username: action.payload // Met à jour le nom d'utilisateur
                } 
            } 
        case LOGOUT: // Déconnexion
            return initialState; // Réinitialise l'état à sa valeur par défaut
        
        default: // Action non reconnue
            return state; // Retourne l'état actuel sans modification
    }
}

