<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;
    public function User() {
        return $this->belongsTo(User::class, 'teacher_id', 'id');
    }

    public function classOption() {
        return $this->belongsTo(MyClass::class, 'class_name', 'name');
    } 
}
