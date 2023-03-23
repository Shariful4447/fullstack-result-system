<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable=[
        'test_id',
        'teacher_id',
        'pupil_id',
        'subject_id',
        'grade'
    ];


    public function user(){
       return $this->belongsTo(User::class ,'pupil_id' ,'id');
    }



}
