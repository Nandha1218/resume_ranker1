import { Resume, JobRole } from "@/types/resume";
import { extractKeywordsWithVision, isVisionAPIAvailable } from "./google-vision";

// Extract keywords from job description and role
export function extractKeywords(jobDescription: string, selectedRole: JobRole | null): string[] {
  const keywords: string[] = [];
  
  // Add role-specific keywords
  if (selectedRole) {
    keywords.push(...selectedRole.keywords);
  }
  
  // Extract common technical keywords from job description
  const commonTechKeywords = [
    'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node.js', 'express',
    'mongodb', 'postgresql', 'mysql', 'aws', 'azure', 'docker', 'kubernetes',
    'git', 'agile', 'scrum', 'api', 'rest', 'graphql', 'typescript', 'html', 'css',
    'machine learning', 'ai', 'data science', 'analytics', 'sql', 'nosql',
    'frontend', 'backend', 'fullstack', 'devops', 'ci/cd', 'testing', 'qa',
    'project management', 'leadership', 'communication', 'teamwork', 'problem solving'
  ];
  
  const jobText = jobDescription.toLowerCase();
  commonTechKeywords.forEach(keyword => {
    if (jobText.includes(keyword.toLowerCase())) {
      keywords.push(keyword);
    }
  });
  
  // Extract company-specific terms and industry jargon
  const words = jobText.split(/\s+/);
  words.forEach(word => {
    const cleanWord = word.replace(/[^\w]/g, '').toLowerCase();
    if (cleanWord.length > 3 && !keywords.includes(cleanWord)) {
      keywords.push(cleanWord);
    }
  });
  
  return [...new Set(keywords)]; // Remove duplicates
}

// Enhanced keyword extraction using Vision API when available
export async function extractKeywordsEnhanced(
  jobDescription: string, 
  selectedRole: JobRole | null, 
  resumeContent: string
): Promise<{
  keywords: string[];
  confidence: number;
  extractedSkills: string[];
  experienceLevel: string;
}> {
  // Use Vision API if available, otherwise fall back to basic extraction
  if (isVisionAPIAvailable()) {
    try {
      return await extractKeywordsWithVision(jobDescription, selectedRole, resumeContent);
    } catch (error) {
      console.warn('Vision API failed, falling back to basic extraction:', error);
    }
  }
  
  // Fallback to basic keyword extraction
  const keywords = extractKeywords(jobDescription, selectedRole);
  const resumeText = resumeContent.toLowerCase();
  
  // Extract skills from resume content
  const extractedSkills: string[] = [];
  const techKeywords = [
    'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node.js', 'express',
    'mongodb', 'postgresql', 'mysql', 'aws', 'azure', 'docker', 'kubernetes',
    'git', 'agile', 'scrum', 'api', 'rest', 'graphql', 'typescript', 'html', 'css',
    'machine learning', 'ai', 'data science', 'analytics', 'sql', 'nosql',
    'frontend', 'backend', 'fullstack', 'devops', 'ci/cd', 'testing', 'qa'
  ];
  
  techKeywords.forEach(skill => {
    if (resumeText.includes(skill.toLowerCase())) {
      extractedSkills.push(skill);
    }
  });
  
  // Basic experience level detection
  let experienceLevel = 'Entry Level';
  if (resumeText.includes('senior') || resumeText.includes('lead') || resumeText.includes('principal')) {
    experienceLevel = 'Senior';
  } else if (resumeText.includes('mid-level') || resumeText.includes('intermediate')) {
    experienceLevel = 'Mid Level';
  }
  
  return {
    keywords,
    confidence: 0.7, // Lower confidence for basic extraction
    extractedSkills,
    experienceLevel
  };
}

// Calculate keyword match score
function calculateKeywordMatch(resumeContent: string, keywords: string[]): {
  matchedKeywords: string[];
  unmatchedKeywords: string[];
  matchScore: number;
  totalKeywords: number;
} {
  const resumeText = resumeContent.toLowerCase();
  const matchedKeywords: string[] = [];
  const unmatchedKeywords: string[] = [];
  
  keywords.forEach(keyword => {
    if (resumeText.includes(keyword.toLowerCase())) {
      matchedKeywords.push(keyword);
    } else {
      unmatchedKeywords.push(keyword);
    }
  });
  
  const totalKeywords = keywords.length;
  const matchScore = totalKeywords > 0 ? matchedKeywords.length / totalKeywords : 0;
  
  return {
    matchedKeywords,
    unmatchedKeywords,
    matchScore,
    totalKeywords
  };
}

// Calculate role compatibility score
function calculateRoleCompatibility(resume: Resume, selectedRole: JobRole | null): number {
  if (!selectedRole) return 0;
  
  const roleKeywords = selectedRole.keywords;
  const resumeText = resume.content.toLowerCase();
  
  let roleMatchCount = 0;
  roleKeywords.forEach(keyword => {
    if (resumeText.includes(keyword.toLowerCase())) {
      roleMatchCount++;
    }
  });
  
  return roleKeywords.length > 0 ? roleMatchCount / roleKeywords.length : 0;
}

