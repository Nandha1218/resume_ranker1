
import { Brain } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="space-y-4">
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-6"></div>
        <p className="text-primary text-lg font-semibold">Analyzing resumes with AI...</p>
        <p className="text-muted-foreground mt-2">
          Computing similarity scores and domain expertise
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
