
export interface Resume {
  id: string;
  filename: string;
  content: string;
  type: 'pdf' | 'txt';
  uploadedAt: Date;
  similarityScore?: number;
  matchedKeywords?: number;
  unmatchedKeywords?: string[];
  totalKeywords?: number;
  roleMatch?: number;
  domainExpertise?: number;
  keywordMatchDetails?: {
    matchedKeywords: string[];
    unmatchedKeywords: string[];
    matchScore: number;
    totalKeywords: number;
  };
  // Enhanced analysis fields from Google Vision API
  extractedSkills?: string[];
  experienceLevel?: string;
  analysisConfidence?: number;
}

export interface JobRole {
  id: string;
  name: string;
  keywords: string[];
  weight: number;
  description: string;
}

export interface AnalysisResult {
  resume: Resume;
  score: number;
  matchedKeywords: string[];
  roleCompatibility?: number;
  domainPerformance?: number;
}

export interface AnalysisResponse {
  rankings: Resume[];
  noKeywordsFound: boolean;
  message: string | null;
}

export interface GCPCredentials {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}
