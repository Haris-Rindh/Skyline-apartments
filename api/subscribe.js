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

  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  await new Promise(resolve => setTimeout(resolve, 500));

  console.log(`[Subscription Successful] Newsletter email registered: ${email}`);

  return res.status(200).json({ success: true, message: 'Successfully subscribed.' });
}
