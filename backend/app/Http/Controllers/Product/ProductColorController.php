<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductColorRequest;
use App\Models\Product\Product;
use App\Models\Product\ProductColor;
use Illuminate\Http\Request;

class ProductColorController extends Controller
{
    // Store a new color
    public function store(ProductColorRequest $request, Product $product)
    {
        $color = new ProductColor([
            'name' => $request->name,
            'hex' => $request->hex,
        ]);

        $product->colors()->save($color);

        return response()->json([
            'message' => 'Color added successfully!',
            'color' => $color,
        ]);
    }

    // Update an existing color
    public function update(Request $request, Product $product, $colorIndex)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'hex' => 'required|string|max:7',
        ]);

        $colors = $product->colors ?? [];

        if (!isset($colors[$colorIndex])) {
            return response()->json(['message' => 'Color not found!'], 404);
        }

        // Update color
        $colors[$colorIndex] = [
            'name' => $request->name,
            'hex' => $request->hex
        ];

        // Save changes
        $product->update(['colors' => $colors]);

        return response()->json([
            'message' => 'Color updated successfully!',
            'colors' => $colors,
        ]);
    }

    // Delete a color
    public function destroy(Product $product, $colorIndex)
    {
        $colors = $product->colors ?? [];

        if (!isset($colors[$colorIndex])) {
            return response()->json(['message' => 'Color not found!'], 404);
        }

        // Remove color
        array_splice($colors, $colorIndex, 1);
        $product->update(['colors' => $colors]);

        return response()->json([
            'message' => 'Color deleted successfully!',
            'colors' => $colors,
        ]);
    }
}
