
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const JobDescriptionInput = ({ value, onChange }: JobDescriptionInputProps) => {
  const sampleJobs = [
    {
      title: "Data Scientist",
      description: "We are looking for a Data Scientist with experience in Python, machine learning, statistical analysis, and data visualization. The ideal candidate should have expertise in pandas, scikit-learn, TensorFlow, and SQL databases."
    },
    {
      title: "Frontend Developer",
      description: "Seeking a Frontend Developer proficient in React, TypeScript, HTML5, CSS3, and modern JavaScript frameworks. Experience with responsive design, REST APIs, and version control systems is required."
    },
    {
      title: "Marketing Analyst",
      description: "Looking for a Marketing Analyst with strong analytical skills, experience in Google Analytics, social media marketing, campaign optimization, and data-driven decision making. Knowledge of SEO and content marketing is a plus."
    }
  ];

  const loadSample = (sample: typeof sampleJobs[0]) => {
    onChange(sample.description);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Description
        </label>
        <Textarea
          placeholder="Paste the job description here... Include required skills, experience, and qualifications."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[200px] resize-none"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Lightbulb className="h-4 w-4" />
          <span>Quick Start - Try these sample job descriptions:</span>
        </div>
        
        <div className="grid gap-3">
          {sampleJobs.map((job, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => loadSample(job)}>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{job.title}</h4>
                <Badge variant="outline" className="text-xs">Sample</Badge>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">
                {job.description}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-blue-600 hover:text-blue-700 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  loadSample(job);
                }}
              >
                Use this template →
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionInput;
