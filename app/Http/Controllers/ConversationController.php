<?php

namespace App\Http\Controllers;

use App\Events\DirectMessageSent;
use App\Models\Conversation;
use App\Http\Requests\StoreConversationRequest;
use App\Http\Requests\UpdateConversationRequest;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $id)
    {
        $user1 = auth()->user()->id;
        $user2 = $id;
        $conversation = Conversation::where(function($query) use ($user1, $user2) {
            $query->where('user_one_id', $user1)
                  ->where('user_two_id', $user2);
        })->orWhere(function($query) use ($user1, $user2) {
            $query->where('user_one_id', $user2)
                  ->where('user_two_id', $user1);
        })->first();

        if (!$conversation) {
            return response()->error('Conversation not found', 404);
        }

        // send paginated messages
        return response()->success($conversation->messages()->with('user')->latest()->paginate(10));

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreConversationRequest $request, $id)
    {
        $user1 = auth()->user()->id;
        $user2 = $id;
        $conversation = Conversation::where(function($query) use ($user1, $user2) {
            $query->where('user_one_id', $user1)
                  ->where('user_two_id', $user2);
        })->orWhere(function($query) use ($user1, $user2) {
            $query->where('user_one_id', $user2)
                  ->where('user_two_id', $user1);
        })->first();

        if (!$conversation) {
            $conversation = Conversation::create([
                'user_one_id' => $user1,
                'user_two_id' => $user2
            ]);
        }

        $message = $conversation->messages()->create([
            'user_id' => auth()->user()->id,
            'message' => $request->message
        ]);

        $message->load('user');

        broadcast(new DirectMessageSent($message, auth()->user()))->toOthers();

        return response()->success($message, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Conversation $conversation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Conversation $conversation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConversationRequest $request, Conversation $conversation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conversation $conversation)
    {
        //
    }
}
