<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Request;

class Task extends Model
{
    use HasFactory;
    use SoftDeletes;
    use HasFactory;

    protected $table = 'tasks';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'economic_code', 'economic_sub_code', 'created_by', 'deleted_by', 'ip', 'agent'
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

    public function contractors() {
        return $this->belongsToMany(Contractor::class)->withPivot('contractor_id','id','contract_qty','contract_amount','completed_qty','completed_amount')->with('user');
    }

    public function project() {
        return $this->belongsTo(Project::class);
    }

    public function section() {
        return $this->belongsTo(Section::class);
    }

    public function item_head() {
        return $this->belongsTo(ItemHead::class);
    }

    public function unit() {
        return $this->belongsTo(Unit::class);
    }

    public function supplier() {
        return $this->belongsTo(Supplier::class);
    }

    public function parent_item(){
        return $this->hasOne(Task::class, 'id', 'parent_task_id');
    }
}
