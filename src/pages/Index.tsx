
import { Link } from "react-router-dom";

// New sections
import Hero from "@/components/sections/Hero";
// Marketing sections removed
import Footer from "@/components/sections/Footer";

 

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Remove light background elements to keep a consistent dark theme */}
      
      <div className="relative z-10 flex-1">
        {/* Hero Section */}
        <Hero />
        
        {/* Marketing sections removed */}
        
        {/* Instructions Section */}
        <section className="py-16 sm:py-24 relative">
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">How to use Resume Ranker</h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-white/85">
                <div className="flex items-start gap-3">
                  <span className="inline-block h-8 w-8 rounded-full bg-white/12 text-white grid place-items-center font-bold">1</span>
                  <p>Open the tool page using the link below.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="inline-block h-8 w-8 rounded-full bg-white/12 text-white grid place-items-center font-bold">2</span>
                  <p>Upload one or more resumes in PDF or TXT format.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="inline-block h-8 w-8 rounded-full bg-white/12 text-white grid place-items-center font-bold">3</span>
                  <p>Paste the job description for the role you’re hiring for.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="inline-block h-8 w-8 rounded-full bg-white/12 text-white grid place-items-center font-bold">4</span>
                  <p>Click Analyze to generate ranked candidates with scores.</p>
                </div>
                <div className="flex items-start gap-3 sm:col-span-2">
                  <span className="inline-block h-8 w-8 rounded-full bg-white/12 text-white grid place-items-center font-bold">5</span>
                  <p>Review the breakdown by domain expertise and key skills.</p>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/hr" className="inline-block rounded-full bg-white text-primary px-6 py-3 font-semibold shadow hover:opacity-90 transition">
                  Open Resume Ranker Tool
                </Link>
              </div>
              <p className="mt-6 text-sm text-white/70">
                Your files stay private. Processing happens in your browser for maximum privacy.
              </p>
            </div>
          </div>
        </section>
        
        {/* Testimonials removed */}
        
        {/* Pricing removed */}
        
        {/* FAQ removed */}
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
