
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, FileText, Star, Award, CheckCircle, XCircle, Brain, Target, Calendar, TrendingUp } from "lucide-react";
import { Resume, JobRole } from "@/types/resume";

interface ResumeCardProps {
  resume: Resume;
  index: number;
  selectedRole: JobRole | null;
}

const ResumeCard = ({ resume, index, selectedRole }: ResumeCardProps) => {
  const getRankBadgeColor = (index: number) => {
    switch (index) {
      case 0: return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case 1: return "bg-gradient-to-r from-slate-400 to-slate-600";
      case 2: return "bg-gradient-to-r from-orange-400 to-orange-600";
      default: return "bg-gradient-to-r from-blue-400 to-blue-600";
    }
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (index === 1) return <Award className="h-6 w-6 text-slate-500" />;
    if (index === 2) return <Star className="h-6 w-6 text-orange-500" />;
    return <FileText className="h-6 w-6 text-blue-500" />;
  };

  return (
    <Card className={`bg-white/95 backdrop-blur-sm border-2 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.005] ${
      index === 0 ? "ring-2 ring-yellow-400/50 bg-gradient-to-br from-white/95 to-yellow-50/30" : ""
    }`}>
      <CardContent className="p-6">
        {/* Compact Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`p-3 rounded-xl ${getRankBadgeColor(index)} shadow-lg`}>
              {getRankIcon(index)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h4 className="font-bold text-gray-900 text-xl break-words">{resume.filename}</h4>
                {index === 0 && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold shadow-md px-3 py-1 text-xs">
                    🏆 BEST MATCH
                  </Badge>
                )}
                {index === 1 && (
                  <Badge className="bg-gradient-to-r from-slate-400 to-slate-600 text-white font-semibold shadow-md px-3 py-1 text-xs">
                    🥈 2nd Place
                  </Badge>
                )}
                {index === 2 && (
                  <Badge className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold shadow-md px-3 py-1 text-xs">
                    🥉 3rd Place
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-gray-600 text-sm">
                <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full font-medium">
                  <FileText className="h-3 w-3" />
                  #{index + 1}
                </span>
                <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full font-medium">
                  📄 {resume.type.toUpperCase()}
                </span>
                {resume.analysisConfidence && resume.analysisConfidence > 0.8 && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-full font-medium text-blue-700">
                    <Brain className="h-3 w-3" />
                    Enhanced
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Compact Score Display */}
          <div className="text-center lg:text-right bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200/50 min-w-[120px]">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {((resume.similarityScore || 0) * 100).toFixed(1)}%
            </div>
            <p className="text-gray-700 font-semibold text-sm">Match Score</p>
            <Progress value={(resume.similarityScore || 0) * 100} className="h-2 bg-blue-100 mt-2" />
          </div>
        </div>

        {/* Compact Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 flex flex-col items-center text-center">
            <div className="bg-blue-500 p-2 rounded-full mb-2">
              <Target className="h-4 w-4 text-white" />
            </div>
            <p className="text-blue-800 text-xs font-bold mb-1 uppercase tracking-wide">Keywords</p>
            <p className="text-xl font-bold text-blue-700">{resume.matchedKeywords || 0}</p>
            {resume.totalKeywords && (
              <p className="text-xs text-blue-600">of {resume.totalKeywords}</p>
            )}
          </div>

          {selectedRole && resume.roleMatch && (
            <div className="bg-green-50 p-3 rounded-xl border border-green-200 flex flex-col items-center text-center">
              <div className="bg-green-500 p-2 rounded-full mb-2">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <p className="text-green-800 text-xs font-bold mb-1 uppercase tracking-wide">Role Fit</p>
              <p className="text-xl font-bold text-green-700">
                {(resume.roleMatch * 100).toFixed(0)}%
              </p>
            </div>
          )}

          <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 flex flex-col items-center text-center">
            <div className="bg-purple-500 p-2 rounded-full mb-2">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <p className="text-purple-800 text-xs font-bold mb-1 uppercase tracking-wide">Domain</p>
            <p className="text-xl font-bold text-purple-700">
              {resume.domainExpertise ? (resume.domainExpertise * 100).toFixed(0) + "%" : "N/A"}
            </p>
          </div>

          <div className="bg-orange-50 p-3 rounded-xl border border-orange-200 flex flex-col items-center text-center">
            <div className="bg-orange-500 p-2 rounded-full mb-2">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <p className="text-orange-800 text-xs font-bold mb-1 uppercase tracking-wide">Date</p>
            <p className="text-lg font-bold text-orange-700">
              {resume.uploadedAt.toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Compact Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-800 font-bold text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                Similarity
              </span>
              <span className="text-blue-600 font-bold text-lg">
                {((resume.similarityScore || 0) * 100).toFixed(1)}%
              </span>
            </div>
            <Progress value={(resume.similarityScore || 0) * 100} className="h-2 bg-blue-100" />
          </div>

          {resume.domainExpertise && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 font-bold text-sm flex items-center gap-2">
                  🧠 Expertise
                </span>
                <span className="text-purple-600 font-bold text-lg">
                  {(resume.domainExpertise * 100).toFixed(1)}%
                </span>
              </div>
              <Progress value={resume.domainExpertise * 100} className="h-2 bg-purple-100" />
            </div>
          )}
        </div>

        {/* Enhanced Analysis - Compact */}
        {(resume.extractedSkills || resume.experienceLevel) && (
          <div className="mb-6 space-y-3">
            <h5 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-200 pb-2">
              <Brain className="h-5 w-5 text-blue-600" />
              AI Analysis
            </h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Extracted Skills */}
              {resume.extractedSkills && resume.extractedSkills.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-blue-800 text-sm">Skills ({resume.extractedSkills.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {resume.extractedSkills.slice(0, 6).map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-800 border-blue-300 text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {resume.extractedSkills.length > 6 && (
                      <Badge variant="outline" className="text-blue-700 border-blue-400 text-xs">
                        +{resume.extractedSkills.length - 6}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              {/* Experience Level */}
              {resume.experienceLevel && (
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-800 text-sm">Experience</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300 text-base px-3 py-1 font-bold">
                    {resume.experienceLevel}
                  </Badge>
                </div>
              )}
            </div>
            
            {/* Analysis Confidence */}
            {resume.analysisConfidence && (
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold text-purple-800 text-sm">Confidence</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={resume.analysisConfidence * 100} className="flex-1 h-2 bg-purple-100" />
                  <span className="text-purple-700 font-bold text-xl">
                    {(resume.analysisConfidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Keyword Analysis - Compact */}
        {resume.keywordMatchDetails && (
          <div className="mb-6 space-y-3">
            <h5 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-200 pb-2">
              🔍 Keywords
            </h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Matched Keywords */}
              {resume.keywordMatchDetails.matchedKeywords.length > 0 && (
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-800 text-sm">Matched ({resume.keywordMatchDetails.matchedKeywords.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {resume.keywordMatchDetails.matchedKeywords.slice(0, 5).map((keyword, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-green-100 text-green-800 border-green-300 text-xs">
                        {keyword}
                      </Badge>
                    ))}
                    {resume.keywordMatchDetails.matchedKeywords.length > 5 && (
                      <Badge variant="outline" className="text-green-700 border-green-400 text-xs">
                        +{resume.keywordMatchDetails.matchedKeywords.length - 5}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              {/* Unmatched Keywords */}
              {resume.keywordMatchDetails.unmatchedKeywords.length > 0 && (
                <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="font-semibold text-red-800 text-sm">Missing ({resume.keywordMatchDetails.unmatchedKeywords.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {resume.keywordMatchDetails.unmatchedKeywords.slice(0, 5).map((keyword, idx) => (
                      <Badge key={idx} variant="outline" className="text-red-700 border-red-400 text-xs">
                        {keyword}
                      </Badge>
                    ))}
                    {resume.keywordMatchDetails.unmatchedKeywords.length > 5 && (
                      <Badge variant="outline" className="text-red-700 border-red-400 text-xs">
                        +{resume.keywordMatchDetails.unmatchedKeywords.length - 5}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Preview - Compact */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-gray-900 text-sm font-bold mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-600" />
            Content Preview
          </p>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-gray-700 text-sm leading-relaxed">
              {resume.content.substring(0, 200)}...
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeCard;