// Calculate domain expertise score based on content analysis
function calculateDomainExpertise(resume: Resume, jobDescription: string): number {
  const resumeText = resume.content.toLowerCase();
  const jobText = jobDescription.toLowerCase();
  
  // Check for industry-specific terms
  const industryTerms = [
    'finance', 'healthcare', 'education', 'retail', 'manufacturing', 'technology',
    'consulting', 'non-profit', 'government', 'startup', 'enterprise', 'saas',
    'e-commerce', 'media', 'entertainment', 'real estate', 'legal', 'marketing'
  ];
  
  let industryScore = 0;
  industryTerms.forEach(term => {
    if (resumeText.includes(term) && jobText.includes(term)) {
      industryScore += 0.1;
    }
  });
  
  // Check for experience indicators
  const experienceIndicators = [
    'years of experience', 'senior', 'lead', 'manager', 'director', 'vp', 'cto',
    'architect', 'principal', 'expert', 'specialist', 'consultant'
  ];
  
  let experienceScore = 0;
  experienceIndicators.forEach(indicator => {
    if (resumeText.includes(indicator)) {
      experienceScore += 0.05;
    }
  });
  
  // Check for education level
  const educationTerms = ['phd', 'master', 'bachelor', 'degree', 'certification'];
  let educationScore = 0;
  educationTerms.forEach(term => {
    if (resumeText.includes(term)) {
      educationScore += 0.03;
    }
  });
  
  return Math.min(1, industryScore + experienceScore + educationScore);
}

// Main analysis function with Vision API integration
export async function analyzeResumes(resumes: Resume[], jobDescription: string, selectedRole: JobRole | null) {
  // Try to use enhanced keyword extraction first
  let keywords: string[] = [];
  let enhancedAnalysis: any = null;
  
  try {
    if (resumes.length > 0) {
      enhancedAnalysis = await extractKeywordsEnhanced(jobDescription, selectedRole, resumes[0].content);
      keywords = enhancedAnalysis.keywords;
    }
  } catch (error) {
    console.warn('Enhanced analysis failed, using basic extraction:', error);
    keywords = extractKeywords(jobDescription, selectedRole);
  }
  
  if (keywords.length === 0) {
    return {
      rankings: [],
      noKeywordsFound: true,
      message: "No relevant keywords could be extracted from the job description. Please provide a more detailed job description."
    };
  }
  
  const analyzedResumes = await Promise.all(resumes.map(async (resume) => {
    const keywordAnalysis = calculateKeywordMatch(resume.content, keywords);
    const roleCompatibility = calculateRoleCompatibility(resume, selectedRole);
    const domainExpertise = calculateDomainExpertise(resume, jobDescription);
    
    // Calculate overall similarity score with enhanced weighting
    const keywordWeight = 0.5;
    const roleWeight = 0.3;
    const domainWeight = 0.2;
    
    let similarityScore = (
      keywordAnalysis.matchScore * keywordWeight +
      roleCompatibility * roleWeight +
      domainExpertise * domainWeight
    );
    
    // Apply Vision API confidence boost if available
    if (enhancedAnalysis && enhancedAnalysis.confidence > 0.8) {
      similarityScore = Math.min(1, similarityScore * 1.1); // 10% boost for high confidence
    }
    
    return {
      ...resume,
      similarityScore,
      matchedKeywords: keywordAnalysis.matchedKeywords.length,
      unmatchedKeywords: keywordAnalysis.unmatchedKeywords,
      totalKeywords: keywordAnalysis.totalKeywords,
      roleMatch: roleCompatibility,
      domainExpertise,
      keywordMatchDetails: keywordAnalysis,
      // Add enhanced analysis data if available
      ...(enhancedAnalysis && {
        extractedSkills: enhancedAnalysis.extractedSkills,
        experienceLevel: enhancedAnalysis.experienceLevel,
        analysisConfidence: enhancedAnalysis.confidence
      })
    };
  }));
  
  // Sort by similarity score (highest first)
  const sortedResumes = analyzedResumes.sort((a, b) => 
    (b.similarityScore || 0) - (a.similarityScore || 0)
  );
  
  // Check if any resumes have keyword matches
  const resumesWithMatches = sortedResumes.filter(resume => 
    (resume.matchedKeywords || 0) > 0
  );
  
  if (resumesWithMatches.length === 0) {
    return {
      rankings: [],
      noKeywordsFound: true,
      message: "No keywords from the job description were found in any of the uploaded resumes. Please check if the resumes are relevant to the job role or upload different resumes."
    };
  }
  
  return {
    rankings: sortedResumes.slice(0, 5), // Top 5 results
    noKeywordsFound: false,
    message: null
  };
}

// Legacy function for backward compatibility
export function getDeterministicScore(resume: Resume, jobDescription: string, selectedRole: JobRole | null) {
  const keywords = extractKeywords(jobDescription, selectedRole);
  const keywordAnalysis = calculateKeywordMatch(resume.content, keywords);
  const roleCompatibility = calculateRoleCompatibility(resume, selectedRole);
  const domainExpertise = calculateDomainExpertise(resume, jobDescription);
  
  const similarityScore = keywordAnalysis.matchScore * 0.6 + roleCompatibility * 0.3 + domainExpertise * 0.1;
  
  return { 
    similarityScore, 
    matchedKeywords: keywordAnalysis.matchedKeywords.length, 
    roleMatch: roleCompatibility, 
    domainExpertise 
  };
}
