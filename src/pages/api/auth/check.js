import db from '../../../lib/db';
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const cookies = req.headers.cookie ? req.headers.cookie.split('; ').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=');
      acc[name.trim()] = value;
      return acc;
    }, {}) : {};

    const sessionId = cookies.sessionId;

    if (!sessionId) {
      return res.status(401).json({ isAuthenticated: false, error: 'No sessionId cookie' });
    }

    try {
      const [sessionRows] = await db.query(
        'SELECT * FROM sessions WHERE session_id = ?',
        [sessionId]
      );

      if (sessionRows.length > 0) {
        return res.status(200).json({ isAuthenticated: true });
      } else {
        res.setHeader('Set-Cookie', cookie.serialize('sessionId', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          expires: new Date(0),
        }));

        return res.status(401).json({ isAuthenticated: false, error: 'Session expired or invalid' });
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      res.status(500).json({ isAuthenticated: false, error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
