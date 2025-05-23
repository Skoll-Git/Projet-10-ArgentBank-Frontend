import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/auth.actions';
import Logo from '../assets/images/argentBankLogo.webp';
import '../sass/components/_Header.scss'

function Header () {
    /* Récupère les informations utilisateur depuis le state Redux */
    const isConnected = useSelector((state) => state.auth.token); // Vérifie si l'utilisateur est connecté
    const username = useSelector((state) => state.user.userData.username); // Récupère l'username de l'utilisateur
    const dispatch = useDispatch(); // Permet de dispatcher des actions Redux
    const navigate = useNavigate(); // Permet de naviguer entre les pages

    /* Gère la déconnexion de l'utilisateur */
    const logoutHandler = () => {
        dispatch(logout()); // Déclenche l'action de déconnexion
        sessionStorage.clear(); // Supprime les données de session
        localStorage.clear(); // Supprime les données locales
        navigate('/'); // Redirige vers la page d'accueil
    }

    return (
        <header>
            <h1 className='sr-only'>Argent Bank</h1>
            <nav>
                <Link to="/">
                    <img src={Logo} alt="Bank Logo" />
                </Link> 
                {isConnected ? (
                    <div className='connected'>
                        <Link to='/profile'>
                            <p>{username}</p>
                            <i className='fa-solid fa-2x fa-circle-user' />
                        </Link>
                        <Link >
                            <i className="fa-solid fa-gear"></i>
                        </Link>
                        <Link to='/' onClick={logoutHandler}>
                            <i className="fa-solid fa-power-off"></i>
                        </Link>
                    </div>
                ) : (
                    <div className='not-connected'>
                        <Link to='/login' >
                            <i className="fa-solid fa-circle-user"></i>
                            <p>Sign In</p>
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    ) 
}

export default Header;
