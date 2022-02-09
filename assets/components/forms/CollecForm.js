import React from "react";
import { useForm } from "react-hook-form";

const CollecForm = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm();

    return (
        <div className="entityForm">
            <h3>Ajouter une nouvelle collection</h3>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <span>
                        <label htmlFor="name">Nom</label>
                        <input {...register('name')} type="text" id='name' />
                    </span>
                </div>
                <button type="submit" >Ajouter</button>
            </form>
        </div>
    );
};

export default CollecForm;