<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Fetch all categories
    public function index()
    {
        $categories = Category::all();

        return response()->json($categories);
    }

    // Store a new category
    public function store(Request $request)
    {
        // Validate the input
        $request->validate([
            'name' => 'required|string|unique:categories,name',
        ]);

        // Create a new category
        $category = Category::create($request->only('name'));

        return response()->json(['data' => $category], 201);
    }

    // Show a specific category
    public function show($id)
    {
        $category = Category::findOrFail($id);

        return response()->json(['data' => $category]);
    }

    // Update an existing category
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|unique:categories,name,' . $id,
        ]);

        $category = Category::findOrFail($id);
        $category->update($request->only('name'));

        return response()->json(['data' => $category]);
    }

    // Delete a category
    public function destroy($id)
    {
        // Find the category
        $category = Category::findOrFail($id);

        // Delete the category
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}
