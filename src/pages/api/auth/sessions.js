import db from '../../../lib/db';
import { parseCookies } from 'nookies';

export default async function handler(req, res) {
  const cookies = parseCookies({ req });
  const sessionId = cookies.sessionId;

  if (!sessionId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const [[session]] = await db.query(
      'SELECT user_id, login_time FROM sessions WHERE session_id = ?',
      [sessionId]
    );

    if (!session) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    const userId = session.user_id;

    await db.query(
      'DELETE FROM sessions WHERE login_time < DATE_SUB(NOW(), INTERVAL 1 HOUR)'
    );

    const [rows] = await db.query(
      'SELECT * FROM sessions WHERE user_id = ?',
      [userId]
    );

    res.status(200).json({ sessions: rows });
  } catch (error) {
    console.error('Failed to fetch sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
}
