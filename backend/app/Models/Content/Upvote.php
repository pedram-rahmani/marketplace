<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Model;

class Upvote extends Model
{
    public function comment()
    {
        return $this->belongsTo(Comment::class);
    }
}
