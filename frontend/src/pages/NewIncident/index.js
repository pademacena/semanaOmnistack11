import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    async function handleRegisterIncident(e) {
        e.preventDefault();

        const data = { 
            title, 
            description, 
            value, 
        };

        try {
            await api.post('incidents', data,{
                headers: {
                    authorization: ongId,
                }
            });

            history.push('/profile');
        } catch (err) {
            alert('Erro no cadastro de alerta, tente novamente.')
        }
    }


    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft  size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>  

                <form onSubmit={handleRegisterIncident}>
                    <input placeholder="Titulo do caso" value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder="Descircao" value={description} onChange={e => setDescription(e.target.value)} />
                    <input placeholder="Valor em Reais" value={value} onChange={e => setValue(e.target.value)} />

                    <button className="button">Cadastrar</button>

                </form>
            </div>
        </div>
    )
}