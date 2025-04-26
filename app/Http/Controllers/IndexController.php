<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;


class IndexController extends Controller
{
    public function index()
    {
        return view('pages.indexPage');
    }

    public function getReviews()
    {
        $placeId = env('GOOGLE_PLACE_ID');
        $apiKey = env('GOOGLE_API_KEY');

        if (!$placeId || !$apiKey) {
            return response()->json(['error' => 'API Key ou Place ID manquant.'], 500);
        }

        $url = "https://maps.googleapis.com/maps/api/place/details/json?place_id={$placeId}&fields=reviews&language=fr&reviews_no_translations=true&key={$apiKey}";

        try {
            $response = Http::get($url);

            if ($response->failed()) {
                Log::error('Erreur lors de l\'appel à l\'API Google.', ['url' => $url, 'response' => $response->body()]);
                return response()->json(['error' => 'Erreur lors de l\'appel à l\'API Google.'], 500);
            }

            $data = $response->json();

            Log::info('Réponse de l\'API Google.', ['response' => $data]);

            return response()->json([
                'reviews' => $data['result']['reviews'] ?? []
            ]);

        } catch (\Exception $e) {
            Log::error('Exception lors de l\'appel à l\'API Google.', ['exception' => $e->getMessage()]);
            return response()->json(['error' => 'Exception: ' . $e->getMessage()], 500);
        }
    }
}
