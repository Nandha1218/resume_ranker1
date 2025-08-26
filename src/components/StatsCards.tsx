
import { FileText, Target, Users, Zap } from "lucide-react";
import { Resume, JobRole } from "@/types/resume";

interface StatsCardsProps {
  resumes: Resume[];
  jobDescription: string;
  selectedRole: JobRole | null;
}

const StatsCards = ({ resumes, jobDescription, selectedRole }: StatsCardsProps) => {
  const stats = [
    { title: "Uploaded Resumes", value: resumes.length, icon: FileText, color: "text-primary", bgColor: "bg-primary/10" },
    { title: "Job Descriptions", value: jobDescription ? 1 : 0, icon: Target, color: "text-secondary", bgColor: "bg-secondary/10" },
    { title: "Selected Role", value: selectedRole ? 1 : 0, icon: Users, color: "text-accent", bgColor: "bg-accent/10" },
    { title: "Analysis Ready", value: jobDescription && resumes.length > 0 ? 1 : 0, icon: Zap, color: "text-primary", bgColor: "bg-primary/10" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-card rounded-xl p-6 border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">{stat.title}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.bgColor} shadow-sm`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
