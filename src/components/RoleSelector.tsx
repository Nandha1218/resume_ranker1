
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X, Code, BarChart, Megaphone, Users, Settings } from "lucide-react";
import { JobRole } from "@/types/resume";

interface RoleSelectorProps {
  selectedRole: JobRole | null;
  onRoleSelect: (role: JobRole | null) => void;
}

const RoleSelector = ({ selectedRole, onRoleSelect }: RoleSelectorProps) => {
  const [customKeywords, setCustomKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");

  const predefinedRoles: JobRole[] = [
    {
      id: "data-scientist",
      name: "Data Scientist",
      keywords: ["python", "machine learning", "pandas", "scikit-learn", "tensorflow", "statistics", "sql", "data analysis", "jupyter", "numpy"],
      weight: 1.0,
      description: "Focus on ML, data analysis, and statistical modeling skills"
    },
    {
      id: "frontend-developer",
      name: "Frontend Developer",
      keywords: ["react", "javascript", "typescript", "html", "css", "responsive design", "api", "git", "webpack", "sass"],
      weight: 1.0,
      description: "Emphasis on modern web development technologies"
    },
    {
      id: "marketing-analyst",
      name: "Marketing Analyst",
      keywords: ["google analytics", "seo", "social media", "campaign management", "a/b testing", "conversion optimization", "content marketing", "email marketing", "roi", "kpi"],
      weight: 1.0,
      description: "Digital marketing and analytics expertise"
    },
    {
      id: "product-manager",
      name: "Product Manager",
      keywords: ["product strategy", "roadmap", "user research", "agile", "scrum", "stakeholder management", "market analysis", "user experience", "requirements", "metrics"],
      weight: 1.0,
      description: "Product development and strategy focus"
    }
  ];

  const roleIcons = {
    "data-scientist": BarChart,
    "frontend-developer": Code,
    "marketing-analyst": Megaphone,
    "product-manager": Users
  };

  const addCustomKeyword = () => {
    if (newKeyword.trim() && !customKeywords.includes(newKeyword.trim().toLowerCase())) {
      setCustomKeywords([...customKeywords, newKeyword.trim().toLowerCase()]);
      setNewKeyword("");
    }
  };

  const removeCustomKeyword = (keyword: string) => {
    setCustomKeywords(customKeywords.filter(k => k !== keyword));
  };

  const createCustomRole = () => {
    if (customKeywords.length === 0) return;

    const customRole: JobRole = {
      id: "custom-role",
      name: "Custom Role",
      keywords: customKeywords,
      weight: 1.0,
      description: "Custom role with user-defined keywords"
    };

    onRoleSelect(customRole);
  };

  return (
    <div className="space-y-6">
      {/* Predefined Roles */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Predefined Roles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {predefinedRoles.map((role) => {
            const Icon = roleIcons[role.id as keyof typeof roleIcons] || Settings;
            const isSelected = selectedRole?.id === role.id;
            
            return (
              <Card 
                key={role.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => onRoleSelect(isSelected ? null : role)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Icon className="h-5 w-5" />
                    {role.name}
                    {isSelected && <Badge className="ml-auto">Selected</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {role.keywords.slice(0, 6).map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                    {role.keywords.length > 6 && (
                      <Badge variant="outline" className="text-xs">
                        +{role.keywords.length - 6} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Custom Role Builder */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Role Keywords</h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add Custom Keywords</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="keyword">Keyword</Label>
                <Input
                  id="keyword"
                  placeholder="e.g., blockchain, docker, kubernetes"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomKeyword()}
                />
              </div>
              <Button onClick={addCustomKeyword} className="mt-6">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {customKeywords.length > 0 && (
              <div>
                <Label>Custom Keywords ({customKeywords.length})</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {customKeywords.map((keyword) => (
                    <Badge key={keyword} variant="outline" className="flex items-center gap-1">
                      {keyword}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-red-500" 
                        onClick={() => removeCustomKeyword(keyword)}
                      />
                    </Badge>
                  ))}
                </div>
                <Button 
                  onClick={createCustomRole}
                  className="mt-3 w-full"
                  variant={selectedRole?.id === "custom-role" ? "default" : "outline"}
                >
                  {selectedRole?.id === "custom-role" ? "Custom Role Active" : "Use Custom Keywords"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Selected Role Info */}
      {selectedRole && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-base text-blue-800">
              Active Role: {selectedRole.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-700 mb-2">
              Resume ranking will prioritize these {selectedRole.keywords.length} keywords:
            </p>
            <div className="flex flex-wrap gap-1">
              {selectedRole.keywords.map((keyword) => (
                <Badge key={keyword} className="bg-blue-600 text-white text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RoleSelector;
