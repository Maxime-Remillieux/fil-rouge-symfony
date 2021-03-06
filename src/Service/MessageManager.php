<?php
namespace App\Service;


class MessageManager {
    private array $errors;
    private array $messages;

    public function __construct(){

        $this->errors = [
            "error" => "Une erreur est survenue, veuillez réessayer.",
            "fetchError" => "La ressource demandée est indisponible.",
            "addError" => "Une erreur est survenue lors de l'ajout.",
            "newOrderError" => "La réservation a échoué, veuillez réessayer.",
            "updateError" => "Une erreur est survenue lors de la modification"
        ];

        $this->messages = [
            'addSuccess' => "Ajouté avec succès",
            'newOrderSuccess' => "Votre réservation est confirmée !",
            'updateSuccess' => "Modifié avec succès"
        ];
    }

    public function getError($key){
        return $this->errors[$key];
    }

    public function getMessage($key){
        return $this->messages[$key];
    }
}