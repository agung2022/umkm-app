<template>
  <div class="preview-page">
    <div class="preview-header">
      <div class="container">
        <div class="header-content">
          <div class="preview-info">
            <h1>🎉 Website Anda Sudah Siap!</h1>
            <p>
              Berikut adalah preview website UMKM Anda. Website ini siap untuk
              dibagikan kepada pelanggan.
            </p>
          </div>
          <div class="preview-actions">
            <button @click="editWebsite" class="btn btn-outline">
              ✏️ Edit Website
            </button>
            <button @click="shareWebsite" class="btn btn-primary">
              📱 Bagikan Website
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="preview-container">
      <div class="device-frame">
        <div class="device-header">
          <div class="device-controls">
            <span></span><span></span><span></span>
          </div>
          <div class="device-url">{{ websiteUrl }}</div>
        </div>

        <!-- Website Preview -->
        <div class="website-preview" :style="websiteStyles">
          <!-- Header -->
          <header class="site-header">
            <div class="site-container">
              <h1 class="site-title">
                {{ businessData.businessName || "Nama Bisnis Anda" }}
              </h1>
              <p class="site-tagline">{{ businessTypeLabel }}</p>
            </div>
          </header>

          <!-- Hero Section -->
          <section class="hero-section">
            <div class="site-container">
              <div class="hero-content">
                <h2>
                  Selamat Datang di
                  {{ businessData.businessName || "Bisnis Anda" }}
                </h2>
                <p>
                  {{
                    businessData.description ||
                    "Deskripsi bisnis Anda akan tampil di sini"
                  }}
                </p>
                <div class="contact-buttons">
                  <a
                    v-if="businessData.phone"
                    :href="`https://wa.me/${businessData.phone.replace(
                      /[^0-9]/g,
                      ''
                    )}`"
                    class="contact-btn whatsapp"
                    target="_blank"
                  >
                    💬 Chat WhatsApp
                  </a>
                  <a
                    v-if="businessData.phone"
                    :href="`tel:${businessData.phone}`"
                    class="contact-btn phone"
                  >
                    📞 Telepon
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!-- Products Section -->
          <section
            v-if="businessData.products && businessData.products.length > 0"
            class="products-section"
          >
            <div class="site-container">
              <h2>Produk & Layanan</h2>
              <div class="products-grid">
                <div
                  v-for="product in businessData.products"
                  :key="product.name"
                  class="product-card"
                >
                  <h3>{{ product.name }}</h3>
                  <p class="product-price">{{ product.price }}</p>
                  <p class="product-description">{{ product.description }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Contact Section -->
          <section class="contact-section">
            <div class="site-container">
              <h2>Hubungi Kami</h2>
              <div class="contact-grid">
                <div class="contact-info">
                  <h3>{{ businessData.ownerName || "Pemilik" }}</h3>
                  <div class="contact-details">
                    <p v-if="businessData.phone">
                      <strong>📱 WhatsApp:</strong> {{ businessData.phone }}
                    </p>
                    <p v-if="businessData.email">
                      <strong>📧 Email:</strong> {{ businessData.email }}
                    </p>
                    <p v-if="businessData.address">
                      <strong>📍 Alamat:</strong> {{ businessData.address }}
                    </p>
                  </div>
                </div>

                <!-- Social Media -->
                <div v-if="hasSocialMedia" class="social-media">
                  <h3>Ikuti Kami</h3>
                  <div class="social-links">
                    <a
                      v-if="businessData.socialMedia.facebook"
                      :href="
                        formatSocialLink(
                          'facebook',
                          businessData.socialMedia.facebook
                        )
                      "
                      target="_blank"
                      class="social-link facebook"
                    >
                      📘 Facebook
                    </a>
                    <a
                      v-if="businessData.socialMedia.instagram"
                      :href="
                        formatSocialLink(
                          'instagram',
                          businessData.socialMedia.instagram
                        )
                      "
                      target="_blank"
                      class="social-link instagram"
                    >
                      📸 Instagram
                    </a>
                    <a
                      v-if="businessData.socialMedia.whatsapp"
                      :href="
                        formatSocialLink(
                          'whatsapp',
                          businessData.socialMedia.whatsapp
                        )
                      "
                      target="_blank"
                      class="social-link whatsapp"
                    >
                      💬 WhatsApp Business
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Footer -->
          <footer class="site-footer">
            <div class="site-container">
              <p>
                &copy; 2025 {{ businessData.businessName || "Bisnis Anda" }}.
                Dibuat dengan ❤️ menggunakan UMKM Website Builder.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>

    <!-- Share Modal -->
    <div v-if="showShareModal" class="modal-overlay" @click="closeShareModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>📱 Bagikan Website Anda</h2>
          <button @click="closeShareModal" class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <div class="share-options">
            <div class="share-url">
              <label>Link Website:</label>
              <div class="url-input">
                <input
                  :value="websiteUrl"
                  readonly
                  class="form-input"
                  ref="urlInput"
                />
                <button @click="copyUrl" class="btn btn-primary btn-small">
                  {{ copied ? "✅ Copied!" : "📋 Copy" }}
                </button>
              </div>
            </div>

            <div class="share-social">
              <h3>Bagikan ke:</h3>
              <div class="share-buttons">
                <a
                  :href="shareLinks.whatsapp"
                  target="_blank"
                  class="share-btn whatsapp"
                >
                  💬 WhatsApp
                </a>
                <a
                  :href="shareLinks.facebook"
                  target="_blank"
                  class="share-btn facebook"
                >
                  📘 Facebook
                </a>
                <a
                  :href="shareLinks.telegram"
                  target="_blank"
                  class="share-btn telegram"
                >
                  ✈️ Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useWebsiteStore } from "../stores/website";

const router = useRouter();
const store = useWebsiteStore();

// Reactive data
const showShareModal = ref(false);
const copied = ref(false);
const urlInput = ref(null);

// Store data
const { businessData, selectedTemplate, colorScheme } = store;

// Computed properties
const businessTypeLabel = computed(() => {
  const types = {
    "makanan-minuman": "Makanan & Minuman",
    fashion: "Fashion & Pakaian",
    kerajinan: "Kerajinan Tangan",
    jasa: "Jasa & Layanan",
    elektronik: "Elektronik",
    kecantikan: "Kecantikan & Kesehatan",
    lainnya: "Lainnya",
  };
  return types[businessData.businessType] || "Bisnis";
});

const websiteUrl = computed(() => {
  const businessName = businessData.businessName || "bisnis-anda";
  const slug = businessName.toLowerCase().replace(/[^a-z0-9]/g, "-");
  return `https://${slug}.umkmwebsite.com`;
});

