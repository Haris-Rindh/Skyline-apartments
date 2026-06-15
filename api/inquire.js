export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, assetOfInterest, message, bookingDate, bookingTime } = req.body;

  // Simple validation
  if (!firstName || !lastName || !email || !phone || !message) {
    return res.status(400).json({ error: 'Missing required inquiry fields.' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    // Local / Development mock fallback
    console.log('[Inquiry Submitted - Mock Mode]');
    console.log('Form Data:', req.body);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
    return res.status(200).json({
      success: true,
      message: 'Inquiry received successfully (simulation). Configure RESEND_API_KEY for live delivery.',
      mock: true
    });
  }

  // Generate Email HTML
  const hasBooking = bookingDate && bookingTime;
  const emailHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #0f172a; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">New Skyline Client Inquiry</h2>
      
      ${hasBooking ? `
      <div style="background-color: #fef08a; border-left: 4px solid #d4af37; padding: 15px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 5px 0; color: #854d0e;">⚠️ Scheduled Private Tour Appointment</h3>
        <p style="margin: 0; color: #713f12; font-size: 14px;">
          <strong>Date:</strong> ${bookingDate} <br/>
          <strong>Time Slot:</strong> ${bookingTime}
        </p>
      </div>
      ` : ''}

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 35%;">Client Name:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${firstName} ${lastName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Email Address:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Phone Number:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><a href="tel:${phone}">${phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Asset of Interest:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #d4af37;">${assetOfInterest}</td>
        </tr>
      </table>

      <div style="background-color: #f8fafc; padding: 15px; border-radius: 4px; border: 1px solid #e2e8f0;">
        <h4 style="margin: 0 0 8px 0; color: #334155;">Client Message:</h4>
        <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
      </div>

      <p style="margin-top: 30px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px;">
        This inquiry was generated automatically by the Skyline Luxury Real Estate platform.
      </p>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Skyline Luxury <onboarding@resend.dev>',
        to: 'victoria@skyline.luxury', // Or direct to the environment recipient
        subject: `[Skyline Inquiry] ${hasBooking ? 'Scheduled Tour Appointment' : 'General Inquiry'} - ${firstName} ${lastName}`,
        html: emailHtml
      })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Resend email dispatch error:', result);
      return res.status(500).json({ error: 'Failed to dispatch notification email.' });
    }

    return res.status(200).json({ success: true, resendId: result.id });
  } catch (err) {
    console.error('Inquiry server error:', err);
    return res.status(500).json({ error: 'Internal server error processing inquiry.' });
  }
}
