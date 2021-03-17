<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Officers extends Model
{
    use HasFactory;
    protected $table = 'officers';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = ['officer_id','name','rank','photo','email','phone','join_date','leave_date','message'];


    protected $dates = ['deleted_at'];
    protected $attributes = ['ip' => '', 'agent' => ''];

    public function __construct(array $attributes = [])
    {
        $this->attributes = ['ip' => \Request::ip(), 'agent' => \Request::header('User-Agent')];
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

    public function messages() {
        return $this->hasMany(Message::class, 'officer_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function rank()
    {
        return $this->hasOne(OfficerRank::class,'id','rank');
    }
}
