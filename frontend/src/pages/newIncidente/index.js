import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
    const [ title, setTitle] = useState("")
    const [ description , setDescription ] = useState("")
    const [ value, setValue ] = useState("0,00")
    const ongID = localStorage.getItem("ongID");

    const history = useHistory();

    async function handleSendIncident(event){
        event.preventDefault();
        const data = { title, description, value };
        try{
            await api.post("incidents", data, { headers: { Authorization: ongID},});
            history.push("/profile")
        }catch(error){
            alert("Erro durante envio de ")
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <session>   
                    <img src={logoImg} alt="be the hero" />
                    <h1>Cadastrar novo caso </h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para reolcer isso</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size="16" color="#E02041" />
                        Voltar para home
                    </Link>
                </session>
                <form onSubmit={handleSendIncident}>
                    <input 
                        placeholder="Titulo do caso"
                        value={title} 
                        onChange={ e => {setTitle(e.target.value)}}/>
                    <textarea  
                        placeholder="Descrição"
                        value = {description}
                        onChange = { e => {setDescription(e.target.value )}} />
                    <input 
                        placeholder="valor"
                        value = { value }
                        onChange = { e => {setValue(e.target.value )}} />
                    
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>

    );
}