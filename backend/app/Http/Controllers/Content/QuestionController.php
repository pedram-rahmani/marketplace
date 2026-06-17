<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuestionResource;
use App\Models\Product\Product;
use App\Models\Content\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function index(Product $product, $slug = null)
{
    $questions = $product->questions()
        ->with(['answers.user', 'user']) // <== you're eager loading answers
        ->latest()
        ->paginate();

    return QuestionResource::collection($questions);
}



    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'text' => 'required|string',
            'rate' => 'required|integer|min:1|max:5',
        ]);

        Question::create($validated);

        return redirect()->back()->with('success', 'پرسش با موفقیت ثبت شد.');
    }

    public function create()
    {
        return view('questions.create');
    }

    public function destroy(Question $question)
    {
        $question->delete();
        return redirect()->back()->with('success', 'پرسش حذف شد.');
    }

}
