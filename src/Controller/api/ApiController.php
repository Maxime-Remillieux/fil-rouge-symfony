<?php

namespace App\Controller\Api;

use App\Service\DataService;
use App\Service\ResponseManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{
    private ResponseManager $rm;

    public function __construct(ResponseManager $rm){
        $this->rm = $rm;
    }

    #[Route('/api/stats', name: 'stats')]
    public function stats(DataService $ds): Response
    {
        $data = $ds->getStats();
        return $this->rm->sendJson($data);
    }
}
