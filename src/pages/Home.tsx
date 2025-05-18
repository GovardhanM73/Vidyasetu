import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Wifi, Video, MessageSquare, Clock, Award, Users, School, Shield, Building, Star, ArrowLeft, ArrowRight } from 'lucide-react';

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gradient' | 'outline' | 'light';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500",
    secondary: "bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500",
    gradient: "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white focus:ring-purple-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
    outline: "border-2 border-white bg-transparent hover:bg-white/10 text-white focus:ring-white",
    light: "bg-white hover:bg-gray-100 text-indigo-900 focus:ring-indigo-500 shadow-md"
  };
  
  const sizeClasses = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-5 py-2.5",
    lg: "text-lg px-6 py-3"
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Hero Section
const Hero = () => (
  <section className="relative pt-24 pb-36 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 opacity-90"></div>
    <div 
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        mixBlendMode: 'overlay'
      }}
    ></div>
    <div className="relative container mx-auto px-4 md:px-6 z-10">
      <div className="max-w-3xl mx-auto text-center text-white">
        <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
          Empowering Rural Education
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Quality Education For <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Every Rural Student</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Break geographical barriers with our digital learning platform designed specifically for rural India. Access world-class education anytime, anywhere.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="gradient" size="lg" className="w-full sm:w-auto">
            Get Started Today
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Watch Demo
          </Button>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
        <path 
          fill="#ffffff" 
          fillOpacity="1" 
          d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  </section>
);

// Stats Section
interface StatItemProps {
  value: number;
  label: string;
  duration?: number;
  suffix?: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      setCount(Math.min(Math.floor(start), end));
      
      if (start >= end) {
        clearInterval(timer);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value, duration, isVisible]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
        {count}{suffix}
      </p>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

const Stats = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Making an Impact in Rural Education
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our platform is transforming how students in rural India access quality education.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        <StatItem value={15000} label="Active Students" suffix="+" />
        <StatItem value={500} label="Rural Schools" suffix="+" />
        <StatItem value={98} label="Satisfaction Rate" suffix="%" />
        <StatItem value={24} label="Indian States Reached" />
      </div>
    </div>
  </section>
);