const websiteStyles = computed(() => {
  return {
    "--primary-color": colorScheme.primary,
    "--secondary-color": colorScheme.secondary,
    "--accent-color": colorScheme.accent,
  };
});

const hasSocialMedia = computed(() => {
  return (
    businessData.socialMedia.facebook ||
    businessData.socialMedia.instagram ||
    businessData.socialMedia.whatsapp
  );
});

const shareLinks = computed(() => {
  const url = encodeURIComponent(websiteUrl.value);
  const text = encodeURIComponent(
    `Kunjungi website ${businessData.businessName || "bisnis kami"}!`
  );

  return {
    whatsapp: `https://wa.me/?text=${text}%20${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    telegram: `https://t.me/share/url?url=${url}&text=${text}`,
  };
});

// Methods
function editWebsite() {
  router.push("/builder");
}

function shareWebsite() {
  showShareModal.value = true;
}

function closeShareModal() {
  showShareModal.value = false;
  copied.value = false;
}

function copyUrl() {
  if (urlInput.value) {
    urlInput.value.select();
    document.execCommand("copy");
    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
}

function formatSocialLink(platform, value) {
  switch (platform) {
    case "facebook":
      return value.startsWith("http") ? value : `https://facebook.com/${value}`;
    case "instagram":
      return value.startsWith("http")
        ? value
        : `https://instagram.com/${value.replace("@", "")}`;
    case "whatsapp":
      return `https://wa.me/${value.replace(/[^0-9]/g, "")}`;
    default:
      return value;
  }
}
</script>

<style scoped>
.preview-page {
  min-height: calc(100vh - 120px);
  background: #f8fafc;
}

.preview-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.preview-info h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.preview-info p {
  color: #6b7280;
  font-size: 1.1rem;
}

.preview-actions {
  display: flex;
  gap: 1rem;
}

.preview-container {
  padding: 3rem 2rem;
  display: flex;
  justify-content: center;
}

.device-frame {
  background: #1f2937;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  width: 100%;
}

.device-header {
  background: #374151;
  padding: 0.75rem 1rem;
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.device-controls {
  display: flex;
  gap: 0.5rem;
}

.device-controls span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #6b7280;
}

.device-controls span:first-child {
  background: #ef4444;
}

.device-controls span:nth-child(2) {
  background: #f59e0b;
}

.device-controls span:last-child {
  background: #10b981;
}

.device-url {
  background: #4b5563;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  flex: 1;
}

.website-preview {
  background: white;
  border-radius: 0 0 6px 6px;
  overflow: hidden;
  max-height: 600px;
  overflow-y: auto;
}

/* Website Styles */
.site-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1rem;
}

