import db from '../../../lib/db';

export default async function handler(req, res) {
  const { email, password } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, password]
    );
    res.status(200).json({ userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'User registration failed' });
  }
}


