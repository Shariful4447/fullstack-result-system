<?php

namespace App\Imports;
use Maatwebsite\Excel\Concerns\ToModel;
use App\Models\Result;
use Maatwebsite\Excel\Concerns\withHeadingRow;
class ResultImport implements ToModel , withHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Result([
                'test_id' => $row['test_id'], 
                'teacher_id' => $row['teacher_id'], 
                'pupil_id' => $row['pupil_id'],
                'subject_id' => $row['subject_id'], 
                'grade' => $row['grade'],
        ]);
    }
}
