<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Answer;
use Illuminate\Http\Request;

class ReactionController extends Controller
{
    /**
     * Update the reaction (like or dislike) for any given entity.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $entityId
     * @param  string  $entityType
     * @return \Illuminate\Http\Response
     */
    private function reactToEntity(Request $request, $entityId, $entityType)
    {
        // Validate the reaction input
        $request->validate([
            'reaction' => 'nullable|in:like,dislike',
        ]);

        $userId = $request->user()->id;
        $reaction = $request->input('reaction');

        // Find the entity (either Comment or Answer)
        $entity = $entityType::find($entityId);

        if (!$entity) {
            return response()->json(['error' => ucfirst($entityType) . ' not found'], 404);
        }

        // Clean and prepare liked/disliked arrays
        $liked = array_filter(explode(',', $entity->liked ?? ''), fn($id) => $id !== '');
        $disliked = array_filter(explode(',', $entity->disliked ?? ''), fn($id) => $id !== '');

        // Convert to numeric for reliable comparison (optional, but recommended)
        $liked = array_map('intval', $liked);
        $disliked = array_map('intval', $disliked);

        // Handle reactions based on user input
        if ($reaction === 'like') {
            // Remove dislike if exists
            if (($key = array_search($userId, $disliked)) !== false) {
                unset($disliked[$key]);
                $entity->dislikes--;
            }

            // Add like if not already liked
            if (!in_array($userId, $liked)) {
                $liked[] = $userId;
                $entity->likes++;
            }
        } elseif ($reaction === 'dislike') {
            // Remove like if exists
            if (($key = array_search($userId, $liked)) !== false) {
                unset($liked[$key]);
                $entity->likes--;
            }

            // Add dislike if not already disliked
            if (!in_array($userId, $disliked)) {
                $disliked[] = $userId;
                $entity->dislikes++;
            }
        } else {
            // Un-react (remove like or dislike)
            if (($key = array_search($userId, $liked)) !== false) {
                unset($liked[$key]);
                $entity->likes--;
            }
            if (($key = array_search($userId, $disliked)) !== false) {
                unset($disliked[$key]);
                $entity->dislikes--;
            }
        }

        // Save cleaned and updated data
        $entity->liked = implode(',', $liked);
        $entity->disliked = implode(',', $disliked);
        $entity->save();

        return response()->json([
            'message' => 'Reaction updated successfully',
            'likes' => $entity->likes,
            'dislikes' => $entity->dislikes,
            'liked' => $entity->liked,
            'disliked' => $entity->disliked,
        ]);
    }

    /** React to a comment. **/
    public function reactToComment(Request $request, $commentId)
    {
        return $this->reactToEntity($request, $commentId, Comment::class);
    }

    /** React to an answer. **/
    public function reactToAnswer(Request $request, $answerId)
    {
        return $this->reactToEntity($request, $answerId, Answer::class);
    }
}
