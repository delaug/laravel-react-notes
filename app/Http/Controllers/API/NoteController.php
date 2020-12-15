<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Note;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if( !$user_id = Auth::id() ) {
            return response()->json(['error' => 'Can\'t get user id'], 401);
        }

        $notes = Note::where('user_id', $user_id)->orderBy('created_at','desc')->get();

        return response()->json(['status' => 'ok', 'notes' => $notes], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required','string','max:255'],
            'text' => ['required','string']
        ]);

        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        if( !$user_id = Auth::id() ) {
            return response()->json(['error' => 'Can\'t get user id'], 401);
        }

        $note = Note::create([
            'title' => $request->title,
            'text' => $request->text,
            'user_id' => $user_id
        ]);

        return response()->json(['status' => 'ok', 'note' => $note], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if( !$user_id = Auth::id() ) {
            return response()->json(['error' => 'Can\'t get user id'], 401);
        }

        $note = Note::where(['id' => $id, 'user_id' => $user_id])->first();

        return response()->json(['status' => 'ok', 'note' => $note], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if( !$user_id = Auth::id() ) {
            return response()->json(['error' => 'Can\'t get user id'], 401);
        }

        if(!$note = Note::withTrashed()->find($id)) {
            return response()->json(['error' => 'Note not found'], 404);
        }

        if($note->user_id != $user_id) {
            return response()->json(['error' => 'Permission conflict'], 403);
        }

        $update = [];
        if(!empty($request->title) && trim($request->title) != $note->title) {
            $update['title'] = trim($request->title);
        }
        if(!empty($request->text) && trim($request->text) != $note->text) {
            $update['text'] = trim($request->text);
        }

        $is_updated = false;
        $is_restored = false;
        if(isset($request->deleted_at) && empty($request->deleted_at)) {
            $note->restore();
            $is_restored = true;
        }

        if(!empty($update)) {
            $note->update($update);
            $is_updated = true;
        }

        if($is_updated || $is_restored) {
            return response()->json(['status' => 'ok', 'note' => $note], 200);
        }

        return response()->json(['status' => 'ok', 'note' => null], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if( !$user_id = Auth::id() ) {
            return response()->json(['error' => 'Can\'t get user id'], 401);
        }

        if(!$note = Note::find($id)) {
            return response()->json(['error' => 'Note not found'], 404);
        }

        if($note->user_id != $user_id) {
            return response()->json(['error' => 'Permission denied'], 403);
        }

        $note->delete();
    }
}
