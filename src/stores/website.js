import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useWebsiteStore = defineStore("website", () => {
  // Data bisnis UMKM
  const businessData = ref({
    businessName: "",
    businessType: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    description: "",
    products: [],
    socialMedia: {
      facebook: "",
      instagram: "",
      whatsapp: "",
    },
  });

  // Template yang dipilih
  const selectedTemplate = ref("modern");

  // Warna tema
  const colorScheme = ref({
    primary: "#3B82F6",
    secondary: "#10B981",
    accent: "#F59E0B",
  });

  // Status proses pembuatan website
  const buildingProgress = ref(0);
  const isBuilding = ref(false);

  // Computed properties
  const isBusinessDataComplete = computed(() => {
    return (
      businessData.value.businessName &&
      businessData.value.businessType &&
      businessData.value.ownerName &&
      businessData.value.phone
    );
  });

  // Actions
  function updateBusinessData(data) {
    businessData.value = { ...businessData.value, ...data };
  }

  function setTemplate(template) {
    selectedTemplate.value = template;
  }

  function setColorScheme(colors) {
    colorScheme.value = { ...colorScheme.value, ...colors };
  }

  function addProduct(product) {
    businessData.value.products.push(product);
  }

  function removeProduct(index) {
    businessData.value.products.splice(index, 1);
  }

  function startBuilding() {
    isBuilding.value = true;
    buildingProgress.value = 0;

    // Simulasi proses building
    const interval = setInterval(() => {
      buildingProgress.value += 10;
      if (buildingProgress.value >= 100) {
        clearInterval(interval);
        isBuilding.value = false;
      }
    }, 500);
  }

  return {
    businessData,
    selectedTemplate,
    colorScheme,
    buildingProgress,
    isBuilding,
    isBusinessDataComplete,
    updateBusinessData,
    setTemplate,
    setColorScheme,
    addProduct,
    removeProduct,
    startBuilding,
  };
});
