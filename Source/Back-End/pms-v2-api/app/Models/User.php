<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    public $timestamps = true;
    protected $primaryKey = 'id';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [];
    }

    public function contractor()
    {
        return $this->hasOne(Contractor::class);
    }

    public function supplier()
    {
        return $this->hasOne(Supplier::class);
    }

    public function notice()
    {
        return $this->hasOne(Notice::class);
    }

    public function officers()
    {
        return $this->hasOne(Officers::class);
    }

    public  function unit(){
        return $this->hasOne(Unit::class);
    }


    public  function section()
    {
        return $this->hasOne(Section::class);
    }

    public  function message(){
        return $this->hasOne(Message::class);

    }

    public  function dstnchart(){
        return $this->hasOne(Message::class);

    }

    public  function item(){
        return $this->hasOne(ItemHead::class);

    }

    public  function equipment_category(){
        return $this->hasOne(EquipmentCategory::class);

    }
    public  function equipment(){
        return $this->hasOne(Equipment::class);

    }
}
