<?php

namespace App\Http\Controllers;

use App\Models\ChannelMessage;
use App\Http\Requests\StoreChannelMessageRequest;
use App\Http\Requests\UpdateChannelMessageRequest;
use Illuminate\Http\Request;

class ChannelMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $id)
    {
        $channelMessages = ChannelMessage::where('channel_id', $id)->latest()->paginate();
        return response()->success($channelMessages);
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
    public function store(StoreChannelMessageRequest $request, $id)
    {
        $channelMessage = ChannelMessage::create([
            'channel_id' => $id,
            'user_id' => auth()->id(),
            'message' => $request->message
        ]);
        return response()->success($channelMessage);
    }

    /**
     * Display the specified resource.
     */
    public function show(ChannelMessage $channelMessage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ChannelMessage $channelMessage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChannelMessageRequest $request, ChannelMessage $channelMessage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChannelMessage $channelMessage)
    {
        //
    }
}
