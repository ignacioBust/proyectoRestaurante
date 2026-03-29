<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //

        $categories = $request->user()->categories;
        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $request->validate([
            'nombre' => 'required|string|max:255',
            
        ]);

        $category = Category::create([
            'nombre' => $request->nombre,
            'user_id' => $request->user()->id,
        ]);

        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //

        $request -> validate([
            'nombre' => 'required|string|max:255'
        ]);

        $category = Category::findOrFail($id);

        if($category->user_id !== $request->user()->id ){
            return response()->json(['error' => 'No tienes permiso para actualizar esta categoría.'], 403);
        }

        $category->update([
            'nombre' => $request->nombre
        ]);

        return response()->json($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        //

        $category = Category::findOrFail($id);

        if($category->user_id !== $request->user()->id){
            return response()->json(['error' => 'No tienes permiso para eliminar esta categoría.'], 403);
        }

        $category->delete();
        return response()->json(['message' => 'Categoría eliminada correctamente.']);
    }
}
