<?php

namespace App\Http\Controllers;
use App\Models\HistoryProject;
use Illuminate\Http\Request;

class HistoryProjectCotroller extends Controller
{
    public function get(Request $request)
    {
        $historyProjectExist = HistoryProject::where('emp_id', $request->employee_id)->get();
        return $historyProjectExist;
    }
}
