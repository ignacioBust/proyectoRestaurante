<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class MenuController extends Controller
{
   public function menu($user_id){

    $user = User::find($user_id);
    if (!$user){
        return response()->json(['message'=> 'Usuario no encontrado'], 404);
    }

    $menu = [
        'categories' => $user->categories()->with('products')->get(),
        'theme' => $user->theme,
    ];

    return response()->json($menu);

   }
}
