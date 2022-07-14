<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Role;

class RoleController extends Controller
{
    public function getAll()
    {

        $role = Role::all();
        $role = Role::orderBy('role_name')->get();
        $respond = [
            'status' => 200,
            'message' => "All roles",
            'data' => $role,
        ];

        return $respond;
    }

    public function getone($id)
    {
        $role = Role::find($id);


        if (!isset($role)) {

            $respond = [
                'status' => 401,
                'message' => "role of id=$id doesn't exist",
                'data' => $role,
            ];

            return $respond;
        }

        $respond = [
            'status' => 201,
            'message' => "role of id $id",
            'data' => $role,
        ];

        return $respond;
    }
    
    public function add(Request $request)
    {


        $validator = Validator::make($request->all(), [
            'role_name' => 'required',

        ]);

        if ($validator->fails()) {
            $respond = [
                'status' => 401,
                'message' =>  $validator->errors(),
                'data' => null,
            ];

            return $respond;
        }
        $role = new Role;
        $role->role_name = $request->role_name;
        $role->save();

        return $role;
    }

    public function update(Request $request, $id)
    {

        $role = Role::find($id);

        if (isset($role)) {
            $role->role_name = $request->role_name;
            $role->save();

            $role->employees()->attach($request->employees);

            $respond = [
                'status' => 201,
                'message' =>  "role updated successfully",
                'data' => $role,
            ];

            return $respond;
        }

        $respond = [
            'status' => 401,
            'message' =>  "role with id=$id doesn't exist",
            'data' => null,
        ];

        return $respond;
    }

    public function delete($id)
    {
        $role = Role::find($id);

        if (isset($role)) {
            $role->delete();


            $respond = [
                'status' => 201,
                'message' =>  "role successfully deleted",
                'data' => $role,
            ];
        } else {

            $respond = [
                'status' => 401,
                'message' =>  "role with id=$id doesn't exist",
                'data' => NUll,
            ];
        }

        return $respond;
    }
}
