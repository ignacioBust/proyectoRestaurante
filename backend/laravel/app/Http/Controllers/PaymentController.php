<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MercadoPago\Client\MercadoPagoClient;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\Exceptions\MPApiException;
use MercadoPago\MercadoPagoConfig;

class PaymentController extends Controller
{
    //

    public function createPreference(Request $request)
    {
        MercadoPagoConfig::setAccessToken("TEST-4112016685441448-032801-f0fb43803a0b1368459e4fe7c169e656-432654624");

        $client = new PreferenceClient();

        try {
            $preference = $client->create([
                'items' => [
                    [
                        'title' => 'MenuQR Plan Pro',
                        'quantity' => 1,
                        'unit_price' => 10.00,
                        'currency_id' => 'ARS',
                    ]
                ],
                'back_urls' => [
                    'success' => 'https://proyecto-restaurante-sigma.vercel.app/payment/success',
                    'failure' => 'https://proyecto-restaurante-sigma.vercel.app/payment/failure',
                    'pending' => 'https://proyecto-restaurante-sigma.vercel.app/payment/pending',
                ],
                'metadata' => [
                    'user_id' => $request->user()->id
                ],
            ]);
            return response()->json(['init_point' => $preference->init_point]);
        } catch (\MercadoPago\Exceptions\MPApiException $e) {
            $content = $e->getApiResponse()->getContent();
            \Log::error('MP Error', $content);
            return response()->json(['error' => $content], 500);
        } catch (\Exception $e) {
            \Log::error('General Error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function webhook(Request $request)
    {
        MercadoPagoConfig::setAccessToken("TEST-4112016685441448-032801-f0fb43803a0b1368459e4fe7c169e656-432654624");

        $type = $request->type;

        if ($type === 'payment') {
            $paymentId = $request->data['id'];

            $client = new \MercadoPago\Client\Payment\PaymentClient();
            $payment = $client->get($paymentId);

            if ($payment->status === 'approved') {
                $userId = $payment->metadata->user_id;
                $user = \App\Models\User::find($userId);
                if ($user) {
                    $user->update(['plan' => 'pro']);
                }
            }
        }

        return response()->json(['status' => 'ok']);
    }
}
