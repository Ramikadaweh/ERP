<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kpi extends Model
{
    use HasFactory;
    // protected $with = ['employee'];
    public function employee()
    {
        return $this->belongsToMany(Employee::class,'emp_kpis','kpi_id','employee_id')->withTimestamps()->withPivot('evaluation_kpi');
    }
}
