
import { FileText, TrendingUp, Users, Trophy, Target, CheckCircle } from "lucide-react";
import { Resume, JobRole } from "@/types/resume";

interface SummaryStatsProps {
  rankings: Resume[];
  selectedRole: JobRole | null;
}

const SummaryStats = ({ rankings, selectedRole }: SummaryStatsProps) => {
  // Calculate keyword statistics
  const totalKeywords = rankings.reduce((sum, r) => sum + (r.totalKeywords || 0), 0);
  const totalMatchedKeywords = rankings.reduce((sum, r) => sum + (r.matchedKeywords || 0), 0);
  const avgKeywordMatchRate = totalKeywords > 0 ? (totalMatchedKeywords / totalKeywords) * 100 : 0;
  
  // Calculate average scores
  const avgSimilarityScore = rankings.length > 0 
    ? (rankings.reduce((sum, r) => sum + (r.similarityScore || 0), 0) / rankings.length) * 100 
    : 0;
  
  const avgRoleMatch = selectedRole && rankings.length > 0
    ? (rankings.reduce((sum, r) => sum + (r.roleMatch || 0), 0) / rankings.length) * 100
    : 0;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white text-center mb-6">📊 Analysis Summary</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="bg-blue-500 p-3 rounded-full mb-3 shadow-md">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <p className="text-blue-800 text-xs font-bold mb-1 uppercase tracking-wide">Resumes</p>
          <p className="text-3xl font-bold text-blue-700 mb-1">{rankings.length}</p>
          <p className="text-xs text-blue-600 text-center">Keywords: {totalKeywords}</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border-2 border-green-200 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="bg-green-500 p-3 rounded-full mb-3 shadow-md">
            <Target className="h-6 w-6 text-white" />
          </div>
          <p className="text-green-800 text-xs font-bold mb-1 uppercase tracking-wide">Match Rate</p>
          <p className="text-3xl font-bold text-green-700 mb-1">
            {avgKeywordMatchRate.toFixed(1)}%
          </p>
          <p className="text-xs text-green-600 text-center">
            {totalMatchedKeywords}/{totalKeywords}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="bg-purple-500 p-3 rounded-full mb-3 shadow-md">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <p className="text-purple-800 text-xs font-bold mb-1 uppercase tracking-wide">Avg. Score</p>
          <p className="text-3xl font-bold text-purple-700 mb-1">
            {avgSimilarityScore.toFixed(1)}%
          </p>
          {selectedRole && (
            <p className="text-xs text-purple-600 text-center">
              Role: {avgRoleMatch.toFixed(1)}%
            </p>
          )}
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 border-2 border-orange-200 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="bg-orange-500 p-3 rounded-full mb-3 shadow-md">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <p className="text-orange-800 text-xs font-bold mb-1 uppercase tracking-wide">Top Match</p>
          <p className="text-3xl font-bold text-orange-700 mb-1">
            {rankings.length > 0 ? ((rankings[0].similarityScore || 0) * 100).toFixed(1) + "%" : "0%"}
          </p>
          {rankings.length > 0 && (
            <p className="text-xs text-orange-600 text-center truncate max-w-full">
              {rankings[0].filename}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryStats;
