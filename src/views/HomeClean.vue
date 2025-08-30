<template>
  <div class="home" style="padding: 0; margin: 0">
    <!-- Header Section -->
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        padding: 40px 20px;
        background: linear-gradient(
          135deg,
          #1e3c72 0%,
          #2a5298 30%,
          #4f94cd 70%,
          #87ceeb 100%
        );
        color: white;
        text-align: center;
      "
    >
      <img
        src="/img/logo.png"
        alt="SisMatis Digitalisasi UMKM Logo"
        style="
          width: 60px;
          height: 60px;
          border-radius: 12px;
          margin-right: 15px;
        "
      />
      <h1
        style="
          font-size: 2.5rem;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        "
      >
        SisMatis Digitalisasi UMKM
      </h1>
    </div>

    <!-- Subtitle -->
    <div style="text-align: center; padding: 0 20px; margin-bottom: 40px">
      <p
        style="
          font-size: 1.3rem;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        "
      >
        🎯 <strong>Platform Revolusioner</strong> yang dibuat khusus untuk
        membantu UMKM Indonesia berkembang di era digital. Buat website
        profesional dengan <strong>satu klik</strong> menggunakan teknologi AI!
      </p>
    </div>

    <!-- Features Grid -->
    <div
      style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin: 40px 20px;
      "
    >
      <div
        style="
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        "
      >
        <h3 style="color: #007bff">✨ AI Pintar</h3>
        <p>
          Cukup ceritakan bisnis Anda dengan bahasa sehari-hari, AI akan
          memahami dan membuat website sesuai kebutuhan.
        </p>
      </div>
      <div
        style="
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        "
      >
        <h3 style="color: #28a745">⚡ Instant</h3>
        <p>
          Website Anda akan siap dalam hitungan detik. Tidak perlu menunggu lama
          atau ribet dengan coding.
        </p>
      </div>
      <div
        style="
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        "
      >
        <h3 style="color: #dc3545">📱 Responsive</h3>
        <p>
          Website yang dihasilkan otomatis responsive dan terlihat sempurna di
          semua perangkat.
        </p>
      </div>
    </div>

    <!-- Website Examples Carousel -->
    <div
      style="
        text-align: center;
        background: #f8f9fa;
        padding: 60px 20px;
        margin: 40px 0;
      "
    >
      <h2 style="color: #333; margin-bottom: 30px; font-size: 2rem">
        🌟 Contoh Website yang Bisa Dibuat
      </h2>

      <div class="carousel-container">
        <div class="example-content">
          <div class="carousel-navigation">
            <button
              @click="previousSlide"
              class="nav-arrow prev"
              :disabled="currentSlide === 0"
            >
              ←
            </button>
          </div>

          <div class="main-content-area">
            <div class="prompt-section">
              <div class="prompt-card">
                <h4>💬 Contoh prompt yang digunakan:</h4>
                <p class="prompt-text">
                  "{{ websiteExamples[currentSlide].prompt }}"
                </p>
              </div>

              <div class="arrow-indicator">
                <div class="arrow">➡️</div>
                <p>AI menghasilkan website seperti ini!</p>
              </div>
            </div>

            <div class="carousel-slide">
              <div class="browser-frame">
                <div class="browser-header">
                  <div class="browser-controls">
                    <span style="background: #ff5f57"></span>
                    <span style="background: #ffbd2e"></span>
                    <span style="background: #28ca42"></span>
                  </div>
                  <div class="browser-url">
                    {{ websiteExamples[currentSlide].businessName }}.com
                  </div>
                </div>

                <div class="website-preview">
                  <div class="preview-header">
                    <h3>{{ websiteExamples[currentSlide].businessName }}</h3>
                    <p>{{ websiteExamples[currentSlide].tagline }}</p>
                  </div>
                  <div class="preview-features">
                    <div
                      v-for="feature in websiteExamples[currentSlide].features"
                      :key="feature"
                      class="feature-badge"
                    >
                      {{ feature }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="carousel-navigation">
            <button
              @click="nextSlide"
              class="nav-arrow next"
              :disabled="currentSlide === websiteExamples.length - 1"
            >
              →
            </button>
          </div>
        </div>

        <!-- Carousel Navigation -->
        <div class="carousel-nav">
          <button
            v-for="(example, index) in websiteExamples"
            :key="index"
            @click="currentSlide = index"
            class="nav-dot"
            :class="{ active: currentSlide === index }"
          >
            {{ example.icon }}
          </button>
        </div>

        <!-- Call to Action Button -->
        <router-link to="/ai-builder" class="cta-button">
          🔷 Buat Website Anda Sekarang!
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const currentSlide = ref(0);
let slideInterval = null;

const websiteExamples = ref([
  {
    id: 1,
    icon: "🍜",
    businessName: "Warung Gudeg Bu Sari",
    tagline: "Gudeg Autentik Jogja Sejak 2014",
    prompt:
      "Saya punya warung gudeg Bu Sari di Yogyakarta. Jual gudeg autentik, ayam bakar, es teh. Sudah buka 10 tahun, terkenal enak dan murah.",
    features: ["Menu Tradisional", "Delivery Order", "Kontak WhatsApp"],
  },
  {
    id: 2,
    icon: "👗",
    businessName: "Cantik Fashion Store",
    tagline: "Fashion Wanita Trendy & Terjangkau",
    prompt:
      "Toko online baju wanita 'Cantik Shop'. Jual dress, blouse, celana trendy untuk remaja dan dewasa. Harga 50rb-200rb.",
    features: ["Koleksi Terbaru", "Size Chart", "Free Ongkir"],
  },
  {
    id: 3,
    icon: "🏠",
    businessName: "Renovasi Pro",
    tagline: "Jasa Renovasi Rumah Terpercaya",
    prompt:
      "Jasa renovasi rumah 'Renovasi Pro'. Melayani renovasi kamar, dapur, kamar mandi. Tim berpengalaman 5 tahun.",
    features: ["Portfolio Project", "Free Konsultasi", "Garansi 1 Tahun"],
  },
]);

const nextSlide = () => {
  if (currentSlide.value < websiteExamples.value.length - 1) {
    currentSlide.value++;
  }
};

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};

