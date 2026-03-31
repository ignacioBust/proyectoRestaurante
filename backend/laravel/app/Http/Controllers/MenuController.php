<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Scan;

class MenuController extends Controller
{
    public function menu(Request $request, $user_id)
    {

        $user = User::find($user_id);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $existScan = Scan::where('user_id', $user_id)
            ->where('ip_address', $request->ip())
            ->where('created_at', '>=', now()->subHours(24))
            ->first();


            if(!$existScan){
                 Scan::create([
                    'user_id' => $user_id,
                    'ip_address' => $request->ip()
                ]);
            }

        $menu = [
            'categories' => $user->categories()->with('products')->get(),
            'theme' => $user->theme
        ];

        return response()->json($menu);
    }
}
