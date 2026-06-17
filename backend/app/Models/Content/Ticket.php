<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Model;
use App\Models\User\User;

class Ticket extends Model
{
    protected $fillable = ['user_id', 'subject', 'message', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
