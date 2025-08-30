<template>
  <div class="ai-builder">
    <!-- Mobile Overlay -->
    <div
      v-if="showSidebar"
      class="sidebar-overlay"
      @click="showSidebar = false"
    ></div>

    <!-- Sidebar for Project History -->
    <div class="sidebar" :class="{ 'sidebar-collapsed': !showSidebar }">
      <div class="sidebar-header">
        <h3 v-show="showSidebar">Riwayat</h3>
        <button @click="toggleSidebar" class="btn-toggle-sidebar">
          {{ showSidebar ? "◀" : "▶" }}
        </button>
      </div>

      <div v-show="showSidebar" class="sidebar-content">
        <div v-if="projectHistory.length > 0" class="history-list">
          <div
            v-for="(project, index) in projectHistory"
            :key="index"
            class="history-item"
            :class="{ active: currentHistoryProject?.id === project.id }"
            @click="viewProject(project)"
          >
            <div
              class="history-item-icon"
              :style="{ backgroundColor: project.color }"
            >
              {{ project.icon }}
            </div>
            <div class="history-item-content">
              <h4>{{ project.title }}</h4>
              <p>{{ formatDate(project.createdAt) }}</p>
            </div>
            <button @click.stop="deleteProject(index)" class="btn-delete-item">
              🗑️
            </button>
          </div>
        </div>

        <div v-else class="empty-history">
          <p>Belum ada riwayat website</p>
        </div>

        <div class="sidebar-footer">
          <button
            v-if="projectHistory.length > 0"
            @click="clearHistory"
            class="btn-clear-all"
          >
            🗑️ Hapus Semua
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content" :class="{ 'sidebar-collapsed': !showSidebar }">
      <!-- Header -->
      <div class="ai-header">
        <h1 class="ai-title">Digitalisasikan UMKM Anda Dengan AI</h1>
        <p class="ai-subtitle">
          Ceritakan tentang bisnis Anda, AI akan buatkan website dalam 3 variasi
          berbeda!
        </p>
      </div>

      <!-- Input Section -->
      <div v-if="!isGenerating && !isGenerated" class="input-section">
        <div class="custom-input">
          <h3>✍️ Ceritakan Bisnis Anda</h3>

          <div class="input-container">
            <textarea
              v-model="userPrompt"
              placeholder="Contoh: Saya punya warung makan Bu Sari di Yogyakarta. Jual gudeg, ayam bakar, es teh. Sudah buka 10 tahun. Terkenal enak dan murah. WA: 08123456789"
              rows="4"
              class="prompt-input"
            ></textarea>

            <!-- Transparent divider line -->
            <div class="input-divider"></div>

            <!-- Add button inside input area -->
            <div class="input-actions">
              <div
                class="add-button-container"
                :class="{ 'dropdown-open': showDropdown }"
              >
                <button
                  @click="toggleDropdown"
                  class="add-button"
                  type="button"
                >
                  <span class="add-icon">+</span>
                </button>

                <div v-if="showDropdown" class="dropdown-menu">
                  <button @click="openImageUpload" class="dropdown-item">
                    <span class="dropdown-icon">📷</span>
                    <span>Upload Gambar</span>
                  </button>
                </div>
              </div>

              <!-- Hidden file input -->
              <input
                ref="fileInput"
                type="file"
                multiple
                accept="image/*"
                @change="handleFileSelect"
                style="display: none"
              />
            </div>
          </div>

          <!-- Display uploaded images -->
          <div v-if="uploadedImages.length > 0" class="uploaded-images-display">
            <div class="uploaded-images-grid">
              <div
                v-for="(image, index) in uploadedImages"
                :key="index"
                class="image-preview"
              >
                <img :src="image.preview" :alt="image.name" />
                <button @click="removeImage(index)" class="btn-remove">
                  ×
                </button>
                <div class="image-name">{{ image.name }}</div>
              </div>
            </div>
          </div>

          <button
            @click="generateWebsite"
            class="btn-generate"
            :disabled="!userPrompt.trim()"
          >
            🚀 Generate 3 Variasi Website
          </button>
        </div>
      </div>

      <!-- Generation Progress -->
      <div v-if="isGenerating" class="generation-section">
        <div class="generation-progress">
          <h2>🎯 Sedang membuat website Anda...</h2>
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: generationProgress + '%' }"
            ></div>
          </div>
          <p class="progress-text">
            {{ currentStep }} ({{ generationProgress }}%)
          </p>

          <div class="generation-preview">
            <div class="mini-screens">
              <div
                class="mini-screen"
                :class="{ active: generationProgress > 25 }"
              >
                <div class="screen-content">🎨 Desain 1</div>
              </div>
              <div
                class="mini-screen"
                :class="{ active: generationProgress > 50 }"
              >
                <div class="screen-content">🎨 Desain 2</div>
              </div>
              <div
                class="mini-screen"
                :class="{ active: generationProgress > 75 }"
              >
                <div class="screen-content">🎨 Desain 3</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Generated Results with 3 Variations -->
      <div
        v-if="isGenerated && generatedVariations.length > 0"
        class="results-section"
      >
        <div class="results-header">
          <h2 v-if="showHistoryProject">
            {{ currentHistoryProject?.title }} -
            {{ formatDate(currentHistoryProject?.createdAt) }}
          </h2>
          <h2 v-else>🎉 Website Anda sudah jadi! Pilih yang paling cocok:</h2>
        </div>

        <div class="variations-grid">
          <div
            v-for="(variation, index) in generatedVariations"
            :key="index"
            class="variation-card"
            :class="{ selected: selectedVariation === index }"
          >
            <div class="variation-header">
              <h3>{{ variation.name }}</h3>
              <span class="variation-badge">{{ variation.style }}</span>
            </div>

            <div class="variation-preview">
              <div
                class="preview-screen"
                :style="{ background: variation.colors.primary }"
              >
                <div
                  class="preview-header"
                  :style="{ background: variation.colors.secondary }"
                >
                  <div class="preview-logo">
                    {{ variation.businessData.businessName }}
                  </div>
                </div>
                <div class="preview-content">
                  <div
                    class="preview-section"
                    style="
                      background: white;
                      margin: 8px;
                      padding: 6px;
                      border-radius: 4px;
                    "
                  >
                    <h4 style="font-size: 10px; margin: 0">
                      {{ variation.businessData.tagline }}
                    </h4>
                    <div class="preview-features">
                      <div
                        v-for="feature in variation.features.slice(0, 3)"
                        :key="feature"
                        class="feature-dot"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="variation-details">
              <div class="detail-item">
                <strong>Warna:</strong> {{ variation.colors.name }}
              </div>
              <div class="detail-item">
                <strong>Fitur:</strong> {{ variation.features.length }} komponen
              </div>
              <div class="detail-item">
                <strong>Cocok untuk:</strong> {{ variation.targetAudience }}
              </div>
              <div class="detail-item" v-if="variation.businessData.location">
                <strong>Lokasi:</strong> {{ variation.businessData.location }}
              </div>
              <div
                class="detail-item"
                v-if="variation.businessData.specialties"
              >
                <strong>Keunggulan:</strong>
                {{ variation.businessData.specialties.join(", ") }}
              </div>
            </div>

            <div class="card-actions">
              <button @click="showPreview(index)" class="btn-preview">
                👀 Lihat Preview
              </button>
              <button
                @click="selectVariation(index)"
                class="btn-select"
                :class="{ selected: selectedVariation === index }"
              >
                {{
                  selectedVariation === index
                    ? "✅ Dipilih"
                    : "👆 Pilih Desain Ini"
                }}
              </button>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button
            @click="publishWebsite"
            class="btn-success"
            :disabled="selectedVariation === null"
          >
            🚀 Publish Website
          </button>
        </div>
      </div>

      <!-- Preview Modal -->
      <div v-if="showPreviewModal" class="modal-overlay" @click="closePreview">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>🌟 Preview Website - {{ previewVariation?.name }}</h2>
            <button @click="closePreview" class="modal-close">×</button>
          </div>

          <div class="modal-body">
            <div class="website-mockup">
              <!-- Browser Frame -->
              <div class="browser-frame">
                <div class="browser-header">
                  <div class="browser-controls">
                    <span class="control-dot red"></span>
                    <span class="control-dot yellow"></span>
                    <span class="control-dot green"></span>
                  </div>
                  <div class="address-bar">
                    <span
                      >🔒
                      {{
                        previewVariation?.businessData.businessName
                          .toLowerCase()
                          .replace(/\s+/g, "")
                      }}.com</span
                    >
                  </div>
                </div>

                <!-- Website Content -->
                <div
                  class="website-content"
                  :style="{ background: previewVariation?.colors.primary }"
                >
                  <!-- Header -->
                  <div
                    class="site-header"
                    :style="{ background: previewVariation?.colors.secondary }"
                  >
                    <div class="header-content">
                      <h1 class="site-title">
                        {{ previewVariation?.businessData.businessName }}
                      </h1>
                      <nav class="site-nav">
                        <a href="#">Beranda</a>
                        <a href="#">Tentang</a>
                        <a href="#">Produk</a>
                        <a href="#">Kontak</a>
                      </nav>
                    </div>
                  </div>

                  <!-- Hero Section -->
                  <div class="hero-section">
                    <div class="hero-content">
                      <h2 class="hero-title">
                        {{ previewVariation?.businessData.tagline }}
                      </h2>
                      <p class="hero-subtitle">
                        {{ getHeroSubtitle(previewVariation) }}
                      </p>
                      <div class="hero-buttons">
                        <button class="btn-cta primary">Hubungi Kami</button>
                        <button class="btn-cta secondary">Lihat Produk</button>
                      </div>
                    </div>
                  </div>

                  <!-- Features Section -->
                  <div class="features-section">
                    <h3>✨ Keunggulan Kami</h3>
                    <div class="features-grid">
                      <div
                        v-for="feature in previewVariation?.features.slice(
                          0,
                          4
                        )"
                        :key="feature"
                        class="feature-item"
                      >
                        <div class="feature-icon">🌟</div>
                        <h4>{{ feature }}</h4>
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                      </div>
                    </div>
                  </div>

                  <!-- Contact Section -->
                  <div class="contact-section">
                    <h3>📞 Hubungi Kami</h3>
                    <div class="contact-info">
                      <div
                        class="contact-item"
                        v-if="previewVariation?.businessData.contact.phone"
                      >
                        <span class="contact-icon">📱</span>
                        <span>{{
                          previewVariation.businessData.contact.phone
                        }}</span>
                      </div>
                      <div
                        class="contact-item"
                        v-if="previewVariation?.businessData.location"
                      >
                        <span class="contact-icon">📍</span>
                        <span>{{
                          previewVariation.businessData.location
                        }}</span>
                      </div>
                      <div class="contact-item">
                        <span class="contact-icon">⏰</span>
                        <span>Buka 08:00 - 22:00</span>
                      </div>
                    </div>
                  </div>

                  <!-- Footer -->
                  <div class="site-footer">
                    <p>
                      &copy; 2025
                      {{ previewVariation?.businessData.businessName }}. Semua
                      hak dilindungi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button @click="closePreview" class="btn-modal secondary">
              Tutup
            </button>
            <button @click="selectFromPreview" class="btn-modal primary">
              Pilih Desain Ini
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Close main-content -->
  </div>
  <!-- Close ai-builder -->
