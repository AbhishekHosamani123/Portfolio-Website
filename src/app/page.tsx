"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Award, 
  FileText,
  MapPin,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  ChevronRight,
  GitBranch,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Play,
  Calendar,
  Users,
  Star,
  Image as ImageIcon,
  Menu,
  X,
  Trophy,
  Activity,
  Briefcase,
  Monitor,
  Check,
  Send,
  Code,
  Shield,
  Layers3,
  Bookmark,
  Video
} from "lucide-react";

// --- ANIMATED COUNTER HELPER ---
function AnimatedCounter({ value, suffix = "", delay = 0 }: { value: number; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = Math.abs(Math.floor(duration / value));
    
    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        start += Math.ceil(value / 30);
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, Math.max(stepTime, 25));
      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return <span className="font-mono">{count}{suffix}</span>;
}

// --- DATA DEFINITIONS ---

interface ProjectItem {
  id: string;
  category: "ai" | "web" | "automation" | "data";
  title: string;
  description: string;
  detailDescription: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  metric: string;
  type: "gitchat" | "ats" | "valentine" | "affiliate" | "saarthi" | "whatsapp";
  videoUrl?: string;
  youtubeUrl?: string;
}

interface EventItem {
  id: string;
  category: "hackathons" | "workshops" | "leadership" | "judging" | "achievements" | "community";
  title: string;
  subtitle: string;
  description: string;
  detailDescription: string;
  date: string;
  location: string;
  metric: string;
  type: "certificate" | "badge" | "event" | "code";
  imgUrl?: string;
}

const cardColors = [
  "#009E49", // Green
  "#3D00FF", // Blue
  "#FF4B1F", // Red
  "#FF9F00", // Orange
  "#8B5CF6"  // Purple
];

const projectsData: ProjectItem[] = [
  {
    id: "gitchat",
    category: "ai",
    title: "GitChat AI",
    description: "Production-ready codebase RAG query assistant utilizing Pinecone namespace scopes and FastAPI.",
    detailDescription: "GitChat answers complex codebase structure queries. It splits source code repositories into semantic chunks, generates Ada embeddings, scopes them dynamically inside Pinecone VectorDB namespaces to avoid branch cross-contamination, and generates answers using Claude and GPT endpoints via OpenRouter APIs.",
    techStack: ["FastAPI", "Pinecone VectorDB", "OpenRouter APIs", "Claude & GPT", "PostgreSQL", "Supabase", "RAG Architecture"],
    demoUrl: "https://gitchat.framer.website/",
    githubUrl: "https://github.com/AbhishekHosamani123/GitChat-Framer-deployment-",
    caseStudyUrl: "#",
    metric: "40% Latency Drop",
    type: "gitchat",
    videoUrl: "/GitChat_Demo.mp4"
  },
  {
    id: "ats",
    category: "ai",
    title: "ATS Resume Analyzer",
    description: "LLM-powered resume parsing and scoring system aligning candidates against job descriptions.",
    detailDescription: "Evaluates standard document structures (PDF/DOCX) against Job Descriptions to generate instant ATS score grades. It uses structured GPT extraction schemas to diagnose format defects, density flaws, and missing keyword vectors.",
    techStack: ["OpenAI API", "FastAPI Backend", "Supabase DB", "React & Tailwind"],
    githubUrl: "https://github.com/AbhishekHosamani123/Ai-Resume-Builder",
    caseStudyUrl: "#",
    metric: "Structured AI Grades",
    type: "ats",
    videoUrl: "/ATS Resume Video.mp4"
  },
  {
    id: "valentine",
    category: "web",
    title: "Valentine Campaign Platform",
    description: "High-performance marketing platform that processed ₹7,980 in customer transactions.",
    detailDescription: "A fully deployed consumer application with Razorpay integration, secure webhook listeners, live transactional database state tracking, and AWS S3 order image cataloging. Generated real cash flow during active campaigns.",
    techStack: ["Razorpay Payments", "Supabase Backend", "AWS S3 Uploads", "REST APIs"],
    demoUrl: "https://www.instagram.com/p/DUq_v7IE9TL/?hl=en",
    githubUrl: "https://www.instagram.com/p/DUq_v7IE9TL/?hl=en",
    caseStudyUrl: "#",
    metric: "₹7,980 Revenue",
    type: "valentine",
    videoUrl: "/Valentine_Campaign_Platform.mp4"
  },
  {
    id: "affiliate",
    category: "automation",
    title: "Affiliate Marketing Pipeline",
    description: "Serverless synchronization scripts publishing metrics to Instagram, Telegram, and Pinterest.",
    detailDescription: "An automated cron-driven publishing pipeline executing serverless AWS Lambda microservices to scraping, sync, and publish affiliate marketing catalogs across APIs without local servers.",
    techStack: ["Python Scraper", "AWS Lambda", "Supabase DB", "Telegram & Pinterest APIs"],
    githubUrl: "https://github.com/AbhishekHosamani123/Affiliate-Marketing-Automation",
    metric: "Serverless Automation",
    type: "affiliate"
  },
  {
    id: "saarthi",
    category: "data",
    title: "Saarthi AI",
    description: "WhatsApp RAG communication bridge querying crop predictions and yield models.",
    detailDescription: "An agritech communication service connecting WhatsApp Business APIs to N8N workflows. It queries predictive crop yields utilizing Scikit-Learn models trained on 500+ regional historical harvest reports.",
    techStack: ["Scikit-Learn Regression", "N8N workflows", "WhatsApp API", "Supabase Tables"],
    demoUrl: "https://youtu.be/bdWmysTbEUU?si=OAcUQbyKITcy0Kon",
    githubUrl: "https://github.com/AbhishekHosamani123/SaarthiAI-New",
    metric: "92% Yield Accuracy",
    type: "saarthi",
    youtubeUrl: "https://www.youtube.com/embed/bdWmysTbEUU"
  },
  {
    id: "whatsapp",
    category: "automation",
    title: "WhatsApp AI Bot",
    description: "Customer conversational routing bot classifying user intent and logging CRM pipelines.",
    detailDescription: "Processes customer chat streams, logs context sessions, and maps sales intent directly to CRM pipeline databases using LangChain routers.",
    techStack: ["WhatsApp Business API", "Python Router", "LangChain LLM", "CRM Integration"],
    githubUrl: "https://github.com/AbhishekHosamani123/whatsapp-bot-render",
    metric: "Automated Intent Scopes",
    type: "whatsapp"
  }
];

const eventsData: EventItem[] = [
  {
    id: "scienceday",
    category: "achievements",
    title: "Science Day Winner",
    subtitle: "Gogte College of Commerce",
    description: "1st Place overall for technical presentation at Next Gen Expo 2025.",
    detailDescription: "Achieved first place overall out of competing participants at the National Science Day Next Gen Expo. Presented system architectural workflow designs and optimization metrics.",
    date: "Feb 28, 2025",
    location: "KLS GCC, Belagavi",
    metric: "1st Place Winner",
    type: "certificate",
    imgUrl: "/journey/Science day exhibition winner.jpg"
  },
  {
    id: "yukti",
    category: "judging",
    title: "Yukti 2K26 Judge",
    subtitle: "VTU Campus Evaluator",
    description: "Invited as Chief Guest & Jury Judge for VTU regional student hackathons.",
    detailDescription: "Invited by VTU departments to act as Chief Guest and technical evaluator for student algorithms, coding challenges, and prototype presentations. Mentored student teams during debugging intervals.",
    date: "April 10, 2026",
    location: "VTU Campus, Belagavi",
    metric: "Chief Guest & Judge",
    type: "badge",
    imgUrl: "/journey/Judge_at_Yukti_fest_2k26.jpeg"
  },
  {
    id: "niit",
    category: "workshops",
    title: "NIIT Workshop Conductor",
    subtitle: "Data Analytics Instruction",
    description: "Delivered Power BI & dashboarding instruction to 120+ students.",
    detailDescription: "Instructed a comprehensive technical training session. Covered database connectors, dashboard modeling, and Power BI interface logic for 120+ computer science students.",
    date: "Jan 15, 2026",
    location: "NIIT Institute, Belagavi",
    metric: "120+ Trained",
    type: "code",
    imgUrl: "/journey/Data Analytics Workshop.jpg"
  },
  {
    id: "evogen26",
    category: "leadership",
    title: "Evogen 2026 Event Head",
    subtitle: "Data Science Lead",
    description: "Led operations, setups, and evaluation criteria for regional tech events.",
    detailDescription: "Managed core technical setups, database evaluations, and contestant grading parameters for the flagship Data Science event at Evogen 2026.",
    date: "March 5, 2026",
    location: "KLS GCC Campus",
    metric: "Core Event Head",
    type: "event",
    imgUrl: "/journey/evogenHead.jpeg"
  },
  {
    id: "evogen25",
    category: "leadership",
    title: "Evogen 2025 Round Head",
    subtitle: "Competition Manager",
    description: "Managed round challenges and grading code metrics at Evogen 2025.",
    detailDescription: "Orchestrated competitive problem sheets and evaluated python outputs for teams contesting in Data Science tournament rounds.",
    date: "March 12, 2025",
    location: "KLS GCC Campus",
    metric: "Round Manager",
    type: "event",
    imgUrl: "/journey/evogen 2025 round head.jpg"
  },
  {
    id: "devfest",
    category: "community",
    title: "Google DevFest",
    subtitle: "Participant GDG Hubli",
    description: "Collaborated on scaling API systems with Google developer leads.",
    detailDescription: "Participated in GDG DevFest 2024. Explored scalable system architecture guidelines, serverless computing modules, and LLM orchestration configurations.",
    date: "Nov 24, 2024",
    location: "Hubli, India",
    metric: "Community Member",
    type: "badge",
    imgUrl: "/journey/Google dev Fest 2k24.jpg"
  },
  {
    id: "alines",
    category: "hackathons",
    title: "Alines 2.0 Hackathon",
    subtitle: "Competitor & Developer",
    description: "Built automated serverless scraping pipelines in 24 hours.",
    detailDescription: "Designed and coded serverless automation workflows connecting social API scopes under rapid development hackathon rules.",
    date: "Dec 5, 2025",
    location: "Online / Global",
    metric: "Pipeline Developer",
    type: "code",
    imgUrl: "/journey/Alines 2.0 hackathon.jpg"
  },
  {
    id: "hackfest",
    category: "hackathons",
    title: "Hackfest GCC Runner-Up",
    subtitle: "Inter-College Hackathon",
    description: "2nd Place runner-up in algorithm modeling & problem-solving.",
    detailDescription: "Captured second place out of participating inter-college coders. Devised algorithms for rapid API sync, schema generation, and routing configurations.",
    date: "Jan 22, 2025",
    location: "KLS GCC Campus",
    metric: "2nd Place Winner",
    type: "certificate",
    imgUrl: "/journey/HackFest 2nd Price In Gogte collage of commerce.jpeg"
  },
  {
    id: "magnum",
    category: "achievements",
    title: "Magnum Opus Winner",
    subtitle: "Project Presentation Award",
    description: "Won honors for project presentation and backend design execution.",
    detailDescription: "Recognized for engineering complexity and outstanding project execution presenting agritech RAG integrations to panel judges.",
    date: "May 18, 2025",
    location: "GCC Exhibition Hall",
    metric: "Technical Honors",
    type: "certificate",
    imgUrl: "/journey/Magnum Winner.jpg"
  },
  {
    id: "githack",
    category: "hackathons",
    title: "Git Hackathon",
    subtitle: "Collaborative Agent Architect",
    description: "Built Git-monitored multi-agent models under live constraints.",
    detailDescription: "Engineered multi-agent prompt trees executing Git commit triggers to automate document generation across active branches.",
    date: "July 8, 2025",
    location: "Online Portal",
    metric: "Agent Architect",
    type: "badge",
    imgUrl: "/journey/GIT Havkathon.jpg"
  }
];

