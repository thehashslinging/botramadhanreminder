# 🔔 Bot Ramadhan Reminder
Bot Ramadhan Reminder adalah bot Discord yang dirancang untuk mengingatkan pengguna tentang waktu-waktu penting selama bulan Ramadhan, seperti waktu sahur, imsak, dan berbuka puasa.

## ℹ️ Fitur
- **Pengingat Waktu Sahur**: Memberikan notifikasi kepada pengguna saat waktu sahur tiba.
- **Pengingat Waktu Imsak**: Mengingatkan pengguna ketika waktu imsak mendekat.
- **Pengingat Waktu Berbuka**: Memberikan notifikasi saat waktu berbuka puasa tiba.

## 📝 Instalasi

1. **Kloning repositori ini** ke dalam direktori lokal Anda:

   ```bash
   git clone https://github.com/thehashslinging/botramadhanreminder.git

2. **Masuk ke direktori proyek:**
  ```bash
  cd botramadhanreminder
```
3. **Instal dependensi yang diperlukan menggunakan npm:**
  ```bash
  npm install
  ```

## ⚙️ Konfigurasi
1. **Buka file** `config.json` di dalam direktori proyek dan edit ini:
  ```bash
  {
      "token": "CHANGE_WITH_YOUR_TOKEN",
      "channelId": "CHANGE_CHANNEL_ID",
  }
  ```
## ✅ Run Bot
1. **Jalankan bot dengan perintah berikut:**
  ```bash
  node index.js
