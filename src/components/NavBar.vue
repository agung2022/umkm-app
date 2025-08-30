<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <router-link to="/" class="nav-logo">
        <img
          src="/img/logo.png"
          alt="SisMatis Digitalisasi UMKM Logo"
          class="logo-image"
          @error="handleImageError"
        />
        <span class="logo-text">SisMatis Digitalisasi UMKM</span>
      </router-link>

      <!-- Mobile Menu Toggle -->
      <button
        class="mobile-toggle"
        @click="toggleMobileMenu"
        :class="{ active: isMobileMenuOpen }"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Navigation Links -->
      <div class="nav-menu" :class="{ active: isMobileMenuOpen }">
        <router-link to="/" class="nav-link" @click="closeMobileMenu">
          Beranda
        </router-link>

        <router-link to="/bantuan" class="nav-link" @click="closeMobileMenu">
          Bantuan
        </router-link>

        <router-link to="/tentang" class="nav-link" @click="closeMobileMenu">
          Tentang
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Mobile menu state
const isMobileMenuOpen = ref(false);

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

// Close mobile menu
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = "";
};

// Handle image error
const handleImageError = (event) => {
  event.target.style.display = "none";
};

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  if (
    !event.target.closest(".nav-menu") &&
    !event.target.closest(".mobile-toggle")
  ) {
    closeMobileMenu();
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.body.style.overflow = "";
});
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #4f94cd 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  width: 100%;
  position: relative;
}

/* Logo */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.nav-logo:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.logo-image {
  width: clamp(32px, 5vw, 40px);
  height: clamp(32px, 5vw, 40px);
  border-radius: 8px;
  filter: drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.3));
}

.logo-text {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #fff, #f0f8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.logo-text {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  width: 30px;
  height: 30px;
  position: relative;
}

.mobile-toggle span {
  display: block;
  height: 3px;
  width: 100%;
  background: white;
  margin: 3px 0;
  transition: 0.3s;
  border-radius: 2px;
}

.mobile-toggle.active span:nth-child(1) {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.mobile-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-toggle.active span:nth-child(3) {
  transform: rotate(45deg) translate(-5px, -6px);
}

/* Navigation Menu */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.9rem;
  min-width: max-content;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.nav-link.router-link-active {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.2)
  );
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 107, 107, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 107, 107, 0);
  }
}

/* Large Desktop */
@media (min-width: 1200px) {
  .nav-container {
    padding: 0 2rem;
  }

  .nav-logo {
    font-size: 1.3rem;
  }

  .nav-menu {
    gap: 2rem;
  }

  .nav-link {
    padding: 0.625rem 1.25rem;
    font-size: 1rem;
  }
}

/* Tablet & Small Desktop */
@media (max-width: 1199px) and (min-width: 769px) {
  .nav-container {
    padding: 0 0.5rem;
  }

  .logo-text {
    font-size: 0.95rem;
  }

  .nav-menu {
    gap: 0.5rem;
  }

  .nav-link {
    padding: 0.4rem 0.7rem;
    font-size: 0.8rem;
  }
}

/* Additional breakpoint for very tight screens */
@media (max-width: 900px) and (min-width: 769px) {
  .nav-menu {
    gap: 0.25rem;
  }

  .nav-link {
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
  }

  .logo-text {
    font-size: 0.9rem;
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }

  .mobile-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #4f94cd 100%);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 1rem;
    gap: 2rem;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    overflow-y: auto;
    margin: 0;
  }

  .nav-menu.active {
    transform: translateX(0);
  }

  .nav-link {
    width: 100%;
    text-align: center;
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 15px;
    max-width: 280px;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 0.75rem;
    height: 60px;
  }

  .logo-text {
    font-size: 0.875rem;
  }

  .logo-image {
    width: 32px;
    height: 32px;
  }

  .nav-menu {
    padding: 1.5rem 0.75rem;
    gap: 1.5rem;
  }

  .nav-link {
    max-width: 250px;
    padding: 0.875rem 1.25rem;
  }
}

/* Very small screens */
@media (max-width: 360px) {
  .logo-text {
    font-size: 0.75rem;
  }

  .nav-container {
    padding: 0 0.5rem;
  }
}
</style>
