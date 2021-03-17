<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Request;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bill extends Model
{

    use SoftDeletes;
    use HasFactory;

    protected $table = 'bills';
    protected $primaryKey = 'id';
    public $timestamps = true;


    protected $fillable = [
        'created_by', 'deleted_by', 'ip', 'agent'
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

    public function billDetails()
    {
        return $this->hasMany(BillDetail::class);
    }

    public function contractor()
    {
        return $this->belongsTo(Contractor::class)->with('user');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function bill_details() {
        return $this->hasMany(BillDetail::class)->where('total_amount', '<>', 0)->with('task')->with('unit');
    }

    public function parentTask()
    {
        return $this->hasOne(Task::class,'id','parent_task_id');
    }
}
