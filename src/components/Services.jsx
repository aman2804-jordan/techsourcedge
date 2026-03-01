import React from 'react';
import { Images, Code, SquarePen, Users, Smartphone, MonitorCog, WalletMinimal, Monitor, Cloud, Camera } from 'lucide-react';


export default function Services() {
  const services = [
    { icon: Camera, title: "Digital Marketing", desc: "leverages internet-connected technologies to promote Websites, products, services, and brands" },
    { icon: Images, title: "Graphic Designing", desc: "We design social media posts, logos, branding, and layouts,using visuals to communicate messages, ideas." },
    { icon: Code, title: "Web Development",desc:" Building, creating, and maintaining websites. It includes aspects such as web design, web publishing, web programming, and database management. " },
    { icon: SquarePen, title: "Content Writing", desc: "We plan, research, create, and edit web-based material, such as blog posts, articles, and social media, designed to inform, publish, entertain, or persuade a target audience" },
    { icon: Users, title: "IT & ITes Recruitment", desc: "connecting people with the right jobs, and employers with the right people. We are into both IT & Non-IT Recruitment Processes" },
    { icon: Smartphone, title: "Mobile Solutions", desc: "We Develope & Design software to run on smartphones, tablets, and wearable devices, primarily categorized into native (platform-specific), web-based, and hybrid types." },
    { icon: MonitorCog, title: "Infrastructure", desc: "We Provide the support, management, maintenance, and optimization of an organization's technology foundation—hardware, software, networks, and cloud services" },
    { icon: WalletMinimal, title: "Payment Gateway", desc: "We Provide secure, cloud-based technology service that acts as an intermediary between an e-commerce website/app and a bank, enabling businesses to authorize, process, and manage digital payments" },
    { icon: Monitor, title: "Software Development", desc: "We design, create, test, and maintain computer programs and applications Provide Tailored software solutions for your business" },
    { icon: Cloud, title: "DevOps", desc: "Set of practices, tools, and a cultural philosophy that automate and integrate the processes between software development and IT Operations teams" }
  ];

  return (
    <section className="pt-4 pb-10 px-4 bg-black" id="services">
      
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <Icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}