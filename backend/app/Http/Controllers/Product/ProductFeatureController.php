<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product\ProductFeature;
use App\Models\Product\ProductSpecification;
use Illuminate\Http\Request;

class ProductFeatureController extends Controller
{

    public function getFeaturesByCategory($categoryId)
    {
        $features = ProductFeature::where('category_id', $categoryId)->get();

        return response()->json(['features' => $features]);
    }

    public function store(Request $request, $productId)
    {
        $request->validate([
            'feature_id' => 'required',
            'value' => 'required'
        ]);

        // ذخیره در مدل مشخصات فنی (ProductSpecification)
        $spec = ProductSpecification::create([
            'product_id' => $productId,
            'feature_id' => $request->feature_id,
            'value' => $request->value,
        ]);

        return response()->json(['message' => 'موفقیت‌آمیز بود', 'data' => $spec], 201);
    }
}