// Features Section
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
    <div className="p-3 rounded-full bg-gray-50 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: <Wifi className="h-8 w-8 text-pink-500" />,
      title: "Offline Access",
      description: "Download lessons and access them without internet connection, perfect for areas with limited connectivity."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-500" />,
      title: "Comprehensive Curriculum",
      description: "Cover all subjects aligned with national curriculum standards from grades 1-12."
    },
    {
      icon: <Video className="h-8 w-8 text-indigo-500" />,
      title: "Video Lessons",
      description: "Engaging video content created by expert teachers, optimized for low-bandwidth environments."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-pink-500" />,
      title: "Peer Discussion",
      description: "Connect with fellow students from across rural India to share knowledge and collaborate."
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      title: "Self-Paced Learning",
      description: "Learn at your own pace with flexible schedules that accommodate agricultural seasons."
    },
    {
      icon: <Award className="h-8 w-8 text-indigo-500" />,
      title: "Recognized Certifications",
      description: "Earn certificates recognized by educational institutions and employers."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-purple-600 tracking-wider uppercase mb-2">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Designed for Rural Education Needs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform addresses the unique challenges faced by students in rural areas
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
interface StepCardProps {
  number: number;
  title: string;
  description: string;
  gradientColors: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description, gradientColors }) => (
  <div className="bg-white p-6 rounded-xl shadow-md relative">
    <div className={`absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r ${gradientColors} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
      {number}
    </div>
    <div className="text-center pt-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Sign Up for Free",
      description: "Create your account in minutes, no credit card required to start learning",
      color: "from-pink-500 to-pink-400"
    },
    {
      number: 2,
      title: "Select Your Courses",
      description: "Choose from a wide range of subjects and grade levels based on your needs",
      color: "from-purple-500 to-purple-400"
    },
    {
      number: 3,
      title: "Learn at Your Pace",
      description: "Access course materials anytime, anywhere, even offline after initial download",
      color: "from-indigo-500 to-indigo-400"
    },
    {
      number: 4,
      title: "Earn Certificates",
      description: "Complete assessments and receive recognized certifications for your achievements",
      color: "from-blue-500 to-blue-400"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-purple-600 tracking-wider uppercase mb-2">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Start Your Learning Journey in 4 Simple Steps
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our straightforward process makes education accessible to everyone
          </p>
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
                gradientColors={step.color}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
interface TestimonialCardProps {
  name: string;
  role: string;
  location: string;
  image: string;
  content: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  name, 
  role,
  location,
  image, 
  content, 
  rating 
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100 hover:shadow-lg transition-shadow duration-300">
    <div className="text-6xl font-serif text-purple-100 leading-none mb-4">"</div>
    <p className="text-gray-700 mb-6">{content}</p>
    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
    <div className="flex items-center">
      <img 
        src={image} 
        alt={name} 
        className="w-12 h-12 rounded-full object-cover mr-4" 
      />
      <div>
        <p className="font-medium text-gray-900">{name}</p>
        <div className="text-sm text-gray-500">
          <span>{role}</span>
          <span className="mx-2">•</span>
          <span>{location}</span>
        </div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Student, Grade 10",
      location: "Jharkhand",
      image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=600",
      content: "EduReach has completely transformed my learning experience. Living in a remote village, I had limited access to quality education. Now I can learn from the best teachers and compete with students across India.",
      rating: 5
    },
    {
      id: 2,
      name: "Rahul Patel",
      role: "Student, Grade 12",
      location: "Rajasthan",
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600",
      content: "I used to travel 15 km to reach school every day. With EduReach, I can study from home and spend more time learning instead of traveling. The offline access feature is a game-changer.",
      rating: 5
    },
    {
      id: 3,
      name: "Meena Kumari",
      role: "Student, Grade 9",
      location: "Uttar Pradesh",
      image: "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=600",
      content: "Being a girl in my village, I faced many barriers to education. EduReach has given me the opportunity to continue learning despite social constraints. The flexible schedule allows me to help at home and still keep up with my studies.",
      rating: 4
    },
    {
      id: 4,
      name: "Arjun Singh",
      role: "Student, Grade 11",
      location: "Bihar",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
      content: "The video lessons are excellent and easy to understand. I can watch them multiple times until I grasp the concepts. The discussion forums help me connect with other students facing similar challenges.",
      rating: 5
    }
  ];

  const nextSlide = () => {
    setCurrentIndex(current => 
      current + 1 >= testimonials.length ? 0 : current + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(current => 
      current - 1 < 0 ? testimonials.length - 1 : current - 1
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-purple-600 tracking-wider uppercase mb-2">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Hear from Our Students
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Success stories from rural students across India
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="block md:hidden">
            <TestimonialCard 
              name={testimonials[currentIndex].name}
              role={testimonials[currentIndex].role}
              location={testimonials[currentIndex].location}
              image={testimonials[currentIndex].image}
              content={testimonials[currentIndex].content}
              rating={testimonials[currentIndex].rating}
            />
          </div>
          
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
            {[0, 1].map(offset => {
              const index = (currentIndex + offset) % testimonials.length;
              return (
                <TestimonialCard 
                  key={testimonials[index].id}
                  name={testimonials[index].name}
                  role={testimonials[index].role}
                  location={testimonials[index].location}
                  image={testimonials[index].image}
                  content={testimonials[index].content}
                  rating={testimonials[index].rating}
                />
              );
            })}
          </div>
          
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {[0, 1, 2].map(offset => {
              const index = (currentIndex + offset) % testimonials.length;
              return (
                <TestimonialCard 
                  key={testimonials[index].id}
                  name={testimonials[index].name}
                  role={testimonials[index].role}
                  location={testimonials[index].location}
                  image={testimonials[index].image}
                  content={testimonials[index].content}
                  rating={testimonials[index].rating}
                />
              );
            })}
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-white border border-gray-200 text-indigo-600 hover:bg-indigo-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-white border border-gray-200 text-indigo-600 hover:bg-indigo-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Partners Section
const Partners = () => {
  const partners = [
    { icon: <BookOpen className="h-12 w-12 text-gray-500" />, name: "National Education Board" },
    { icon: <Users className="h-12 w-12 text-gray-500" />, name: "Rural Development Initiative" },
    { icon: <Award className="h-12 w-12 text-gray-500" />, name: "Digital India Foundation" },
    { icon: <School className="h-12 w-12 text-gray-500" />, name: "State Education Alliance" },
    { icon: <Shield className="h-12 w-12 text-gray-500" />, name: "Technology For All" },
    { icon: <Building className="h-12 w-12 text-gray-500" />, name: "Corporate Social Alliance" },
  ];

  return (
    <section id="partners" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-purple-600 tracking-wider uppercase mb-2">
            Our Partners
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Supported By Leading Organizations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Working together to make quality education accessible to all
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center">
              <div className="mb-3">
                {partner.icon}
              </div>
              <p className="text-sm font-medium text-gray-600">{partner.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTA = () => (
  <section className="py-20">
    <div className="container mx-auto px-4 md:px-6">
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl py-16 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
        
        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Education Journey?
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
            Join thousands of students across rural India who are breaking barriers and accessing quality education from anywhere.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="gradient" 
              size="lg" 
              className="w-full sm:w-auto"
            >
              Get Started Today
            </Button>
            <Button 
              variant="light" 
              size="lg" 
              className="w-full sm:w-auto"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Footer Section

// Main Homepage Component
const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Partners />
        <CTA />
      </main>
    </div>
  );
};

export default Homepage;