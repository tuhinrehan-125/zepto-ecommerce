<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'description',
        'brand',
        'category',
        'price',
        'countInStock',
        'rating',
        'numReviews',
        'upload_successful',
        'disk',
        'created_by',
    ];

    public function getImageAttribute()
    {
        return asset($this->attributes['image']);
        
    }
}