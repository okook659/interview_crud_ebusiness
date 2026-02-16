<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Task::latest()->get());
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
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|min:3',
            'description' => 'required',
            'status' => 'required|in:todo,in-progress,done'
        ]);
        $task = Task::create([
            'title'=> $request->get(('title')),
            'description'=> $request->get('description'),
            'status' => $request->get('status'),
        ]);
        return response()->json(['message' => 'Task created', 'post' => $task]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        // $request->validate([
        //     'title' => 'required|string|min:3',
        //     'description' => 'required',
        //     'status' => 'required|in:todo,in-progress,done'
        // ]);
        $task->update($request->only('title', 'description', 'status'));
        return response()->json(['message'=> 'Task updated', $task]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message'=> 'Task deleted']);
    }
}
