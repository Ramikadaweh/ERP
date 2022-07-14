<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Team;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function getAll()
    {
        $projects = Project::all();
        $respond = [
            'status' => 200,
            'message' => "All projects",
            'data' => $projects,
        ];
        return $respond;
    }

    public function getOne($id)
    {
        $project = Project::find($id);
        if ($project) {
            $teamAvailable=$project->team_id;
            
            if ($teamAvailable) {
               $project->teams->employee;
               $employees = $project->employees;
               foreach ($employees as $employee) {
                $employee->pivot['role_id']=$employee->role($id);
               };
            }
            $respond = [
                'status' => 200,
                'message' => " projects $id ",
                'data' => $project,
            ];
            return $respond;
        };

        $respond = [
            'status' => 401,
            'message' => "project $id doesn't exist",
            'data' => $project,
        ];
        return $respond;
    }

    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'project_name' => 'required',
            'project_description' => 'required',
            'proj_start_date' => 'required',
            'proj_due_date' => 'required',
        ]);
        if ($validator->fails()) {
            $response = [
                'status' => 401,
                'message' => $validator->errors(),
                'data' => NULL,
            ];
            return $response;
        }

        $projectExist = Project::all()->where('project_name','=',$request->project_name);
        $errors=[];
        foreach ($projectExist as $value){
            $errors['project_name']=array($value);
        }
        if (count($errors) > 0) {
            $response = [
                'status' => 401,
                'message' => 'project already exists',
                'data' => $errors,
            ];
            return $response;
        }


        $project_new = new Project;
        $project_new->project_name = $request->project_name;
        $project_new->project_description = $request->project_description;
        $project_new->proj_start_date = $request->proj_start_date;
        $project_new->proj_due_date = $request->proj_due_date;
        $project_new->team_id = $request->team_id;
        $project_new->save();

        $respond = [
            'status' => 201,
            'message' => "project successfully created",
            'data' => $project_new,
        ];
        return $respond;
    }

    public function update(Request $request, $id)
    {
        $project = Project::find($id);
        if (!isset($project)) {
            $respond = [
                'status' => 404,
                'message' => "project doesn't exit",
                'data' => NULL,
            ];
            return $respond;
        }

        $projectExist = Project::all()->where('project_name','=',$request->project_name);
        $errors=[];
        foreach ($projectExist as $value){
            $errors['project_name']=array($value);
        }
        if (count($errors) > 0) {
            $response = [
                'status' => 401,
                'message' => 'project already exists',
                'data' => $errors,
            ];
            return $response;
        }

        $request->project_name ? ($project->project_name = $request->project_name) : NULL;
        $request->project_description ? ($project->project_description = $request->project_description) : NULL;
        $request->proj_start_date ? ($project->proj_start_date = $request->proj_start_date) : NULL;
        $request->proj_due_date ? ($project->proj_due_date = $request->proj_due_date) : NULL;
        $request->team_id ? ($project->team_id = $request->team_id) : NULL;
        if ($request->team_id) {

            $team = Team::find($request->team_id);
            if (!isset($team)) {
                $respond = [
                    'status' => 404,
                    'message' => "team doesn't exit",
                    'data' => NULL,
                ];

                return $respond;
            }
        }
        if ($request->team_id === '0' || $request->team_id === 0) {
            $project->teams;
            if ($project->teams) {
                $project->team_id = null;
                $oldTeam = $project->teams->team_name;
                $project->save();
                $project = Project::find($id);
                $project->teams;
                return [
                    'status' => 201,
                    'message' => "Team $oldTeam is removed from " . $project->project_name,
                    'data' => $project,
                ];
            };
            return [
                'status' => 404,
                'message' => "$project->project_name does not have a team",
                'data' => $project,
            ];
        }


        $project->save();
        $respond = [
            'status' => 200,
            'message' => "project updated",
            'data' => $project,
        ];
        return $respond;
    }

    public function delete($id)
    {

        $project = Project::find($id);
        $teamExist = null;
        if ($project) {
            $teamExist = $project->team_id;
        };
        if ($teamExist != null) {
            $respond = [
                'status' => 401,
                'message' =>  "you can't delete project with id=$id because it's related to team",
                'data' => NUll,
            ];
            return $respond;
        }

        if (isset($project)) {
            $project->delete();
            $respond = [
                'status' => 201,
                'message' => "project $id deleted",
                'data' => $project,
            ];
            return $respond;
        }

        $respond = [
            'status' => 401,
            'message' => "project with id $id doesn't exist",
            'data' => null,
        ];
        return $respond;
    }
}
