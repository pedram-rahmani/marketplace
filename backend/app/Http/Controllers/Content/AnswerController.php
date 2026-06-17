<?php

namespace App\Http\Controllers;

use App\Http\Resources\AnswerResource;
use App\Models\Answer;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function index($questionId)
    {
        $answers = Answer::with('user')
            ->where('question_id', $questionId)
            ->get();

        return AnswerResource::collection($answers);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'question_id' => 'required|exists:questions,id',
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'text' => 'required|string',
        ]);

        Answer::create($validated);

        return redirect()->back()->with('success', 'پاسخ با موفقیت ثبت شد.');
    }

    public function create()
    {
        return view('answers.create');

    }

    public function destroy(Answer $answer)
    {
        $answer->delete();
        return redirect()->back()->with('success', 'پاسخ حذف شد.');
    }
}
