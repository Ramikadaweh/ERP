<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    // protected $with = ['kpi'];
    use HasFactory;

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'emp_proj_rol', 'emp_id', 'proj_id')->withPivot('role_id')->withTimestamps();
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'emp_proj_rol', 'emp_id', 'role_id')->withPivot('proj_id')->withTimestamps();
    }
    public function role($id)
    {
        return $this->belongsToMany(Role::class, 'emp_proj_rol', 'emp_id', 'role_id')->wherePivot('proj_id', $id)->first();
    }

    public function teams()
    {
        return $this->belongsTo(Team::class, "team_id");
    }
    public function kpi()
    {
        return $this->belongsToMany(Kpi::class, 'emp_kpis', 'employee_id', 'kpi_id')->withPivot('evaluation_kpi')->withTimestamps();
    }
}
