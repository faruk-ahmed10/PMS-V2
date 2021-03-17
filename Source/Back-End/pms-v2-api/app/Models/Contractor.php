<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Request;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contractor extends Model
{
    use SoftDeletes;
    use HasFactory;

    protected $table = 'contractors';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'user_id', 'owner_name', 'it', 'owner_nid', 'license', 'phone', 'tin', 'address', 'status', 'created_by', 'deleted_by', 'ip', 'agent'
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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function project_fund()
    {
        return $this->belongsToMany(ProjectFund::class);
    }

    public function task() {
        return $this->belongsToMany(Task::class);
    }

    public function bill()
    {
        return $this->belongsTo(Bill::class);
    }

    public function cf_fund()
    {
        return $this->belongsToMany(CfFund::class);
    }

    public function projects() {
        return $this->belongsToMany(Project::class)->withPivot('project_id');
    }

}