</template>

<script setup>
import { ref, onMounted } from "vue";

// Mock AI Integration untuk development
const mockAI = {
  processPrompt: async (prompt) => {
    // Simulasi processing dengan delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      html: `
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Website UMKM</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                .container { max-width: 1200px; margin: 0 auto; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 10px; }
                .content { padding: 40px 20px; }
                .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 40px 0; }
                .feature { padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Website UMKM Anda</h1>
                    <p>Berdasarkan prompt: "${prompt}"</p>
                </div>
                <div class="content">
                    <h2>Tentang Bisnis Kami</h2>
                    <p>Ini adalah website yang dibuat berdasarkan deskripsi bisnis Anda.</p>
                    <div class="features">
                        <div class="feature">
                            <h3>Produk Unggulan</h3>
                            <p>Deskripsi produk unggulan bisnis Anda.</p>
                        </div>
                        <div class="feature">
                            <h3>Layanan Terbaik</h3>
                            <p>Layanan terbaik yang kami tawarkan untuk pelanggan.</p>
                        </div>
                        <div class="feature">
                            <h3>Kontak Kami</h3>
                            <p>Hubungi kami untuk informasi lebih lanjut.</p>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
      `,
      analysis: "Website berhasil dibuat berdasarkan prompt Anda.",
    };
  },
};

// State
const userPrompt = ref("");
const isGenerating = ref(false);
const generationProgress = ref(0);
const currentStep = ref("");
const isGenerated = ref(false);
const generatedVariations = ref([]);
const selectedVariation = ref(null);
const showPreviewModal = ref(false);
const previewVariation = ref(null);
const previewIndex = ref(null);

// Image Upload State
const uploadedImages = ref([]);
const fileInput = ref(null);
const showDropdown = ref(false);

// Project History State
const projectHistory = ref([]);
const showHistoryProject = ref(false);
const currentHistoryProject = ref(null);

// Sidebar State
const showSidebar = ref(true);

// Project History Functions
const saveProjectHistory = () => {
  try {
    localStorage.setItem(
      "umkm_project_history",
      JSON.stringify(projectHistory.value)
    );
  } catch (error) {
    console.error("Error saving project history:", error);
  }
};

const loadProjectHistory = () => {
  try {
    const saved = localStorage.getItem("umkm_project_history");
    if (saved) {
      projectHistory.value = JSON.parse(saved);
    }
  } catch (error) {
    console.error("Error loading project history:", error);
    projectHistory.value = [];
  }
};

// Function untuk generate website dengan Mock AI
const generateWebsite = async () => {
  if (!userPrompt.value.trim()) {
    alert("Silakan masukkan deskripsi bisnis Anda!");
    return;
  }

  try {
    isGenerating.value = true;
    generationProgress.value = 0;
    currentStep.value = "Memproses prompt Anda...";

    // Simulasi progress
    const progressSteps = [
      "Menganalisis deskripsi bisnis...",
      "Membuat struktur website...",
      "Mendesain tampilan...",
      "Menambahkan konten...",
      "Finalisasi website...",
    ];

    for (let i = 0; i < progressSteps.length; i++) {
      currentStep.value = progressSteps[i];
      generationProgress.value = ((i + 1) / progressSteps.length) * 100;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    const result = await mockAI.processPrompt(userPrompt.value);

    // Process result
    if (result) {
      const variations = [];

      // Create main variation
      variations.push({
        id: 1,
        title: "Website Utama",
        businessName: "Bisnis Anda",
        tagline: "Solusi terbaik untuk kebutuhan Anda",
        heroHeadline: "Selamat Datang di Website Kami",
        heroDescription:
          "Kami menyediakan produk dan layanan terbaik untuk Anda",
        primaryColor: "#3498db",
        secondaryColor: "#2ecc71",
        accentColor: "#e74c3c",
        colors: {
          primary: "#3498db",
          secondary: "#2ecc71",
          accent: "#e74c3c",
          name: "Biru Modern",
        },
        businessData: {
          businessName: "Bisnis Anda",
          tagline: "Solusi terbaik untuk kebutuhan Anda",
          location: "Indonesia",
          specialties: ["Produk Berkualitas", "Layanan Terbaik"],
          contact: {
            phone: "08123456789",
            email: "info@bisnis.com",
          },
        },
        layout: "modern",
        features: ["Produk Unggulan", "Layanan Terbaik", "Kontak Kami"],
        aboutSection: "Tentang bisnis kami yang memberikan solusi terbaik",
        contactInfo: { phone: "08123456789", email: "info@bisnis.com" },
        seoKeywords: ["bisnis", "produk", "layanan"],
        html: result.html,
        analysis: result.analysis,
      });

      // Buat variasi tambahan
      const colors = [
        {
          primary: "#8e44ad",
          secondary: "#f39c12",
          accent: "#e67e22",
          name: "Ungu Elegan",
        },
        {
          primary: "#e74c3c",
          secondary: "#3498db",
          accent: "#2ecc71",
          name: "Merah Dinamis",
        },
      ];

      colors.forEach((colorScheme, index) => {
        variations.push({
          id: index + 2,
          title: `Variasi ${index + 2}`,
          businessName: "Bisnis Anda",
          tagline: "Solusi terbaik untuk kebutuhan Anda",
          heroHeadline: "Selamat Datang di Website Kami",
          heroDescription:
            "Kami menyediakan produk dan layanan terbaik untuk Anda",
          primaryColor: colorScheme.primary,
          secondaryColor: colorScheme.secondary,
          accentColor: colorScheme.accent,
          colors: {
            primary: colorScheme.primary,
            secondary: colorScheme.secondary,
            accent: colorScheme.accent,
            name: colorScheme.name,
          },
          businessData: {
            businessName: "Bisnis Anda",
            tagline: "Solusi terbaik untuk kebutuhan Anda",
            location: "Indonesia",
            specialties: ["Produk Berkualitas", "Layanan Terbaik"],
            contact: {
              phone: "08123456789",
              email: "info@bisnis.com",
            },
          },
          layout: index % 2 === 0 ? "elegant" : "creative",
          features: ["Produk Unggulan", "Layanan Terbaik", "Kontak Kami"],
          aboutSection: "Tentang bisnis kami yang memberikan solusi terbaik",
          contactInfo: { phone: "08123456789", email: "info@bisnis.com" },
          seoKeywords: ["bisnis", "produk", "layanan"],
          html: result.html
            .replace("#3498db", colorScheme.primary)
            .replace("#2ecc71", colorScheme.secondary),
          analysis: result.analysis,
        });
      });

      generatedVariations.value = variations;
      isGenerated.value = true;

      // Save to history
      const newProject = {
        id: Date.now(),
        title: variations[0].businessName,
        prompt: userPrompt.value,
        variations: variations,
        createdAt: new Date(),
        icon: "🏢",
        color: variations[0].primaryColor,
        analysis: result.analysis,
      };

      projectHistory.value.unshift(newProject);
      saveProjectHistory();

      // Reset progress
      generationProgress.value = 100;
      currentStep.value = "✅ Website berhasil dibuat!";

      setTimeout(() => {
        generationProgress.value = 0;
        currentStep.value = "";
      }, 2000);
    } else {
      throw new Error("Tidak ada hasil dari AI");
    }
  } catch (error) {
    console.error("Generation error:", error);
    alert(`Error: ${error.message}`);
  } finally {
    isGenerating.value = false;
  }
};

// Function untuk reset builder dan buat website baru
const resetBuilder = () => {
  isGenerated.value = false;
  isGenerating.value = false;
  generatedVariations.value = [];
  selectedVariation.value = null;
  userPrompt.value = "";
  generationProgress.value = 0;
  currentStep.value = "";
  showPreviewModal.value = false;
  previewVariation.value = null;
  previewIndex.value = null;
  showHistoryProject.value = false;
  currentHistoryProject.value = null;
  uploadedImages.value = [];
  showDropdown.value = false;
};

// Image Upload Functions
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const openImageUpload = () => {
  showDropdown.value = false;
  fileInput.value?.click();
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  processFiles(files);
};

const handleFileDrop = (event) => {
  const files = Array.from(event.dataTransfer.files);
  processFiles(files);
};

const processFiles = (files) => {
  const imageFiles = files.filter((file) => file.type.startsWith("image/"));

  imageFiles.forEach((file) => {
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert(`File ${file.name} terlalu besar. Maksimal 5MB per file.`);
      return;
    }

    // Check if we already have 5 images
    if (uploadedImages.value.length >= 5) {
      alert("Maksimal 5 gambar yang dapat diupload.");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImages.value.push({
        file: file,
        name: file.name,
        preview: e.target.result,
        size: formatFileSize(file.size),
      });
    };
    reader.readAsDataURL(file);
  });
};

const removeImage = (index) => {
  uploadedImages.value.splice(index, 1);
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Project History Functions
const saveToHistory = (prompt, variations) => {
  const businessName = extractBusinessName(prompt);
  const businessType = detectBusinessType(prompt);

  const project = {
    id: Date.now(),
    title: businessName || "Website Baru",
    description:
      prompt.length > 100 ? prompt.substring(0, 100) + "..." : prompt,
    variations: variations,
    createdAt: new Date(),
    icon: getBusinessIcon(businessType),
    color: getBusinessColor(businessType),
  };

  projectHistory.value.unshift(project);

  // Simpan ke localStorage
  localStorage.setItem(
    "umkm_project_history",
    JSON.stringify(projectHistory.value)
  );
};

const clearHistory = () => {
  if (confirm("Yakin ingin menghapus semua riwayat website?")) {
    projectHistory.value = [];
    localStorage.removeItem("umkm_project_history");
  }
};

const deleteProject = (index) => {
  if (confirm("Yakin ingin menghapus project ini?")) {
    projectHistory.value.splice(index, 1);
    localStorage.setItem(
      "umkm_project_history",
      JSON.stringify(projectHistory.value)
    );
  }
};

const viewProject = (project) => {
  generatedVariations.value = project.variations;
  isGenerated.value = true;
  showHistoryProject.value = true;
  currentHistoryProject.value = project;
};

// Sidebar Functions
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

const newProject = () => {
  resetBuilder();
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getBusinessIcon = (type) => {
  const icons = {
    food: "🍜",
    fashion: "👗",
    service: "🔧",
    education: "🎓",
    automotive: "🚗",
    coffee: "☕",
    default: "🏪",
  };
  return icons[type] || icons.default;
};

const getBusinessColor = (type) => {
  const colors = {
    food: "#ff6b6b",
    fashion: "#ff9ff3",
    service: "#4ecdc4",
    education: "#45b7d1",
    automotive: "#96ceb4",
    coffee: "#feca57",
    default: "#6c5ce7",
  };
  return colors[type] || colors.default;
};

// Initialize history on mount
onMounted(() => {
  loadProjectHistory();

  // Close dropdown when clicking outside
  document.addEventListener("click", (event) => {
    const addButtonContainer = document.querySelector(".add-button-container");
    if (addButtonContainer && !addButtonContainer.contains(event.target)) {
      showDropdown.value = false;
    }
  });
});

// Function untuk generate 3 variasi berbeda
const generateThreeVariations = (prompt) => {
  const businessName = extractBusinessName(prompt);
  const businessType = detectBusinessType(prompt);
  const location = extractLocation(prompt);
  const contact = extractContact(prompt);
  const specialties = extractSpecialties(prompt);

  // Generate tagline berdasarkan prompting user
  const generateTagline = (style, businessType) => {
    if (businessType === "food") {
      return style === "Professional"
        ? "Cita Rasa Autentik Terpercaya"
        : style === "Trendy"
        ? "Kelezatan yang Tak Terlupakan"
        : "Masakan Rumahan Penuh Cinta";
    } else if (businessType === "fashion") {
      return style === "Professional"
        ? "Fashion Berkualitas Premium"
        : style === "Trendy"
        ? "Style Statement untuk Anda"
        : "Fashion yang Memahami Anda";
    } else if (businessType === "cafe") {
      return style === "Professional"
        ? "Kopi Berkualitas Tinggi"
        : style === "Trendy"
        ? "Coffee Experience yang Berbeda"
        : "Tempat Hangout Favorit Anda";
    } else if (businessType === "service") {
      return style === "Professional"
        ? "Layanan Profesional Terpercaya"
        : style === "Trendy"
        ? "Solusi Inovatif untuk Anda"
        : "Melayani dengan Sepenuh Hati";
    }
    return style === "Professional"
      ? "Solusi Terpercaya Untuk Anda"
      : style === "Trendy"
      ? "Inovasi Terdepan Untuk Masa Depan"
      : "Melayani Dengan Sepenuh Hati";
  };

  // Generate fitur berdasarkan jenis bisnis dan prompting
  const generateFeatures = (businessType, prompt) => {
    const baseFeatures = ["Kontak WhatsApp", "Lokasi Maps", "Jam Operasional"];

    if (businessType === "food") {
      baseFeatures.push("Menu Digital", "Delivery Online");
      if (prompt.includes("delivery") || prompt.includes("antar"))
        baseFeatures.push("Gratis Ongkir");
      if (prompt.includes("halal")) baseFeatures.push("Sertifikat Halal");
    } else if (businessType === "fashion") {
      baseFeatures.push("Katalog Produk", "Size Chart");
      if (prompt.includes("online")) baseFeatures.push("Belanja Online");
      if (prompt.includes("ongkir")) baseFeatures.push("Free Ongkir");
    } else if (businessType === "cafe") {
      baseFeatures.push("Menu Kopi", "Wifi Gratis");
      if (prompt.includes("wifi")) baseFeatures.push("Coworking Space");
      if (prompt.includes("musik") || prompt.includes("live"))
        baseFeatures.push("Live Music");
    } else if (businessType === "service") {
      baseFeatures.push("Portfolio", "Konsultasi Gratis");
      if (prompt.includes("garansi")) baseFeatures.push("Garansi Layanan");
      if (prompt.includes("24 jam")) baseFeatures.push("Layanan 24 Jam");
    }

    return baseFeatures;
  };

  return [
    {
      name: "Desain Klasik",
      style: "Professional",
      colors: {
        primary: "#2c3e50",
        secondary: "#3498db",
        name: "Biru Profesional",
      },
      businessData: {
        businessName: businessName,
        tagline: generateTagline("Professional", businessType),
        location: location,
        contact: contact,
        specialties: specialties,
      },
      features: generateFeatures(businessType, prompt),
      targetAudience: "Profesional & Corporate",
    },
    {
      name: "Desain Modern",
      style: "Trendy",
      colors: {
        primary: "#e74c3c",
        secondary: "#f39c12",
        name: "Merah Energik",
      },
      businessData: {
        businessName: businessName,
        tagline: generateTagline("Trendy", businessType),
        location: location,
        contact: contact,
        specialties: specialties,
      },
      features: generateFeatures(businessType, prompt),
      targetAudience: "Milenial & Gen Z",
    },
    {
      name: "Desain Hangat",
      style: "Friendly",
      colors: {
        primary: "#27ae60",
        secondary: "#f1c40f",
        name: "Hijau Ramah",
      },
      businessData: {
        businessName: businessName,
        tagline: generateTagline("Friendly", businessType),
        location: location,
        contact: contact,
        specialties: specialties,
      },
      features: generateFeatures(businessType, prompt),
      targetAudience: "Keluarga & Komunitas",
    },
  ];
};

// Helper functions
const extractBusinessName = (prompt) => {
  // Cari nama bisnis dari berbagai pattern
  const patterns = [
    /(?:warung|toko|kedai|jasa|rental|bimbel)\s+['""]?([^'""\s,\.]{2,}(?:\s+[^'""\s,\.]{2,})*)['""]?/i,
    /['""]([^'""]+ (?:shop|store|cafe|coffee|transport|indah|pintar|cantik|nusantara|sari))['""]?/i,
    /nama(?:nya)?[\s:]+ ['""]?([^'"",\.]{3,})['""]?/i,
    /\b([A-Z][a-z]+(?: [A-Z][a-z]+)*)\b/g,
  ];

  for (let pattern of patterns) {
    const matches = prompt.match(pattern);
    if (matches && matches[1]) {
      return matches[1].trim();
    }
  }

  // Fallback: ambil kata pertama yang dikapitalisasi
  const words = prompt.split(" ");
  for (let word of words) {
    if (word.length > 2 && word[0] === word[0].toUpperCase()) {
      return word;
    }
  }

  return "Bisnis Anda";
};

const extractLocation = (prompt) => {
  const locationPattern =
    /(?:di|lokasi|area|melayani)\s+([A-Za-z\s]+)(?:,|\.|$)/i;
  const match = prompt.match(locationPattern);
  return match ? match[1].trim() : "Indonesia";
};

const extractContact = (prompt) => {
  const phonePattern = /(08\d{8,11})/;
  const waPattern = /WA:?\s*(08\d{8,11})/i;
  const igPattern = /@(\w+)/;

  const phone = prompt.match(waPattern || phonePattern);
  const ig = prompt.match(igPattern);

  return {
    phone: phone ? phone[1] : null,
    instagram: ig ? ig[1] : null,
  };
};

const extractSpecialties = (prompt) => {
  const specialties = [];

  // Food related
  if (prompt.includes("gudeg")) specialties.push("Gudeg Autentik");
  if (prompt.includes("ayam bakar")) specialties.push("Ayam Bakar");
  if (prompt.includes("kopi")) specialties.push("Kopi Artisan");
  if (prompt.includes("robusta") || prompt.includes("arabika"))
    specialties.push("Kopi Premium");

  // Fashion related
  if (prompt.includes("dress")) specialties.push("Dress Collection");
  if (prompt.includes("blouse")) specialties.push("Blouse Trendy");
  if (prompt.includes("trendy")) specialties.push("Fashion Trendy");

  // Service related
  if (prompt.includes("renovasi")) specialties.push("Jasa Renovasi");
  if (prompt.includes("matematika")) specialties.push("Les Matematika");
  if (prompt.includes("rental")) specialties.push("Rental Kendaraan");

  return specialties.length > 0 ? specialties : ["Layanan Berkualitas"];
};

const detectBusinessType = (prompt) => {
  if (
    prompt.includes("warung") ||
    prompt.includes("makan") ||
    prompt.includes("gudeg") ||
    prompt.includes("ayam") ||
    prompt.includes("nasi")
  )
    return "food";
  if (
    prompt.includes("fashion") ||
    prompt.includes("baju") ||
    prompt.includes("dress") ||
    prompt.includes("celana") ||
    prompt.includes("blouse")
  )
    return "fashion";
  if (
    prompt.includes("kopi") ||
    prompt.includes("cafe") ||
    prompt.includes("kedai") ||
    prompt.includes("coffee")
  )
    return "cafe";
  if (
    prompt.includes("renovasi") ||
    prompt.includes("jasa") ||
    prompt.includes("les") ||
    prompt.includes("bimbel") ||
    prompt.includes("rental")
  )
    return "service";
  return "general";
};

// Action functions
const selectVariation = (index) => {
  selectedVariation.value = index;
};

// Preview Modal Functions
const showPreview = (index) => {
  previewVariation.value = generatedVariations.value[index];
  previewIndex.value = index;
  showPreviewModal.value = true;
};

const closePreview = () => {
  showPreviewModal.value = false;
  previewVariation.value = null;
  previewIndex.value = null;
};

const selectFromPreview = () => {
  if (previewIndex.value !== null) {
    selectedVariation.value = previewIndex.value;
  }
  closePreview();
};

const getHeroSubtitle = (variation) => {
  if (!variation) return "";

  const businessType = detectBusinessType(userPrompt.value);
  if (businessType === "food") {
    return `Nikmati ${
      variation.businessData.specialties?.join(", ") || "makanan lezat"
    } terbaik di ${
      variation.businessData.location || "kota kami"
    }. Pengalaman kuliner yang tak terlupakan menanti Anda.`;
  } else if (businessType === "fashion") {
    return `Temukan koleksi fashion terbaru dan terbaik. ${
      variation.businessData.specialties?.join(", ") || "Style trendy"
    } untuk penampilan sempurna Anda.`;
  } else if (businessType === "cafe") {
    return `Rasakan pengalaman ngopi terbaik dengan ${
      variation.businessData.specialties?.join(", ") || "kopi premium"
    }. Tempat yang sempurna untuk bersantai dan berkarya.`;
  } else if (businessType === "service") {
    return `Layanan profesional ${
      variation.businessData.specialties?.join(", ") || "berkualitas tinggi"
    } untuk kebutuhan Anda. Kepuasan pelanggan adalah prioritas utama kami.`;
  }

  return `Solusi terbaik untuk kebutuhan Anda. ${
    variation.businessData.specialties?.join(", ") || "Layanan berkualitas"
  } dengan standar profesional tinggi.`;
};

const publishWebsite = () => {
  if (selectedVariation.value !== null) {
    const selected = generatedVariations.value[selectedVariation.value];
    const websiteData = {
      ...selected,
      prompt: userPrompt.value,
      generatedAt: new Date().toISOString(),
    };

    // Simulasi proses publish
    alert(
      `🎉 Website "${selected.businessData.businessName}" berhasil dipublish!\n\nData website:\n- Nama: ${selected.businessData.businessName}\n- Style: ${selected.style}\n- Tagline: ${selected.businessData.tagline}\n- Fitur: ${selected.features.length} komponen\n\nLink website akan dikirim ke WhatsApp Anda dalam beberapa menit.`
    );

    // Here you would integrate with actual publishing service
  }
};
</script>

<style scoped>
.ai-builder {
  display: flex;
  min-height: calc(100vh - 120px);
  background: linear-gradient(
    135deg,
    #1e3c72 0%,
    #2a5298 30%,
    #4f94cd 70%,
    #87ceeb 100%
  );
  position: relative;
}

/* Overlay for mobile when sidebar is open */
.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Sidebar Styles */
.sidebar {
  width: 300px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar.sidebar-collapsed {
  width: 50px;
  min-width: 50px;
}

.sidebar-header {
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  min-height: 60px;
}

.sidebar.sidebar-collapsed .sidebar-header {
  justify-content: center;
  padding: 15px 10px;
}

.sidebar-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.1rem;
  white-space: nowrap;
  overflow: hidden;
}

.btn-toggle-sidebar {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
  min-width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-toggle-sidebar:hover {
  background: rgba(0, 0, 0, 0.1);
}

.sidebar-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.history-list {
  flex: 1;
  overflow-y: auto;
}

.history-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.history-item:hover {
  background: rgba(255, 255, 255, 0.5);
}

.history-item.active {
  background: rgba(30, 60, 114, 0.1);
  border-color: #1e3c72;
}

.history-item-icon {
  width: 35px;
  height: 35px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 1.2rem;
}

.history-item-content {
  flex: 1;
  min-width: 0;
}

.history-item-content h4 {
  margin: 0 0 4px 0;
  font-size: 0.9rem;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-item-content p {
  margin: 0;
  font-size: 0.8rem;
  color: #666;
}

.btn-delete-item {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.btn-delete-item:hover {
  background: rgba(220, 53, 69, 0.1);
  opacity: 1;
}

.empty-history {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 40px 20px;
}

.sidebar-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px 0 0 0;
}

.btn-clear-all {
  width: 100%;
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.btn-clear-all:hover {
  background: #c82333;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  transition: all 0.3s ease;
}

.main-content.sidebar-collapsed {
  margin-left: 0;
}

.ai-header {
  text-align: center;
  color: white;
  margin-bottom: 40px;
}

.ai-title {
  font-size: 3rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.ai-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

/* Input Section */
.input-section {
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.custom-input {
  max-width: 800px;
  margin: 40px auto 0;
}

.custom-input h3 {
  color: black;
  margin-bottom: 15px;
  text-align: center;
}

.input-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border: 2px solid #ddd;
  border-radius: 12px;
  background: white;
  overflow: visible;
  position: relative;
  transition: border-color 0.3s ease;
}

.input-container:focus-within {
  border-color: #667eea;
}

.prompt-input {
  width: 100%;
  padding: 15px;
  border: none;
  font-size: 1rem;
  font-family: inherit;
  resize: none;
  background: transparent;
  box-sizing: border-box;
  outline: none;
}

.input-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 0 15px;
}

/* Gemini-style Add Button */
.input-actions {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  position: relative;
}

.add-button-container {
  position: relative;
  display: inline-block;
}

.add-button {
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #dadce0;
  background: #f8f9fa;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: none;
}

.add-button:hover {
  background: #e8eaed;
  border-color: #5f6368;
}

.add-icon {
  font-size: 16px;
  color: #5f6368;
  font-weight: 300;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  border: 1px solid #dadce0;
  min-width: 160px;
  z-index: 9999;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #3c4043;
  transition: background-color 0.2s ease;
  border-radius: 12px;
}

.dropdown-item:hover {
  background: #f8f9fa;
}

.dropdown-item:first-child {
  border-radius: 12px 12px 0 0;
}

.dropdown-item:last-child {
  border-radius: 0 0 12px 12px;
}

.dropdown-icon {
  font-size: 16px;
}

/* Uploaded Images Display */
.uploaded-images-display {
  margin: 20px 0;
}

.uploaded-images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.image-preview {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
  border: 1px solid #dadce0;
}

.image-preview img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  display: block;
}

.image-name {
  padding: 8px;
  font-size: 12px;
  color: #5f6368;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-remove {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.btn-remove:hover {
  background: rgba(0, 0, 0, 0.8);
}

.btn-generate {
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
  margin: 20px auto 0;
}

.btn-generate:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-generate:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Generation Section */
.generation-section {
  background: white;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.generation-progress h2 {
  color: #333;
  margin-bottom: 20px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin: 20px 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.5s ease;
}

.progress-text {
  color: #666;
  font-weight: bold;
  margin-bottom: 20px;
}

.mini-screens {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.mini-screen {
  width: 80px;
  height: 60px;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 2px solid #ddd;
}

.mini-screen.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-color: #667eea;
  color: white;
  transform: scale(1.1);
}

.screen-content {
  font-size: 0.8rem;
  font-weight: bold;
}

/* Results Section */
.results-section {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
}

.results-section h2 {
  color: #333;
  margin: 0;
}

.btn-new-website {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.btn-new-website:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}

.variations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.variation-card {
  border: 3px solid #e9ecef;
  border-radius: 15px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.variation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.variation-card.selected {
  border-color: #667eea;
  background: #f0f3ff;
}

.variation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.variation-header h3 {
  color: #333;
  margin: 0;
}

.variation-badge {
  background: #667eea;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

.variation-preview {
  margin: 15px 0;
}

.preview-screen {
  width: 100%;
  height: 150px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.preview-header {
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.preview-logo {
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
}

.preview-content {
  padding: 8px;
  height: calc(100% - 30px);
}

.preview-features {
  display: flex;
  gap: 4px;
  margin-top: 5px;
}

.feature-dot {
  width: 8px;
  height: 8px;
  background: #667eea;
  border-radius: 50%;
}

.variation-details {
  margin: 15px 0;
}

.detail-item {
  margin: 8px 0;
  font-size: 0.9rem;
  color: #666;
}

.btn-select {
  width: 100%;
  padding: 12px;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-select:hover {
  background: #667eea;
  color: white;
}

.btn-select.selected {
  background: #667eea;
  color: white;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.btn-secondary,
.btn-primary,
.btn-success {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-secondary:hover,
.btn-primary:hover,
.btn-success:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.btn-primary:disabled,
.btn-success:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Card Actions */
.card-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-preview {
  width: 100%;
  padding: 10px;
  border: 2px solid #6c757d;
  background: white;
  color: #6c757d;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.btn-preview:hover {
  background: #6c757d;
  color: white;
  transform: translateY(-1px);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-50px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
  border-bottom: 2px solid #f0f0f0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.modal-body {
  padding: 0;
  max-height: 600px;
  overflow-y: auto;
}

.website-mockup {
  padding: 30px;
  background: #f8f9fa;
}

/* Browser Frame */
.browser-frame {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-height: 500px;
  border: 1px solid #ddd;
}

.browser-header {
  background: #f0f0f0;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid #ddd;
}

.browser-controls {
  display: flex;
  gap: 8px;
}

.control-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.control-dot.red {
  background: #ff5f57;
}
.control-dot.yellow {
  background: #ffbd2e;
}
.control-dot.green {
  background: #28ca42;
}

.address-bar {
  background: white;
  padding: 6px 12px;
  border-radius: 6px;
  flex: 1;
  font-size: 0.9rem;
  color: #666;
  border: 1px solid #ddd;
}

/* Website Content */
.website-content {
  height: 450px;
  overflow-y: auto;
  font-family: "Arial", sans-serif;
}

.site-header {
  color: white;
  padding: 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
}

.site-title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: bold;
}

.site-nav {
  display: flex;
  gap: 25px;
}

.site-nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s ease;
}

.site-nav a:hover {
  opacity: 0.8;
}

.hero-section {
  background: rgba(255, 255, 255, 0.95);
  padding: 60px 20px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.btn-cta {
  padding: 15px 30px;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cta.primary {
  background: #667eea;
  color: white;
}

.btn-cta.secondary {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.features-section {
  padding: 60px 20px;
  background: white;
}

.features-section h3 {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 40px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

.feature-item {
  text-align: center;
  padding: 30px 20px;
  background: #f8f9fa;
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.feature-item h4 {
  color: #333;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.feature-item p {
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.contact-section {
  padding: 50px 20px;
  background: #f8f9fa;
}

.contact-section h3 {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
}

.contact-info {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.contact-icon {
  font-size: 1.2rem;
}

.site-footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 30px 20px;
}

.site-footer p {
  margin: 0;
  opacity: 0.8;
}

.modal-footer {
  padding: 25px 30px;
  border-top: 2px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  background: #f8f9fa;
}

.btn-modal {
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn-modal.primary {
  background: #667eea;
  color: white;
}

.btn-modal.secondary {
  background: #6c757d;
  color: white;
}

.btn-modal:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 768px) {
  .ai-title {
    font-size: 2rem;
  }

  .examples-grid {
    grid-template-columns: 1fr;
  }

  .variations-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }

  .uploaded-images-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 8px;
  }

  .image-preview img {
    height: 60px;
  }

  .dropdown-menu {
    min-width: 140px;
  }

  .results-header {
    flex-direction: column;
    text-align: center;
  }

  .btn-new-website {
    width: 100%;
    margin-top: 15px;
  }

  .mini-screens {
    gap: 10px;
  }

  .mini-screen {
    width: 60px;
    height: 45px;
  }

  .prompt-input {
    max-width: 100%;
    margin: 0 0 20px 0;
  }

  .custom-input {
    max-width: 100%;
  }

  .input-section {
    padding: 20px;
  }

  /* Modal Responsive */
  .modal-content {
    width: 95%;
    max-height: 95vh;
  }

  .modal-header {
    padding: 20px;
  }

  .modal-header h2 {
    font-size: 1.2rem;
  }

  .website-mockup {
    padding: 15px;
  }

  .browser-frame {
    max-height: 400px;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .contact-info {
    flex-direction: column;
    gap: 15px;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn-cta {
    width: 100%;
    max-width: 250px;
  }

  .modal-footer {
    padding: 20px;
    flex-direction: column;
  }

  .btn-modal {
    width: 100%;
  }

  .user-welcome h2 {
    font-size: 1.4rem;
  }

  .input-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-autofill {
    font-size: 0.8rem;
    padding: 6px 12px;
  }

  .ai-title {
    font-size: 2.5rem;
  }

  /* Mobile Sidebar Responsiveness */
  .sidebar-overlay {
    display: block !important;
  }

  .sidebar {
    position: fixed;
    left: 0;
    top: 70px;
    height: calc(100vh - 70px);
    z-index: 1000;
    transform: translateX(-100%);
    width: 280px !important;
  }

  .sidebar:not(.sidebar-collapsed) {
    transform: translateX(0);
  }

  .sidebar.sidebar-collapsed {
    transform: translateX(-100%);
  }

  .main-content {
    margin-left: 0;
    width: 100%;
  }

  .ai-builder {
    flex-direction: column;
  }
}
</style>
