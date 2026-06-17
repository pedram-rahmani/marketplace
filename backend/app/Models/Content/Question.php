<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User\User;
use App\Models\Product\Product;
use App\Models\Content\Answer;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id', 'user_id', 'name', 'text', 'rate', 'likes', 'dislikes', 'liked', 'disliked'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
}
