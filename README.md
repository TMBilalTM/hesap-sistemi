# Hesap Yönetim Sistemi

[Hesap Yönetim](https://auth-bilaltm.vercel.app) hesabınıza giriş yapan cihazları ve konumlarını görebilirsiniz.

[Hesap Yönetim Şimdi Dene](https://auth-bilaltm.vercel.app)


Bu sistem MySQL ile çalışmaktadır, Vercel üzerinden MySQL aktif etmek için [RailWay Kullandım](https://railway.app) altta verdiğim verileri bu site üzerinden açabilir ve vercelde MySQL veritabanını aktif edebilirsiniz.

## Geliştirme
### Başlarken
1. [RailWay](https://railway.app) üzerinden hesap açıp yeni bir MySQL veritabanı açınız.
2. Veritabanı açıldığında 2 tablo oluşturucaksınız bunlar:  `sessions, users`
3. Tabloları açtıktan sonra users tablosuna girip şu veri sütunlarını ekleyin  `id (integer), email (text), password (text)`
4. Users tablosunu tamamladıktan sonra sessions tablosuna girip şu veri sütunlarını ekleyin;

  `id (integer), user_id (integer), session_id(text),	device_type(text),	browser_info(text),	ip_address(text),	login_time(text),	device_model(text),	device_brand(text)`
  
5. Bu kodu terminale yapıştırın: `git clone https://github.com/TMBilalTM/hesap-sistemi.git`.
6. Komut satırından proje dizinine gidin: `cd hesap-sistemi`.
7. Gerekli bağımlılıkları yüklemek için `npm install` komutunu çalıştırın.
8. Geliştirme sunucusunu `npm run dev` ile başlatın.
9. Web tarayıcınızı açın ve `http://localhost:3000` adresine giderek oyunu oynayın.

### Katkıda Bulunma

Katkılarınızı bekliyorum! Bir hata bulursanız veya iyileştirmeler için önerileriniz varsa, lütfen bir sorun açın veya bir pull request oluşturun.
