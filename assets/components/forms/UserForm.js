import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const UserForm = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm();
    const [cities, setCities] = useState([]);
    const [postCode, setPostCode] = useState('');

    useEffect(()=>{
        (async ()=>{
            if(postCode.length > 1){
                const url = 'https://geo.api.gouv.fr/communes?codePostal=' + formatPostCode(postCode);
                console.log(url);

                axios.get(url)
                .then(res=>{
                    console.log(res.data);
                    setCities(res.data);
                })
            }
        })()
    }, [postCode, setCities])

    const formatPostCode = (code)=>{
        while(code.length < 5){
            code = code + '0';
        }
        return code;
    }

    return (
        <div className="entityForm">
            <h3>Ajouter un nouvel utilisateur</h3>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <span>
                        <label htmlFor="name">Nom</label>
                        <input {...register('name')} type="text" id='name' />
                    </span>
                    <span>
                        <label htmlFor='firstname'>Prénom</label>
                        <input {...register('firstname')} id="firstname" type="text" />
                    </span>
                </div>
                <div>
                    <span>
                        <label htmlFor="adress">Adresse</label>
                        <input {...register('adress')} type="text" id="adress" />
                    </span>
                    <span>
                        <label htmlFor='post_code'>Code postal</label>
                        <input {...register('post_code')} onChange={e => setPostCode(e.target.value)} type="text" id="post_code" />
                    </span>

                </div>
                <div>
                    <span>
                        <label htmlFor="city">Ville</label>
                        <select defaultValue = {""} name="city" {...register('city')} id="city">
                            <option value="" disabled>Selectionnez la ville</option>
                            { cities.length > 0 &&
                                cities.map(city =>(
                                    <option key={city.nom}>{city.nom}</option>
                                ))
                            }
                        </select>
                        {/* <input {...register('city')} type="text" id="city" /> */}
                    </span>
                    <span>
                        <label htmlFor="role">Role</label>
                        <select id="role" {...register('role')}>
                            <option value="ROLE_STUDENT">Étudiant</option>
                            <option value="ROLE_PROF">Professeur</option>
                        </select>
                    </span>
                </div>
                <div>
                    <span>
                        <label htmlFor="phone">Téléphone</label>
                        <input {...register('phone')} type="text" id="phone" />
                    </span>
                    <span>
                        <label htmlFor="email">Email</label>
                        <input {...register('email')} type="text" id='email' />
                    </span>
                </div>

                <button type="submit" >Ajouter</button>
            </form>
        </div>
    );
};

export default UserForm;