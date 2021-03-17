<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnitHistory extends Model
{
    use HasFactory;
    protected $table = 'unit_history';
    protected $primaryKey = 'id';
    public $incrementing = false;
}
