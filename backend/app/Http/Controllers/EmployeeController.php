<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\Team;
use App\Models\Kpi;
use App\Models\Role;
use App\Models\Project;
use App\Models\Evaluation_history;
use App\Models\HistoryProject;
use Illuminate\Support\Facades\Validator;

use function PHPUnit\Framework\returnSelf;

class EmployeeController extends Controller
{
    public function getAll()
    {
        $employee = Employee::all();
        foreach ($employee as $item) {
            $item->teams;
            $item->kpi;
        }
        $respond = [
            'status' => 200,
            'message' => "All employees",
            'data' => $employee,
        ];
        return $respond;
    }


    public function getOne($id)
    {
        $employee = Employee::find($id);
        if (isset($employee)) {
            $employee->teams;
            $employee->kpi;
            $projects = $employee->projects;
            foreach ($projects as $project) {
                $project->pivot['role_id'] = $project->role($id);
            }
            $respond = [
                'status' => 200,
                'message' => "Employee found - $id",
                'data' => $employee,
            ];
            return $respond;
        }


        $respond = [
            'status' => 401,
            'message' => "employee $id doesn't exist",
            'data' => $employee,
        ];

        return $respond;
    }
    //updating employees image 
    public function updateImage(Request $request, $id)
    {
        $employee = Employee::find($id);
        if (isset($employee)) {
            if ($files = $request->file('picture')) {
                $destinationPath = 'image/'; // upload path
                $profileImage = date('YmdHis') . "." . $files->getClientOriginalExtension();
                $files->move($destinationPath, $profileImage);
                $employee->picture = 'image/' . $profileImage;
                $employee->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'uploaded',
                    'data' => $employee
                ]);
            } else return response()->json([
                'status' => 401,
                'message' => 'Failed'
            ]);
        }
    }

    public function add(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'emp_first_name' => 'required',
            'emp_last_name' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'picture' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        if ($validator->fails()) {
            $response = [
                'status' => 401,
                'message' => $validator->errors(),
                'data' => NULL,
            ];
            return $response;
        }
        if ($files = $request->file('picture')) {
            $destinationPath = 'image/'; // upload path
            $profileImage = date('YmdHis') . "." . $files->getClientOriginalExtension();
            $files->move($destinationPath, $profileImage);
        }

        //handle Email or phone number uniqueness
        $emailExists = Employee::all()->where('email', '=', $request->email);
        $phoneExists = Employee::all()->where('phone', '=', $request->phone);
        $errors = [];

        foreach ($emailExists as $key => $value) {
            $errors['Emails'] = array($value);
        }
        foreach ($phoneExists as $key => $value) {
            $errors['Phone'] =  array($value);
        }

        if (count($errors) > 0) {
            $response = [
                'status' => 401,
                'message' => 'some data already exists',
                'data' => $errors,
            ];
            return $response;
        }

        // checks if team exists
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

        //create new employee
        $employee_new = new Employee;
        $employee_new->emp_first_name = $request->emp_first_name;
        $employee_new->emp_last_name = $request->emp_last_name;
        $employee_new->email = $request->email;
        $employee_new->phone = $request->phone;
        $employee_new->picture = 'image/' . $profileImage;
        $employee_new->team_id = $request->team_id;
        $employee_new->save();

        $employee_new->projects()->attach($request->project_id, ['role_id' => $request->role_id]);

        if ($request->team_id) {
            $employee_new->teams;
        }

        // $project = Project::find(1);
        // $employee_new->projects()->attach($project);
        $respond = [
            'status' => 201,
            'message' => "Employee successfully created",
            'data' => $employee_new,
        ];
        return $respond;
    }


    public function edit(Request $request, $id)
    {
        $employee = Employee::find($id);

        if (!isset($employee)) {
            $respond = [
                'status' => 404,
                'message' => "Employee doesn't exit",
                'data' => NULL,
            ];
            return $respond;
        }

        $request->emp_first_name ? ($employee->emp_first_name = $request->emp_first_name) : NULL;
        $request->emp_last_name ? ($employee->emp_last_name = $request->emp_last_name) : NULL;
        $request->email ? ($employee->email = $request->email) : NULL;
        $request->phone ? ($employee->phone = $request->phone) : NULL;
        $request->picture ? ($employee->picture = $request->picture) : NULL;
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
            $employee->team_id = $request->team_id;
        }

        if ($request->team_id === '0' || $request->team_id === 0) {
            $employee->teams;
            if ($employee->teams) {
                $employee->team_id = null;
                $oldTeam = $employee->teams->team_name;
                $employee->save();
                $employee = Employee::find($id);
                $employee->teams;
                return [
                    'status' => 201,
                    'message' => "$employee->emp_first_name $employee->emp_last_name is removed from " . $oldTeam,
                    'data' => $employee,
                ];
            };
          
        }


        $employee->save();
        $employee->teams;

        $respond = [
            'status' => 200,
            'message' => "Employee has beedn updated successfully",
            'data' => $employee,
        ];

        return $respond;
    }


    public function delete($id)
    {

        $employee = Employee::find($id);

        if (!isset($employee)) {

            $respond = [
                'status' => 404,
                'message' => "employee doesn't exit",
                'data' => NULL,
            ];
            return $respond;
        }

        $employee->delete();
        $respond = [
            'status' => 404,
            'message' => "employee $id deleted",
            'data' => $employee,
        ];
        return $respond;
    }


    public function attachKpi(Request $request, $id)
    {
        $evaluation = $request->evaluation;
        $kpiId = $request->kpi_id;
        $employee = Employee::find($id);

        //checks if kpi is attached
        foreach ($employee->kpi as $item) {
            if ($item->id == $kpiId) {
                return [
                    'status' => 401,
                    'message' => "Kpi already exist for $employee->emp_first_name $employee->emp_last_name",
                    'data' => $employee->kpi,
                ];
            }
        }

        $employee->kpi()->attach($kpiId, ['evaluation_kpi' => $evaluation]);
        $employee = Employee::find($id);
        $employee->kpi;
        $response = [
            'status' => 201,
            'message' => "Kpi has been successfully assigned to $employee->emp_first_name $employee->emp_last_name",
            'data' => $employee,
        ];

        //create a new record in history table
        $newHistoryRecord = new Evaluation_history;
        $newHistoryRecord->employee_id = $employee->id;
        $newHistoryRecord->kpi_id = $kpiId;
        $newHistoryRecord->evaluation = $evaluation;
        $newHistoryRecord->save();

        return $response;
    }


    public function detachKpi(Request $request, $id)
    {
        $kpiId = $request->kpi_id;
        $employee = Employee::find($id);
        $kpiToDetach = Kpi::find($kpiId);
        $employee->kpi()->detach($kpiId);
        $employee->kpi;
        return [
            'status' => 200,
            'message' => "$kpiToDetach->kpi_name successfully removed form $employee->emp_first_name $employee->emp_last_name",
            'data' => $employee
        ];
    }

    public function attachTeam(Request $request, $id)
    {
        $teamId = $request->team_id;

        if (!Team::find($teamId)) {
            return [
                'status' => 401,
                'message' => "Team with id : $teamId doesn't exist",
                'data' => null,
            ];
        }

        $employee = Employee::find($id);

        //checks if any team is attached
        if ($employee->team_id != null) {
            return [
                'status' => 401,
                'message' => "Team already exist for $employee->emp_first_name $employee->emp_last_name",
                'data' => $employee->teams,
            ];
        }


        $employee->team_id = $teamId;
        $employee->save();
        $employee = Employee::find($id);
        $employee->team;
        $response = [
            'status' => 201,
            'message' => "Team has been successfully assigned to $employee->emp_first_name $employee->emp_last_name",
            'data' => $employee,
        ];
        return $response;
    }

    public function attachRole(Request $request, $id)
    {
        $projectId = $request->project_id;
        $roleId = $request->role_id;


        // Checks if the user have this project as a current project 

        $validator = Validator::make($request->all(), [
            'project_id' => 'required|exists:projects,id', //used to check if the proj_id exists in the database or not
            'role_id' => 'required|exists:roles,id', //used to check if the role_id exists in the database or not
            // 'employee_id' => 'required|exists:employees,id' //used to check if the employee_id exists in the database or not
        ]);

        if ($validator->fails()) {
            return [
                'status' => 401,
                'message' => $validator->errors(),
                'data' => NULL,
            ];
        }

        $employee = Employee::find($id);
        $project = Project::find($projectId);
        $role = Role::find($roleId);



        //Check if the project already exists and update the role value
        if ($employee->projects()->find($projectId)) {
            if ($employee->projects()->find($projectId)->pivot->role_id == $roleId) {
                return [
                    'status' => 409,
                    'message' => "$employee->emp_first_name $employee->emp_last_name already has this role in this project.",
                    'data' => $employee->roles()->find($roleId),
                ];
            };
            $employee->projects()->updateExistingPivot($projectId, ['role_id' => $roleId]);

            //create a new record in history table
            $newHistoryRecord = new HistoryProject;
            $newHistoryRecord->emp_id = $id;
            $newHistoryRecord->project_name = $project->project_name;
            $newHistoryRecord->role_name = $role->role_name;
            $newHistoryRecord->save();

            return [
                'status' => 201,
                'message' => "$employee->emp_first_name $employee->emp_last_name role has been updated to " . $employee->roles[0]->role_name,
                'data' => $employee,
            ];
        }

        // create the Relation
        $employee->projects()->attach($projectId, ['role_id' => $roleId]);
        $employee = Employee::find($id);
        $employee->projects;
        $employee->roles;

        //create a new record in history table
        $newHistoryRecord = new HistoryProject;
        $newHistoryRecord->emp_id = $id;
        $newHistoryRecord->project_name = $project->project_name;
        $newHistoryRecord->role_name = $role->role_name;
        $newHistoryRecord->save();

        return [
            'status' => 201,
            'message' => "$employee->emp_first_name $employee->emp_last_name has been added to " . $employee->projects[0]->project_name . " as a " . $employee->roles[0]->role_name . ".",
            'data' => $employee,
        ];
    }

    public function evaluation(Request $request, $id_emp)
    {
        $validator = Validator::make($request->all(), [
            'evaluation' => 'required|integer|between:1,10',
            'kpi_id' => 'required|integer',
        ]);
        if ($validator->fails()) {
            $response = [
                'status' => 401,
                'message' => $validator->errors(),
                'data' => NULL,
            ];
            return $response;
        }


        $employee = Employee::find($id_emp);
        if (!isset($employee)) {
            $respond = [
                'status' => 404,
                'message' => "employee doesn't exit",
                'data' => NULL,
            ];
            return $respond;
        }

        $kpi_id = $request->kpi_id;
        $kpi = $employee->kpi()->find($kpi_id);

        if (!isset($kpi)) {
            $respond = [
                'status' => 404,
                'message' => "this employee doesn't have this kpi",
                'data' => NULL,
            ];
            return $respond;
        }
        $eval = $request->evaluation;

        // Checks if the value is the same as the input
        if ($kpi->pivot->evaluation_kpi == $eval) {
            return [
                'status' => 409,
                'message' => "Can't update with the same value, please enter a different evaluation value",
                'data' => NULL,
            ];
        }

        $employee->kpi()->updateExistingPivot($kpi_id, ['evaluation_kpi' => $eval]);

        //create a new record in history table
        $newHistoryRecord = new Evaluation_history;
        $newHistoryRecord->employee_id = $id_emp;
        $newHistoryRecord->kpi_id = $kpi_id;
        $newHistoryRecord->evaluation = $eval;
        $newHistoryRecord->save();

        return [
            'status' => 201,
            'message' => "$kpi->kpi_name evaluation has been updated to new value: $eval for $employee->emp_first_name $employee->emp_last_name",
            'data' => NULL,
        ];
    }
}
