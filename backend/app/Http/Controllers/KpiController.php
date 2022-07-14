<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Kpi;

class KpiController extends Controller
{
    public function getAll()
    {

        $kpi = Kpi::all();
        $kpi = Kpi::orderBy('kpi_name')->get();
        $respond = [
            'status' => 200,
            'message' => "All KPI",
            'data' => $kpi,
        ];

        return $respond;
    }

    public function getOne($id)
    {
        $kpi = Kpi::find($id);
        $kpi->employee;     ////////////////////////////////////////////////////////////


        if (!isset($kpi)) {

            $respond = [
                'status' => 401,
                'message' => "kpi of id=$id doesn't exist",
                'data' => $kpi,
            ];

            return $respond;
        }

        $respond = [
            'status' => 201,
            'message' => "kpi of id $id",
            'data' => $kpi,
        ];

        return $respond;
    }


    public function add(Request $request)
    {
        $KpiExists = Kpi::all()->where("kpi_name", 'like', $request->kpi_name);

        if (sizeof($KpiExists) > 0) {
            return [
                'status' => 401,
                'message' => "KPI already exists! Please choose different name",
                'data' => null,
            ];
        }

        $validator = Validator::make($request->all(), [
            'kpi_name' => 'required',

        ]);

        if ($validator->fails()) {
            $respond = [
                'status' => 401,
                'message' =>  $validator->errors(),
                'data' => null,
            ];

            return $respond;
        }

        //Create new Kpi
        $kpi = new Kpi;
        $kpi->kpi_name = $request->kpi_name;
        $kpi->save();
        $kpi->employee()->attach($request->employeeId, ['evaluation_kpi'=> 5, 'date_kpi' => '2020-05-05']);

        $respond = [
            'status' => 201,
            'message' =>  'kpi created succefuly',
            'data' => $kpi,
        ];

        return $respond;
    }
    public function update(Request $request, $id)
    {

        $kpi = Kpi::find($id);

        if (isset($kpi)) {
            $kpi->kpi_name = $request->kpi_name;
            $kpi->save();
            $respond = [
                'status' => 201,
                'message' =>  "kpi updated successfully",
                'data' => $kpi,
            ];

            return $respond;
        }

        $respond = [
            'status' => 401,
            'message' =>  "kpi with id=$id doesn't exist",
            'data' => null,
        ];

        return $respond;
    }
    public function delete($id)
    {
        $kpi = Kpi::find($id);

        if (isset($kpi)) {
            $kpi->delete();


            $respond = [
                'status' => 201,
                'message' =>  "kpi successfully deleted",
                'data' => $kpi,
            ];
        } else {

            $respond = [
                'status' => 401,
                'message' =>  "kpi with id=$id doesn't exist",
                'data' => NUll,
            ];
        }

        return $respond;
    }

    function attach(Request $request, $id)
    {
        $kpi = Kpi::find($id);

        $kpi->employee()->attach($request->id);
        return 'done';
    }
}
