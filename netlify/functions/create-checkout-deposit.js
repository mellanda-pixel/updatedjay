const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }
  try {
    // Get session type and addon from query params
    const params = event.queryStringParameters || {};
    const sessionType = params.session || 'small';
    const addon = params.addon || 'none';
    
    // Map session type to Calendly URL
    const calendlyUrls = {
      small: 'https://calendly.com/jaylen-getinkedbyj/small-session-2-3-hrs',
      medium: 'https://calendly.com/jaylen-getinkedbyj/medium-session-4-6-hours',
      fullday: 'https://calendly.com/jaylen-getinkedbyj/full-day-session-7-hours'
    };
    
    const sessionNames = {
      small: 'Small Session (2-3 hours)',
      medium: 'Medium Session (4-6 hours)',
      fullday: 'Full Day Session (7+ hours)'
    };
    
    const addonPrices = {
      bundle: 9000,    // $90
      numbing: 5000,   // $50
      aftercare: 6000, // $60
      none: 0
    };
    
    const addonNames = {
      bundle: 'Comfort Bundle (Numbing Cream + Aftercare Kit)',
      numbing: 'Numbing Cream',
      aftercare: 'Aftercare Kit',
      none: null
    };
    
    const addonDescriptions = {
      bundle: 'Numbing cream for a comfortable session + complete aftercare kit for proper healing. Ready at your appointment.',
      numbing: 'Applied before your session for a more comfortable tattoo experience. Ready at your appointment.',
      aftercare: 'Everything you need for proper healing. Ready at your appointment.',
      none: null
    };
    
    // Build line items
    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Tattoo Session Deposit (Non-Refundable)',
            description: `Non-refundable deposit for ${sessionNames[sessionType]}. This amount goes toward your final tattoo cost.`,
          },
          unit_amount: 20000, // $200 in cents
        },
        quantity: 1,
      }
    ];
    
    // Add addon if selected
    if (addon !== 'none' && addonNames[addon]) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: addonNames[addon],
            description: addonDescriptions[addon],
          },
          unit_amount: addonPrices[addon],
        },
        quantity: 1,
      });
    }
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.URL}/booking-success/deposit/?session=${sessionType}&addon=${addon}`,
      cancel_url: `${process.env.URL}/book/`,
      metadata: {
        sessionType: sessionType,
        addon: addon
      }
    });
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ sessionId: session.id, url: session.url }),
    };
  } catch (error) {
    console.error('Stripe error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
