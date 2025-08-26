
import { Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RankingsHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full shadow-lg">
          <Brain className="h-6 w-6 text-white animate-pulse" />
        </div>
        <h3 className="text-3xl font-bold text-white">
          Top 5 Resume Rankings
        </h3>
      </div>
      <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-lg px-6 py-2 rounded-full shadow-xl border-0">
        🚀 AI-Powered Results
      </Badge>
      <p className="text-white/80 text-base mt-3 max-w-2xl mx-auto">
        Professional analysis with confidence scoring and detailed insights
      </p>
    </div>
  );
};

export default RankingsHeader;
