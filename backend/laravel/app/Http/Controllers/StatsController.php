<?php

namespace App\Http\Controllers;

use App\Models\Scan;
use Illuminate\Http\Request;
use App\Models\User;
class StatsController extends Controller
{
    //

    public function index(Request $request){

    if($request->user()->plan !== 'pro' ){
        return response()->json(['message' => 'Debe subscribirse para acceder a esta seccion'],403);
    }

    $totalScans = Scan::where('user_id', $request->user()->id)->count(); 

    $uniqueScans = Scan::where('user_id', $request->user()->id)
        ->distinct('ip_address')
        ->count();

    $scasByDay = Scan::where('user_id', $request->user()->id)
        ->where('created_at', '>=', now()->subDays(7))
        ->selectRaw('DATE(created_at) as date, COUNT(*) as total')
        ->groupBy('date')
        ->orderBy('date')
        ->get();
            
    

    return response()-> json([
        'total' => $totalScans,
        'unique' => $uniqueScans,
        'by_day' => $scasByDay
    ]);

    
    }
}
