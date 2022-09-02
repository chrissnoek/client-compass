<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Mail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'tenant_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public static function generatePassword()
    {
        // Generate random string and encrypt it.
        return bcrypt(Str::random(35));
    }

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public static function sendWelcomeEmail($user)
    {
      // Generate a new reset password token
      $token = app('auth.password.broker')->createToken($user);

      // Send email
      Mail::send('mails.adminwelcomeemail', ['user' => $user, 'token' => $token], function ($m) use ($user) {
        $m->to($user->email, $user->first_name)->subject('Welcome to the APP');
      });
    }

}
