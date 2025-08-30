import {
  businessTypes,
  locationData,
  targetAudiences,
  sentimentAnalysis,
  enhancedFeatures,
  seoKeywords,
  samplePrompts,
} from "../data/dataset.js";

/**
 * Advanced AI Processor untuk Vue.js
 * Menjalankan analisis prompting langsung di client-side
 */
export class VueAIProcessor {
  constructor() {
    this.initializeProcessor();
  }

  initializeProcessor() {
    // Initialize regex patterns untuk entity extraction
    this.patterns = {
      businessName: [
        /(?:nama|bisnis|usaha|toko|warung|perusahaan|brand)\s+(?:saya|kami|adalah)?\s*([A-Za-z\s]+)/i,
        /(?:^|\s)([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:store|shop|cafe|restaurant|warung)/i,
        /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:menyediakan|menjual|melayani)/i,
      ],
      phone: [
        /(?:08\d{8,11}|\+62\d{8,11}|0\d{2,3}-?\d{6,8})/g,
        /(?:telepon|telp|hp|wa|whatsapp|contact)\s*:?\s*(\d{4}-?\d{4}-?\d{4})/gi,
      ],
      email: [/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g],
      pricing: [
        /(?:harga|tarif|biaya|mulai dari)\s*(?:rp\.?\s*)?(\d{1,3}(?:\.\d{3})*)/gi,
        /rp\.?\s*(\d{1,3}(?:\.\d{3})*)/gi,
      ],
      location: [
        /(?:di|lokasi|alamat|tempat)\s+([A-Za-z\s]+(?:jakarta|bandung|surabaya|yogyakarta|medan|semarang|bali))/gi,
      ],
      schedule: [
        /(?:buka|jam|jadwal)\s+(?:dari)?\s*(\d{1,2})\s*(?::|\.)\s*(\d{2})\s*-\s*(\d{1,2})\s*(?::|\.)\s*(\d{2})/gi,
        /(?:buka|jam)\s+(\d{1,2})\s*-\s*(\d{1,2})/gi,
      ],
    };
  }

  /**
   * Main processing function
   */
  async processAdvancedPrompt(prompt, options = {}) {
    try {
      const startTime = Date.now();

      // Step 1: Preprocessing
      const cleanPrompt = this.preprocessPrompt(prompt);

      // Step 2: Multi-dimensional analysis
      const analysis = this.performMultiDimensionalAnalysis(cleanPrompt);

      // Step 3: Entity extraction
      const entities = this.extractAdvancedEntities(cleanPrompt);

      // Step 4: Business intelligence
      const businessIntelligence = this.generateBusinessIntelligence(
        analysis,
        entities
      );

      // Step 5: Generate variations
      const variations = this.generateAdvancedVariations(
        cleanPrompt,
        analysis,
        entities,
        businessIntelligence
      );

      // Step 6: Calculate metrics
      const metrics = this.calculatePerformanceMetrics(
        analysis,
        entities,
        variations
      );

      const processingTime = Date.now() - startTime;

      return {
        status: "success",
        processing_time_ms: processingTime,
        input: {
          original_prompt: prompt,
          cleaned_prompt: cleanPrompt,
          word_count: cleanPrompt.split(" ").length,
        },
        analysis,
        entities,
        business_intelligence: businessIntelligence,
        variations,
        metrics,
        recommendations: this.generateRecommendations(
          analysis,
          entities,
          businessIntelligence
        ),
        metadata: this.generateMetadata(),
      };
    } catch (error) {
      console.error("Error in processAdvancedPrompt:", error);
      throw new Error(`Processing failed: ${error.message}`);
    }
  }

