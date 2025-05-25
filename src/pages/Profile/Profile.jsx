import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userProfile } from '../../redux/actions/user.actions.jsx';
import User from '../../components/User.jsx';
import Account from '../../components/Account.jsx';
import AccountCardData from '../../data/AccountCardData.json';

/* Page de profil utilisateur */
function UserProfile () {
    const token = useSelector((state) => state.auth.token); // Récupère le token d'authentification depuis Redux
    const dispatch = useDispatch(); // Permet de dispatcher des actions Redux

    /* Récupère les données utilisateur et les met à jour dans Redux */
    useEffect(() => {
        if (token) {
            const userData = async () => {
                try {
                    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                        method: 'GET', 
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        const userData = {
                            createdAt: data.body.createdAt,
                            updatedAt: data.body.updatedAt,
                            id: data.body.id,
                            email: data.body.email,
                            firstname: data.body.firstName,
                            lastname: data.body.lastName,
                            username: data.body.userName, 
                        };
                        dispatch(userProfile(userData)); // Met à jour les données utilisateur dans Redux
                    } else {
                        console.log("Erreur lors de la récupération du profil");
                    }
                } catch (error) {
                    console.error(error); // Affiche une erreur en cas de problème avec la requête
                }
            };
            userData();
        }
    }, [dispatch, token]); // Dépendances : exécute l'effet lorsque `dispatch` ou `token` change

    return (
        <div className='profile-page'>
            <main className='bg-dark'>
                <User /> {/* Composant utilisateur */}
                {AccountCardData.map((data) => (
                    <Account 
                        key={data.id} // Clé unique pour chaque composant
                        title={data.title}
                        amount={data.amount}
                        description={data.description}
                    />
                ))}
            </main>
        </div>
    );
}

export default UserProfile;