
import { Resume, JobRole } from "@/types/resume";
import LoadingState from "./resume-rankings/LoadingState";
import EmptyState from "./resume-rankings/EmptyState";
import SummaryStats from "./resume-rankings/SummaryStats";
import RankingsHeader from "./resume-rankings/RankingsHeader";
import ResumeCard from "./resume-rankings/ResumeCard";
import RankingsFooter from "./resume-rankings/RankingsFooter";

interface ResumeRankingsProps {
  rankings: Resume[];
  isLoading: boolean;
  selectedRole: JobRole | null;
  noKeywordsFound?: boolean;
  analysisMessage?: string | null;
}

const ResumeRankings = ({ 
  rankings, 
  isLoading, 
  selectedRole, 
  noKeywordsFound = false, 
  analysisMessage = null 
}: ResumeRankingsProps) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (noKeywordsFound) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-white mb-4">No Keywords Found</h3>
          <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
            {analysisMessage || "The analysis couldn't find any relevant keywords in the uploaded resumes that match the job description."}
          </p>
        </div>
      </div>
    );
  }

  if (rankings.length === 0) {
    return <EmptyState />;
  }

  // Show only top 5 rankings
  const topRankings = rankings.slice(0, 5);

  return (
    <div className="space-y-10">
      <SummaryStats rankings={rankings} selectedRole={selectedRole} />
      
      <div className="space-y-8">
        <RankingsHeader />
        
        {topRankings.map((resume, index) => (
          <ResumeCard
            key={resume.id}
            resume={resume}
            index={index}
            selectedRole={selectedRole}
          />
        ))}
      </div>

      <RankingsFooter totalRankings={rankings.length} />
    </div>
  );
};

export default ResumeRankings;
