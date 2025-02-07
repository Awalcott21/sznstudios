
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { items, total } = await req.json()
    
    const paypalClientId = Deno.env.get('paypal API')
    const paypalSecret = Deno.env.get('paypal secret ID')
    
    if (!paypalClientId || !paypalSecret) {
      console.error('PayPal credentials not found');
      throw new Error('PayPal credentials not configured');
    }

    console.log('Attempting to get PayPal access token');
    // Get access token
    const auth = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en_US',
        'Authorization': `Basic ${btoa(`${paypalClientId}:${paypalSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials'
    })

    if (!auth.ok) {
      const authError = await auth.text();
      console.error('PayPal auth error:', authError);
      throw new Error('Failed to authenticate with PayPal');
    }

    const { access_token } = await auth.json()
    console.log('Successfully obtained PayPal access token');
    
    console.log('Creating PayPal order with data:', { total, itemCount: items.length });
    // Create order
    const order = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: total.toFixed(2)
              }
            }
          },
          items: items.map((item: any) => ({
            name: item.item.alt,
            unit_amount: {
              currency_code: 'USD',
              value: item.item.price.toFixed(2)
            },
            quantity: item.quantity.toString()
          }))
        }]
      })
    })

    if (!order.ok) {
      const orderError = await order.text();
      console.error('PayPal order creation error:', orderError);
      throw new Error('Failed to create PayPal order');
    }

    const orderData = await order.json()
    console.log('PayPal order created successfully:', orderData)

    return new Response(
      JSON.stringify(orderData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('PayPal error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
