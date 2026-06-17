<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\Content\Comment;
use App\Models\Product\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Permissions\PermissionList;

class CommentController extends Controller
{
    public function index(Product $product, $slug = null)
{
    $comments = $product->comments()
        ->with('user') // Optional: include user info
        ->latest()
        ->paginate(10);

    return response()->json([
        'comments' => CommentResource::collection($comments),
        'pagination' => [
            'current_page' => $comments->currentPage(),
            'next_page_url' => $comments->nextPageUrl(),
            'last_page' => $comments->lastPage(),
        ],
    ]);
}

    public function store(Request $request, Product $product)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized. Please log in.'], 401);
        }

        // Use the PermissionList constant here for permission check
        if (!Gate::allows(PermissionList::MANAGE_COMMENTS)) {
            return response()->json(['error' => 'Access denied.'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'comment' => 'required|string',
            'rate' => 'required|integer|min:1|max:5',
            ' reaction' => 'required|in:like,dislike'
        ]);

        $comment = $product->comments()->create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'comment' => $request->comment,
            'rate' => $request->rate,
        ]);

        return [
            'message' => 'Comment added successfully!',
            'comment' => $comment,
        ];
    }

    public function show(Product $product, Comment $comment)
    {
        // Optional: Check if the comment belongs to the product
        if ($comment->product_id !== $product->id) {
            return response()->json(['error' => 'Comment does not belong to this product.'], 404);
        }

        return [
            'comment' => new CommentResource($comment)
        ];
    }

    public function update(Request $request, Comment $comment)
    {
        // Use the PermissionList constant here for permission check
        if (!Gate::allows(PermissionList::MANAGE_COMMENTS)) {
            return response()->json(['error' => 'Access denied.'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'comment' => 'required|string',
            'rate' => 'required|integer|min:1|max:5',
        ]);

        $comment->update([
            'name' => $request->name,
            'comment' => $request->comment,
            'rate' => $request->rate,
        ]);

        return [
            'message' => 'Comment updated successfully!',
            'comment' => $comment,
        ];
    }

    public function destroy(Comment $comment)
    {
        // Use the PermissionList constant here for permission check
        if (!Gate::allows(PermissionList::MANAGE_COMMENTS)) {
            return response()->json(['error' => 'Access denied.'], 403);
        }

        $comment->delete();

        return [
            'message' => 'Comment deleted successfully!',
        ];
    }
}
