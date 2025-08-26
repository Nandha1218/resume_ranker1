
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-4">
          <a href="https://github.com/Nandha1218" target="_blank" rel="noreferrer noopener" className="text-white/75 hover:text-white transition-colors">
            <Github className="h-5 w-5" />
          </a>
          <a href="https://www.linkedin.com/in/nandha-m-38681b250" target="_blank" rel="noreferrer noopener" className="text-white/75 hover:text-white transition-colors">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="mailto:nandhamarikannan2004@gmail.com" className="text-white/75 hover:text-white transition-colors">
            <Mail className="h-5 w-5" />
          </a>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-white/65">
            © {new Date().getFullYear()} Resume Ranker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
