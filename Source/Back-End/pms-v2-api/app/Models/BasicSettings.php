<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BasicSettings extends Model
{
    use HasFactory;
    protected $table = 'basic_settings';
    protected $primaryKey = 'id';
    public $incrementing = false;
    public $timestamps = false;
}
