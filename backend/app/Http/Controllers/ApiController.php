<?php

namespace App\Http\Controllers;

use App\Utils\HttpApiResponse;

abstract class ApiController extends Controller
{
    use HttpApiResponse;
}
