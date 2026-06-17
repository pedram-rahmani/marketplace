<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Product\Category;

class Menu extends Model
{
    use HasFactory;

    protected $table = 'menu';

    protected $fillable = [
        'name',
        'slug',
        'parent_id',
        'category_id',
        'path',
        'level',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function parent()
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Menu::class, 'parent_id');
    }

    public function getUrlAttribute()
    {
        if ($this->category) {
            return "/products/" . $this->category->slug;
        }

        return $this->path ?? '#';
    }
}
