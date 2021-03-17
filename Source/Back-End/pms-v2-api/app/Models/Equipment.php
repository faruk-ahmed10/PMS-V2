<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Request;

class Equipment extends Model
{
    use HasFactory;
    use SoftDeletes;
    use HasFactory;

    protected $table = 'equipment';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
       'project_id', 'name', 'qty', 'unit_id', 'ba_no', 'category_id', 'present_condition','location','purchase_date','receive_date','document','description', 'created_by', 'deleted_by', 'ip', 'agent'
    ];

    protected $dates = ['deleted_at'];
    protected $attributes = ['ip' => '', 'agent' => ''];

    public function __construct(array $attributes = [])
    {
        $this->attributes = ['ip' => Request::ip(), 'agent' => Request::header('User-Agent')];
        parent::__construct($attributes);
    }

    public function getCreatedAtAttribute($value)
    {
        if ($value)
            return \Carbon\Carbon::parse($value)->format('Y-m-d H:i:s');
        else return date('Y-m-d H:i:s', time());
    }

    public function getUpdatedAtAttribute($value)
    {
        if ($value)
            return \Carbon\Carbon::parse($value)->format('Y-m-d H:i:s');
        else return date('Y-m-d H:i:s', time());
    }


    public function project() {
        return $this->belongsTo(Project::class);
    }

    public function unit() {
        return $this->belongsTo(Unit::class);
    }

    public function category() {
        return $this->belongsTo(EquipmentCategory::class);
    }

    public function user() {
        return $this->hasOne(User::class);
    }
}
