<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\Team;
use Illuminate\Support\Facades\Validator;

use function PHPUnit\Framework\isNull;

class TeamController extends Controller
{
    //get all teams
    public function getAll()
    {

        $team = Team::all();
        $team = Team::orderBy('team_name')->get();
        $respond = [
            'status' => 200,
            'message' => "All teams",
            'data' => $team,
        ];

        return $respond;
    }
    //get one team
    public function getOne($id)
    {
        $team = Team::find($id);


        if (!isset($team)) {

            $respond = [
                'status' => 401,
                'message' => "team of id=$id doesn't exist",
                'data' => $team,
            ];

            return $respond;
        }
        //list all the employee and projects related to it 
        $team->employee;
        $team->project;
        $respond = [
            'status' => 201,
            'message' => "team of id $id",
            'data' => $team,
        ];

        return $respond;
    }
    // add team
    public function add(Request $request)
    {


        $validator = Validator::make($request->all(), [
            'team_name' => 'required',

        ]);

        if ($validator->fails()) {
            $respond = [
                'status' => 401,
                'message' =>  $validator->errors(),
                'data' => null,
            ];

            return $respond;
        }
        //handle if the team name already exist
        $team_exist = Team::all()->where('team_name', '=', $request->team_name);
        $errors = [];

        foreach ($team_exist as $key => $value) {
            $errors['team_name'] = array($value);
        }
        if (count($errors) > 0) {
            $response = [
                'status' => 401,
                'message' => 'team already exists',
                'data' => $errors,
            ];
            return $response;
        }


        $team = new Team;
        $team->team_name = $request->team_name;
        $team->save();

        return $team;
    } //update a team
    public function update(Request $request, $id)
    {
        $team = Team::find($id);
        if (!isset($team)) {
            $respond = [
                'status' => 201,
                'message' =>  "team doesn't exist",
                'data' => $team,
            ];
            return $respond;
        }
        // handle if the team_name already exist 

        if ($request->team_name) {

            $team_exist = Team::all()->where('team_name', '=', $request->team_name);
            $errors = [];

            foreach ($team_exist as $key => $value) {
                $errors['team_name'] = array($value);
            }
            if (count($errors) > 0) {
                $response = [
                    'status' => 401,
                    'message' => 'team already exists',
                    'data' => $errors,
                ];
                return $response;
            }
            $team->team_name = $request->team_name;
        }
        //assign to a project
        if ($request->project_id) {

            $project = Project::find($request->project_id);
            //handle if the project exist or no 
            if (!isset($project)) {
                $respond = [
                    'status' => 404,
                    'message' => "project doesn't exit",
                    'data' => NULL,
                ];
                return $respond;
            }
            //handle if the project aleady assigned to a team
            if (!is_null($project->team_id)) {
                $respond = [
                    'status' => 404,
                    'message' => "project alredy assigned to a team",
                    'data' => NULL,
                ];
                return $respond;
            }

            $project->team_id = $id;
            $project->save();
        }
        //assign to an employee

        if ($request->employee_id) {
            $employee = Employee::find($request->employee_id);
            if (!isset($employee)) {
                $respond = [
                    'status' => 404,
                    'message' => "employee doesn't exit",
                    'data' => NULL,
                ];
                return $respond;
            }
            //handle if the team already assigned to a team
            if (!is_null($employee->team_id)) {
                $respond = [
                    'status' => 404,
                    'message' => "employee alredy assigned to a team",
                    'data' => NULL,
                ];
                return $respond;
            }

            $employee->team_id = $id;
            $employee->save();
        }

        //dettach project
        if ($request->deattach_project) {
            $project = $team->project->find($request->deattach_project);

            if (!isset($project)) {
                $respond = [
                    'status' => 404,
                    'message' => "project is not assigned to this team",
                    'data' => NULL,
                ];
                return $respond;
            }
            $project->team_id = NULL;
            $project->save();
        }
        //dettach employee
        if ($request->deattach_employee) {
            $employee = $team->employee->find($request->deattach_employee);
            if (!isset($employee)) {
                $respond = [
                    'status' => 404,
                    'message' => "employee is not assigned to this team",
                    'data' => NULL,
                ];
                return $respond;
            }
            $employee->team_id = NULL;
            $employee->save();
        }

        $team->save();
        $team = Team::find($id);
        $team->project;
        $team->employee;
        $respond = [
            'status' => 201,
            'message' =>  "team updated successfully",
            'data' => $team,
        ];
        return $respond;
    }
    public function delete($id)
    {
        $team = Team::find($id);

        if (isset($team)) {
            $team->delete();


            $respond = [
                'status' => 201,
                'message' =>  "Team successfully deleted",
                'data' => $team,
            ];
        } else {

            $respond = [
                'status' => 401,
                'message' =>  "Team with id=$id doesn't exist",
                'data' => NUll,
            ];
        }

        return $respond;
    }
}
