<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::all();
        return response()->json(['data' => $menus]);
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'parent_id' => 'nullable|integer|exists:menu,id',
            'path' => 'nullable|string|unique:menu,path',
            'slug' => 'nullable|string|unique:menu,slug',
        ]);

        // تعیین سطح منو
        $level = 1;
        if (!empty($fields['parent_id'])) {
            $parentMenu = Menu::find($fields['parent_id']);
            if ($parentMenu) {
                $level = $parentMenu->level + 1;
            }
        }

        $slug = $fields['slug'] ?? Str::slug($fields['name']);
        $path = $fields['path'] ?? ($level === 1 ? 'products/' . $slug : 'product-info/' . $slug);

        $menuItem = Menu::create([
            'name' => $fields['name'],
            'parent_id' => $fields['parent_id'] ?? null,
            'slug' => $slug,
            'path' => $path,
            'level' => $level,
        ]);

        return response()->json(['data' => $menuItem], 201);
    }

    public function show($id)
    {
        $menuItem = Menu::findOrFail($id);
        return response()->json(['data' => $menuItem]);
    }

    public function update(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);

        $fields = $request->validate([
            'name' => 'required|string',
            'parent_id' => 'nullable|integer|exists:menu,id',
            'path' => 'nullable|string|unique:menu,path,' . $id,
            'slug' => 'nullable|string|unique:menu,slug,' . $id,
        ]);

        $level = 1;
        if (!empty($fields['parent_id'])) {
            $parentMenu = Menu::find($fields['parent_id']);
            if ($parentMenu) {
                $level = $parentMenu->level + 1;
            }
        }

        $slug = $fields['slug'] ?? Str::slug($fields['name']);
        $path = $fields['path'] ?? ($level === 1 ? 'products/' . $slug : 'product-info/' . $slug);

        $menu->update([
            'name' => $fields['name'],
            'parent_id' => $fields['parent_id'] ?? null,
            'slug' => $slug,
            'path' => $path,
            'level' => $level,
        ]);

        return response()->json(['data' => $menu]);
    }

    public function destroy($id)
    {
        $menuItem = Menu::findOrFail($id);
        $menuItem->delete();

        return response()->json(['message' => 'Menu item deleted successfully']);
    }
}
