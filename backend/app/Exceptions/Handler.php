<?php

namespace App\Exceptions;
use Exception;

use App\Exceptions\ModelNotDefined;
use Illuminate\Auth\Access\AuthorizationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->renderable(function (AccessDeniedHttpException $e, $request) {
            if($request->expectsJson()){
                return response()->json(["errors" => [
                    "message" => "You are not authorized to access this resource"
                ]], 403);
            }
        });

        $this->renderable(function (NotFoundHttpException $e, $request) {
            if($request->expectsJson()){
                return response()->json(["errors" => [
                    "message" => "The resource was not found in the database"
                ]], 404);
            }
            // Another Way
            // if ($request->is('api/*')) {
            //     return response()->json([
            //         'message' => 'Record not found.'
            //     ], 404);
            // }
        });
        $this->renderable(function (ModelNotDefined $e, $request) {
            if($request->expectsJson()){
                return response()->json(["errors" => [
                    "message" => "No model defined"
                ]], 500);
            }
        });
    }
}