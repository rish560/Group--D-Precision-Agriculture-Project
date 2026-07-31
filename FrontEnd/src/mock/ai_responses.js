export const diseaseResponses = [
  {
    crop: "Rice",
    disease: "Rice Blast",
    severity: "Medium",
    confidence: 87,
    symptoms: "Necrotic lesions on leaves, neck rot in advanced cases",
    treatment: "Apply tricyclazole or appropriate fungicide; improve drainage",
    prevention:
      "Use resistant varieties, balanced nitrogen, avoid heavy evening irrigation",
  },
  {
    crop: "Tomato",
    disease: "Late Blight",
    severity: "High",
    confidence: 91,
    symptoms: "Dark lesions on leaves and stems, rapid canopy collapse",
    treatment: "Copper-based or systemic fungicide; remove affected plants",
    prevention: "Rotate crops, improve airflow, reduce leaf wetness",
  },
  {
    crop: "Cotton",
    disease: "Leaf Spot",
    severity: "Low",
    confidence: 78,
    symptoms: "Small circular spots, yellowing",
    treatment: "Apply sulfur or recommended fungicide",
    prevention: "Avoid overhead irrigation, maintain plant vigor",
  },
  {
    crop: "Healthy",
    disease: "No disease detected",
    severity: "Low",
    confidence: 99,
    symptoms: "No visible lesions",
    treatment: "Routine monitoring",
    prevention: "Maintain good practices",
  },
];

export const soilResponses = [
  {
    soilType: "Loamy Clay",
    color: "Dark brown",
    moisture: "28%",
    ph: "6.8",
    nitrogen: "Moderate",
    phosphorus: "Low",
    potassium: "Adequate",
    organicMatter: "3.4%",
    qualityScore: 78,
    suitableCrops: ["Tomato", "Maize", "Groundnut"],
    fertilizer: "Apply nitrogen-rich compost and phosphorus top-up",
    waterReq: "Moderate, drip irrigation recommended",
  },
  {
    soilType: "Sandy Loam",
    color: "Light brown",
    moisture: "18%",
    ph: "7.2",
    nitrogen: "Low",
    phosphorus: "Moderate",
    potassium: "Low",
    organicMatter: "1.8%",
    qualityScore: 62,
    suitableCrops: ["Cotton", "Maize"],
    fertilizer: "Add organic matter, NPK balanced fertilizer",
    waterReq: "Higher frequency, short cycles",
  },
];

export default { diseaseResponses, soilResponses };
