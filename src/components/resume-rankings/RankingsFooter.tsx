
interface RankingsFooterProps {
  totalRankings: number;
}

const RankingsFooter = ({ totalRankings }: RankingsFooterProps) => {
  if (totalRankings <= 5) return null;

  return (
    <div className="text-center mt-12">
      <div className="bg-muted rounded-2xl p-8 border border-border inline-block">
        <p className="text-white font-bold text-2xl">
          🎯 Showing top 5 candidates out of {totalRankings} analyzed resumes
        </p>
        <p className="text-white/90 text-lg mt-2">
          Professional AI analysis focuses on the most relevant matches
        </p>
      </div>
    </div>
  );
};

export default RankingsFooter;
