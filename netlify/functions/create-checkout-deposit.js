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
    // Get session type from query params
    const params = event.queryStringParameters || {};
    const sessionType = params.session || 'small';

    // Map session type to Calendly URL
    const calendlyUrls = {
      small: 'https://calendly.com/jaylen-getinkedbyj/small-session-2-3-hrs',
      medium: 'https://calendly.com/jaylen-getinkedbyj/medium-session-4-6-hours',
      fullday: 'https://calendly.com/jaylen-getinkedbyj/full-day-session-6-7-hours'
    };

    const sessionNames = {
      small: 'Small Session (2-3 hours)',
      medium: 'Medium Session (4-6 hours)',
      fullday: 'Full Day Session (6-7 hours)'
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Tattoo Session Deposit',
              description: `Deposit for ${sessionNames[sessionType]}. This amount goes toward your final tattoo cost.`,
            },
            unit_amount: 20000, // $200 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.URL}/booking-success/deposit/?session=${sessionType}`,
      cancel_url: `${process.env.URL}/book/`,
      metadata: {
        sessionType: sessionType
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
