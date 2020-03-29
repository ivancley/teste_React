import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';
import HeroImage from '../../assets/heroes.png';
import LogoImage from '../../assets/logo.svg';

export default function Logon(){
    const [ id, setId ] = useState("");
    const history = useHistory();
    async function handleLogin(event){
        event.preventDefault();

        try{
            const resp = await api.post('sessions', { id })
            localStorage.setItem('ongID', id)
            localStorage.setItem('ongName', resp.data.name)
            history.push("/profile")
        }catch(erro){
            alert("falha no login, tente novamente ")
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={LogoImage} alt="logo"></img>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={ e => setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>
                    <Link to="/register" className="back-link">
                        <FiLogIn size="16" color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={HeroImage} alt="hero"></img>
        </div>
    )
}