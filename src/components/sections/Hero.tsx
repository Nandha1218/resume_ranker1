
const Hero = () => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-36">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white text-balance leading-tight">
            Find the Perfect Candidate in Seconds
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-white/85">
            AI-powered resume ranking that analyzes skills, experience, and job fit to deliver the top 5
            candidates instantly. Save hours of manual screening with clear, explainable scoring.
          </p>

          <div className="mt-10 text-left mx-auto max-w-3xl text-white/85 space-y-5">
            <p>
              Resume Ranker helps hiring teams quickly identify the most relevant candidates for any role.
              Upload multiple resumes, paste a job description, and receive ranked results with
              domain-specific insights.
            </p>
            <ul className="list-disc list-inside space-y-2 marker:text-white/60">
              <li>Smart matching with role-aware keyword extraction</li>
              <li>Transparent scoring with domain-specific breakdowns</li>
              <li>Fast batch analysis that scales to large uploads</li>
              <li>Privacy-friendly processing right in your browser</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
