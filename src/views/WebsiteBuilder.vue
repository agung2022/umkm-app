<template>
  <div class="website-builder">
    <div class="builder-container">
      <!-- Progress Bar -->
      <div class="progress-section">
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${currentProgress}%` }"
          ></div>
        </div>
        <p class="progress-text">
          Langkah {{ currentStep }} dari {{ totalSteps }}:
          {{ stepTitles[currentStep - 1] }}
        </p>
      </div>

      <!-- Step Content -->
      <div class="step-content">
        <!-- Step 1: Info Bisnis -->
        <div v-if="currentStep === 1" class="step">
          <h2 class="step-title">📋 Informasi Bisnis Anda</h2>
          <p class="step-description">
            Ceritakan tentang bisnis Anda. Informasi ini akan tampil di website
            nanti.
          </p>

          <div class="form-grid">
            <div class="form-group">
              <label>Nama Usaha/Bisnis *</label>
              <input
                v-model="businessData.businessName"
                type="text"
                placeholder="Contoh: Warung Makan Bu Sari"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>Jenis Bisnis *</label>
              <select v-model="businessData.businessType" class="form-input">
                <option value="">Pilih jenis bisnis</option>
                <option value="makanan-minuman">Makanan & Minuman</option>
                <option value="fashion">Fashion & Pakaian</option>
                <option value="kerajinan">Kerajinan Tangan</option>
                <option value="jasa">Jasa & Layanan</option>
                <option value="elektronik">Elektronik</option>
                <option value="kecantikan">Kecantikan & Kesehatan</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>

            <div class="form-group">
              <label>Nama Pemilik *</label>
              <input
                v-model="businessData.ownerName"
                type="text"
                placeholder="Nama lengkap Anda"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>Nomor WhatsApp *</label>
              <input
                v-model="businessData.phone"
                type="tel"
                placeholder="08xxx"
                class="form-input"
              />
            </div>

            <div class="form-group full-width">
              <label>Email</label>
              <input
                v-model="businessData.email"
                type="email"
                placeholder="email@example.com (opsional)"
                class="form-input"
              />
            </div>

            <div class="form-group full-width">
              <label>Alamat Lengkap</label>
              <textarea
                v-model="businessData.address"
                placeholder="Alamat lengkap usaha Anda"
                class="form-input"
                rows="3"
              ></textarea>
            </div>

            <div class="form-group full-width">
              <label>Deskripsi Bisnis</label>
              <textarea
                v-model="businessData.description"
                placeholder="Ceritakan tentang bisnis Anda, apa yang membuat special..."
                class="form-input"
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Step 2: Produk/Layanan -->
        <div v-if="currentStep === 2" class="step">
          <h2 class="step-title">🛍️ Produk atau Layanan</h2>
          <p class="step-description">
            Tambahkan produk atau layanan yang Anda tawarkan (opsional).
          </p>

          <div class="products-section">
            <div class="add-product-form">
              <div class="form-row">
                <input
                  v-model="newProduct.name"
                  type="text"
                  placeholder="Nama produk/layanan"
                  class="form-input"
                />
                <input
                  v-model="newProduct.price"
                  type="text"
                  placeholder="Harga (contoh: Rp 25.000)"
                  class="form-input"
                />
                <button @click="addProduct" class="btn btn-primary">
                  Tambah
                </button>
              </div>
              <textarea
                v-model="newProduct.description"
                placeholder="Deskripsi produk (opsional)"
                class="form-input"
                rows="2"
              ></textarea>
            </div>

            <div v-if="businessData.products.length > 0" class="products-list">
              <h3>Produk/Layanan yang sudah ditambahkan:</h3>
              <div
                class="product-item"
                v-for="(product, index) in businessData.products"
                :key="index"
              >
                <div class="product-info">
                  <h4>{{ product.name }}</h4>
                  <p class="product-price">{{ product.price }}</p>
                  <p class="product-description">{{ product.description }}</p>
                </div>
                <button
                  @click="removeProduct(index)"
                  class="btn btn-danger btn-small"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Media Sosial -->
        <div v-if="currentStep === 3" class="step">
          <h2 class="step-title">📱 Media Sosial</h2>
          <p class="step-description">
            Hubungkan akun media sosial Anda (opsional).
          </p>

          <div class="form-grid">
            <div class="form-group">
              <label>
                <span class="social-icon">📘</span>
                Facebook
              </label>
              <input
                v-model="businessData.socialMedia.facebook"
                type="text"
                placeholder="Link Facebook atau nama akun"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>
                <span class="social-icon">📸</span>
                Instagram
              </label>
              <input
                v-model="businessData.socialMedia.instagram"
                type="text"
                placeholder="@username Instagram"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>
                <span class="social-icon">💬</span>
                WhatsApp Business
              </label>
              <input
                v-model="businessData.socialMedia.whatsapp"
                type="text"
                placeholder="Nomor WhatsApp untuk bisnis"
                class="form-input"
              />
            </div>
          </div>
        </div>

        <!-- Step 4: Template -->
        <div v-if="currentStep === 4" class="step">
          <h2 class="step-title">🎨 Pilih Template</h2>
          <p class="step-description">
            Pilih desain yang sesuai dengan karakter bisnis Anda.
          </p>

          <div class="templates-grid">
            <div
              v-for="template in templates"
              :key="template.id"
              class="template-card"
              :class="{ active: selectedTemplate === template.id }"
              @click="setTemplate(template.id)"
            >
              <div
                class="template-preview"
                :style="{ background: template.color }"
              >
                <div class="template-demo">
                  <div class="demo-header">
                    {{ businessData.businessName || "Nama Bisnis" }}
                  </div>
                  <div class="demo-content">
                    <div class="demo-section"></div>
                    <div class="demo-section"></div>
                  </div>
                </div>
              </div>
              <div class="template-info">
                <h3>{{ template.name }}</h3>
                <p>{{ template.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 5: Warna -->
        <div v-if="currentStep === 5" class="step">
          <h2 class="step-title">🌈 Pilih Warna</h2>
          <p class="step-description">
            Sesuaikan warna website dengan brand Anda.
          </p>

          <div class="color-schemes">
            <div
              v-for="scheme in colorSchemes"
              :key="scheme.name"
              class="color-scheme"
              :class="{ active: colorScheme.primary === scheme.primary }"
              @click="setColorScheme(scheme)"
            >
              <div class="color-preview">
                <div
                  class="color-primary"
                  :style="{ background: scheme.primary }"
                ></div>
                <div
                  class="color-secondary"
                  :style="{ background: scheme.secondary }"
                ></div>
                <div
                  class="color-accent"
                  :style="{ background: scheme.accent }"
                ></div>
              </div>
              <p>{{ scheme.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="step-navigation">
        <button
          v-if="currentStep > 1"
          @click="previousStep"
          class="btn btn-outline"
        >
          ← Sebelumnya
        </button>

        <div class="spacer"></div>

        <button
          v-if="currentStep < totalSteps"
          @click="nextStep"
          class="btn btn-primary"
          :disabled="!canProceed"
        >
          Selanjutnya →
        </button>

        <button
          v-if="currentStep === totalSteps"
          @click="buildWebsite"
          class="btn btn-success"
          :disabled="isBuilding"
        >
          <span v-if="!isBuilding">🚀 Buat Website Saya!</span>
          <span v-else>⏳ Membuat... {{ buildingProgress }}%</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useWebsiteStore } from "../stores/website";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useWebsiteStore();

// Steps
const currentStep = ref(1);
const totalSteps = 5;
const stepTitles = [
  "Info Bisnis",
  "Produk/Layanan",
  "Media Sosial",
  "Pilih Template",
  "Pilih Warna",
];

// Business data dari store
const {
  businessData,
  selectedTemplate,
  colorScheme,
  isBuilding,
  buildingProgress,
} = store;

// New product form
const newProduct = ref({
  name: "",
  price: "",
  description: "",
});

// Templates
const templates = ref([
  {
    id: "modern",
    name: "Modern",
    description: "Desain clean dan minimalis",
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "classic",
    name: "Klasik",
    description: "Tampilan elegan dan profesional",
    color: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
  },
  {
    id: "warm",
    name: "Hangat",
    description: "Warna hangat dan bersahabat",
    color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  },
  {
    id: "fresh",
    name: "Segar",
    description: "Tampilan fresh dan energik",
    color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
]);

// Color schemes
const colorSchemes = ref([
  {
    name: "Biru Profesional",
    primary: "#3B82F6",
    secondary: "#1E40AF",
    accent: "#F59E0B",
  },
  {
    name: "Hijau Segar",
    primary: "#10B981",
    secondary: "#059669",
    accent: "#F59E0B",
  },
  {
    name: "Ungu Elegan",
    primary: "#8B5CF6",
    secondary: "#7C3AED",
    accent: "#F59E0B",
  },
  {
    name: "Merah Energik",
    primary: "#EF4444",
    secondary: "#DC2626",
    accent: "#F59E0B",
  },
]);

// Computed
const currentProgress = computed(() => {
  return (currentStep.value / totalSteps) * 100;
});

const canProceed = computed(() => {
  if (currentStep.value === 1) {
    return (
      businessData.businessName &&
      businessData.businessType &&
      businessData.ownerName &&
      businessData.phone
    );
  }
  return true;
});

// Methods
function nextStep() {
  if (canProceed.value && currentStep.value < totalSteps) {
    currentStep.value++;
  }
}

function previousStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}

function addProduct() {
  if (newProduct.value.name && newProduct.value.price) {
    store.addProduct({
      name: newProduct.value.name,
      price: newProduct.value.price,
      description: newProduct.value.description,
    });

    // Reset form
    newProduct.value = {
      name: "",
      price: "",
      description: "",
    };
  }
}

function removeProduct(index) {
  store.removeProduct(index);
}

function setTemplate(templateId) {
  store.setTemplate(templateId);
}

function setColorScheme(scheme) {
  store.setColorScheme(scheme);
}

function buildWebsite() {
  store.startBuilding();

  // Redirect to preview after building
  setTimeout(() => {
    router.push("/preview");
  }, 5000);
}

// Watch untuk update store ketika data berubah
watch(
  businessData,
  (newData) => {
    store.updateBusinessData(newData);
  },
  { deep: true }
);
</script>

<style scoped>
.website-builder {
  min-height: calc(100vh - 120px);
  background: #f8fafc;
  padding: 2rem 0;
}

.builder-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Progress Section */
.progress-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #10b981);
  transition: width 0.3s ease;
}

.progress-text {
  text-align: center;
  color: #6b7280;
  font-weight: 500;
}

/* Step Content */
.step-content {
  background: white;
  padding: 3rem 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.step-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.step-description {
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

/* Forms */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.social-icon {
  font-size: 1.2rem;
}

.form-input {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

/* Products */
.products-section {
  space-y: 2rem;
}

.add-product-form {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.products-list h3 {
  margin-bottom: 1rem;
  color: #374151;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.product-info h4 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
}

.product-price {
  font-weight: 600;
  color: #059669;
  margin: 0.25rem 0;
}

.product-description {
  color: #6b7280;
  margin: 0.25rem 0 0 0;
}

/* Templates */
.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.template-card {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.template-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.template-card.active {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.template-preview {
  height: 120px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.template-demo {
  background: white;
  border-radius: 4px;
  padding: 0.5rem;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
}

.demo-header {
  font-size: 0.7rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.25rem;
  color: #1f2937;
}

.demo-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.demo-section {
  background: #f3f4f6;
  border-radius: 2px;
  flex: 1;
}

.template-info {
  padding: 1rem;
}

.template-info h3 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.template-info p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

/* Color Schemes */
.color-schemes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
}

.color-scheme {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.color-scheme:hover {
  transform: translateY(-2px);
}

.color-scheme.active {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.color-preview {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.color-primary,
.color-secondary,
.color-accent {
  width: 30px;
  height: 30px;
  border-radius: 50%;
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

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #059669;
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

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Navigation */
.step-navigation {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.spacer {
  flex: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    flex-direction: column;
  }

  .templates-grid {
    grid-template-columns: 1fr;
  }

  .color-schemes {
    grid-template-columns: repeat(2, 1fr);
  }

  .step-navigation {
    flex-direction: column;
  }

  .spacer {
    display: none;
  }
}
</style>
