
import { FileText } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="bg-muted rounded-xl p-8 border border-border">
        <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <p className="text-foreground text-lg">No analysis results yet.</p>
        <p className="text-muted-foreground mt-2">
          Upload resumes and add a job description, then click "Analyze Resumes"
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
