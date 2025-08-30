<template>
  <div class="tentang">
    <!-- Hero Section -->
    <div class="hero-section">
      <h1 class="hero-title">
        <img src="/img/logo.png" alt="Logo" class="title-logo" />
        Tentang SisMatis Digitalisasi UMKM
      </h1>
      <p class="hero-subtitle">
        Platform revolusioner yang dibuat khusus untuk membantu UMKM Indonesia
        berkembang di era digital
      </p>
    </div>

    <!-- Mission Section -->
    <div class="mission-section">
      <div class="mission-content">
        <h2>🎯 Misi Kami</h2>
        <p class="mission-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>

        <div class="mission-points">
          <div class="mission-point">
            <div class="point-icon">🚀</div>
            <div class="point-content">
              <h3>Democratizing Digital Presence</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas.
              </p>
            </div>
          </div>

          <div class="mission-point">
            <div class="point-icon">🤝</div>
            <div class="point-content">
              <h3>Empowering Local Businesses</h3>
              <p>
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae; Donec velit neque, auctor sit amet
                aliquam vel.
              </p>
            </div>
          </div>

          <div class="mission-point">
            <div class="point-icon">⚡</div>
            <div class="point-content">
              <h3>Instant Website Creation</h3>
              <p>
                Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
                Cras ultricies ligula sed magna dictum porta. Pellentesque
                habitant morbi tristique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="features-section">
      <h2>✨ Mengapa Memilih SisMatis Digitalisasi UMKM?</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🤖</div>
          <h3>AI-Powered Technology</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📱</div>
          <h3>Mobile-First Design</h3>
          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Donec velit neque, auctor sit amet aliquam
            vel, aliquet a lorem.
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">💰</div>
          <h3>Completely Free</h3>
          <p>
            Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras
            ultricies ligula sed magna dictum porta. Pellentesque habitant morbi
            tristique senectus.
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🇮🇩</div>
          <h3>Made for Indonesia</h3>
          <p>
            Proin eget tortor risus. Vestibulum ante ipsum primis in faucibus
            orci luctus et ultrices posuere cubilia curae; Donec velit neque,
            auctor sit amet.
          </p>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="team-section">
      <h2>Pengembang</h2>
      <div class="team-grid">
        <div class="team-member">
          <div class="member-avatar">
            <img
              src="/img/profile.jpg"
              alt="Muhammad Agung Faizal"
              class="avatar-image"
            />
          </div>
          <h3>Muhammad Agung Faizal</h3>
          <p class="member-role">Fullstack Developer</p>
          <p class="member-bio">
            Pengembang Pemula yang Mempunyai Rasa Penasaran dan Rasa Ingin Tau
            Yang Sangat Tinggi, Jangan Takut Mencoba dan Raih Tujuan
          </p>
          <div class="member-social">
            <a href="#" class="social-link">LinkedIn</a>
            <a href="#" class="social-link">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No reactive data needed for this static page
</script>

<style scoped>
.tentang {
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

.hero-section {
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: #333;
  padding: 80px 40px;
  border-radius: 20px;
  margin-bottom: 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.title-logo {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  filter: drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.3));
}

.hero-subtitle {
  font-size: 1.4rem;
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.mission-section,
.features-section,
.team-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 50px 40px;
  margin-bottom: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.mission-section h2,
.features-section h2,
.team-section h2 {
  color: #333;
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
}

.mission-text {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #666;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px;
}

.mission-points {
  display: grid;
  gap: 30px;
  margin-top: 40px;
}

.mission-point {
  display: flex;
  align-items: flex-start;
  gap: 25px;
  background: #f8f9fa;
  padding: 30px;
  border-radius: 15px;
}

.point-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.point-content h3 {
  color: #333;
  margin-bottom: 10px;
  font-size: 1.3rem;
}

.point-content p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.feature-card {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 40px 30px;
  border-radius: 20px;
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.feature-card h3 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.4rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.team-member {
  background: #f8f9fa;
  padding: 40px 30px;
  border-radius: 20px;
  text-align: center;
  transition: transform 0.3s ease;
}

.team-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.member-avatar {
  margin-bottom: 20px;
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin: 0 auto;
}

.avatar-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
  display: block;
  border: 4px solid #667eea;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.team-member h3 {
  color: #333;
  margin-bottom: 5px;
  font-size: 1.3rem;
}

.member-role {
  color: #667eea;
  font-weight: bold;
  margin-bottom: 15px;
}

.member-bio {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.member-social {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-link {
  color: #667eea;
  text-decoration: none;
  padding: 8px 16px;
  border: 2px solid #667eea;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #667eea;
  color: white;
}

.contact-cta {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 40px;
  border-radius: 20px;
  text-align: center;
}

.contact-cta h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.contact-cta p {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 15px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
}

.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .tentang {
    padding: 15px;
  }

  .hero-section {
    padding: 50px 25px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .mission-section,
  .features-section,
  .team-section {
    padding: 30px 25px;
  }

  .mission-point {
    flex-direction: column;
    text-align: center;
  }

  .features-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .contact-cta {
    padding: 40px 25px;
  }
}
</style>