  /**
   * Preprocessing prompt
   */
  preprocessPrompt(prompt) {
    return prompt
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /**
   * Multi-dimensional analysis
   */
  performMultiDimensionalAnalysis(prompt) {
    const tokens = prompt.split(" ").filter((token) => token.length > 0);

    // Business type classification
    const businessTypeAnalysis = this.classifyBusinessType(prompt, tokens);

    // Sentiment analysis
    const sentimentScore = this.calculateSentiment(prompt);

    // Complexity analysis
    const complexityAnalysis = this.analyzeComplexity(prompt, tokens);

    // Geographic analysis
    const geoAnalysis = this.analyzeGeography(prompt);

    // Audience analysis
    const audienceAnalysis = this.analyzeTargetAudience(prompt, tokens);

    return {
      business_type: businessTypeAnalysis,
      sentiment: sentimentScore,
      complexity: complexityAnalysis,
      geography: geoAnalysis,
      audience: audienceAnalysis,
      language_features: this.analyzeLanguageFeatures(prompt),
    };
  }

  /**
   * Business type classification dengan scoring
   */
  classifyBusinessType(prompt, tokens) {
    const scores = {};
    let maxScore = 0;
    let detectedType = "umum";

    Object.keys(businessTypes).forEach((type) => {
      let score = 0;
      const typeData = businessTypes[type];

      // Keyword matching dengan weight
      typeData.keywords.forEach((keyword) => {
        if (prompt.includes(keyword)) {
          score += 2; // Base score

          // Bonus untuk exact token match
          if (tokens.includes(keyword)) {
            score += 1;
          }

          // Bonus untuk subcategory match
          if (typeData.subcategories) {
            Object.keys(typeData.subcategories).forEach((subcat) => {
              if (
                typeData.subcategories[subcat].some((item) =>
                  prompt.includes(item)
                )
              ) {
                score += 3;
              }
            });
          }
        }
      });

      scores[type] = score;

      if (score > maxScore) {
        maxScore = score;
        detectedType = type;
      }
    });

    return {
      detected_type: detectedType,
      confidence: Math.min(maxScore / (tokens.length + 1), 1),
      all_scores: scores,
      subcategory: this.detectSubcategory(prompt, detectedType),
    };
  }

  /**
   * Extract entities dari prompt
   */
  extractAdvancedEntities(prompt) {
    const entities = {
      business_name: this.extractBusinessName(prompt),
      contact_info: this.extractContactInfo(prompt),
      location: this.extractLocation(prompt),
      pricing: this.extractPricing(prompt),
      schedule: this.extractSchedule(prompt),
      products_services: this.extractProductsServices(prompt),
      unique_selling_points: this.extractUSP(prompt),
      target_keywords: this.extractTargetKeywords(prompt),
    };

    return entities;
  }

  /**
   * Extract business name
   */
  extractBusinessName(prompt) {
    for (const pattern of this.patterns.businessName) {
      const match = prompt.match(pattern);
      if (match && match[1]) {
        return {
          name: match[1].trim(),
          confidence: 0.8,
          extraction_method: "regex_pattern",
        };
      }
    }
    return null;
  }

  /**
   * Extract contact information
   */
  extractContactInfo(prompt) {
    const contacts = {
      phone: [],
      email: [],
    };

    // Extract phone numbers
    this.patterns.phone.forEach((pattern) => {
      const matches = prompt.match(pattern);
      if (matches) {
        contacts.phone.push(...matches);
      }
    });

    // Extract emails
    const emailMatches = prompt.match(this.patterns.email[0]);
    if (emailMatches) {
      contacts.email.push(...emailMatches);
    }

    return contacts;
  }

  /**
   * Extract location
   */
  extractLocation(prompt) {
    // Check for Indonesian cities
    const allCities = Object.values(locationData.cities).flat();
    const provinces = locationData.provinces;

    for (const city of allCities) {
      if (prompt.toLowerCase().includes(city.toLowerCase())) {
        return {
          city: city,
          type: "city",
          confidence: 0.9,
        };
      }
    }

    for (const province of provinces) {
      if (prompt.toLowerCase().includes(province.toLowerCase())) {
        return {
          province: province,
          type: "province",
          confidence: 0.8,
        };
      }
    }

    return null;
  }

  /**
   * Calculate sentiment score
   */
  calculateSentiment(prompt) {
    let score = 0;
    let positiveCount = 0;
    let negativeCount = 0;

    sentimentAnalysis.positive_indicators.forEach((word) => {
      if (prompt.includes(word)) {
        score += 1;
        positiveCount++;
      }
    });

    sentimentAnalysis.negative_indicators.forEach((word) => {
      if (prompt.includes(word)) {
        score -= 1;
        negativeCount++;
      }
    });

    const normalizedScore = score / (prompt.split(" ").length + 1);

    let sentiment = "neutral";
    if (normalizedScore > 0.1) sentiment = "positive";
    else if (normalizedScore < -0.1) sentiment = "negative";

    return {
      score: normalizedScore,
      sentiment: sentiment,
      positive_indicators: positiveCount,
      negative_indicators: negativeCount,
    };
  }

  /**
   * Analyze complexity
   */
  analyzeComplexity(prompt, tokens) {
    const wordCount = tokens.length;
    const sentences = prompt.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const avgWordsPerSentence = wordCount / (sentences.length || 1);
    const uniqueWords = [...new Set(tokens)].length;
    const lexicalDiversity = uniqueWords / wordCount;

    let complexityLevel = "simple";
    let complexityScore = 0;

    if (wordCount > 50) complexityScore += 1;
    if (avgWordsPerSentence > 15) complexityScore += 1;
    if (lexicalDiversity > 0.7) complexityScore += 1;
    if (wordCount > 100) complexityScore += 1;

    if (complexityScore >= 3) complexityLevel = "complex";
    else if (complexityScore >= 2) complexityLevel = "medium";

    return {
      level: complexityLevel,
      score: complexityScore,
      word_count: wordCount,
      sentence_count: sentences.length,
      avg_words_per_sentence: avgWordsPerSentence,
      lexical_diversity: lexicalDiversity,
    };
  }

  /**
   * Generate variations
   */
  generateAdvancedVariations(prompt, analysis, entities, businessIntelligence) {
    const variations = [];
    const businessType = analysis.business_type.detected_type;
    const typeData = businessTypes[businessType] || {};

    // Generate 3 different approaches
    const approaches = ["conservative", "balanced", "aggressive"];

    approaches.forEach((approach, index) => {
      const variation = this.generateSingleVariation(
        prompt,
        analysis,
        entities,
        approach,
        typeData,
        index
      );
      variations.push(variation);
    });

    return variations;
  }

  /**
   * Generate single variation
   */
  generateSingleVariation(
    prompt,
    analysis,
    entities,
    approach,
    typeData,
    index
  ) {
    const businessType = analysis.business_type.detected_type;

    // Select template berdasarkan approach
    const templates = typeData.templates || {};
    const templateKeys = Object.keys(templates);
    const selectedTemplate =
      templateKeys[index % templateKeys.length] || "modern";
    const template = templates[selectedTemplate] || {
      colors: { primary: "#3498db", secondary: "#2ecc71", accent: "#e74c3c" },
      layout: ["hero", "about", "services", "contact"],
      fonts: ["Arial", "Helvetica", "sans-serif"],
    };

    // Generate content
    const content = this.generateContentForVariation(
      entities,
      typeData,
      approach
    );

    // Select features berdasarkan approach
    const features = this.selectFeaturesForApproach(approach, businessType);

    return {
      id: `variation_${approach}_${Date.now()}`,
      approach: approach,
      business_type: businessType,
      template: selectedTemplate,
      colors: template.colors,
      layout: template.layout,
      fonts: template.fonts,
      content: content,
      features: features,
      seo_data: this.generateSEOData(entities, businessType),
      performance_config: this.generatePerformanceConfig(approach),
    };
  }

  /**
   * Generate content untuk variation
   */
  generateContentForVariation(entities, typeData, approach) {
    const businessName = entities.business_name?.name || "Bisnis Saya";
    const contentTemplates = typeData.content_templates || {};

    // Select random content dari templates
    const heroTitles = contentTemplates.hero_titles || [
      "Layanan Terbaik untuk Anda",
    ];
    const descriptions = contentTemplates.descriptions || [
      "Kami menyediakan layanan berkualitas tinggi",
    ];

    const randomHeroTitle =
      heroTitles[Math.floor(Math.random() * heroTitles.length)];
    const randomDescription =
      descriptions[Math.floor(Math.random() * descriptions.length)];

    return {
      hero_title: businessName,
      hero_subtitle: randomHeroTitle,
      description: randomDescription,
      cta_text:
        approach === "aggressive"
          ? "Pesan Sekarang!"
          : approach === "balanced"
          ? "Hubungi Kami"
          : "Info Lebih Lanjut",
    };
  }

  /**
   * Select features berdasarkan approach
   */
  selectFeaturesForApproach(approach, businessType) {
    let features = [...enhancedFeatures.basic];

    if (approach === "balanced" || approach === "aggressive") {
      features.push(...enhancedFeatures.intermediate);
    }

    if (approach === "aggressive") {
      features.push(...enhancedFeatures.advanced.slice(0, 3));
    }

    // Add business-specific features
    if (businessType === "makanan-minuman") {
      features.push("online_menu", "delivery_info", "reservation_system");
    } else if (businessType === "fashion") {
      features.push("product_gallery", "size_guide", "lookbook");
    } else if (businessType === "jasa") {
      features.push(
        "service_booking",
        "portfolio_showcase",
        "client_testimonials"
      );
    }

    return [...new Set(features)]; // Remove duplicates
  }

  // Helper methods (simplified implementations)
  detectSubcategory(prompt, type) {
    return null;
  }
  analyzeGeography(prompt) {
    return { country: "Indonesia" };
  }
  analyzeTargetAudience(prompt, tokens) {
    return { primary: "dewasa", confidence: 0.6 };
  }
  analyzeLanguageFeatures(prompt) {
    return { formality: "informal", tone: "friendly" };
  }
  extractPricing(prompt) {
    const matches = prompt.match(this.patterns.pricing[0]);
    return matches ? matches.map((m) => m.replace(/\D/g, "")) : null;
  }
  extractSchedule(prompt) {
    const matches = prompt.match(this.patterns.schedule[0]);
    return matches ? matches[0] : null;
  }
  extractProductsServices(prompt) {
    return [];
  }
  extractUSP(prompt) {
    const usps = [];
    if (prompt.includes("terbaik")) usps.push("Kualitas Terbaik");
    if (prompt.includes("murah") || prompt.includes("terjangkau"))
      usps.push("Harga Terjangkau");
    if (prompt.includes("cepat")) usps.push("Pelayanan Cepat");
    if (prompt.includes("berpengalaman")) usps.push("Berpengalaman");
    return usps;
  }
  extractTargetKeywords(prompt) {
    return prompt.split(" ").filter((w) => w.length > 3);
  }

  generateBusinessIntelligence(analysis, entities) {
    return {
      market_position: "emerging",
      competition_level: "medium",
      digital_readiness:
        analysis.complexity.level === "complex" ? "advanced" : "beginner",
      growth_potential: "high",
      recommended_budget: "low",
    };
  }

  generateSEOData(entities, businessType) {
    const businessName = entities.business_name?.name || "Bisnis Lokal";
    const location =
      entities.location?.city || entities.location?.province || "Indonesia";
    const keywords = seoKeywords.industry_specific[businessType] || [];

    return {
      title: `${businessName} - ${businessType} ${location}`,
      description: `${businessName} menyediakan ${businessType} terbaik di ${location}`,
      keywords: [businessType, location, businessName, ...keywords.slice(0, 3)],
      meta_tags: {
        "og:title": businessName,
        "og:description": `Layanan ${businessType} terpercaya di ${location}`,
      },
    };
  }

  generatePerformanceConfig(approach) {
    return {
      lazy_loading: true,
      image_optimization: true,
      caching: approach === "aggressive",
      minification: approach !== "conservative",
    };
  }

  calculatePerformanceMetrics(analysis, entities, variations) {
    return {
      confidence_score: analysis.business_type.confidence,
      completeness_score:
        Object.values(entities).filter((v) => v !== null).length /
        Object.keys(entities).length,
      variation_diversity: variations.length,
      processing_efficiency: "high",
    };
  }

  generateRecommendations(analysis, entities, businessIntelligence) {
    const recommendations = {
      immediate_actions: ["Setup Google My Business", "Optimize for mobile"],
      content_strategy: [
        "Add customer testimonials",
        "Create engaging hero section",
      ],
      marketing_channels: ["Social media marketing", "Local SEO optimization"],
      design_improvements: [
        "Use consistent branding",
        "Improve call-to-action buttons",
      ],
    };

    if (analysis.business_type.detected_type === "makanan-minuman") {
      recommendations.immediate_actions.push("Add online menu with photos");
      recommendations.marketing_channels.push("Food delivery platforms");
    }

    return recommendations;
  }

  generateMetadata() {
    return {
      processor_version: "1.0.0",
      timestamp: new Date().toISOString(),
      processing_mode: "client_side",
      supported_languages: ["id", "en"],
      confidence_threshold: 0.75,
    };
  }

  /**
   * Get sample prompts
   */
  getSamplePrompts() {
    return samplePrompts;
  }

  /**
   * Get capabilities
   */
  getCapabilities() {
    return {
      supported_business_types: Object.keys(businessTypes),
      supported_locations: locationData.provinces,
      feature_levels: Object.keys(enhancedFeatures),
      max_prompt_length: 5000,
      processing_features: [
        "business_type_classification",
        "sentiment_analysis",
        "entity_extraction",
        "multi_variant_generation",
        "seo_optimization",
      ],
    };
  }
}
