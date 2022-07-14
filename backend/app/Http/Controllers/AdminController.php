<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AdminController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->only('full_name', 'password');
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        return response()->json(compact('token'));
    }


    function getAll()
    {
        $admins = Admin::orderBy('full_name')->get();
        $response = [
            'status' => 200,
            'message' => "All Admins",
            'data' => $admins,
        ];
        return $response;
    }

    function getOne($id)
    {
        $admins = Admin::find($id);
        if (isset($admins)) {
            $response = [
                'status' => 200,
                'message' => "Admin exists",
                'data' => $admins,
            ];
            return $response;
        }

        $response = [
            'status' => 401,
            'message' => "Wrong admin ID",
            'data' => NULL,
        ];
        return $response;
    }


    function post(Request $request)
    {
        // $adminExists = Admin::all()->where("full_name", 'like', $request->full_name);
        // if (sizeof($adminExists) > 0) {
        //     return [
        //         'status' => 401,
        //         'message' => "Username already exists! Please choose different one",
        //         'data' => null,
        //     ];
        // }

        $validator = Validator::make($request->all(), [
            'full_name' => 'required|unique:admins',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            $response = [
                'status' => 401,
                'message' => $validator->errors(),
                'data' => NULL,
            ];
            return $response;
        }

        //Hashes password
        $options = array("cost" => 4);
        $hashPassword = password_hash($request->password, PASSWORD_BCRYPT, $options);

        $admin = new Admin;
        $admin->full_name = $request->full_name;
        $admin->password = $hashPassword;
        $admin->save();

        $token = JWTAuth::fromUser($admin);
        return response()->json(compact('admin', 'token'), 201);
    }


    function edit(Request $request, $id)
    {
        $admin = Admin::find($id);

        if (isset($admin)) {
            $request->full_name ? ($admin->full_name = $request->full_name) : NULL;
            $request->password ? ($admin->password = $request->password) : NULL;
            $admin->save();

            $response = [
                'status' => 201,
                'message' => 'Data has been updated!',
                'data' => $admin,
            ];

            return $response;
        }

        $response = [
            'status' => 401,
            'message' => "Admin with id: $id does not exits!",
            'data' => null,
        ];
        return $response;
    }



    function delete($id)
    {
        $admin = Admin::find($id);

        if (isset($admin)) {
            $admin->delete();
            $all_admins = Admin::all();

            $response = [
                'status' => 201,
                'message' => "Admin has been deleted",
                'data' => $all_admins,
            ];
        } else {
            $response = [
                'status' => 401,
                'message' => "Admin with id: $id does not exist!",
                'data' => null,
            ];
        }

        return $response;
    }

    public function checkToken()
    {
        return true;
    }
}
