import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobRole } from "@/types/resume";
import { Info, Target, Zap } from "lucide-react";

interface KeywordInfoProps {
  jobDescription: string;
  selectedRole: JobRole | null;
  extractedKeywords: string[];
}

const KeywordInfo = ({ jobDescription, selectedRole, extractedKeywords }: KeywordInfoProps) => {
  if (extractedKeywords.length === 0) {
    return (
      <Card className="bg-yellow-500/10 border border-yellow-500/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <Info className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold text-yellow-500">No Keywords Extracted</span>
          </div>
          <p className="text-yellow-300 text-sm">
            The system couldn't extract relevant keywords from your job description. 
            Try adding more specific skills, technologies, or requirements.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-blue-500/10 border border-blue-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400 text-lg">
          <Target className="h-5 w-5" />
          Keywords Being Analyzed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Role-specific keywords */}
          {selectedRole && selectedRole.keywords.length > 0 && (
            <div>
              <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Role-Specific Keywords ({selectedRole.keywords.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedRole.keywords.map((keyword, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-blue-500/20 text-blue-700 border-blue-500/30">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Extracted keywords */}
          <div>
            <h4 className="font-semibold text-blue-300 mb-2">
              Extracted from Job Description ({extractedKeywords.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {extractedKeywords.slice(0, 20).map((keyword, idx) => (
                <Badge key={idx} variant="outline" className="text-blue-600 border-blue-500/50">
                  {keyword}
                </Badge>
              ))}
              {extractedKeywords.length > 20 && (
                <Badge variant="outline" className="text-blue-600 border-blue-500/50">
                  +{extractedKeywords.length - 20} more
                </Badge>
              )}
            </div>
          </div>
          
          <div className="text-xs text-blue-300/80 bg-blue-500/10 p-3 rounded-lg">
            <p><strong>Note:</strong> The system analyzes resumes for these keywords to calculate match scores. 
            Keywords are extracted from your job description and selected role requirements.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeywordInfo;
