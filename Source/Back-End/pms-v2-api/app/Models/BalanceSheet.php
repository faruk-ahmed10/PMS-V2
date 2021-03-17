<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Request;

class BalanceSheet extends Model
{
    use HasFactory;
    use SoftDeletes;
    use HasFactory;

    protected $table = 'balance_sheets';
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

    public function task()
    {
        return $this->belongsTo(Task::class,'fund_id','id');
    }

    public function pf_fund()
    {
        return $this->belongsTo(ProjectFund::class,'fund_id','id');
    }

    public function cf_fund()
    {
        return $this->belongsTo(CfFund::class,'fund_id','id');
    }

    public function misc_fund()
    {
        return $this->belongsTo(MiscFund::class,'fund_id','id');
    }

    public function section()
    {
        return $this->belongsTo(Section::class,'section_id','id');
    }
}
