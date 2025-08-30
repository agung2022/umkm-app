<template>
  <div class="bantuan">
    <!-- Header -->
    <div class="bantuan-header">
      <h1 class="bantuan-title">Pusat Bantuan</h1>
      <p class="bantuan-subtitle">
        Butuh bantuan? Kami siap membantu Anda mengatasi masalah apapun dengan
        platform SisMatis Digitalisasi UMKM.
      </p>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h2>Pertanyaan yang Sering Diajukan</h2>
      <div class="faq-grid">
        <div class="faq-item">
          <h3>Bagaimana cara membuat website?</h3>
          <p>
            Kunjungi halaman AI Builder melalui menu navigasi, lalu ceritakan
            bisnis Anda dalam bahasa sehari-hari. AI akan buatkan 3 variasi
            website untuk dipilih.
          </p>
        </div>

        <div class="faq-item">
          <h3>Apakah gratis menggunakan platform ini?</h3>
          <p>
            Ya, platform SisMatis Digitalisasi UMKM dapat digunakan secara
            gratis. Kami berkomitmen membantu UMKM Indonesia untuk berkembang di
            era digital.
          </p>
        </div>

        <div class="faq-item">
          <h3>Berapa lama proses pembuatan website?</h3>
          <p>
            Website Anda akan siap dalam hitungan detik! Setelah Anda
            mendeskripsikan bisnis, AI akan langsung generate 3 variasi desain
            website.
          </p>
        </div>

        <div class="faq-item">
          <h3>Apakah website responsive di mobile?</h3>
          <p>
            Tentu saja! Semua website yang dihasilkan otomatis responsive dan
            tampil sempurna di semua perangkat - desktop, tablet, dan mobile.
          </p>
        </div>
      </div>
    </div>

    <!-- Contact Support Section -->
    <div class="contact-section">
      <h2>Hubungi Tim Support</h2>
      <div class="contact-grid">
        <div class="contact-card">
          <div class="contact-icon"></div>
          <h3>Email Support</h3>
          <p>support@sismatisdigitalisasi.com</p>
          <span class="response-time">Respon dalam 24 jam</span>
        </div>

        <div class="contact-card">
          <div class="contact-icon"></div>
          <h3>WhatsApp Support</h3>
          <p>+62 812-3456-7890</p>
          <span class="response-time">Respon cepat</span>
        </div>

        <div class="contact-card">
          <div class="contact-icon"></div>
          <h3>Laporkan Bug</h3>
          <p>bugs@sismatisdigitalisasi.com</p>
          <span class="response-time">Akan segera diperbaiki</span>
        </div>
      </div>
    </div>

    <!-- Report Form -->
    <div class="report-section">
      <h2>Laporkan Masalah</h2>
      <div class="report-form">
        <form @submit.prevent="submitReport">
          <div class="form-group">
            <label>Jenis Masalah:</label>
            <select v-model="reportForm.type" required>
              <option value="">Pilih jenis masalah</option>
              <option value="bug">Bug / Error</option>
              <option value="feature">Request Fitur Baru</option>
              <option value="website">Masalah Website yang Dihasilkan</option>
              <option value="performance">Performance / Kecepatan</option>
              <option value="other">Lainnya</option>
            </select>
          </div>

          <div class="form-group">
            <label>Email Anda:</label>
            <input
              type="email"
              v-model="reportForm.email"
              placeholder="email@example.com"
              required
            />
          </div>

          <div class="form-group">
            <label>Detail Masalah:</label>
            <textarea
              v-model="reportForm.description"
              placeholder="Ceritakan masalah yang Anda alami secara detail..."
              rows="5"
              required
            ></textarea>
          </div>

          <button type="submit" class="btn-submit">Kirim Laporan</button>
        </form>
      </div>
    </div>

    <!-- Tips Section -->
    <div class="tips-section">
      <h2>Tips Menggunakan Platform</h2>
      <div class="tips-grid">
        <div class="tip-item">
          <div class="tip-number">1</div>
          <div class="tip-content">
            <h4>Deskripsikan Bisnis dengan Detail</h4>
            <p>
              Semakin detail cerita bisnis Anda, semakin akurat website yang
              dihasilkan AI.
            </p>
          </div>
        </div>

        <div class="tip-item">
          <div class="tip-number">2</div>
          <div class="tip-content">
            <h4>Pilih Desain yang Sesuai Target</h4>
            <p>
              Perhatikan target audience setiap variasi desain untuk memilih
              yang paling cocok.
            </p>
          </div>
        </div>

        <div class="tip-item">
          <div class="tip-number">3</div>
          <div class="tip-content">
            <h4>Cantumkan Kontak dan Lokasi</h4>
            <p>
              Jangan lupa sertakan nomor WhatsApp dan lokasi bisnis untuk hasil
              yang optimal.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const reportForm = ref({
  type: "",
  email: "",
  description: "",
});

const submitReport = () => {
  // Simulasi pengiriman laporan
  alert(
    `Terima kasih! Laporan Anda telah dikirim.\n\nJenis: ${reportForm.value.type}\nEmail: ${reportForm.value.email}\n\nTim support kami akan segera menindaklanjuti laporan Anda.`
  );

  // Reset form
  reportForm.value = {
    type: "",
    email: "",
    description: "",
  };
};
</script>

<style scoped>
.bantuan {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #1e3c72 0%,
    #2a5298 30%,
    #4f94cd 70%,
    #87ceeb 100%
  );
}

.bantuan-header {
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: #333;
  padding: 60px 40px;
  border-radius: 20px;
  margin-bottom: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.bantuan-title {
  font-size: 3rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.bantuan-subtitle {
  font-size: 1.3rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.faq-section,
.contact-section,
.report-section,
.tips-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.faq-section h2,
.contact-section h2,
.report-section h2,
.tips-section h2 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.faq-item {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 15px;
  border-left: 5px solid #667eea;
}

.faq-item h3 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.faq-item p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.contact-card {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.contact-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.contact-card h3 {
  color: #333;
  margin-bottom: 10px;
}

.contact-card p {
  color: #667eea;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.response-time {
  background: #667eea;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.report-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.btn-submit {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.tips-grid {
  display: grid;
  gap: 25px;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #f8f9fa;
  padding: 25px;
  border-radius: 15px;
}

.tip-number {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  flex-shrink: 0;
}

.tip-content h4 {
  color: #333;
  margin: 0 0 8px 0;
  font-size: 1.2rem;
}

.tip-content p {
  color: #666;
  margin: 0;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 768px) {
  .bantuan {
    padding: 15px;
  }

  .bantuan-header {
    padding: 40px 20px;
  }

  .bantuan-title {
    font-size: 2rem;
  }

  .faq-section,
  .contact-section,
  .report-section,
  .tips-section {
    padding: 25px;
  }

  .faq-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .tip-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>
