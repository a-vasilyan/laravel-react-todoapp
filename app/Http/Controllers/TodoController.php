<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Todo;

class TodoController extends Controller
{
    public function index()
    {
        return Todo::get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'description' => 'required'
        ]);

        $todo              = new Todo;
        $todo->description = $request->description;
        $todo->save();

        return $todo->id;
    }

    public function update(Request $request)
    {
        $request->validate([
            'id'          => 'required',
            'description' => 'required'
        ]);

        $todo              = Todo::find($request->id);
        $todo->description = $request->description;
        $todo->save();

        return $todo->id;
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'id' => 'required'
        ]);

        $todo = Todo::find($request->id)
            ->delete();

        return [
            'success' => true
        ];
    }
}
