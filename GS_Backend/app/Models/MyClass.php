<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MyClass extends Model
{
    use HasFactory;

    public function assignClass(){
        return $this->hasMany(AssignedClassModel::class, 'MyClass_id', 'id');
    }

    public function pupil(){
        return $this->hasMany(AssignedClassModel::class, 'assignClass.pupil_id', 'id');
    }
}
