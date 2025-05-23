import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./type.actions";

/* Action déclenchée lors d'une connexion réussie */
export const loginSuccess = (token) => {
    return {
        type: LOGIN_SUCCESS, // Informe Redux que la connexion a réussi
        payload: token, // Envoie le jeton d'authentification
    }
}

/* Action déclenchée lors d'une erreur de connexion */
export const loginFailed = (error) => {
    return {
        type: LOGIN_FAIL, // Informe Redux que la connexion a échoué
        payload: error, // Envoie le message ou l'objet d'erreur
    }
}

/* Action déclenchée lors de la déconnexion */
export const logout = () => {
    return {
        type: LOGOUT, // Informe Redux que l'utilisateur s'est déconnecté
    }
}