.site-header {
  background: var(--primary-color, #3b82f6);
  color: white;
  padding: 2rem 0;
  text-align: center;
}

.site-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
}

.site-tagline {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0;
}

.hero-section {
  padding: 3rem 0;
  text-align: center;
}

.hero-content h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1f2937;
}

.hero-content p {
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.contact-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.contact-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease;
}

.contact-btn:hover {
  transform: translateY(-2px);
}

.contact-btn.whatsapp {
  background: #25d366;
  color: white;
}

.contact-btn.phone {
  background: var(--accent-color, #f59e0b);
  color: white;
}

.products-section,
.contact-section {
  padding: 3rem 0;
  border-top: 1px solid #e5e7eb;
}

.products-section h2,
.contact-section h2 {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #1f2937;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
}

.product-card h3 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color, #3b82f6);
  margin-bottom: 0.5rem;
}

.product-description {
  color: #6b7280;
  font-size: 0.9rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.contact-info h3,
.social-media h3 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1f2937;
}

.contact-details p {
  margin-bottom: 0.5rem;
  color: #6b7280;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.social-link {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: transform 0.2s ease;
  display: inline-block;
}

.social-link:hover {
  transform: translateX(4px);
}

.social-link.facebook {
  background: #1877f2;
  color: white;
}

.social-link.instagram {
  background: #e4405f;
  color: white;
}

.social-link.whatsapp {
  background: #25d366;
  color: white;
}

.site-footer {
  background: #f8fafc;
  padding: 2rem 0;
  text-align: center;
  color: #6b7280;
  font-size: 0.9rem;
  border-top: 1px solid #e5e7eb;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  color: #1f2937;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
}

.modal-body {
  padding: 2rem;
}

.share-url {
  margin-bottom: 2rem;
}

.share-url label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
}

.url-input {
  display: flex;
  gap: 0.5rem;
}

.form-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.9rem;
}

.share-social h3 {
  margin-bottom: 1rem;
  color: #1f2937;
}

.share-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.share-btn {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  color: white;
  transition: transform 0.2s ease;
}

.share-btn:hover {
  transform: translateY(-2px);
}

.share-btn.whatsapp {
  background: #25d366;
}

.share-btn.facebook {
  background: #1877f2;
}

.share-btn.telegram {
  background: #0088cc;
}

/* Buttons */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-outline {
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
}

.btn-outline:hover {
  background: #3b82f6;
  color: white;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .preview-actions {
    width: 100%;
    justify-content: center;
  }

  .contact-buttons {
    flex-direction: column;
    align-items: center;
  }

  .share-buttons {
    justify-content: center;
  }

  .device-frame {
    margin: 0;
    border-radius: 0;
  }
}
</style>
