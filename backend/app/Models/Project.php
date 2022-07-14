<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    public function employees()
    {
        return $this->belongsToMany(Employee::class, 'emp_proj_rol', 'proj_id', 'emp_id')->withPivot('role_id')->withTimestamps();
    }
    public function roles()
    {

        return $this->belongsToMany(Role::class, 'emp_proj_rol', 'proj_id', 'role_id')->withPivot('emp_id')->withTimestamps();
    }
    public function role($id)
    {
        return $this->belongsToMany(Role::class, 'emp_proj_rol', 'proj_id', 'role_id')->wherePivot('emp_id', $id)->first();
    }
    public function teams()
    {
        return $this->belongsTo(Team::class, "team_id");
    }
}
