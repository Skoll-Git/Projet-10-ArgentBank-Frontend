import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUsername } from '../redux/actions/user.actions.jsx'
import { isValidName } from '../utils/regex.jsx'
import '../sass/components/_User.scss'

function User () {
    /* Récupère les informations utilisateur depuis le state Redux */
    const token = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.user.userData);

    /* Gère l'affichage du formulaire de modification du nom d'utilisateur */
    const [display, setDisplay] = useState(true);

    /* Stocke le nouveau nom d'utilisateur */
    const [userName, setUserName] = useState('');

    /* Gère les messages d'erreur */
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();

    /* Fonction asynchrone pour mettre à jour le nom d'utilisateur */
    const handleSubmitUsername = async (event) => {
        event.preventDefault();
        if (!isValidName(userName)) {
            setErrorMessage("Invalid username");
            return;
        } else {
            setErrorMessage("");
        }
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ userName }),
            });
            if (response.ok) {
                const data = await response.json();
                const username = data.body.userName;
                dispatch(updateUsername(username)); // Met à jour le nom d'utilisateur dans Redux
                setDisplay(!display); // Ferme le formulaire après la mise à jour
            } else {
                console.log("Invalid Fields");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="header">
            {display ? 
                <div>
                    <h2>Welcome back 
                        <br />
                        {userData.firstname} {userData.lastname} !
                    </h2>
                    <button className="edit-button" onClick={() => setDisplay(!display)}>Edit Name</button>
                </div>
                :
                <div>
                    <h2>Edit user info</h2>
                    <form>
                        <div className="edit-input">
                            <label htmlFor="username">User name:</label>
                            <input
                                type="text"
                                id="username"
                                defaultValue={userData.username}
                                onChange={(event) => setUserName(event.target.value)}
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="firstname">First name:</label>
                            <input
                                type="text"
                                id="firstname" 
                                defaultValue={userData.firstname}
                                disabled={true}
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="lastname">Last name:</label>
                            <input
                                type="text"
                                id="lastname" 
                                defaultValue={userData.lastname}
                                disabled={true}
                            />
                        </div>
                        <div className="buttons">
                            <button className="edit-username-button" onClick={handleSubmitUsername}>Save</button>
                            <button className="edit-username-button" onClick={() => setDisplay(!display)}>Cancel</button>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            }
        </div>
    )
}

export default User;