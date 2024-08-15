import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { sessionId } = req.body;

    try {
      await db.query('DELETE FROM sessions WHERE session_id = ?', [sessionId]);

      res.status(200).json({ message: 'Oturum başarıyla sonlandırıldı' });
    } catch (error) {
      console.error('Çıkış başarısız:', error);
      res.status(500).json({ error: 'Oturum sonlandırılamadı' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Metod ${req.method} izin verilmedi`);
  }
}
