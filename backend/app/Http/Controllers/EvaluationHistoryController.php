<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evaluation_history;

class EvaluationHistoryController extends Controller
{
    public function get(Request $request)
    {
        //$employee = Evaluation_history::all();
        $history = Evaluation_history::where('employee_id', $request->employee_id)->where('kpi_id', $request->kpi_id)->get();
        return $history;
    }

}
