<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product\Product;
use App\Models\Product\Category;
use App\Models\Product\ProductFeature;
use App\Models\Product\ProductColor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{

    public function index(Request $request)
    {
        try {
            $products = Product::with([
                'colors',
                'introductions',
                'category',
                'specifications.feature'
            ])->get();

            return response()->json(['products' => $products]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function edit($id)
{
    $product = Product::findOrFail($id);

    // بیا دستی کوئری بزنیم ببینیم چی برمی‌گرداند
    $specs = \App\Models\Product\ProductSpecification::where('product_id', $id)->get();

    // حالا تک‌تک بررسی کنیم آیا feature را دارند؟
    $debug = $specs->map(function($s) {
        return [
            'id' => $s->id,
            'feature_id' => $s->feature_id,
            'feature_data' => $s->feature // اینجا باید آبجکتِ ویژگی را برگرداند
        ];
    });

    return response()->json(['debug' => $debug]);
}

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'img' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        return DB::transaction(function () use ($request) {
            $data = $request->only('name', 'price', 'discount', 'category_id');
            if ($request->hasFile('img')) {
                $data['img'] = $request->file('img')->store('products', 'public');
            }

            $product = Product::create($data);

            if ($request->has('introduction_blocks')) {
                $blocks = json_decode($request->introduction_blocks, true);
                if (is_array($blocks)) $product->introductions()->createMany($blocks);
            }

            if ($request->has('colors')) {
                $colors = json_decode($request->colors, true);
                if (is_array($colors)) $product->colors()->createMany($colors);
            }

            if ($request->has('specifications')) {
                $specs = json_decode($request->specifications, true);
                $this->saveSpecifications($product, $specs, $request->category_id);
            }

            return response()->json(['message' => 'Product created!', 'product' => $product], 201);
        });
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        return DB::transaction(function () use ($request, $product) {
            $product->update($request->only('name', 'price', 'discount', 'category_id'));

            if ($request->hasFile('img')) {
                if ($product->img) Storage::disk('public')->delete($product->img);
                $product->img = $request->file('img')->store('products', 'public');
                $product->save();
            }

            if ($request->has('introduction_blocks')) {
                $product->introductions()->delete();
                $blocks = json_decode($request->introduction_blocks, true);
                if (is_array($blocks)) $product->introductions()->createMany($blocks);
            }

            if ($request->has('colors')) {
                $product->colors()->delete();
                $colors = json_decode($request->colors, true);
                if (is_array($colors)) $product->colors()->createMany($colors);
            }

            if ($request->has('specifications')) {
                $product->specifications()->delete();
                $specs = json_decode($request->specifications, true);
                $this->saveSpecifications($product, $specs, $request->category_id);
            }

            return response()->json(['message' => 'Product updated successfully']);
        });
    }

    private function saveSpecifications($product, $specs, $categoryId)
    {
        if (!is_array($specs)) return;

        foreach ($specs as $spec) {
            $featureId = $spec['feature_id'];

            // حل اساسی مشکل: اگر ورودی متن باشد، ویژگی جدید ساخته می‌شود
            if (!is_numeric($featureId)) {
                $newFeature = ProductFeature::firstOrCreate(
                    ['title' => $featureId],
                    ['category_id' => $categoryId]
                );
                $featureId = $newFeature->id;
            }

            $product->specifications()->create([
                'feature_id' => $featureId,
                'value' => $spec['value']
            ]);
        }
    }

    public function destroy(Product $product)
    {
        return DB::transaction(function () use ($product) {
            if ($product->img) Storage::disk('public')->delete($product->img);
            $product->colors()->delete();
            $product->specifications()->delete();
            $product->introductions()->delete();
            $product->delete();
            return response()->json(['message' => 'Deleted!']);
        });
    }

    public function getCategories()
    {
        return response()->json(['categories' => Category::all()]);
    }

    public function getFilters(Request $request)
    {
        $categoryId = $request->query('category_id');
        $features = ProductFeature::where('category_id', $categoryId)
            ->with(['specifications' => fn($q) => $q->select('feature_id', 'value')->distinct()])
            ->get()
            ->map(fn($f) => [
                'id' => $f->id,
                'title' => $f->title,
                'values' => $f->specifications->pluck('value')->unique()->values()
            ]);

        $colors = ProductColor::whereHas('product', fn($q) => $q->where('category_id', $categoryId))
            ->select('name', 'hex')->distinct()->get();

        return response()->json(['features' => $features, 'colors' => $colors]);
    }
}
