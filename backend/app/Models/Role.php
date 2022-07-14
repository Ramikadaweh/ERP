<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    public function employees() {
        return $this->belongsToMany(Employee::class,'emp_proj_rol','role_id','emp_id')->withPivot('proj_id')->withTimestamps();
    }
    public function projects() {
        return $this->belongsToMany(Project::class,'emp_proj_rol','role_id','proj_id')->withPivot('emp_id')->withTimestamps();
    }
}
