import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Upload, Key, Settings } from "lucide-react";
import { initializeVisionAPI, getVisionAPIStatus } from "@/lib/google-vision";

interface GCPCredentialsProps {
  onCredentialsLoaded: (success: boolean) => void;
}

const GCPCredentials = ({ onCredentialsLoaded }: GCPCredentialsProps) => {
  const [credentials, setCredentials] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [apiStatus, setApiStatus] = useState(getVisionAPIStatus());

  const handleCredentialsUpload = async () => {
    if (!credentials.trim()) {
      setError("Please paste your GCP credentials JSON");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Parse the JSON credentials
      const parsedCredentials = JSON.parse(credentials);
      
      // Validate required fields
      if (!parsedCredentials.project_id || !parsedCredentials.private_key || !parsedCredentials.client_email) {
        throw new Error("Invalid GCP credentials format. Please check your JSON file.");
      }

      // Initialize the Vision API
      const initialized = initializeVisionAPI(parsedCredentials);
      
      if (initialized) {
        setSuccess(true);
        setApiStatus(getVisionAPIStatus());
        onCredentialsLoaded(true);
        
        // Store credentials in localStorage (in production, use secure storage)
        localStorage.setItem('gcp-credentials', credentials);
        
        // Clear the input for security
        setCredentials("");
      } else {
        throw new Error("Failed to initialize Google Vision API");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load credentials");
      onCredentialsLoaded(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setCredentials(content);
    };
    reader.readAsText(file);
  };

  const clearCredentials = () => {
    localStorage.removeItem('gcp-credentials');
    setSuccess(false);
    setApiStatus(getVisionAPIStatus());
    onCredentialsLoaded(false);
  };

  return (
    <Card className="bg-blue-500/10 border border-blue-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400 text-lg">
          <Key className="h-5 w-5" />
          Google Cloud Vision API Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!success ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="credentials" className="text-blue-300">
                GCP Service Account Credentials (JSON)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="credentials"
                  placeholder="Paste your GCP credentials JSON here..."
                  value={credentials}
                  onChange={(e) => setCredentials(e.target.value)}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  disabled={isLoading}
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            <Button
              onClick={handleCredentialsUpload}
              disabled={!credentials.trim() || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <>
                  <Settings className="h-4 w-4 mr-2 animate-spin" />
                  Initializing...
                </>
              ) : (
                <>
                  <Key className="h-4 w-4 mr-2" />
                  Initialize Vision API
                </>
              )}
            </Button>

            {error && (
              <Alert className="border-red-500/50 bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-300">{error}</AlertDescription>
              </Alert>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <Alert className="border-green-500/50 bg-green-500/10">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-300">
                Google Vision API initialized successfully!
              </AlertDescription>
            </Alert>

            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <h4 className="font-semibold text-blue-300 mb-2">API Status</h4>
              <div className="space-y-2 text-sm text-blue-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Status: Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-blue-400" />
                  <span>Project ID: {apiStatus.projectId}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={clearCredentials}
              variant="outline"
              className="w-full border-red-500/50 text-red-400 hover:bg-red-500/20"
            >
              Clear Credentials
            </Button>
          </div>
        )}

        <div className="text-xs text-blue-300/80 bg-blue-500/10 p-3 rounded-lg">
          <p><strong>Note:</strong> Your GCP credentials are stored locally and never sent to external servers. 
          Make sure you have enabled the Vision API in your Google Cloud Console.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GCPCredentials;
