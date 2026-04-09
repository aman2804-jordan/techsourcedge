import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from 'react-router-dom';


/* -------------------- Utilities -------------------- */
function getDaysAgo(postedDate) {
  const posted = new Date(postedDate);
  const today = new Date();
  const diffTime = today - posted;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Posted today";
  if (diffDays === 1) return "Posted 1 day ago";
  return `Posted ${diffDays} days ago`;
}

/* -------------------- Data -------------------- */
const slides = [
  {
    title: "Join Our Dynamic Team",
    description: "Build your career with innovative technology leaders",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop",
  },
  {
    title: "Shape the Future of Technology",
    description: "Work on cutting-edge projects that make a difference",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop",
  },
  {
    title: "Grow with Industry Experts",
    description: "Learn from the best and advance your professional journey",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop",
  },
];

const jobs = [
  {
    title: "Angular Frontend Developer",
    type: "WFO • Full Time",
    postedDate: "2026-04-08",
    description:
      "We're looking for an experienced Angular Developer proficient in Angular, TypeScript, and modern web development practices.",
    requirements: [
      "7+ years of experience",
      "Strong Handson and Coding Skills in Angular and TypeScript",
      "Good Communication and Interpersonal Skills",
    ],
  },
  {
    title: "SAP FICO Consultant",
    type: "WFO • Full Time",
    postedDate: "2026-04-01",
    description:
      "Join our design team and create beautiful, user-friendly interfaces for our clients' projects.",
    requirements: [
      "3+ years experience",
      "a strong foundation in finance/controlling (AP, AR, GL, AA)",
      "configuration experience",
      "typically with a Bachelor’s/Master’s in Commerce or MBA Finance",
    ],
  },
  {
    title: "International Voice Process",
    type: "On-site • Full Time",
    postedDate: "2026-03-09",
    description:
      "Help our clients by involving in managing customer interactions, such as support or sales, for global clients.",
    requirements: ["1+ years International Voice experience", "Ability to work in a fast-paced environment.", "Good Communication and Interpersonal Skills"],
  },
  {
    title: "DevOps Engineer",
    type: "Remote • Full Time",
    postedDate: "2026-02-27",
    description:
      "Manage and optimize our cloud infrastructure and deployment pipelines.",
    requirements: ["4+ years experience as Devops Engineer","Proficiency in scripting languages like Python, PowerShell, etc", "Proficiency in Docker for packaging applications and Kubernetes for managing containers", "Hands-on experience with CI/CD tools", "Nice to have Certification in cloud platforms like AWS certified DevOps engineer"
    ],
  },
  {
    title: "JAVA Developer",
    type: "On-Site • Full Time",
    postedDate: "2026-04-08",
    description:
      "designs, builds, and maintains high-performance, scalable Java-based applications,",
    requirements: ["5+ years of experience in Java development, with a proven track record in software design.","Design and implement complex Java/J2EE applications, ensuring high reliability and performance.", "Lead technical design discussions, define software architecture, and ensure best practices are followed.", "Deep knowledge of Java 8/11/17, J2EE, and frameworks like Spring Boot, Spring MVC, and Hibernate."],
  },
  {
    title: "Wordpress Developer",
    type: "Onsite • Full Time",
    postedDate: "2026-03-26",
    description:
      "Experience is typically expected to possess advanced knowledge of WordPress core, custom theme development, and plugin customization. They must be proficient in PHP, MySQL, JavaScript, HTML5, and CSS3, with a strong focus on building responsive, secure, and high-performance WordPress websites. Additionally, they should have experience with version control systems, such as Git, and be familiar with best practices for website optimization and security.",
    requirements: [" Generally 3+ years of experience in WordPress development and engineering.",
      "Custom Development: Architect and build custom WordPress themes, plugins, and functionalities from scratch based on project specifications.",
      "API Integrations: Integrate third-party APIs, CRM tools, and payment gateways (e.g., Stripe, PayPal).",
      "Security & Maintenance: Implement robust security measures, manage backups, and perform regular updates to protect against threats.",
    ],
  },
];

/* -------------------- Component -------------------- */
export default function Career() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-black">
      {/* ---------------- Carousel ---------------- */}
      <div id="hero-carousel" className="relative h-[90vh] overflow-hidden" >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex items-center justify-center h-full text-white text-center px-4">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full"
        >
          <ChevronLeft className="text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full"
        >
          <ChevronRight className="text-white" />
        </button>
      </div>

      {/* ---------------- Content ---------------- */}
      <div className="px-4 py-16 max-w-7xl mx-auto bg-black"  >
        <h2 className="text-4xl text-white font-bold text-center mb-12">
          Career Opportunities
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
            >
              <h4 className="text-xl font-semibold mb-1">{job.title}</h4>
              <p className="text-blue-600 mb-1">{job.type}</p>
              <p className="text-sm text-gray-500 mb-3">
                {getDaysAgo(job.postedDate)}
              </p>

              <p className="text-gray-600 mb-4">{job.description}</p>

              <ul className="text-sm text-gray-600 mb-4 space-y-1">
                {job.requirements.map((req, i) => (
                  <li key={i}>• {req}</li>
                ))}
              </ul>
               <Link to="/apply"className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Apply Now
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Don't See Your Role?</h3>
          <p className="mb-6">
            We're always looking for talented individuals. Send us your resume.
          </p>
          <Link to="/apply"className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
    Submit General Application
</Link>
        </div>
      </div>
    </div>
  );
}