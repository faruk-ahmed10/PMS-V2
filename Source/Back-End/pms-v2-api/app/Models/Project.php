<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Request;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $table = 'projects';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'name', 'rdpp', 'rdpp', 'description', 'progress', 'start_date', 'end_date', 'sponsor_ministry', 'attachments', 'source_of_found', 'estimated_cost', 'duration', 'status',
        'created_by', 'deleted_by', 'ip', 'agent'
    ];

    protected $dates = ['deleted_at'];
    protected $attributes = ['ip' => '', 'agent' => ''];
    public function __construct(array $attributes = [])
    {
        $this->attributes = ['ip' => Request::ip(), 'agent' => Request::header('User-Agent')];
        parent::__construct($attributes);
    }

    public function project_fund() {
        return $this->hasOne(ProjectFund::class);
    }

    public  function dstnchart(){
        return $this->hasOne(DstnChart::class);

    }

    public  function equipment(){
        return $this->hasOne(Equipment::class);

    }

    public  function gallery(){
        return $this->hasOne(Gallery::class);
    }

    public  function pd(){
        return $this->belongsTo(Officers::class)->with('rank');
    }

    public  function po(){
        return $this->belongsTo(Officers::class)->with('rank');
    }


    public function contractors() {
        return $this->belongsToMany(Contractor::class)->withPivot('contractor_id')->with('user');
    }
}
