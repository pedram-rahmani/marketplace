<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User\User;
use App\Models\Content\Question;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_id', 'user_id', 'name', 'text', 'likes', 'dislikes', 'liked', 'disliked'
    ];

    public function user()
    {
        // به دلیل اینکه User در پوشه متفاوتی است، حتما باید از namespace کاملش استفاده شود
        return $this->belongsTo(User::class);
    }

    public function question()
    {
        // چون Question در همین پوشه (Content) است، نیاز به use ندارد
        return $this->belongsTo(Question::class);
    }
}
