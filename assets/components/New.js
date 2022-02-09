import React, { useContext } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
// import { AppContext } from "../App";
import { NewInterface } from "../pages/PageData";
import { GestionContext } from "../pages/Gestion";


const New = ({entity, pathName, form: Form}) => {
    const url = 'http://localhost:8000/api/' + entity +'/new';
    const context = useContext(GestionContext);

    // const headers = {
    //     'Authorization': 'Bearer ' + context.userState.userData.token
    // }
    useEffect(()=>{
        return context.setError('');
    })

    const onSubmit = (data) =>{
        var img = document.getElementById('img');
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        if(img != null){
            formData.append('img', img.files[0]);
        }
        console.log(data);
        context.setError('');
        axios
        .post(url, formData)
        .then(res=>{
            console.log(res.data)
            if(res.data.status === "OK"){
                alert('Ajouté avec succès');
            }else{
                context.setError("addError");
                console.log(res.data.message);
            }
        })
        .catch(e=>{
            context.setError("addError");
            console.log(e.message);
        });
    }
    return(
        <div className="gestion">
            <NewInterface entity={entity}/>
            <div className="newBook">
                <NavLink exact="true" to={"/gestion/" + pathName + 's'}>Retour</NavLink>
                { context.error &&
                    <div className="errorMessage">{context.error}</div>
                }
                <Form onSubmit={onSubmit}/>
            </div>
        </div>
    )
};

export default New;