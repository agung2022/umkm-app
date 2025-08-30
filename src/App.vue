<template>
  <div id="app">
    <!-- Navigation -->
    <NavBar />

    <!-- Main Content -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <p>
          &copy; 2025 SisMatis Digitalisasi UMKM. Dibuat untuk membantu UMKM
          Indonesia.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
}

.main-content {
  flex: 1;
  min-height: calc(100vh - 120px);
  margin: 0;
  padding: 0;
  width: 100%;
}

.footer {
  background: #1e3c72;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: auto;
}
</style>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
}

.main-content {
  flex: 1;
  min-height: calc(100vh - 120px);
  margin: 0;
  padding: 0;
  width: 100%;
}

.footer {
  background: #1e3c72;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: auto;
}
</style>

<style>
#app {
  padding: 20px;
}
</style>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
}

.main-content {
  flex: 1;
  min-height: calc(100vh - 120px);
  margin: 0;
  padding: 0;
  width: 100%;
}

.main-content.no-navbar {
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

.footer {
  background: #f8f9fa;
  padding: 1rem 0;
  border-top: 1px solid #e9ecef;
  margin: 0;
  width: 100%;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  color: #6c757d;
}
</style>
