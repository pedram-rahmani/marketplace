<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Content\Comment;
use App\Models\Content\Question;
use App\Models\Product\Category;
use App\Models\Product\ProductColor;
use App\Models\Product\ProductIntroduction;
use App\Models\Product\ProductSpecification;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'discount',
        'category_id',
        'img',
        'options'
    ];

    protected $casts = [
        'options' => 'array',
    ];

    public function colors() {return $this->hasMany(ProductColor::class);}
    public function introductions() {return $this->hasMany(ProductIntroduction::class)->orderBy('sort_order', 'asc');}
    public function specifications() {return $this->hasMany(ProductSpecification::class, 'product_id');}
    public function comments() {return $this->hasMany(Comment::class);}
    public function questions() {return $this->hasMany(Question::class);}
    public function category() {return $this->belongsTo(Category::class); }
    public function warranties(){return $this->belongsToMany(\App\Models\Product\Warranty::class, 'product_warranty')->withPivot('price', 'is_default')->withTimestamps();}
}
