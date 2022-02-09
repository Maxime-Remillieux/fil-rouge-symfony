import { useState } from "react";

const useErrorManager = () => {
    const [error, setErr] = useState('');

    const errorList = {
        expiredToken: "La session est expirée, veuillez vous reconnecter",
        noUser: "Connectez-vous pour accéder à cette page",
        notGranted: "Vous n'avez pas les droits pour accéder à cette page",
        wrongCredentials: "Email ou mot de passe erronés",
        servError: "Une erreur s'est produite, veuillez réessayer",
        noPass: "Veuillez indiquer votre mot de passe",
        wrongEmail: "Email non valide",
        addError: "Erreur lors de l'ajout, veuillez réessayer"
    }

    const setError = (key)=>{
        if(errorList.hasOwnProperty(key)){
            setErr(errorList[key]);
        }else{
            setErr(key);
        }
    }

    return [error, setError]
};

export default useErrorManager;