// --- TECH JOURNEY GALLERY CAROUSEL DATA & COMPONENT ---
interface JourneyGalleryItem {
  id: number;
  title: string;
  eventName: string;
  year: string;
  imgUrl: string;
  description: string;
}

const journeyGalleryItems: JourneyGalleryItem[] = [
  { id: 1, title: "Science Day Winner", eventName: "National Science Day Expo", year: "2025", imgUrl: "/journey/Science day exhibition winner.jpg", description: "Won 1st Place overall at KLS Gogte College of Commerce Next Gen Expo." },
  { id: 2, title: "Yukti 2K26 Chief Guest", eventName: "VTU Coding Fest", year: "2026", imgUrl: "/journey/Judge_at_Yukti_fest_2k26.jpeg", description: "Invited as Chief Guest and Jury Judge for regional programming and hackathon rounds." },
  { id: 3, title: "Hackfest Runner-Up", eventName: "GCC Hackfest", year: "2025", imgUrl: "/journey/HackFest 2nd Price In Gogte collage of commerce.jpeg", description: "Secured 2nd Place in algorithm modeling and problem solving." },
  { id: 4, title: "Evogen Event Head", eventName: "Evogen Data Science 2026", year: "2026", imgUrl: "/journey/evogenHead.jpeg", description: "Led operations, setups, and evaluation criteria for regional tech events." },
  { id: 5, title: "NIIT Guest Lecture", eventName: "Data Analytics Bootcamp", year: "2026", imgUrl: "/journey/Data Analytics Workshop.jpg", description: "Instructed 120+ computer science students on advanced Power BI dashboarding." },
  { id: 6, title: "Internship Certificate", eventName: "Inera Software AI Intern", year: "2025", imgUrl: "/journey/Inera Software Internship.jpg", description: "Completed internship constructing production RAG databases and FastAPI routers." },
  { id: 7, title: "GDG DevFest Hubli", eventName: "Google Developer Group", year: "2024", imgUrl: "/journey/Google dev Fest 2k24.jpg", description: "Participated and collaborated on scaling APIs with Google developer leads." },
  { id: 8, title: "Alines Hackathon Entry", eventName: "Alines 2.0 Hackathon", year: "2025", imgUrl: "/journey/Alines 2.0 hackathon.jpg", description: "Coded and deployed AWS serverless scraping pipelines in 24 hours." },
  { id: 9, title: "Magnum Opus Honors", eventName: "GCC Project Expo", year: "2025", imgUrl: "/journey/Magnum Winner.jpg", description: "Recognized for engineering complexity in project presentation & backend design." },
  { id: 10, title: "Git Hackathon Winner", eventName: "Git Hackfest", year: "2025", imgUrl: "/journey/GIT Havkathon.jpg", description: "Built Git-monitored multi-agent models under strict constraints." },
  { id: 11, title: "Visit At VTU", eventName: "VTU Campus Seminar", year: "2026", imgUrl: "/journey/Visit At VTU.jpg", description: "Visited VTU departments for technical exchange and judging invitations." },
  { id: 12, title: "Evogen 2025 Round Head", eventName: "Evogen 2025", year: "2025", imgUrl: "/journey/evogen 2025 round head.jpg", description: "Managed challenge rounds and py-grading metrics for contesting teams." },
  { id: 13, title: "Evogen Data Analytics", eventName: "Evogen 2025", year: "2025", imgUrl: "/journey/Evogen Data Analytics 2025.jpg", description: "Facilitated student grading database and dashboard evaluation criteria." },
  { id: 14, title: "Power BI Workshop", eventName: "NIIT Lab Instruction", year: "2026", imgUrl: "/journey/Data Analytics Workshop 1.jpg", description: "Guiding students through dashboard structures and database connectors." },
  { id: 15, title: "Google DevFest Panel", eventName: "GDG Conference", year: "2024", imgUrl: "/journey/Google dev Fest 2k24 1.jpg", description: "Discussed LLM orchestration setups with developer leads." },
  { id: 16, title: "Yukti Evaluator Panel", eventName: "VTU Campus Judging", year: "2026", imgUrl: "/journey/Judge_at_Yukti_fest_2k26_2.jpeg", description: "Critiqued final rounds of student web and algorithm presentations." },
  { id: 17, title: "Closing Ceremony", eventName: "Evogen 2026 Committee", year: "2026", imgUrl: "/journey/evogen6.jpg", description: "Group photo and awards ceremony for organizers of Evogen 2026." },
  { id: 18, title: "Core Committee Briefing", eventName: "Evogen 2026 Team", year: "2026", imgUrl: "/journey/evogen7.jpg", description: "Supervised pipeline indexing and scoring databases for data analytics." },
  { id: 19, title: "Interactive Dashboarding", eventName: "NIIT Workshop Session", year: "2026", imgUrl: "/journey/Data Analytics Workshop 3.jpg", description: "Teaching dataset cleanup and modeling to analytics students." },
  { id: 20, title: "Organizing Committee", eventName: "Evogen 2026 Group", year: "2026", imgUrl: "/journey/evogenGroup_Photo.jpeg", description: "Final group picture with faculty and student coordinators." },
  { id: 21, title: "Evogen Technical Setups", eventName: "Evogen 2026 Expo", year: "2026", imgUrl: "/journey/evogen1.jpeg", description: "Configuring evaluation parameters and contest setups." },
  { id: 22, title: "Evogen 2025 Python Round", eventName: "Evogen 2025 Lab", year: "2025", imgUrl: "/journey/evogen2.jpeg", description: "Assessing python outputs for contestants." },
  { id: 23, title: "Opening Keynote Address", eventName: "Evogen 2026 Launch", year: "2026", imgUrl: "/journey/evogen3.jpeg", description: "Welcoming participants to KLS GCC Data Science Expo." },
  { id: 24, title: "Magnum Presentation Room", eventName: "GCC Project Expo Room", year: "2025", imgUrl: "/journey/evogen4.jpeg", description: "Demonstrating farm prediction model workflows to panel." },
  { id: 25, title: "Git Hackathon Workspace", eventName: "Git Hackfest Hub", year: "2025", imgUrl: "/journey/evogen5.jpeg", description: "Deploying multi-agent prompt loops for document versioning." },
  { id: 26, title: "DevFest Cloud Sessions", eventName: "GDG Cloud Track", year: "2024", imgUrl: "/journey/Google dev Fest 2k24 2.jpg", description: "Attending serverless and scalable APIs tech sessions." },
  { id: 27, title: "DevFest AI Track", eventName: "GDG AI & ML Track", year: "2024", imgUrl: "/journey/Google dev Fest 2k24 3.jpg", description: "Exchanging guidelines on LLM orchestration configurations." },
  { id: 28, title: "Workshop Lab Session", eventName: "Power BI Bootcamp Lab", year: "2026", imgUrl: "/journey/Data Analytics Workshop 2.jpg", description: "Helping students structure Excel dashboards and data connections." },
  { id: 29, title: "Analytics Student Cohort", eventName: "NIIT Student Bootcamps", year: "2026", imgUrl: "/journey/Data Analytics Workshop 4.jpg", description: "Presenting real-world database schema examples to participants." },
  { id: 30, title: "Data Cleanup Demonstration", eventName: "Power BI Workshop Demo", year: "2026", imgUrl: "/journey/Data Analytics Workshop 5.jpg", description: "Running active data transformation queries on visual datasets." },
  { id: 31, title: "Magnum Project Award", eventName: "GCC Magnum Presentation", year: "2025", imgUrl: "/journey/Magnum Winner 1.jpg", description: "Awarded recognition for agronomy predictive model backend." },
  { id: 32, title: "Round Coordinator Briefing", eventName: "Evogen 2025 Setup", year: "2025", imgUrl: "/journey/evogen 2025 round head  2.jpg", description: "Discussing evaluation parameters for Python tournament round." },
  { id: 33, title: "Contest Validation", eventName: "Evogen 2025 Validation", year: "2025", imgUrl: "/journey/evogen 2025 round head 3.jpg", description: "Reviewing contest files and code test-runs before grading." },
  { id: 34, title: "Python Grading Desk", eventName: "Evogen 2025 Desk", year: "2025", imgUrl: "/journey/evogen 2025 round head 4.jpg", description: "Checking Python script execution and indexing scoring metrics." },
  { id: 35, title: "VTU Hackathon Feedback", eventName: "Yukti 2K26 Feedback", year: "2026", imgUrl: "/journey/Judge_at_Yukti_fest_2k26_3.jpeg", description: "Giving architecture and routing reviews to student project teams." },
  { id: 36, title: "Jury Panel Discussion", eventName: "Yukti 2K26 Jury", year: "2026", imgUrl: "/journey/Judge_at_Yukti_fest_2k26._1.jpeg", description: "Consolidating final grades and scores with fellow department judges." },
  { id: 37, title: "Hackfest Trophy Presentation", eventName: "GCC Hackfest Award", year: "2025", imgUrl: "/journey/HackFest 2nd Price In Gogte collage of commerce Image .jpeg", description: "Standing with the GCC Hackfest organizing committee upon receiving 2nd place." }
];

function TechJourneyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [isHovered, setIsHovered] = useState(false);
  
  const items = journeyGalleryItems;
  const length = items.length;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [length]);

  // Auto-play effect
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(timer);
  }, [currentIndex, isHovered]);

  const getXOffset = (diff: number) => {
    if (windowWidth < 640) {
      if (diff === -1) return -130;
      if (diff === -2) return -240;
      if (diff === 1) return 130;
      if (diff === 2) return 240;
      return 0;
    } else if (windowWidth < 1024) {
      if (diff === -1) return -210;
      if (diff === -2) return -390;
      if (diff === 1) return 210;
      if (diff === 2) return 390;
      return 0;
    } else {
      if (diff === -1) return -290;
      if (diff === -2) return -540;
      if (diff === 1) return 290;
      if (diff === 2) return 540;
      return 0;
    }
  };

  return (
    <section 
      className="py-24 md:py-32 max-w-7xl mx-auto px-6 border-t-2 border-zinc-200 overflow-hidden relative"
    >
      <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <span className="bg-[#3D00FF]/5 text-[#3D00FF] px-3 py-1 text-xs font-black uppercase font-mono rounded">
            MEMORIES & MILESTONES
          </span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase font-display mt-4 text-black">
            Tech Journey Gallery
          </h2>
          <p className="text-zinc-650 font-bold text-sm max-w-2xl mt-2">
            A visual timeline of hackathons, workshops, judging events, leadership roles, competitions, community activities, and memorable moments from my technology journey.
          </p>
        </div>

        {/* Carousel controls */}
        <div className="flex gap-3 select-none">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center text-black hover:bg-[#3D00FF] hover:text-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer font-bold"
            aria-label="Previous Slide"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center text-black hover:bg-[#3D00FF] hover:text-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer font-bold"
            aria-label="Next Slide"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5-Slot Horizontal Carousel Area */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full h-[460px] flex items-center justify-center overflow-visible mt-16 select-none"
      >
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
          
          {items.map((item, index) => {
            let diff = index - currentIndex;
            if (diff < -length / 2) diff += length;
            if (diff > length / 2) diff -= length;

            const isVisible = Math.abs(diff) <= 2;
            if (!isVisible) return null;

            const isCenter = diff === 0;
            const isSide = Math.abs(diff) === 1;
            const xOffset = getXOffset(diff);

            return (
              <motion.div
                key={item.id}
                style={{ position: "absolute" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(event, info) => {
                  const threshold = 50;
                  if (info.offset.x < -threshold) {
                    handleNext();
                  } else if (info.offset.x > threshold) {
                    handlePrev();
                  }
                }}
                animate={{
                  x: xOffset,
                  scale: isCenter ? 1.0 : isSide ? 0.85 : 0.70,
                  y: isCenter ? 0 : isSide ? 16 : 32,
                  opacity: isCenter ? 1.0 : isSide ? 0.70 : 0.40,
                  zIndex: 30 - Math.abs(diff) * 10
                }}
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
                onTap={() => {
                  if (diff !== 0) {
                    setCurrentIndex(index);
                  }
                }}
                className={`w-[250px] sm:w-[310px] aspect-[4/5] bg-white border-2 border-black p-4 rounded-xl flex flex-col justify-between select-none transition-shadow ${
                  isCenter ? "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-grab active:cursor-grabbing" : "shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] cursor-pointer"
                } group`}
              >
                {/* Polaroid Image Container */}
                <div className="border border-zinc-200 aspect-[4/3.2] w-full overflow-hidden relative bg-zinc-150 rounded select-none">
                  <img 
                    src={item.imgUrl} 
                    alt={item.title} 
                    draggable={false}
                    className="w-full h-full object-cover pointer-events-none select-none"
                  />
                  
                  {/* Hover overlay showing Short Description */}
                  <div className="absolute inset-0 bg-black/90 text-white flex flex-col justify-center items-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-[10px] font-mono font-black uppercase text-[#FF4B1F]">{item.eventName}</span>
                    <h4 className="text-xs font-black uppercase mt-1.5">{item.title}</h4>
                    <p className="text-[9px] text-zinc-450 mt-1 font-semibold leading-relaxed px-2">{item.description}</p>
                    <span className="text-[8px] font-mono text-zinc-500 mt-2">YEAR: {item.year}</span>
                  </div>
                </div>

                {/* Polaroid Bottom Signature details */}
                <div className="mt-4 font-body border-t border-zinc-100 pt-3 flex flex-col justify-between flex-1 select-none pointer-events-none">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                      {item.eventName}
                    </span>
                    <h4 className="text-sm font-black uppercase text-black leading-tight mt-1 truncate">
                      {item.title}
                    </h4>
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-mono text-zinc-450 font-bold border-t border-zinc-100 pt-2 mt-2">
                    <span>STAMP &bull; GCC</span>
                    <span>{item.year}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>

      <div className="text-center text-[10px] font-mono text-zinc-400 mt-8 uppercase tracking-wider select-none">
        Drag slider, swipe, or use keyboard arrow keys &bull; Click card to center
      </div>
    </section>
  );
}

// --- GITCHAT TERMINAL/CHAT SIMULATOR ---
function GitChatSimulator() {
  const [activeTab, setActiveTab] = useState<"chat" | "dashboard" | "logs">("chat");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "user", text: "How does the Pinecone vector ingestion work?" },
    { sender: "ai", text: "I split the repository code into chunks using character-level splitters, convert them into 1536-dimensional embeddings, and index them in Pinecone with namespace metadata for fast, scoped querying." }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const newMsg = chatInput;
    setMessages(prev => [...prev, { sender: "user", text: newMsg }]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "I've analyzed the query. The repository's FastAPI routers ingest code files and structure the search space via RAG using semantic embeddings.";
      if (newMsg.toLowerCase().includes("author") || newMsg.toLowerCase().includes("abhishek")) {
        aiResponse = "Abhishek Umesh Hosamani is the architect behind me! He built this RAG system to solve code comprehension bottlenecks.";
      } else if (newMsg.toLowerCase().includes("database") || newMsg.toLowerCase().includes("postgres")) {
        aiResponse = "I use PostgreSQL and Supabase to store file structures, metadata, and user chat history for session persistence.";
      }
      setMessages(prev => [...prev, { sender: "ai", text: aiResponse }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl overflow-hidden w-full flex flex-col h-[480px]">
      {/* Simulator Toolbar */}
      <div className="bg-[#111111] px-4 py-3 border-b-2 border-black flex justify-between items-center text-white">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF4B1F]" />
          <div className="w-3 h-3 rounded-full bg-[#FFEA00]" />
          <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
        </div>
        <div className="flex gap-2">
          {["chat", "dashboard", "logs"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded transition-colors cursor-pointer ${
                activeTab === tab 
                  ? "bg-[#3D00FF] text-white" 
                  : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              {tab === "dashboard" ? "Screenshot UI" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Content Area */}
      <div className="flex-1 p-4 bg-zinc-50 overflow-y-auto font-mono text-xs flex flex-col justify-between">
        
        {activeTab === "chat" && (
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-3 overflow-y-auto max-h-[340px] pr-2">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-lg p-3 border border-black/10 shadow-sm text-[11px] leading-relaxed ${
                    msg.sender === "user" 
                      ? "bg-[#FFEA00] text-black font-semibold" 
                      : "bg-[#3D00FF] text-white"
                  }`}>
                    <span className="font-bold block text-[9px] uppercase tracking-wider mb-1 opacity-70">
                      {msg.sender === "user" ? "Recruiter / Visitor" : "GitChat Agent"}
                    </span>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#3D00FF] text-white max-w-[85%] rounded-lg p-3 border border-black/10 shadow-sm text-[11px]">
                    <span className="animate-pulse">Analyzing codebase embeddings...</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="mt-3 flex gap-2 border-t border-black/5 pt-3">
              <input
                type="text"
                placeholder="Ask about Abhishek's repositories stack..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-white text-black font-semibold rounded border border-zinc-200 focus:outline-none"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-[#3D00FF] text-white font-bold hover:bg-black transition-colors rounded shadow-sm cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {activeTab === "dashboard" && (
          <div className="h-full flex flex-col justify-between p-1">
            <div className="border border-zinc-200 bg-white rounded-lg p-3 shadow-inner flex-1 flex flex-col justify-between text-black">
              <div className="flex justify-between items-center border-b border-zinc-100 pb-2 mb-2">
                <span className="text-[10px] font-black uppercase text-[#3D00FF] tracking-wider">GitChat RAG Panel</span>
                <span className="text-[8px] bg-green-150 text-green-800 px-2 py-0.5 rounded-full font-bold">🟢 Connected</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[9px] font-bold">
                <div className="bg-zinc-50 p-2 rounded">
                  <span className="text-zinc-400 block text-[7px] uppercase font-mono">Active Scope</span>
                  <span>Inera-RAG-01</span>
                </div>
                <div className="bg-zinc-50 p-2 rounded">
                  <span className="text-zinc-400 block text-[7px] uppercase font-mono">Total Vectors</span>
                  <span>3,429 Indexed</span>
                </div>
                <div className="bg-zinc-50 p-2 rounded">
                  <span className="text-zinc-400 block text-[7px] uppercase font-mono">Query Latency</span>
                  <span>82ms (FastAPI)</span>
                </div>
                <div className="bg-zinc-50 p-2 rounded">
                  <span className="text-zinc-400 block text-[7px] uppercase font-mono">Recall Rate</span>
                  <span>99.95% Cosine</span>
                </div>
              </div>
              <div className="border border-zinc-100 bg-zinc-950 text-zinc-300 font-mono text-[8px] p-2 mt-2 rounded">
                <div className="text-green-500">// Ingestion Pipeline Logs</div>
                <div>Loaded 52 repos &bull; chunk size: 500</div>
                <div>Upsert status: 100% Success &bull; API Router active</div>
              </div>
            </div>
            <div className="text-center text-[9px] text-zinc-400 mt-2 font-mono uppercase">
              GitChat Interactive Admin Console Mockup
            </div>
          </div>
        )}

        {activeTab === "logs" && (
          <div className="flex-1 bg-zinc-900 text-[#22C55E] p-3 rounded border border-black/10 overflow-y-auto max-h-[380px] font-mono text-[10px] space-y-1">
            <div>[INFO] 2026-06-17 19:35:18 - System boot sequence completed.</div>
            <div>[INFO] Pinecone namespace initialized. Scopes loaded: 12.</div>
            <div>[SUCCESS] Ingested 3,429 tokens from src/app/page.tsx</div>
            <div>[INFO] Vector store similarity match factor set to cosine similarity.</div>
            <div>[INFO] Query received: 'Explain Pinecone vector namespaces'</div>
            <div>[INFO] Searching namespace 'AbhishekHosamani-portfolio-db'...</div>
            <div>[SUCCESS] Found 3 matching context blocks. Retrieval latency: 82ms.</div>
            <div>[INFO] Dispatching system prompt to Claude-3.5-Sonnet via OpenRouter...</div>
            <div>[SUCCESS] Query processed in 1.14 seconds. Tokens consumed: 1,421.</div>
            <div className="animate-pulse">[READY] Listening for system interactions...</div>
          </div>
        )}

      </div>
    </div>
  );
}

// --- MAIN PORTFOLIO COMPONENT ---
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState<"all" | "ai" | "web" | "automation" | "data">("all");
  const [proofFilter, setProofFilter] = useState<"all" | "hackathons" | "workshops" | "leadership" | "judging" | "achievements" | "community">("all");
  
  // Lightbox selection states
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  // Video Demo state for lightbox
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // GitHub contribution mock cells
  const [heatmapCells, setHeatmapCells] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const cells = Array.from({ length: 98 }, (_, i) => {
      const levels = [0, 1, 2, 3, 4];
      const randomLevel = levels[Math.floor(Math.random() * (i % 7 === 0 ? 2 : 5))];
      return randomLevel;
    });
    setHeatmapCells(cells);
  }, []);

  const filteredProjects = projectFilter === "all" 
    ? projectsData 
    : projectsData.filter(item => item.category === projectFilter);

  const filteredEvents = proofFilter === "all" 
    ? eventsData 
    : eventsData.filter(item => item.category === proofFilter);

  // Close lightboxes on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
        setSelectedEvent(null);
        setIsVideoPlaying(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F8F6F2] text-black font-body scroll-smooth selection:bg-[#3D00FF] selection:text-white transition-colors duration-300">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#F8F6F2] border-b-2 border-black px-6 sm:px-8 py-4 max-w-7xl mx-auto flex justify-between items-center">
        <div
          className="text-xl sm:text-2xl tracking-tight font-black uppercase text-black flex items-center gap-2 select-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <Sparkles className="w-5 h-5 text-[#3D00FF] fill-current animate-pulse" />
          Abhishek U.H.
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-xs font-black uppercase tracking-wider items-center">
          <a href="#home" className="transition-colors hover:text-[#3D00FF]">Home</a>
          <a href="#about" className="transition-colors hover:text-[#3D00FF]">About</a>
          <a href="#gitchat" className="transition-colors hover:text-[#3D00FF]">GitChat</a>
          <a href="#projects" className="transition-colors hover:text-[#3D00FF]">Project Showcase</a>
          <a href="#proof" className="transition-colors hover:text-[#3D00FF]">Beyond Code</a>
          <a href="#github" className="transition-colors hover:text-[#3D00FF]">Activity</a>
          <a href="#journey" className="transition-colors hover:text-[#3D00FF]">Journey</a>
        </div>

        {/* Social Actions */}
        <div className="hidden md:flex gap-3 items-center">
          <a 
            href="https://github.com/AbhishekHosamani123/" 
            target="_blank" 
            rel="noreferrer" 
            className="p-2 text-black hover:text-[#3D00FF] transition-all"
            aria-label="GitHub Profile"
          >
            <Github className="w-4.5 h-4.5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/abhishek-hosamani/" 
            target="_blank" 
            rel="noreferrer" 
            className="p-2 text-black hover:text-[#3D00FF] transition-all"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4.5 h-4.5" />
          </a>
          <a 
            href="/Abhishek_Hosamani.pdf" 
            target="_blank" 
            rel="noreferrer" 
            download="Abhishek_Hosamani.pdf"
            className="px-4 py-2 bg-[#3D00FF] text-white font-bold uppercase text-xs rounded shadow-sm hover:bg-black transition-all flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center">
          <button 
            className="p-2 text-black hover:text-[#3D00FF] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[69px] left-0 w-full bg-[#F8F6F2] border-b-2 border-black z-40 px-6 py-8 flex flex-col gap-6 animate-fade-rise shadow-lg">
          <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-sm font-black uppercase tracking-wider hover:text-[#3D00FF]">Home</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-sm font-black uppercase tracking-wider hover:text-[#3D00FF]">About</a>
          <a href="#gitchat" onClick={() => setIsMenuOpen(false)} className="text-sm font-black uppercase tracking-wider hover:text-[#3D00FF]">GitChat</a>
          <a href="#projects" onClick={() => setIsMenuOpen(false)} className="text-sm font-black uppercase tracking-wider hover:text-[#3D00FF]">Project Showcase</a>
          <a href="#proof" onClick={() => setIsMenuOpen(false)} className="text-sm font-black uppercase tracking-wider hover:text-[#3D00FF]">Beyond Code</a>
          <a href="#github" onClick={() => setIsMenuOpen(false)} className="text-sm font-black uppercase tracking-wider hover:text-[#3D00FF]">Activity</a>
          <a href="#journey" onClick={() => setIsMenuOpen(false)} className="text-sm font-black uppercase tracking-wider hover:text-[#3D00FF]">Journey</a>
          
          <div className="flex gap-3 mt-4 border-t border-zinc-200 pt-6">
            <a href="https://github.com/AbhishekHosamani123/" target="_blank" rel="noreferrer" className="flex-1 justify-center py-2 bg-white text-black font-bold uppercase text-xs flex items-center gap-2 rounded border border-zinc-200 shadow-sm hover:text-[#3D00FF] transition-all">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/abhishek-hosamani/" target="_blank" rel="noreferrer" className="flex-1 justify-center py-2 bg-white text-black font-bold uppercase text-xs flex items-center gap-2 rounded border border-zinc-200 shadow-sm hover:text-[#3D00FF] transition-all">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
          <a 
            href="/Abhishek_Hosamani.pdf" 
            target="_blank" 
            rel="noreferrer" 
            download="Abhishek_Hosamani.pdf"
            className="w-full justify-center py-2.5 bg-[#3D00FF] text-white font-bold uppercase text-xs flex items-center gap-2 hover:bg-black transition-all text-center rounded"
          >
            <FileText className="w-4 h-4" />
            Download Resume
          </a>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative px-6 py-20 lg:py-32 max-w-7xl mx-auto flex items-center min-h-[850px] lg:min-h-[900px] transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <span className="text-xs font-mono font-black uppercase text-[#3D00FF] tracking-widest bg-[#3D00FF]/5 px-2.5 py-1 rounded">
              Available for Backend & AI Engineering Roles (2026)
            </span>
            
            <h1
              className="text-5xl sm:text-7xl lg:text-[84px] leading-[0.9] tracking-tighter font-black uppercase text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              I BUILD<br />
              INTELLIGENT<br />
              <span className="bg-[#3D00FF] text-white inline-block px-4 py-1.5 rotate-[-1deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-2">
                AI PRODUCTS.
              </span>
            </h1>

            <p className="text-zinc-700 text-sm sm:text-base md:text-lg font-semibold max-w-xl leading-relaxed">
              I am an AI Engineer and Backend Developer specializing in production-grade LLM pipelines, Retrieval-Augmented Generation (RAG), automation frameworks, and scalable APIs that drive clear business results.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#gitchat"
                className="border-2 border-black bg-[#3D00FF] text-white font-black uppercase px-6 py-3.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all text-xs sm:text-sm"
              >
                Inspect Flagship Project
              </a>
              <a 
                href="#projects"
                className="border-2 border-black bg-white text-black font-black uppercase px-6 py-3.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all text-xs sm:text-sm"
              >
                View Project Showcase
              </a>
            </div>
          </div>

          {/* Hero Right Portrait (+35% larger image) */}
          <div className="lg:col-span-5 flex justify-center items-center relative w-full h-[500px] sm:h-[650px] lg:h-[750px]">
            {/* Visual Frame */}
            <div className="absolute inset-0 bg-[#3D00FF]/5 border-2 border-dashed border-[#3D00FF]/20 rounded-3xl" />
            
            {/* Portrait Image Container */}
            <div className="relative z-10 w-full flex justify-center items-center h-full">
              <img 
                src="/Abhi_Image_New.png" 
                alt="Abhishek Umesh Hosamani" 
                className="h-[400px] sm:h-[520px] lg:h-[620px] w-auto object-contain border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 rounded-2xl transition-all duration-300"
              />

              {/* Status Badge 1: Location */}
              <div className="absolute top-12 left-2 md:left-6 bg-white border border-zinc-200 px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[10px] font-mono font-black uppercase rounded flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF4B1F]" />
                Belagavi, India
              </div>

              {/* Status Badge 2: AI Engineer */}
              <div className="absolute top-1/3 -right-4 md:-right-8 bg-white border border-zinc-200 px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[10px] font-mono font-black uppercase rounded flex items-center gap-1.5 rotate-[-3deg]">
                <Cpu className="w-3.5 h-3.5 text-[#3D00FF]" />
                AI Systems Engineer
              </div>

              {/* Status Badge 3: Backend */}
              <div className="absolute bottom-24 -left-4 md:-left-8 bg-white border border-zinc-200 px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[10px] font-mono font-black uppercase rounded flex items-center gap-1.5 rotate-[3deg]">
                <Terminal className="w-3.5 h-3.5 text-green-600" />
                Backend Developer
              </div>

              {/* Status Badge 4: Available */}
              <div className="absolute bottom-8 right-2 md:right-6 bg-[#22C55E] text-white px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[10px] font-mono font-black uppercase rounded flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                Open To Work
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- ABOUT ME SECTION --- */}
      <section id="about" className="py-24 md:py-32 max-w-7xl mx-auto px-6 border-t-2 border-zinc-200 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 flex flex-col items-start space-y-4">
            <span className="bg-[#3D00FF]/5 text-[#3D00FF] px-3 py-1 text-xs font-black uppercase font-mono rounded">
              WHO IS ABHISHEK?
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase font-display text-black">
              About Me
            </h2>
          </div>
          
          <div className="lg:col-span-8 space-y-6 text-zinc-700 text-sm sm:text-base md:text-lg font-semibold leading-relaxed">
            <p>
              I am a BCA student based in Belagavi, India, currently operating at the intersection of AI systems architecture and production backend engineering. I design and build highly optimized tools utilizing Python, FastAPI, vector search engines, and cloud infrastructures.
            </p>
            <p>
              My experience is backed by practical, real-world impact. As an <strong className="text-black font-black">AI Engineer Intern at Inera Software</strong>, I architected complex RAG retrieval flows and FastAPI backends. As a <strong className="text-black font-black">Data Science Intern at Xcel Corp</strong>, I engineered crop analytics and yield prediction models.
            </p>
            <p>
              I also actively drive community technical growth: conducting workshops training <strong className="text-black font-black">120+ computer science students</strong> on data analytics, acting as a <strong className="text-black font-black">Chief Guest & Judge for VTU regional coding events</strong>, and leading operations for regional hackathons.
            </p>
          </div>
        </div>
      </section>

      {/* --- TECHNOLOGY MARQUEE BAR --- */}
      <section className="border-y-2 border-black bg-white py-4 overflow-hidden select-none">
        <div className="flex whitespace-nowrap">
          <div className="animate-marquee flex gap-8 text-xs font-black uppercase font-mono tracking-widest text-black">
            {["Next.js 15", "TypeScript", "Python", "FastAPI", "Pinecone Vector Store", "Supabase", "RAG Pipeline", "PostgreSQL", "Tailwind CSS", "Framer Motion", "LangChain", "CrewAI Agents", "AWS Lambda", "Serverless Architecture", "N8N Automations", "Scikit-Learn"].map((tech, index) => (
              <div key={index} className="flex items-center gap-3">
                <Sparkles className="w-3.5 h-3.5 fill-current text-[#3D00FF]" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
          {/* Seamless loop duplication */}
          <div className="animate-marquee flex gap-8 text-xs font-black uppercase font-mono tracking-widest text-black" aria-hidden="true">
            {["Next.js 15", "TypeScript", "Python", "FastAPI", "Pinecone Vector Store", "Supabase", "RAG Pipeline", "PostgreSQL", "Tailwind CSS", "Framer Motion", "LangChain", "CrewAI Agents", "AWS Lambda", "Serverless Architecture", "N8N Automations", "Scikit-Learn"].map((tech, index) => (
              <div key={index} className="flex items-center gap-3">
                <Sparkles className="w-3.5 h-3.5 fill-current text-[#3D00FF]" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FLAGSHIP CASE STUDY: GITCHAT --- */}
      <section id="gitchat" className="px-6 py-24 md:py-32 max-w-7xl mx-auto scroll-mt-20">
        
        {/* Section Header */}
        <div className="mb-12 border-b-4 border-black pb-6">
          <div className="flex items-center gap-3">
            <span className="bg-[#3D00FF] text-white px-3 py-1 text-xs font-black uppercase font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              FLAGSHIP PRODUCTION CASE STUDY
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase font-display mt-4">GitChat AI</h2>
          <p className="text-zinc-600 font-bold text-sm sm:text-base max-w-3xl mt-2">
            A production-ready RAG assistant that turns GitHub codebases into conversational intelligence models using Pinecone namespace scoping, OpenAI embeddings, and FastAPI.
          </p>
        </div>

        {/* Two Column Flagship Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Case Study Details */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Project Details */}
            <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="text-xs uppercase tracking-wider font-mono text-[#3D00FF] font-black mb-3 border-b border-zinc-100 pb-1.5">
                Core Architectural Metrics
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="border border-zinc-200 p-3 bg-zinc-50 rounded">
                  <span className="block font-mono text-2xl font-black text-[#3D00FF]">-40%</span>
                  <span className="text-[9px] uppercase font-black text-zinc-400">Retrieval Latency</span>
                </div>
                <div className="border border-zinc-200 p-3 bg-zinc-50 rounded">
                  <span className="block font-mono text-2xl font-black text-[#3D00FF]">3.4K+</span>
                  <span className="text-[9px] uppercase font-black text-zinc-400">Tokens Processed</span>
                </div>
                <div className="border border-zinc-200 p-3 bg-zinc-50 rounded">
                  <span className="block font-mono text-2xl font-black text-[#3D00FF]">99.9%</span>
                  <span className="text-[9px] uppercase font-black text-zinc-400">Semantic Recall</span>
                </div>
              </div>
            </div>

            {/* In-depth Context */}
            <div className="space-y-4 text-sm font-semibold leading-relaxed text-zinc-700">
              <p>
                To resolve code comprehension bottlenecks, Abhishek designed and deployed GitChat. Rather than loading massive raw codebases into standard prompting windows, the system partitions files into specialized token boundaries, ingests them into vector stores, and retrieves relevant code segments dynamically.
              </p>
              <p>
                <strong>The Engineering Challenge:</strong> Scoping queries to prevent cross-contamination between different project branches. 
                <br />
                <strong>The Solution:</strong> Leveraging Pinecone namespaces dynamically derived from repo commits.
              </p>
            </div>

            {/* Engineered Tech Stack */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-mono text-black font-black mb-3.5 border-b border-zinc-150 pb-1">
                Engineered Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {["FastAPI Backend", "Python", "Pinecone VectorDB", "OpenRouter APIs", "Claude & GPT Models", "PostgreSQL", "Supabase DB", "RAG Arch"].map(tag => (
                  <span key={tag} className="text-xs font-bold font-mono bg-white border border-zinc-200 px-3 py-1.5 shadow-sm rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Demo Call to Action */}
            <div className="flex gap-4">
              <a 
                href="https://gitchat.framer.website/" 
                target="_blank" 
                rel="noreferrer" 
                className="border-2 border-black px-5 py-2.5 bg-white text-black font-bold uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#3D00FF] hover:text-white transition-all flex items-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" />
                Launch Production Site
              </a>
              <a 
                href="https://github.com/AbhishekHosamani123/GitChat-Framer-deployment-" 
                target="_blank" 
                rel="noreferrer" 
                className="border-2 border-black px-5 py-2.5 bg-white text-black font-bold uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#3D00FF] hover:text-white transition-all flex items-center gap-1.5"
              >
                <Github className="w-4 h-4" />
                Examine Repository
              </a>
            </div>

          </div>

          {/* Right Side: Interactive UI Simulator */}
          <div className="lg:col-span-6 w-full">
            <GitChatSimulator />
          </div>

        </div>

      </section>

      {/* --- GALLERY 1: PROJECT SHOWCASE (NEWLY SEPARATED) --- */}
      <section id="projects" className="px-6 py-24 md:py-32 max-w-7xl mx-auto border-t-2 border-zinc-200 scroll-mt-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          <div>
            <span className="bg-[#3D00FF] text-white px-3 py-1 text-xs font-black uppercase font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              PROJECT SHOWCASE
            </span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase font-display mt-4">
              Deployed Software
            </h2>
            <p className="text-zinc-600 font-bold text-sm max-w-xl mt-2">
              Browse production web products, serverless scrapers, and predictive machine learning models. Click any card to launch the lightbox console.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 select-none">
            {([
              { key: "all", label: "All Projects" },
              { key: "ai", label: "AI & RAG" },
              { key: "web", label: "Web Apps" },
              { key: "automation", label: "Automation" },
              { key: "data", label: "Data Analytics" }
            ] as const).map(filter => (
              <button
                key={filter.key}
                onClick={() => setProjectFilter(filter.key)}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded border border-zinc-350 shadow-sm transition-all cursor-pointer ${
                  projectFilter === filter.key ? "bg-[#3D00FF] text-white border-[#3D00FF]" : "bg-white text-zinc-600 hover:text-black"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid (Gallery 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                style={{ "--hover-color": cardColors[index % cardColors.length] } as React.CSSProperties}
                className="border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_var(--hover-color)] transition-all flex flex-col justify-between h-[360px] group cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-start mb-4 border-b border-zinc-100 pb-2 text-[10px] font-mono font-bold uppercase text-zinc-400">
                    <span>{project.category}</span>
                    <span 
                      style={{ 
                        color: cardColors[index % cardColors.length], 
                        backgroundColor: `${cardColors[index % cardColors.length]}10` 
                      }} 
                      className="px-2 py-0.5 rounded font-black text-[9px]"
                    >
                      {project.metric}
                    </span>
                  </div>

                  {/* Visual Frame inside card */}
                  <div className="border border-zinc-200 bg-[#F8F6F2] aspect-video w-full mb-4 flex flex-col justify-center items-center relative overflow-hidden p-4 text-center">
                    
                    {project.type === "gitchat" && (
                      <div className="w-full h-full flex flex-col justify-between p-2 bg-[#111111] text-[#22C55E] font-mono text-[6px] rounded border border-black text-left shadow-inner">
                        <div className="flex justify-between border-b border-zinc-800 pb-1 text-[5px]">
                          <span>https://gitchat.ai</span>
                          <span>🟢 Active</span>
                        </div>
                        <div className="flex-1 py-1">
                          <div>&gt; Loading chunk models...</div>
                          <div className="text-[#FFEA00]">&gt; Pinecone namespaces configured successfully.</div>
                        </div>
                      </div>
                    )}

                    {project.type === "ats" && (
                      <div className="w-full h-full flex flex-col justify-between p-2 bg-white border border-zinc-300 rounded text-left shadow-inner">
                        <span className="text-[7px] font-mono text-[#3D00FF] uppercase border-b border-zinc-100 pb-1">ATS Parser Result</span>
                        <div className="my-1 text-center">
                          <span className="text-2xl font-black text-black font-mono">85%</span>
                          <span className="text-[8px] block text-zinc-400 font-mono">Compatibility Score</span>
                        </div>
                        <span className="text-[6px] text-zinc-500 font-mono">Job Description Match: 🟢 Strong</span>
                      </div>
                    )}

                    {project.type === "valentine" && (
                      <div className="w-full h-full flex flex-col justify-between p-2 bg-red-50/50 border border-red-200 rounded text-center shadow-inner">
                        <span className="text-[7px] font-mono text-red-500 uppercase border-b border-red-100 pb-1">Campaign Revenue Metrics</span>
                        <div className="my-1">
                          <span className="text-xl font-black text-red-600 font-mono">₹7,980</span>
                          <span className="text-[7px] block text-zinc-400">Processed via Razorpay</span>
                        </div>
                        <span className="text-[6px] text-zinc-500">Webhooks & Bull; Deployed</span>
                      </div>
                    )}

                    {project.type === "affiliate" && (
                      <div className="w-full h-full flex flex-col justify-center items-center bg-zinc-900 text-zinc-400 p-2 font-mono text-[6px] rounded">
                        <div className="border border-zinc-700 p-1.5 rounded bg-zinc-950 w-full text-center text-zinc-300">
                          AWS Lambda Trigger (Cron)
                        </div>
                        <div className="text-[5px] text-zinc-500 mt-1">Instagram &bull; Pinterest &bull; Telegram</div>
                      </div>
                    )}

                    {project.type === "saarthi" && (
                      <div className="w-full h-full flex flex-col justify-between p-2 bg-green-50/50 border border-green-200 rounded text-left shadow-inner">
                        <span className="text-[6px] font-mono text-green-600 uppercase border-b border-green-150 pb-1">WhatsApp ML Engine</span>
                        <div className="my-0.5 font-mono text-[7px]">
                          <div>Input: Crop Type = 'Ragi'</div>
                          <div className="text-green-600">Prediction: 12.4 quintals</div>
                        </div>
                      </div>
                    )}

                    {project.type === "whatsapp" && (
                      <div className="w-full h-full flex flex-col justify-center items-center bg-white border border-zinc-200 p-2 rounded shadow-inner text-left font-mono text-[7px]">
                        <span className="text-[#3D00FF] font-black uppercase text-[6px] mb-1">LangChain Pipeline</span>
                        <span className="text-zinc-500">Query router intent matching:</span>
                        <span className="bg-zinc-150 px-1 rounded text-black font-bold mt-1 text-[6px]">Class: CRM_LOG</span>
                      </div>
                    )}

                  </div>

                  {/* Title and Short Description */}
                  <h4 className="text-base font-black uppercase text-black tracking-tight">{project.title}</h4>
                  <p className="text-[11px] font-semibold text-zinc-550 mt-1 leading-relaxed">{project.description}</p>
                </div>

                {/* Tech stack summary pills */}
                <div className="mt-4">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.techStack.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[9px] font-bold font-mono bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">{tag}</span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[9px] font-bold font-mono bg-zinc-100 text-zinc-400 px-2 py-0.5 rounded">+{project.techStack.length - 3}</span>
                    )}
                  </div>

                  <div className="border-t border-zinc-100 pt-3 text-[10px] font-mono font-bold uppercase text-zinc-400 flex justify-between items-center">
                    <span>Inspect Details</span>
                    <span className="text-black group-hover:text-[var(--hover-color)] transition-colors flex items-center gap-1">
                      Open Lightbox <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </section>

      {/* --- SOCIAL PROOF IMPACT STATS (REPOSITIONED) --- */}
      <section className="px-6 py-12 max-w-7xl mx-auto border-t-2 border-zinc-200">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black select-none">
          
          <div className="text-center border-r border-zinc-200 last:border-none flex flex-col justify-center">
            <span className="text-3xl sm:text-4xl font-black font-mono text-[#3D00FF]">
              <AnimatedCounter value={52} suffix="+" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 mt-1">Repositories</span>
          </div>
          
          <div className="text-center md:border-r border-zinc-200 last:border-none flex flex-col justify-center">
            <span className="text-3xl sm:text-4xl font-black font-mono text-[#3D00FF]">
              <AnimatedCounter value={6} suffix="+" delay={200} />
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 mt-1">AI Systems In Prod</span>
          </div>

          <div className="text-center border-r border-zinc-200 last:border-none flex flex-col justify-center">
            <span className="text-3xl sm:text-4xl font-black font-mono text-[#3D00FF]">
              <AnimatedCounter value={4} delay={400} />
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 mt-1">Deployments</span>
          </div>

          <div className="text-center border-r border-zinc-200 last:border-none flex flex-col justify-center">
            <span className="text-3xl sm:text-4xl font-black font-mono text-[#3D00FF]">
              <AnimatedCounter value={120} suffix="+" delay={600} />
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 mt-1">Students Mentored</span>
          </div>

          <div className="text-center flex flex-col justify-center col-span-2 md:col-span-1 border-t-2 md:border-t-0 pt-4 md:pt-0 border-zinc-200">
            <span className="text-3xl sm:text-4xl font-black font-mono text-[#3D00FF]">
              <AnimatedCounter value={2} delay={800} />
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 mt-1">AI Internships</span>
          </div>

        </div>
      </section>

      {/* --- GALLERY 2: BEYOND CODE (EVENT / LEADER GALLERY) --- */}
      <section id="proof" className="px-6 py-24 md:py-32 max-w-7xl mx-auto border-t-2 border-zinc-200 scroll-mt-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          <div>
            <span className="bg-[#FF4B1F] text-white px-3 py-1 text-xs font-black uppercase font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              BEYOND CODE
            </span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase font-display mt-4">
              Community & Leadership
            </h2>
            <p className="text-zinc-600 font-bold text-sm max-w-xl mt-2">
              Verifiable proof of community organization, data science leadership, and tournament judging. Click any card to launch the polaroid lightbox.
            </p>
          </div>

          {/* Filter Event Buttons */}
          <div className="flex flex-wrap gap-2 select-none">
            {([
              { key: "all", label: "All events" },
              { key: "hackathons", label: "Hackathons" },
              { key: "workshops", label: "Workshops" },
              { key: "leadership", label: "Leadership" },
              { key: "judging", label: "Judging" },
              { key: "achievements", label: "Awards" },
              { key: "community", label: "Community" }
            ] as const).map(filter => (
              <button
                key={filter.key}
                onClick={() => setProofFilter(filter.key)}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded border border-zinc-350 shadow-sm transition-all cursor-pointer ${
                  proofFilter === filter.key ? "bg-[#FF4B1F] text-white border-[#FF4B1F]" : "bg-white text-zinc-650 hover:text-black"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Beyond Code Grid (Gallery 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, index) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                style={{ "--hover-color": cardColors[index % cardColors.length] } as React.CSSProperties}
                className="border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_var(--hover-color)] transition-all flex flex-col justify-between h-[360px] group cursor-pointer"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-4 border-b border-zinc-150 pb-2 text-[10px] font-mono font-bold uppercase text-zinc-450">
                    <span>{event.category}</span>
                    <span 
                      style={{ 
                        color: cardColors[index % cardColors.length], 
                        backgroundColor: `${cardColors[index % cardColors.length]}10` 
                      }} 
                      className="px-2 py-0.5 rounded font-black text-[9px]"
                    >
                      {event.metric}
                    </span>
                  </div>

                  {/* Event Physical Graphic Preview */}
                  <div className="border border-zinc-200 bg-[#F8F6F2] aspect-video w-full mb-4 flex flex-col justify-center items-center relative overflow-hidden select-none rounded bg-zinc-100 shadow-inner">
                    {event.imgUrl ? (
                      <img 
                        src={event.imgUrl} 
                        alt={event.title} 
                        className="w-full h-full object-cover pointer-events-none select-none"
                      />
                    ) : (
                      <>
                        {event.type === "certificate" && (
                          <div className="border border-zinc-300 w-full h-full p-2 flex flex-col justify-between items-center bg-[#FAF9F6] relative shadow-inner">
                            <div className="absolute inset-0 border-[3px] border-[#FF4B1F]/5 m-1 pointer-events-none" />
                            <div className="text-[7px] font-serif uppercase tracking-widest text-[#FF4B1F] font-black">Official Certificate</div>
                            <div className="text-[10px] font-display font-black uppercase text-black leading-tight">{event.title}</div>
                            <div className="text-[6px] text-zinc-400 font-mono">{event.subtitle}</div>
                            <div className="w-5 h-5 rounded-full bg-[#FFEA00] flex items-center justify-center font-bold text-[8px] text-black shadow border border-black/10">★</div>
                          </div>
                        )}

                        {event.type === "badge" && (
                          <div className="w-full h-full flex flex-col justify-center items-center bg-[#FAF9F6] border border-dashed border-zinc-300 p-2 shadow-inner">
                            <div className="w-10 h-10 rounded-full bg-[#FF4B1F] flex items-center justify-center text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] mb-1">
                              <Trophy className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-[8px] font-mono font-black uppercase text-black">{event.title}</span>
                            <span className="text-[6px] text-zinc-400 font-mono">{event.metric}</span>
                          </div>
                        )}

                        {event.type === "event" && (
                          <div className="w-full h-full flex flex-col justify-between p-2 bg-[#FAF9F6] border border-zinc-250 relative shadow-inner text-left">
                            <div className="flex justify-between items-center border-b border-zinc-200 pb-1">
                              <span className="text-[5px] font-mono text-zinc-400">ORGANIZATION PASS</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#16D9C4]" />
                            </div>
                            <div className="my-1">
                              <div className="text-[9px] font-black uppercase text-black leading-none">{event.title}</div>
                              <div className="text-[6px] text-[#FF4B1F] font-mono font-bold uppercase mt-1">{event.subtitle}</div>
                            </div>
                            <div className="border-t border-zinc-200 pt-1 flex justify-between items-center text-[5px] font-mono text-zinc-450">
                              <span>{event.date}</span>
                              <span>ROLE: LEAD</span>
                            </div>
                          </div>
                        )}

                        {event.type === "code" && (
                          <div className="w-full h-full flex flex-col justify-between bg-zinc-900 text-[#22C55E] p-2 text-left font-mono text-[7px] rounded shadow-inner">
                            <div className="border-b border-zinc-800 pb-1 flex justify-between text-zinc-500">
                              <span>workshop_conduct.py</span>
                              <span>120+ Trained</span>
                            </div>
                            <div className="flex-1 py-1 text-[6px] text-zinc-400">
                              <div>topic = "{event.title}"</div>
                              <div className="text-[#22C55E] pl-2">status = "Verified"</div>
                            </div>
                            <div className="text-zinc-550 border-t border-zinc-800 pt-1">{event.subtitle}</div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Title and details */}
                  <h4 className="text-base font-black uppercase text-black tracking-tight">{event.title}</h4>
                  <p className="text-[11px] font-semibold text-zinc-500 mt-1 leading-relaxed">{event.description}</p>
                </div>

                <div className="border-t border-zinc-100 pt-3 mt-4 text-[10px] font-mono font-bold uppercase text-zinc-400 flex justify-between items-center">
                  <span>{event.subtitle}</span>
                  <span className="text-black group-hover:text-[var(--hover-color)] transition-colors flex items-center gap-1">
                    Lightbox Proof <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </section>

      {/* --- GITHUB SHOWCASE & LANGUAGE BREAKDOWN --- */}
      <section id="github" className="px-6 py-24 md:py-32 max-w-7xl mx-auto border-t-2 border-zinc-200 scroll-mt-20">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <span className="bg-zinc-100 text-zinc-500 px-3 py-1 text-xs font-black uppercase font-mono rounded">
              GIT ACTIVITY LOGS
            </span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase font-display mt-4">
              Engineering Activity
            </h2>
            <p className="text-zinc-600 font-bold text-sm max-w-xl mt-2">
              Verifiable public commit activity summaries, repository indexations, and framework configurations.
            </p>
          </div>
          
          {/* Detailed repo statistics */}
          <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[280px] font-mono text-[10px] font-bold uppercase space-y-2">
            <div className="flex justify-between border-b border-zinc-100 pb-1">
              <span className="text-zinc-400">Total Public Repos:</span>
              <span className="text-black">52 Active</span>
            </div>
            <div className="flex justify-between border-b border-zinc-100 pb-1">
              <span className="text-zinc-400">Active AI Projects:</span>
              <span className="text-black">10+ Configured</span>
            </div>
            <div className="flex justify-between border-b border-zinc-100 pb-1">
              <span className="text-zinc-400">Primary Language:</span>
              <span className="text-[#3D00FF]">Python (40%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Latest Active:</span>
              <span className="text-black">GitChat (1 day ago)</span>
            </div>
          </div>
        </div>

        {/* Showcase Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Heatmap and Languages */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Heatmap */}
            <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-center text-xs font-mono font-black uppercase border-b border-zinc-100 pb-2 mb-4 text-black">
                <span>Contribution Heatmap Simulation</span>
                <span className="text-green-600 font-bold">500+ Contributions This Year</span>
              </div>
              
              {/* Heatmap Grid */}
              <div className="grid grid-cols-14 gap-1.5 w-full aspect-[4/1] bg-zinc-50 p-4 rounded shadow-inner">
                {isMounted ? (
                  heatmapCells.map((level, idx) => {
                    const bgColors = [
                      "bg-zinc-200", 
                      "bg-[#9be9a8]", 
                      "bg-[#40c463]", 
                      "bg-[#30a14e]", 
                      "bg-[#216e39]", 
                    ];
                    return (
                      <div 
                        key={idx} 
                        className={`${bgColors[level]} aspect-square rounded-sm hover:scale-110 transition-transform cursor-crosshair`}
                        title={`Contributions: Level ${level}`}
                      />
                    );
                  })
                ) : (
                  Array(98).fill(0).map((_, idx) => (
                    <div 
                      key={idx} 
                      className="bg-zinc-250 aspect-square rounded-sm"
                    />
                  ))
                )}
              </div>
              
              <div className="flex justify-between items-center text-[9px] font-mono font-bold mt-4 text-zinc-500">
                <span>Less Active</span>
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 bg-zinc-200 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-[#9be9a8] rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-[#40c463] rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-[#30a14e] rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-[#216e39] rounded-sm" />
                </div>
                <span>More Active</span>
              </div>
            </div>

            {/* Language Breakdown Bar */}
            <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="text-xs uppercase tracking-wider font-mono font-black mb-3 border-b border-zinc-100 pb-1 text-black">
                Public Code Language Composition
              </h4>
              
              {/* Colored Bar */}
              <div className="w-full h-5 flex overflow-hidden rounded mb-4 shadow-sm bg-zinc-100">
                <div className="bg-[#3D00FF] h-full" style={{ width: "40%" }} title="Python: 40%" />
                <div className="bg-[#FFEA00] h-full" style={{ width: "25%" }} title="TypeScript: 25%" />
                <div className="bg-[#16D9C4] h-full" style={{ width: "20%" }} title="JavaScript: 20%" />
                <div className="bg-[#FF4B1F] h-full" style={{ width: "15%" }} title="SQL & Databases: 15%" />
              </div>

              {/* Legends */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#3D00FF] rounded-full" />
                  <span>Python (40%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#FFEA00] rounded-full" />
                  <span>TypeScript (25%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#16D9C4] rounded-full" />
                  <span>JavaScript (20%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#FF4B1F] rounded-full" />
                  <span>SQL & DBs (15%)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Pinned Repositories list */}
          <div className="lg:col-span-4 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="text-xs font-black uppercase font-mono mb-4 border-b-2 border-black pb-2 text-black">
              Pinned Repositories
            </h4>
            <div className="space-y-3">
              {[
                { name: "GitChat-Framer-deployment-", desc: "FastAPI + Pinecone Backend RAG API", lang: "Python" },
                { name: "SaarthiAI", desc: "WhatsApp RAG Predictor yield models", lang: "Python" },
                { name: "Ai-Resume-Builder", desc: "Next.js resume parsing + LLM grading", lang: "TypeScript" },
                { name: "Affiliate-Marketing-Automation", desc: "Serverless AWS Lambda publish script", lang: "Python" }
              ].map((repo, index) => (
                <a 
                  key={repo.name} 
                  href={`https://github.com/AbhishekHosamani123/${repo.name}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ "--hover-color": cardColors[index % cardColors.length] } as React.CSSProperties}
                  className="block border border-zinc-200 bg-zinc-50 p-3 shadow-sm rounded hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--hover-color)] transition-all"
                >
                  <div className="flex items-center justify-between font-bold text-xs">
                    <span className="flex items-center gap-1.5 text-black">
                      <GitBranch 
                        className="w-3.5 h-3.5" 
                        style={{ color: cardColors[index % cardColors.length] }} 
                      />
                      {repo.name}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400">{repo.lang}</span>
                  </div>
                  <p className="text-[10px] text-zinc-550 mt-1 font-semibold leading-relaxed">
                    {repo.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* --- HORIZONTAL TIMELINE / JOURNEY --- */}
      <section id="journey" className="px-6 py-24 md:py-32 max-w-7xl mx-auto border-t-2 border-zinc-200 scroll-mt-20">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="bg-[#FFEA00] text-black px-3 py-1 text-xs font-black uppercase font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            CHRONOLOGICAL GROWTH
          </span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase font-display mt-4">
            Professional Journey
          </h2>
          <p className="text-zinc-600 font-bold text-sm max-w-xl mt-2">
            A linear progression of systems shipped, technical roles held, and verified career milestones.
          </p>
        </div>

        {/* Horizontal scroll timeline track */}
        <div className="relative border-2 border-black bg-white p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden rounded-xl">
          
          {/* Horizontal Line behind */}
          <div className="absolute top-[88px] left-8 right-8 h-0.5 bg-zinc-200 z-0 hidden md:block" />
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 overflow-x-auto pb-4 pt-2 hide-scrollbar relative z-10">
            
            {[
              { year: "2023", title: "Core Software Logic", desc: "Studied memory execution parameters, data structures, and object-oriented algorithms." },
              { year: "2024", title: "Regional Tech Outreach", desc: "Collaborated on architectural design paradigms with system leads at Google DevFest 2024." },
              { year: "2025", title: "ML Engineering Intern", desc: "Engineered predictive crop assessment algorithms yielding 92% evaluation reliability at Xcel Corp." },
              { year: "2025", title: "AI Engineering Intern", desc: "Orchestrated backend pipeline configurations utilizing FastAPI and Pinecone at Inera Software." },
              { year: "2026", title: "Academic & Tech Guest", desc: "Invited to conduct university level lecture Series at NIIT and judge VTU coding challenges." },
              { year: "2026", title: "AI Product Architect", desc: "Currently open to backend developer, software engineer, and AI architect roles globally." }
            ].map((milestone, idx) => (
              <div key={idx} className="flex-shrink-0 w-full md:w-[280px] flex flex-col space-y-4">
                
                {/* Node Dot / Year */}
                <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFEA00] flex items-center justify-center font-bold text-xs shadow z-10 shrink-0 border border-black/10">
                    ★
                  </div>
                  <span className="font-mono text-xs font-black uppercase bg-[#16D9C4] text-black border border-black/10 px-2.5 py-0.5 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] rounded">
                    {milestone.year}
                  </span>
                </div>
                
                {/* Content Card */}
                <div 
                  style={{ "--hover-color": cardColors[idx % cardColors.length] } as React.CSSProperties}
                  className="border border-zinc-200 bg-zinc-50 p-4 rounded shadow-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_var(--hover-color)] transition-all flex-1 min-h-[120px]"
                >
                  <h4 className="text-sm font-black uppercase font-display text-black">{milestone.title}</h4>
                  <p className="text-[10px] font-semibold text-zinc-550 mt-1.5 leading-relaxed">{milestone.desc}</p>
                </div>

              </div>
            ))}

          </div>
        </div>

      </section>

      {/* --- TECH JOURNEY GALLERY (HORIZONTAL CAROUSEL) --- */}
      <TechJourneyCarousel />

      {/* --- CONTACT & SEEKING ROLES --- */}
      <section id="contact" className="px-6 py-24 md:py-32 max-w-5xl mx-auto border-t-2 border-zinc-200 text-center scroll-mt-20">
        
        <span className="bg-[#FF4B1F] text-white px-3 py-1 text-xs font-black uppercase font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          GET IN TOUCH
        </span>
        
        <h2 
          className="text-4xl sm:text-6xl font-black uppercase text-black mt-6 mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Let's Build Systems.
        </h2>
        
        <p className="text-zinc-650 font-bold text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
          I am actively seeking backend engineering, software engineering, and AI systems architect opportunities for 2026. Reach out to coordinate interviews, inspect credential logs, or review source material.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="/Abhishek_Hosamani.pdf" 
            target="_blank" 
            rel="noreferrer" 
            download="Abhishek_Hosamani.pdf"
            className="border-2 border-black bg-[#3D00FF] text-white font-black uppercase px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all text-xs sm:text-sm flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Download Resume PDF
          </a>
          <a 
            href="mailto:abhishekhosamani522@gmail.com" 
            target="_blank" 
            rel="noreferrer" 
            className="border-2 border-black bg-white text-black font-black uppercase px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#3D00FF] hover:text-white hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all text-xs sm:text-sm flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Email Abhishek
          </a>
        </div>

      </section>
      
      {/* FOOTER */}
      <footer className="border-t-2 border-zinc-200 py-12 px-6 bg-white transition-colors duration-300 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        
        <div className="text-center sm:text-left space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#3D00FF] font-mono">
            SEEKING ROLES: BACKEND ENGINEER | SOFTWARE ENGINEER | AI ENGINEER (2026)
          </p>
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
            © 2026 Abhishek Umesh Hosamani. Redesigned for visual excellence.
          </p>
        </div>

        <div className="flex gap-3">
          <a 
            href="https://github.com/AbhishekHosamani123/" 
            target="_blank" 
            rel="noreferrer" 
            className="p-2 text-black hover:text-[#3D00FF] transition-all"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/abhishek-hosamani/" 
            target="_blank" 
            rel="noreferrer" 
            className="p-2 text-black hover:text-[#3D00FF] transition-all"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="mailto:abhishekhosamani522@gmail.com" 
            target="_blank" 
            rel="noreferrer" 
            className="p-2 text-black hover:text-[#3D00FF] transition-all"
            aria-label="Send Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

      </footer>

      {/* --- LIGHTBOX FOR PROJECTS (GALLERY 1) --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedProject(null);
              setIsVideoPlaying(false);
            }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-4 border-black w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-12 overflow-hidden text-black font-body"
            >
              {/* Media Left Column */}
              <div className="md:col-span-7 bg-zinc-900 flex flex-col justify-center items-center aspect-video md:aspect-auto p-4 relative border-b-2 md:border-b-0 md:border-r-2 border-black min-h-[300px]">
                {isVideoPlaying ? (
                  <div className="w-full h-full flex flex-col justify-between relative min-h-[280px]">
                    <div className="flex justify-between items-center text-zinc-400 border-b border-zinc-800 pb-1.5 mb-2 px-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-300">{selectedProject.title} Demo</span>
                      <button 
                        onClick={() => setIsVideoPlaying(false)}
                        className="text-red-500 hover:underline text-[9px] uppercase font-mono font-bold cursor-pointer"
                      >
                        [Close Video]
                      </button>
                    </div>
                    
                    <div className="flex-1 w-full flex items-center justify-center overflow-hidden bg-black rounded">
                      {selectedProject.youtubeUrl ? (
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={selectedProject.youtubeUrl} 
                          title={`${selectedProject.title} YouTube Demo`}
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                          allowFullScreen
                          className="w-full h-full rounded"
                        ></iframe>
                      ) : selectedProject.videoUrl ? (
                        <video 
                          src={selectedProject.videoUrl} 
                          controls 
                          autoPlay 
                          className="w-full h-full object-contain rounded"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-950 flex flex-col justify-between p-4 font-mono text-[10px] text-green-500">
                          <div className="flex-1 py-4 flex flex-col justify-center space-y-1">
                            <div className="animate-pulse text-zinc-300 text-xs text-center border border-dashed border-zinc-700 py-6 rounded">
                              📹 Simulating Video Order flow & API callbacks
                            </div>
                            <div className="text-zinc-650">// Rendering real time web integrations...</div>
                            <div className="text-[#3D00FF] font-bold">Latency average: 82ms &bull; Webhook response: 200 OK</div>
                          </div>
                          <span className="text-[8px] text-zinc-650">SIMULATION MODE</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-8 text-white relative w-full h-full">
                    {selectedProject.type === "gitchat" && <Cpu className="w-16 h-16 mb-4 text-[#3D00FF]" />}
                    {selectedProject.type === "ats" && <Layers3 className="w-16 h-16 mb-4 text-[#FFEA00]" />}
                    {selectedProject.type === "valentine" && <Play className="w-16 h-16 mb-4 text-red-500" />}
                    {selectedProject.type === "affiliate" && <Monitor className="w-16 h-16 mb-4 text-green-400" />}
                    {selectedProject.type === "saarthi" && <Activity className="w-16 h-16 mb-4 text-yellow-400" />}
                    {selectedProject.type === "whatsapp" && <Terminal className="w-16 h-16 mb-4 text-cyan-400" />}

                    <span className="font-mono text-[10px] uppercase text-zinc-400 tracking-wider">PROJECT PREVIEW ASSET</span>
                    <h3 className="text-xl font-black uppercase mt-2">{selectedProject.title}</h3>
                    
                    <button 
                      onClick={() => setIsVideoPlaying(true)}
                      className="mt-6 border-2 border-white px-5 py-2 bg-[#3D00FF] hover:bg-white hover:text-black font-bold uppercase text-[10px] shadow-[2px_2px_0px_0px_white] transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Video className="w-3.5 h-3.5" />
                      Play Demo Video
                    </button>
                  </div>
                )}
              </div>

              {/* Detail Right Column */}
              <div className="md:col-span-5 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center border-b border-zinc-150 pb-2 mb-4">
                    <span className="bg-[#3D00FF]/5 text-[#3D00FF] text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded">
                      {selectedProject.category} Project
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-400">{selectedProject.metric}</span>
                  </div>

                  <h3 className="text-2xl font-black uppercase font-display leading-none">{selectedProject.title}</h3>
                  <p className="text-[11px] text-zinc-650 font-bold mt-3 leading-relaxed">
                    {selectedProject.detailDescription}
                  </p>

                  {/* Architecture flow for GitChat */}
                  {selectedProject.type === "gitchat" && (
                    <div className="mt-4 border border-zinc-200 bg-zinc-50 p-2.5 rounded font-mono text-[8px] text-zinc-600">
                      <div className="font-black text-[9px] text-[#3D00FF] mb-1">RAG Architecture Flow:</div>
                      <div>Repo Ingestion &rarr; Chunk Splitting &rarr; Embedding Vectors &rarr; Pinecone Namespace Query &rarr; LLM Synthesis.</div>
                    </div>
                  )}

                  <div className="mt-5">
                    <span className="text-[9px] font-mono font-bold text-zinc-450 block uppercase mb-2">Engineered Stack:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedProject.techStack.map(tag => (
                        <span key={tag} className="text-[9px] font-bold font-mono bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-zinc-150 pt-4 flex flex-col gap-2">
                  {selectedProject.demoUrl && (
                    <a 
                      href={selectedProject.demoUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="border-2 border-black py-2 bg-[#3D00FF] text-white text-center text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-colors"
                    >
                      Launch Live Demo
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="border-2 border-black py-2 bg-white text-black text-center text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-colors"
                    >
                      Inspect Source Code
                    </a>
                  )}
                  <button 
                    onClick={() => {
                      setSelectedProject(null);
                      setIsVideoPlaying(false);
                    }}
                    className="text-center text-[10px] font-mono font-black uppercase text-zinc-450 hover:text-black mt-2 cursor-pointer"
                  >
                    [Close Lightbox]
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LIGHTBOX FOR EVENTS (GALLERY 2) --- */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-4 border-black w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 text-black font-body flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center border-b border-zinc-150 pb-3 mb-4">
                  <span className="bg-[#FF4B1F]/5 text-[#FF4B1F] text-[9px] font-mono font-bold uppercase px-2.5 py-0.5 rounded">
                    {selectedEvent.category} event
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-400">{selectedEvent.date}</span>
                </div>

                {/* Mock physical Polaroid/Certificate graphic frame / Real Photo */}
                <div className="border border-zinc-200 bg-[#F8F6F2] aspect-video w-full mb-6 rounded-lg overflow-hidden flex flex-col justify-center items-center relative select-none shadow-inner bg-zinc-100">
                  {selectedEvent.imgUrl ? (
                    <img 
                      src={selectedEvent.imgUrl} 
                      alt={selectedEvent.title} 
                      className="w-full h-full object-cover pointer-events-none select-none"
                    />
                  ) : (
                    <>
                      {selectedEvent.type === "certificate" && (
                        <div className="border-4 border-double border-zinc-300 w-full h-full p-4 flex flex-col justify-between items-center bg-[#FAF9F6] relative">
                          <div className="text-[9px] font-serif uppercase tracking-widest text-[#FF4B1F] font-black">Official Certificate of Excellence</div>
                          <div className="text-lg font-display font-black uppercase text-black leading-tight mt-1">{selectedEvent.title}</div>
                          <div className="text-[8px] text-zinc-550 max-w-xs">{selectedEvent.subtitle} &bull; Verified</div>
                          <div className="w-8 h-8 rounded-full bg-[#FFEA00] flex items-center justify-center font-bold text-xs text-black shadow mt-2 border border-black/10">★</div>
                        </div>
                      )}

                      {selectedEvent.type === "badge" && (
                        <div className="w-full h-full flex flex-col justify-center items-center bg-[#FAF9F6] border border-dashed border-zinc-300 p-4">
                          <div className="w-16 h-16 rounded-full bg-[#FF4B1F] flex items-center justify-center text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-2">
                            <Award className="w-8 h-8 text-white" />
                          </div>
                          <span className="text-sm font-display font-black uppercase text-black">{selectedEvent.title}</span>
                          <span className="text-[8px] text-zinc-450 font-mono tracking-wider mt-1">VTU OFFICIAL BADGE</span>
                        </div>
                      )}

                      {selectedEvent.type === "event" && (
                        <div className="w-full h-full flex flex-col justify-between p-4 bg-[#FAF9F6] border border-zinc-250 relative text-left">
                          <div className="flex justify-between items-center border-b border-zinc-200 pb-1.5">
                            <span className="text-[7px] font-mono text-zinc-400">EVOGEN STAFF PASS</span>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#16D9C4]" />
                          </div>
                          <div className="my-2">
                            <div className="text-base font-black uppercase text-black leading-none">{selectedEvent.title}</div>
                            <div className="text-[8px] text-[#FF4B1F] font-mono font-bold uppercase mt-1">{selectedEvent.subtitle}</div>
                          </div>
                          <div className="border-t border-zinc-200 pt-1.5 flex justify-between items-center text-[7px] font-mono text-zinc-450">
                            <span>DATE: {selectedEvent.date}</span>
                            <span>LOCATION: {selectedEvent.location}</span>
                          </div>
                        </div>
                      )}

                      {selectedEvent.type === "code" && (
                        <div className="w-full h-full flex flex-col justify-between bg-zinc-900 text-[#22C55E] p-4 text-left font-mono text-[9px] rounded">
                          <div className="border-b border-zinc-800 pb-1.5 flex justify-between text-zinc-500 text-[8px]">
                            <span>instructor_session_log.py</span>
                            <span>120+ Trainees</span>
                          </div>
                          <div className="flex-1 py-2 text-[8px] text-zinc-400 space-y-1">
                            <div>class WorkshopSession:</div>
                            <div className="pl-3 text-[#22C55E]">topic = "{selectedEvent.title}"</div>
                            <div className="pl-3">attendees = 120</div>
                            <div className="pl-3">verified_by = "NIIT Directors"</div>
                          </div>
                          <div className="text-zinc-550 border-t border-zinc-800 pt-1.5 text-[8px]">{selectedEvent.subtitle}</div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Event text data */}
                <h3 className="text-2xl font-black uppercase font-display leading-none">{selectedEvent.title}</h3>
                <p className="text-xs text-zinc-550 font-bold mt-1">{selectedEvent.subtitle}</p>
                
                <p className="text-[11px] text-zinc-650 font-bold mt-4 leading-relaxed">
                  {selectedEvent.detailDescription}
                </p>

                {/* Additional event location / date meta row */}
                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-zinc-100 pt-4 text-[10px] font-mono font-bold uppercase text-zinc-450">
                  <div>
                    <span className="block text-[8px] text-zinc-400">Date Stamp:</span>
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] text-zinc-400">Location Stamp:</span>
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
              </div>

              {/* Footer actions */}
              <div className="mt-8 border-t border-zinc-150 pt-4 flex justify-between items-center">
                <span className="text-[9px] font-mono font-bold text-green-600 uppercase flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Verifiable Proof Record
                </span>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="border-2 border-black px-4 py-1.5 bg-white hover:bg-black hover:text-white font-mono font-black uppercase text-[10px] transition-colors cursor-pointer"
                >
                  Close Polaroid
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
