<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Product\Product;
use App\Models\User\User;
use App\Models\Content\Upvote;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'user_id',
        'name',
        'comment',
        'likes',
        'dislikes',
        'rate'
    ];

    public function product()
    {
        // آدرس‌دهی کامل به مدل در پوشه Product
        return $this->belongsTo(Product::class);
    }

    public function upvotes()
    {
        return $this->hasMany(Upvote::class);
    }

    public function user()
    {
        // آدرس‌دهی کامل به مدل در پوشه User
        return $this->belongsTo(User::class);
    }
}
