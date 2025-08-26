
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";
import { Resume } from "@/types/resume";
import { useToast } from "@/hooks/use-toast";

interface ResumeUploaderProps {
  onResumesUploaded: (resumes: Resume[]) => void;
}

const ResumeUploader = ({ onResumesUploaded }: ResumeUploaderProps) => {
  const [uploadedResumes, setUploadedResumes] = useState<Resume[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newResumes: Resume[] = [];

    for (const file of acceptedFiles) {
      try {
        let content = "";
        const type = file.type === "application/pdf" ? "pdf" : "txt";

        if (type === "txt") {
          content = await file.text();
        } else {
          // For PDF files, we'll simulate content extraction
          // In a real app, you'd use pdf-parse or similar
          content = `[PDF Content] - ${file.name} - Simulated resume content with skills, experience, and education details.`;
        }

        const resume: Resume = {
          id: Math.random().toString(36).substr(2, 9),
          filename: file.name,
          content,
          type,
          uploadedAt: new Date()
        };

        newResumes.push(resume);
      } catch (error) {
        toast({
          title: "Error processing file",
          description: `Failed to process ${file.name}`,
          variant: "destructive"
        });
      }
    }

    const updatedResumes = [...uploadedResumes, ...newResumes];
    setUploadedResumes(updatedResumes);
    onResumesUploaded(updatedResumes);

    if (newResumes.length > 0) {
      toast({
        title: "Files uploaded successfully",
        description: `${newResumes.length} resume(s) processed`
      });
    }
  }, [uploadedResumes, onResumesUploaded, toast]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt']
    },
    multiple: true
  });

  useEffect(() => {
    const handler = () => {
      open();
    };
    window.addEventListener('open-resume-upload', handler as EventListener);
    return () => window.removeEventListener('open-resume-upload', handler as EventListener);
  }, [open]);

  const removeResume = (id: string) => {
    const filtered = uploadedResumes.filter(resume => resume.id !== id);
    setUploadedResumes(filtered);
    onResumesUploaded(filtered);
  };

  return (
    <div className="space-y-6">
      <Card
        {...getRootProps()}
        className={`p-10 border border-white/10 bg-white/5 shadow-xl rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl ${
          isDragActive 
            ? "ring-2 ring-white/40 bg-white/10" 
            : "hover:ring-2 hover:ring-white/20"
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <Upload className="mx-auto h-14 w-14 text-white/80 mb-4" />
          {isDragActive ? (
            <p className="text-white font-bold text-lg animate-pulse">Drop the files here...</p>
          ) : (
            <div>
              <p className="text-white/90 mb-2 text-lg font-semibold">
                Drag & drop resume files here, or click to select
              </p>
              <p className="text-base text-white/70">
                Supports PDF and TXT files
              </p>
            </div>
          )}
        </div>
      </Card>

      {uploadedResumes.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-bold text-white text-lg">
            Uploaded Resumes ({uploadedResumes.length})
          </h3>
          {uploadedResumes.map((resume) => (
            <div key={resume.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl shadow border border-white/10">
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 text-white/80" />
                <div>
                  <p className="font-bold text-white text-base">{resume.filename}</p>
                  <p className="text-sm text-white/70">
                    {resume.type.toUpperCase()} • {resume.uploadedAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeResume(resume.id)}
                className="text-red-300 hover:text-red-200 rounded-full bg-white/10 px-2"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
