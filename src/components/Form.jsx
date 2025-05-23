import React, {useState} from 'react'
import { useDispatch } from 'react-redux'; // Permet d'envoyer des actions Redux
import { loginFailed, loginSuccess } from '../redux/actions/auth.actions'; // Actions Redux pour la connexion
import { isValidEmail, isValidPassword } from '../utils/regex'; // Fonctions de validation des champs
import { useNavigate } from 'react-router-dom';
import '../sass/components/_Form.scss';



function Form() {
    /* États pour stocker les données saisies par l'utilisateur */
    const [email, setEmail] = useState(''); // Stocke l'email de l'utilisateur
    const [password, setPassword] = useState(''); // Stocke le mot de passe de l'utilisateur
    const [rememberMe, setRememberMe] = useState(false); // Indique si l'utilisateur souhaite être "retenu"
    const [errorMessage, setErrorMessage] = useState(''); // Stocke un message d'erreur en cas de problème

    const navigate = useNavigate(); // Permet de naviguer entre les pages
    const dispatch = useDispatch(); // Permet de dispatcher des actions Redux

    /* Fonction asynchrone pour gérer la soumission du formulaire */
    const handleSubmit = async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page lors de la soumission

        /* Validation des champs */
        if (!isValidEmail(email)) { // Vérifie si l'email est valide
            setErrorMessage("Invalid email address"); // Définit un message d'erreur
            return;
        }
        if (!isValidPassword(password)) { // Vérifie si le mot de passe est valide
            setErrorMessage("Invalid password"); // Définit un message d'erreur
            return;
        }

        try {
            /* Envoie une requête POST au serveur pour se connecter */
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Spécifie que les données envoyées sont au format JSON
                },
                body: JSON.stringify({ email, password }), // Convertit les données en JSON
            });

            if (response.ok) { // Si la réponse est réussie
                const data = await response.json(); // Récupère les données de la réponse
                const token = data.body.token; // Extrait le token de la réponse

                dispatch(loginSuccess(token)); // Enregistre le token dans Redux
                sessionStorage.setItem("token", token); // Stocke le token dans la session

                if (rememberMe) { // Si l'utilisateur a coché "Remember me"
                    localStorage.setItem("token", token); // Stocke le token dans le localStorage
                }

                navigate('/profile'); // Redirige l'utilisateur vers la page de profil
            } else {
                const error = "Incorrect email/password"; // Définit un message d'erreur
                dispatch(loginFailed(error)); // Enregistre l'erreur dans Redux
            }
        } catch (error) {
            console.error(error); // Affiche une erreur dans la console en cas de problème
        }
    };

    return (
        <section className='sign-in-content'>
            <i className="fa-solid fa-circle-user"></i>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className='input-wrapper'>
                    <label htmlFor='username'>Username</label>
                    <input 
                        id='username' 
                        type='text'
                        value={email} // Liaison avec l'état "email"
                        onChange={(event) => setEmail(event.target.value)} // Met à jour l'état "email"
                    />
                </div>
                <div className='input-wrapper'>
                    <label htmlFor='password'>Password</label>
                    <input 
                        id='password' 
                        type='password'
                        value={password} // Liaison avec l'état "password"
                        onChange={(event) => setPassword(event.target.value)} // Met à jour l'état "password"
                    />
                </div>
                <div className='input-remember'>
                    <input 
                        id='remember-me' 
                        type='checkbox'
                        checked={rememberMe} // Liaison avec l'état "rememberMe"
                        onChange={(event) => setRememberMe(event.target.checked)} // Met à jour l'état "rememberMe"
                    />
                    <label htmlFor='remember-me'>Remember me</label>
                </div>
                <button className="sign-in-button">
                    Sign In
                </button>
                {errorMessage && <p className='error-message'>{errorMessage}</p>} {/* Affiche un message d'erreur si défini */}
            </form>
        </section>
    )
}

export default Form
