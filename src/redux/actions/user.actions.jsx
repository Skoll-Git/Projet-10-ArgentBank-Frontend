import { GET_USERPROFILE, EDIT_USERNAME } from "./type.actions";

/* Action pour récupérer les données utilisateur */
export const userProfile = (userData) => {
    return {
        type: GET_USERPROFILE, // Informe Redux que les données utilisateur doivent être récupérées
        payload: userData, // Contient les données utilisateur
    }
}

/* Action pour mettre à jour le nom d'utilisateur */
export const updateUsername = (username) => {
    return {
        type: EDIT_USERNAME, // Informe Redux que le nom d'utilisateur doit être modifié
        payload: username, // Contient le nouveau nom d'utilisateur
    }
}