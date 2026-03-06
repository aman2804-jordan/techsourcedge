import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import kalamImage from "../assets/Capture.jpeg";


export default function Portfolio() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Our Work Speaks for Itself",
      description: "Explore our portfolio of successful projects and innovations",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop"
    },
    {
      title: "Building Digital Excellence",
      description: "Transforming ideas into powerful solutions",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop"
    },
    {
      title: "Innovation in Every Project",
      description: "Delivering cutting-edge technology solutions worldwide",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop"
    }
  ];

  const projects = [
    {
      title: "Kalam-e-Jazbaat – Poetry Sharing Platform",
category: "Web Application",
description: "A community-driven poetry platform where users can share their handwritten shayaris and explore creative expressions from other poets. The platform includes a submission system for new shayaris, an admin moderation panel for content approval, and a beautifully designed interface for reading and discovering poetry.",
technologies: ["React", "Node.js", "Express.js", "MongoDB", "REST API"],
      image: kalamImage,
      liveUrl: "https://kalamaejazbaaat.vercel.app/",
      githubUrl: "#",
      stats: {
        accuracy: "94%",
        dataPoints: "2M+",
        insights: "Real-time"
      }
    },
    {
      title: "E-Commerce Platform Redesign",
      category: "Web Development",
      description: "Complete redesign and development of a modern e-commerce platform with advanced features including real-time inventory, AI-powered recommendations, and seamless payment integration.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop",
      liveUrl: "#",
      githubUrl: "#",
      stats: {
        users: "50K+",
        uptime: "99.9%",
        performance: "95/100"
      }
    },
    {
      title: "Healthcare Management System",
      category: "Mobile App",
      description: "Comprehensive healthcare management application featuring appointment scheduling, patient records, telemedicine capabilities, and prescription management with HIPAA compliance.",
      technologies: ["React Native", "Firebase", "Node.js", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
      liveUrl: "#",
      githubUrl: "#",
      stats: {
        users: "25K+",
        rating: "4.8/5",
        downloads: "100K+"
      }
    }
    
  ];

  const blogs = [
    {
      title: "The Future of Web Development: Trends to Watch in 2025",
      excerpt: "Explore the latest trends shaping the future of web development, from AI integration to progressive web apps and beyond.",
      author: "Sarah Johnson",
      date: "2025-01-15",
      readTime: "5 min read",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=250&fit=crop",
      tags: ["AI", "PWA", "WebAssembly"]
    },
    {
      title: "Building Scalable Microservices with Node.js",
      excerpt: "A comprehensive guide to designing and implementing microservices architecture using Node.js and Docker for enterprise applications.",
      author: "Michael Chen",
      date: "2025-01-10",
      readTime: "8 min read",
      category: "Backend",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      tags: ["Node.js", "Docker", "Microservices"]
    },
    {
      title: "UI/UX Design Principles That Drive User Engagement",
      excerpt: "Learn the essential design principles that create intuitive, engaging user experiences and boost conversion rates.",
      author: "Emily Rodriguez",
      date: "2025-01-05",
      readTime: "6 min read",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
      tags: ["UX", "Design", "UI"]
    },
    {
      title: "Securing Your Application: Best Practices for 2025",
      excerpt: "Essential security practices every developer should implement to protect applications from modern cyber threats.",
      author: "David Kumar",
      date: "2024-12-28",
      readTime: "7 min read",
      category: "Security",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
      tags: ["Security", "DevSecOps", "Best Practices"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-black">
      {/* Carousel */}
      <div className="relative h-[90vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="flex items-center justify-center h-full text-white text-center px-4">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
        
        <button 
          onClick={prevSlide} 
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>
        <button 
          onClick={nextSlide} 
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition"
        >
          <ChevronRight className="text-white" size={24} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-white text-lg">Showcasing our best work and innovative solutions</p>
          </div>

          <div className="space-y-8">  {/* Changed from space-y-12 */}
  {projects.map((project, index) => (
    <div 
      key={index} 
      className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition ${
        index % 2 === 0 ? 'md:flex' : 'md:flex md:flex-row-reverse'
      }`}
    >
                {/* Project Image */}
                <div className="md:w-5/12">  {/* Changed from md:w-1/2 */}
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 md:h-full object-cover"  /* Changed from h-64 */
        />
      </div>

                {/* Project Details */}
                <div className="md:w-7/12 p-6">  {/* Changed from md:w-1/2 p-8 */}
        <div className="mb-3">  {/* Changed from mb-4 */}
          <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">  {/* Changed from text-sm */}
            {project.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>  {/* Changed from text-2xl mb-4 */}
        
        <p className="text-gray-600 mb-4 text-sm">{project.description}</p>  {/* Added text-sm */}


                  {/* Technologies */}
                  <div className="mb-4">  {/* Changed from mb-6 */}
          <h4 className="font-semibold text-gray-800 mb-2 text-sm">Technologies Used:</h4>  {/* Added text-sm */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span 
                key={i}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"  /* Changed from px-3, text-sm */
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

                  {/* Stats */}
                   <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b">  {/* Changed from gap-4 mb-6 pb-6 */}
          {Object.entries(project.stats).map(([key, value], i) => (
            <div key={i} className="text-center">
              <div className="text-blue-600 font-bold text-base">{value}</div>  {/* Changed from text-lg */}
              <div className="text-gray-600 text-xs capitalize">{key}</div>  {/* Changed from text-sm */}
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">  {/* Changed from gap-4 */}
          <a 
            href={project.liveUrl}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"  /* Changed from px-6, added text-sm */
          >
            <ExternalLink size={16} />  {/* Changed from size={18} */}
            View Live
          </a>
          <a 
            href={project.githubUrl}
            className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition text-sm"  /* Changed from px-6, added text-sm */
          >
            <Github size={16} />  {/* Changed from size={18} */}
            Source Code
          </a>
        </div>
      </div>
    </div>
  ))}
</div>
</div>
      </section>

      {/* Blog Section */}
      <section className="py-12 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Latest from Our Blog</h2>
            <p className="text-white text-lg">Insights, tutorials, and industry news</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((blog, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-xl transition group">
                {/* Blog Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{blog.readTime}</span>
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
                      Read More
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Blogs Button */}
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
              View All Blog Posts
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-10 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Have a Project in Mind?</h2>
          <p className="text-xl mb-8">Let's collaborate and bring your ideas to life</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link
    to="/contact"
    className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition font-semibold text-center"
  >
    Get In Touch
  </Link>
          </div>
        </div>
      </section>
    </div>
  );
}