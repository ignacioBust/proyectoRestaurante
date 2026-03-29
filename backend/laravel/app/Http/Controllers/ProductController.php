<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, string $category_id)
    {
        //
        $category = Category::findOrFail($category_id);

        if($category->user_id !== $request->user()->id){
            return response()->json(['error' => 'No tienes permiso para ver los productos de esta categoría.'], 403);
        }

        return response()->json($category->products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request ->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image_url' => 'nullable|url',
            'category_id' => 'required|exists:categories,id'

        ]);

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image_url' => $request->image_url,
            'category_id' => $request->category_id
        ]);
        return response()->json($product, 201);
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
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image_url' => 'nullable|url',
        ]);

        $product = Product::findOrFail($id);
        $category = Category::findOrFail($product->category_id);

        if($category->user_id !== $request->user()->id){
            return response()->json(['error' => 'No tienes permiso para actualizar este producto.'], 403);
        }
        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image_url' => $request->image_url
        ]);

        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        //
        $product = Product::findOrFail($id);
        $category = Category::findOrFail($product->category_id);

        if($category->user_id !== $request->user()->id){
            return response()->json(['error' => 'No tiene permiso para eliminar este producto.'], 403);

        }
        $product->delete();
        return response()->json(['message' => 'Producto eliminado correctamente.']);

    }
}
