<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Request;

class Archive extends Model
{
    use HasFactory;
    use SoftDeletes;
    use HasFactory;

    protected $table = 'archives';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'project_id', 'title', 'head_id', 'document','description', 'created_by', 'deleted_by', 'ip', 'agent'
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

    public function head() {
        return $this->belongsTo(ArchiveHead::class);
    }

//    public function archivehead() {
//        return $this->belongsTo(ArchiveHead::class);
//    }

    public function user() {
        return $this->hasOne(User::class);
    }
}
