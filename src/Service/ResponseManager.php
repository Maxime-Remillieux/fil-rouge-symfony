<?php
namespace App\Service;

use Exception;
use Symfony\Component\HttpFoundation\Response;

class ResponseManager {
    private MessageManager $mm;

    public function __construct(MessageManager $mm){
        $this->mm = $mm;
    }

    public function sendJSON($content): Response {
        $resp = new Response();
        $resp->setContent(json_encode($content));
        $resp->setStatusCode(Response::HTTP_OK);

        // sets a HTTP response header
        $resp->headers->set('Content-Type', 'application/json');
        return $resp;
    }

    public function sendCreateResponse(bool $success, Exception $err = null) : Response {
        if($success){
            return $this->sendJSON(["status"=>'OK', "message"=> $this->mm->getMessage('addSuccess')]);
        }else{
            return $this->sendJSON(["status"=>'ERROR', "message"=> $this->mm->getError('addError'), "debugMessage"=>$err->getMessage()]);
        }
    }

    public function newOrderResponse(bool $success, Exception $err = null){
        if($success){
            return $this->sendJSON(["status"=>'OK', "message"=> $this->mm->getMessage('newOrderSuccess')]);
        }else{
            return $this->sendJSON(["status"=>'ERROR', "message"=> $this->mm->getError('newOrderError'), "debugMessage"=>$err->getMessage()]);
        }
    }
}