onMounted(() => {
  // Auto slide every 5 seconds
  slideInterval = setInterval(() => {
    if (currentSlide.value === websiteExamples.value.length - 1) {
      currentSlide.value = 0;
    } else {
      currentSlide.value++;
    }
  }, 5000);
});

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
});
</script>

<style scoped>
.home {
  background: linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%);
  min-height: calc(100vh - 120px);
}

/* Carousel Styles */
.carousel-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.example-content {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 40px;
  align-items: center;
  margin-bottom: 40px;
}

.carousel-navigation {
  display: flex;
  align-items: center;
}

.nav-arrow {
  background: #007bff;
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

.nav-arrow:hover:not(:disabled) {
  background: #0056b3;
  transform: scale(1.1);
}

.nav-arrow:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

.main-content-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  width: 100%;
}

.carousel-slide {
  display: flex;
  justify-content: center;
}

.browser-frame {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 350px;
  transition: transform 0.3s ease;
}

.browser-frame:hover {
  transform: translateY(-5px);
}

.browser-header {
  background: #f1f3f4;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.browser-controls {
  display: flex;
  gap: 6px;
}

.browser-controls span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.browser-url {
  background: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #666;
  flex: 1;
}

.website-preview {
  padding: 30px 25px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  min-height: 200px;
}

.preview-header h3 {
  margin: 0 0 8px 0;
  font-size: 1.5rem;
}

.preview-header p {
  margin: 0 0 20px 0;
  opacity: 0.9;
  font-size: 0.9rem;
}

.preview-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.feature-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  backdrop-filter: blur(10px);
}

.prompt-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.prompt-card {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  position: relative;
}

.prompt-card h4 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1.1rem;
}

.prompt-text {
  font-style: italic;
  color: #666;
  line-height: 1.6;
  margin: 0;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  border-left: 4px solid #007bff;
}

.arrow-indicator {
  text-align: center;
  color: #666;
}

.arrow {
  font-size: 2rem;
  margin-bottom: 10px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.carousel-nav {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}

.nav-dot {
  background: rgba(0, 123, 255, 0.2);
  border: 2px solid #007bff;
  color: #007bff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-dot:hover,
.nav-dot.active {
  background: #007bff;
  color: white;
  transform: scale(1.1);
}

/* Call to Action Button */
.cta-button {
  background: white;
  color: #667eea;
  padding: 15px 30px;
  border-radius: 25px;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  display: inline-block;
  margin-top: 30px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
  text-align: center;
}

.cta-button:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

/* Responsive Design */
@media (max-width: 768px) {
  .home {
    padding: 10px;
  }

  div[style*="font-size: 2.5rem"] {
    font-size: 2rem !important;
  }

  div[style*="padding: 40px 20px"] {
    padding: 30px 15px !important;
  }

  div[style*="padding: 60px 20px"] {
    padding: 40px 15px !important;
  }

  div[style*="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))"] {
    grid-template-columns: 1fr !important;
  }

  div[style*="padding: 20px"] {
    padding: 15px !important;
    margin: 20px 10px !important;
  }

  div[style*="padding: 30px"] {
    padding: 20px !important;
    margin: 20px 10px !important;
  }

  .example-content {
    grid-template-columns: auto 1fr auto;
    gap: 20px;
  }

  .main-content-area {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .nav-arrow {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .browser-frame {
    width: 280px;
  }

  .nav-dot {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .prompt-section {
    margin-top: 30px;
  }
}
</style>
