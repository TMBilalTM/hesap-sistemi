import db from '../../../lib/db';
import { v4 as uuidv4 } from 'uuid';
import { getDeviceType } from '../../../lib/deviceUtils';
import { getBrowserInfo } from '../../../lib/browserUtils';
import cookie from 'cookie';
import UAParser from 'ua-parser-js';

const getIpAddress = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  return forwarded ? forwarded.split(',').shift().trim() : 'Unknown IP';
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password]
      );

      if (rows.length > 0) {
        const userId = rows[0].id;
        const sessionId = uuidv4();

        const userAgent = req.headers['user-agent'] || 'Bilinmeyen Tarayıcı';
        console.log('User-Agent:', userAgent);

        const parser = new UAParser(userAgent);
        const device = parser.getDevice();
        const browser = parser.getBrowser();

        console.log('Parsed Device Info:', device);
        console.log('Parsed Browser Info:', browser);

        const deviceType = getDeviceType(userAgent);
        const browserName = getBrowserInfo(userAgent);
        const deviceModel = device.model || 'Bilinmeyen Model';
        const deviceBrand = device.brand || 'Bilinmeyen Marka';
        const ipAddress = getIpAddress(req);

        const nowUtc = new Date();
        const istanbulTime = new Date(nowUtc.getTime() + 3 * 60 * 60 * 1000);

        await db.query(
          'INSERT INTO sessions (user_id, session_id, device_type, browser_info, device_model, device_brand, ip_address, login_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [userId, sessionId, deviceType, browserName, deviceModel, deviceBrand, ipAddress, istanbulTime]
        );

        res.setHeader('Set-Cookie', cookie.serialize('sessionId', sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 3600,
        }));

        res.status(200).json({ userId, ipAddress });
      } else {
        res.status(401).json({ error: 'Geçersiz kimlik bilgileri' });
      }
    } catch (error) {
      console.error('Başarısız giriş:', error);
      res.status(500).json({ error: 'Başarısız giriş' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
