import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Users, Target, Zap, AlertCircle, Brain } from "lucide-react";
import ResumeUploader from "@/components/ResumeUploader";
import JobDescriptionInput from "@/components/JobDescriptionInput";
import RoleSelector from "@/components/RoleSelector";
import ResumeRankings from "@/components/ResumeRankings";
import StatsCards from "@/components/StatsCards";
import KeywordInfo from "@/components/KeywordInfo";
import GCPCredentials from "@/components/GCPCredentials";
import { Resume, JobRole, AnalysisResponse } from "@/types/resume";
import { analyzeResumes, extractKeywords } from "@/lib/analysis";
import { isVisionAPIAvailable } from "@/lib/google-vision";

const HR = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [rankings, setRankings] = useState<Resume[]>([]);
  const [analysisMessage, setAnalysisMessage] = useState<string | null>(null);
  const [noKeywordsFound, setNoKeywordsFound] = useState(false);
  const [extractedKeywords, setExtractedKeywords] = useState<string[]>([]);
  const [visionAPIAvailable, setVisionAPIAvailable] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--hr-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--hr-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Check Vision API status
  useEffect(() => {
    setVisionAPIAvailable(isVisionAPIAvailable());
  }, []);

  // Extract keywords whenever job description or role changes
  useEffect(() => {
    if (jobDescription || selectedRole) {
      const keywords = extractKeywords(jobDescription, selectedRole);
      setExtractedKeywords(keywords);
    }
  }, [jobDescription, selectedRole]);

  const handleCredentialsLoaded = (success: boolean) => {
    setVisionAPIAvailable(success);
  };

  const handleAnalyze = async () => {
    if (!jobDescription || resumes.length === 0) return;
    
    setIsAnalyzing(true);
    setAnalysisMessage(null);
    setNoKeywordsFound(false);
    
    try {
      // Show analysis progress
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const analysisResult: AnalysisResponse = await analyzeResumes(resumes, jobDescription, selectedRole);
      
      if (analysisResult.noKeywordsFound) {
        setNoKeywordsFound(true);
        setAnalysisMessage(analysisResult.message);
        setRankings([]);
      } else {
        setRankings(analysisResult.rankings);
        setNoKeywordsFound(false);
        setAnalysisMessage(null);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysisMessage("Analysis failed. Please try again.");
      setNoKeywordsFound(true);
      setRankings([]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="cursor-ring" aria-hidden />
      <Card className="w-full max-w-5xl rounded-2xl p-6 border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white text-2xl font-extrabold">
            <Users className="h-6 w-6 text-white/80" />
            HR Resume Shortlisting
            {visionAPIAvailable && (
              <Brain className="h-6 w-6 text-blue-400" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StatsCards resumes={resumes} jobDescription={jobDescription} selectedRole={selectedRole} />
          
          {/* GCP Credentials Setup */}
          {!visionAPIAvailable && (
            <div className="mb-6">
              <GCPCredentials onCredentialsLoaded={handleCredentialsLoaded} />
            </div>
          )}
          
          {/* Keyword Information Display */}
          {(jobDescription || selectedRole) && (
            <div className="mb-6">
              <KeywordInfo 
                jobDescription={jobDescription}
                selectedRole={selectedRole}
                extractedKeywords={extractedKeywords}
              />
            </div>
          )}
          
          <Tabs defaultValue="upload" className="space-y-6">
            <TabsList className="flex w-full overflow-x-auto justify-start gap-2 bg-white/5 rounded-full p-1 shadow-md border border-white/10">
              <TabsTrigger value="upload" className="flex-1 min-w-[120px] rounded-full px-2 py-2 text-base font-semibold transition-all text-white/80 hover:bg-white/10 data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow">
                Upload
              </TabsTrigger>
              <TabsTrigger value="job" className="flex-1 min-w-[120px] rounded-full px-2 py-2 text-base font-semibold transition-all text-white/80 hover:bg-white/10 data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow">
                Job
              </TabsTrigger>
              <TabsTrigger value="role" className="flex-1 min-w-[120px] rounded-full px-2 py-2 text-base font-semibold transition-all text-white/80 hover:bg-white/10 data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow">
                Role
              </TabsTrigger>
              <TabsTrigger value="results" className="flex-1 min-w-[120px] rounded-full px-2 py-2 text-base font-semibold transition-all text-white/80 hover:bg-white/10 data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow">
                Rankings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="space-y-4">
              <ResumeUploader onResumesUploaded={setResumes} />
            </TabsContent>
            <TabsContent value="job" className="space-y-4">
              <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
            </TabsContent>
            <TabsContent value="role" className="space-y-4">
              <RoleSelector selectedRole={selectedRole} onRoleSelect={setSelectedRole} />
            </TabsContent>
            <TabsContent value="results" className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <Button 
                  onClick={handleAnalyze} 
                  disabled={!jobDescription || resumes.length === 0 || isAnalyzing} 
                  className="bg-white text-primary font-bold py-2 rounded-full hover:opacity-90"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Resumes"}
                </Button>
                
                {visionAPIAvailable && (
                  <div className="flex items-center gap-2 text-blue-400 text-sm">
                    <Brain className="h-4 w-4" />
                    <span>Enhanced Analysis Active</span>
                  </div>
                )}
              </div>
              
              {/* Display analysis message if no keywords found */}
              {noKeywordsFound && analysisMessage && (
                <div className="mt-6 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertCircle className="h-6 w-6 text-red-400" />
                    <h3 className="text-lg font-semibold text-red-400">No Keywords Found</h3>
                  </div>
                  <p className="text-red-300 leading-relaxed">{analysisMessage}</p>
                  <div className="mt-4 text-sm text-red-300/80">
                    <p><strong>Suggestions:</strong></p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Provide a more detailed job description with specific skills and requirements</li>
                      <li>Upload resumes that are more relevant to the job role</li>
                      <li>Check if the selected role has appropriate keywords</li>
                      {!visionAPIAvailable && (
                        <li>Enable Google Vision API for enhanced keyword extraction</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
              
              <ResumeRankings 
                rankings={rankings} 
                isLoading={isAnalyzing} 
                selectedRole={selectedRole}
                noKeywordsFound={noKeywordsFound}
                analysisMessage={analysisMessage}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default HR;
