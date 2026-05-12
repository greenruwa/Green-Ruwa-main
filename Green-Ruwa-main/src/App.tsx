/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  Palette, 
  Printer, 
  Music, 
  ArrowUpRight,
  ArrowUp,
  Menu,
  PenTool,
  Video,
  Camera,
  Code,
  Layers,
  Contact,
  Disc,
  MessageSquare,
  User,
  Phone,
  Facebook,
  Gift,
  BookOpen,
  ExternalLink
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import PhotoshopImg from "./assets/green with ps. small.png";
import AfterEffectsImg from "./assets/green with AE small.png";
import IllustratorImg from "./assets/green with ai small.png";
import MotionGraphicsVid from "./assets/New Motion small.mp4";
import VSCodeImg from "./assets/green with vs.jpg";
import VideoEditingVid from "./assets/Video Editing small.mp4";
import DesignShowVid from "./assets/Design Show small.mp4";
import VoiceOverVid from "./assets/Voice Over small.mp4";
import GreenMainImg from "./assets/green-main-image.png";
import WheelRefImg from "./assets/wheel ref.png";

const PenNibIcon = () => (
  <div className="relative inline-block group mx-[0.05em] align-baseline translate-y-[0.1em]">
    <motion.div whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}>
      <svg width="0.8em" height="1.2em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange drop-shadow-[0_0_8px_rgba(245,130,31,0.6)]">
        <path d="M12 2L19 9L12 22L5 9L12 2Z" fill="currentColor" stroke="white" strokeWidth="1" />
        <circle cx="12" cy="9" r="2" fill="white" />
        <line x1="12" y1="9" x2="12" y2="15" stroke="white" strokeWidth="1" />
      </svg>
      <motion.div 
        animate={{ y: [0, 15], opacity: [1, 0], scale: [1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeIn" }}
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-1.5 h-2 bg-orange rounded-full"
        style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', borderRadius: '0 0 50% 50%' }}
      />
    </motion.div>
  </div>
);

const InteractiveHeader = ({ text, className = "", disableIcon = false }: { text: string, className?: string, disableIcon?: boolean }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, rotate: 0.5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`cursor-default select-none whitespace-nowrap ${className}`}
    >
      {text.split("").map((char, i) => {
        if (char.toUpperCase() === "I" && !disableIcon) {
          return <PenNibIcon key={i} />;
        }
        return (
          <span key={i} className="inline-block hover:text-orange hover:scale-110 transition-all duration-200">
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </motion.div>
  );
};

const InteractiveChar = ({ char, baseColor = "" }: { char: string, baseColor?: string, key?: React.Key }) => {
  if (char === " ") return <span>&nbsp;</span>;
  return (
    <span className={`hero-char inline-block select-none ${baseColor}`}>
      {char}
    </span>
  );
};

const CursorFollower = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 15}px, ${e.clientY - 15}px, 0)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="cursor-follower"
    />
  );
};

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [iconIndex, setIconIndex] = useState(0);
  const icons = [PenTool, Video, Camera, Code, Music];
  const CurrentIcon = icons[iconIndex];

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % icons.length);
    }, 400);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearInterval(iconInterval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#050B18] flex flex-col items-center justify-center">
      <div className="relative">
        <motion.div
          key={iconIndex}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          className="text-cyan animate-bounce"
        >
          <CurrentIcon size={64} strokeWidth={1.5} />
        </motion.div>
      </div>
      <p className="mt-8 text-orange font-black text-[10px] tracking-[0.5em] uppercase animate-pulse">
        LOADING CREATIVITY...
      </p>
    </div>
  );
};

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showCommHub, setShowCommHub] = useState(false);
  const [view, setView] = useState<'home' | 'training' | 'about'>('home');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const goals = formData.get('goals');
    const level = formData.get('level');

    const message = `Hello, here are my application details, please take a look and give feedback.\n\n*Name:* ${name}\n*Email:* ${email}\n*Course Level:* ${level}\n*Goals:* ${goals}\n\nThank you`;
    const whatsappUrl = `https://wa.me/254795665443?text=${encodeURIComponent(message)}`;
    
    try {
      window.open(whatsappUrl, '_blank');
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };
  const handleNav = (sectionId: string) => {
    if (view === 'home') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setView('home');
      window.location.hash = sectionId;
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && view === 'home') {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, [view, window.location.hash]);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scroll to top button visibility
      setShowScrollTop(currentScrollY > 400);
      setShowCommHub(currentScrollY > 50);

      // Navbar visibility on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setNavVisible(false); // Scrolling down
      } else {
        setNavVisible(true); // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen w-full bg-cyan overflow-x-hidden flex flex-col font-sans selection:bg-orange selection:text-white scroll-smooth">
      <Preloader />
      {/* 1. Background Blur Blobs (Multimedia depth) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 40, 0],
            y: [0, -60, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-purple-600/30 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[100px]"
        />
      </div>

      {/* Hero Image Overlay (40% Opacity) */}
      <div className="absolute top-0 left-0 w-full h-[700px] z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=2070&auto=format&fit=crop" 
          alt="Keyboard Hero" 
          className="w-full h-full object-cover opacity-30 brightness-50 contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/50 to-cyan"></div>
      </div>

      {/* 2. Overhauled Navigation Bar */}
      <motion.nav 
        initial={{ y: 0 }}
        animate={{ 
          y: navVisible ? 0 : -100,
          opacity: navVisible ? 1 : 0,
          backdropFilter: navVisible ? "blur(12px)" : "blur(0px)"
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-orange border-b border-white/20 shadow-xl"
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5 max-w-7xl mx-auto w-full">
          <div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setView('home')}
          >
            <div className="text-xl font-black tracking-tighter uppercase font-display text-[#0B1736] hover:text-white transition-colors duration-300">
              GREEN RUWA
            </div>
            <motion.a 
              href="https://wa.me/254795665443"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(245, 130, 31, 1)" }}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-orange to-amber-500 px-3 py-1 rounded-full animate-blink shadow-[0_0_15px_rgba(245,130,31,0.5)] cursor-pointer transition-shadow border-2 border-[#0B1736]"
            >
              <span className="text-[10px] font-black text-white tracking-widest">0795665443</span>
              <Phone size={12} className="text-white fill-white" strokeWidth={3} />
            </motion.a>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 text-[10px] font-bold tracking-[0.4em] uppercase">
            {[
              { label: 'PORTFOLIO', action: 'work', type: 'button' },
              { label: 'TRAINING', action: () => setView('training'), type: 'button' },
              { label: 'RESOURCES', action: 'resources', type: 'button' },
              { label: 'SERVICES', action: 'services', type: 'button' },
              { label: 'ABOUT', action: () => setView('about'), type: 'button' },
            ].map((item, idx) => (
              <button 
                key={idx} 
                onClick={typeof item.action === 'function' ? item.action : () => handleNav(item.action as string)} 
                className="text-[#0B1736] px-4 py-2 rounded-lg border border-transparent hover:border-white/40 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.9)] hover:-translate-y-1.5 hover:scale-110 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] uppercase"
              >
                {item.label}
              </button>
            ))}
            
            <motion.a
              onClick={(e) => { e.preventDefault(); handleNav('quotation'); }}
              href="#quotation"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 25px rgba(245, 130, 31, 0.6)",
              }}
              style={{ background: 'linear-gradient(to right, #F5821F, #FF9D4D)' }}
              className="px-6 py-2 rounded-sm cursor-pointer inline-flex items-center gap-2 group transition-all border-2 border-[#0B1736]"
            >
              <span className="text-white font-black tracking-widest text-[9px]">HIRE ME</span>
            </motion.a>
          </div>

          <div className="md:hidden">
            {isMenuOpen ? (
              <div 
                className="text-[#0B1736] cursor-pointer p-2" 
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-xl font-bold">✕</span>
              </div>
            ) : (
              <Menu 
                className="text-[#0B1736] cursor-pointer" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            )}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0B1736]/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-8 gap-2 text-[11px] font-black tracking-[0.5em] uppercase items-stretch">
                {[
                  { label: 'PORTFOLIO', action: () => handleNav('work') },
                  { label: 'TRAINING', action: () => { setView('training'); setIsMenuOpen(false); } },
                  { label: 'RESOURCES', action: () => { setView('home'); setIsMenuOpen(false); setTimeout(() => handleNav('resources'), 100); } },
                  { label: 'SERVICES', action: () => { setView('home'); setIsMenuOpen(false); setTimeout(() => handleNav('services'), 100); } },
                  { label: 'ABOUT', action: () => { setView('about'); setIsMenuOpen(false); } }
                ].map((item, i) => (
                  <motion.button 
                    key={i}
                    whileTap={{ scale: 1.05 }}
                    onClick={item.action}
                    className="flex items-center gap-6 py-5 text-white border-b border-white/5 last:border-none group"
                  >
                    {/* Radar Bulletin */}
                    <div className="relative w-5 h-5 flex items-center justify-center">
                      <div className="absolute inset-0 border border-orange rounded-full animate-[spin_3s_linear_infinite]" />
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-[pulse_0.5s_ease-in-out_infinite]" />
                    </div>
                    <span className="group-active:text-orange transition-colors">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
                
                <button
                  className="text-[#0B1736] font-black border-2 border-[#0B1736] p-5 text-center rounded-lg active:bg-[#0B1736] active:text-white transition-all shadow-lg bg-[#27C8D7]"
                  onClick={() => handleNav('quotation')}
                >
                  HIRE ME
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>


      <main className="relative z-10 flex-grow flex flex-col items-center w-full pt-16">
        {view === 'home' && (
          <>
        
        {/* 3. Refined Hero Section & Card Section */}
        <section className="w-full relative flex flex-col items-center pt-20 px-6 md:px-12 overflow-hidden">
          {/* Hero Snow Zones (Framing the action) */}
          <div className="hero-snow-frame left-frame">
              <div className="snowflake" style={{ left: '20%', animationDuration: '7s' }}></div>
              <div className="snowflake orange-star" style={{ left: '50%', animationDuration: '12s' }}></div>
              <div className="snowflake" style={{ left: '80%', animationDuration: '9s', opacity: 0.3 }}></div>
          </div>

          <div className="hero-snow-frame right-frame">
              <div className="snowflake orange-star" style={{ left: '30%', animationDuration: '10s' }}></div>
              <div className="snowflake" style={{ left: '60%', animationDuration: '15s' }}></div>
              <div className="snowflake orange-star" style={{ left: '10%', animationDuration: '8s', opacity: 0.4 }}></div>
          </div>

          <header className="text-center mb-10 w-full relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-title text-5xl sm:text-8xl md:text-9xl lg:text-[140px] font-black tracking-tight uppercase leading-[1.0] font-display mb-10 text-white cursor-default select-none"
            >
              <InteractiveChar char="I" />&nbsp;
              <span className="text-orange" style={{ lineHeight: '1.2' }}>
                {"DESIGN".split("").map((c, i) => (
                  <InteractiveChar key={`d-${i}`} char={c} />
                ))}
              </span><br />
              <span className="opacity-90">
                {"WITH PASSION".split("").map((c, i) => (
                  <InteractiveChar key={`p-${i}`} char={c} />
                ))}
              </span>
            </motion.h1>

            {/* Services Ticker (Visible on all devices) */}
            <div className="w-full overflow-hidden py-8 sm:py-16">
              <motion.div 
                animate={{ x: ["-50%", "0%"] }} // Left to Right as requested for mobile vibe
                transition={{ 
                  duration: window.innerWidth < 768 ? 20 : 40, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="flex whitespace-nowrap items-center gap-6 md:gap-10"
                style={{ width: "200%" }}
              >
                {[...Array(2)].map((_, idx) => (
                  <div key={idx} className="flex items-center gap-6 md:gap-10">
                    {[
                      "FLYERS", "BUSINESS CARDS", "RECEIPTS & INVOICES", 
                      "EULOGIES & FUNERAL PROGRAMS", "CLUB & EVENT POSTERS", 
                      "YOUTUBE THUMBNAILS", "STICKERS & LABEL DESIGNS", 
                      "SOCIAL MEDIA ADS", "LOGO BRANDING KITS", "PROFESSIONAL CVs"
                    ].map((service, i) => (
                      <div key={i} className="flex items-center gap-6 md:gap-10">
                        <span className={`text-[1.1rem] md:text-7xl font-black font-display uppercase tracking-tight md:tracking-tighter ${i % 2 === 0 ? 'text-navy' : 'text-white'}`}>
                          {service}
                        </span>
                        <span className="text-orange text-2xl md:text-7xl">•</span>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Mobile Minimal Contact Box */}
            <div className="sm:hidden mt-6 flex flex-col items-center gap-3">
              <motion.a
                href="https://wa.me/254795665443"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange px-6 py-3 rounded-xl flex flex-col items-center gap-2 animate-blink border-2 border-white ring-2 ring-orange shadow-none"
              >
                <span className="text-white font-black text-xl tracking-wider">0795665443</span>
              </motion.a>
              <div className="animate-wiggle">
                <Phone size={24} className="text-orange fill-orange" />
              </div>
              <p className="text-navy text-[10px] uppercase font-black tracking-[0.2em] animate-blink">WhatsApp Me</p>
            </div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-16 h-[4px] bg-orange mx-auto shadow-[0_0_15px_rgba(245,130,31,0.6)]"
            />
          </header>
        </section>

        {/* UNIFIED INTERSTELLAR CONTENT SECTION (Seamless Dark Purple) */}
        <section className="w-full relative bg-[#0B1736] overflow-visible border-none">
          {/* Top Wave (Meeting Hero Section) */}
          <div className="absolute top-0 left-0 w-full -translate-y-[99%] h-32 pointer-events-none z-20">
            <svg className="w-full h-full block" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              {/* Secondary Glow Wave */}
              <path 
                d="M0 120L0 60C240 100 480 20 720 60C960 100 1200 20 1440 60L1440 120H0Z" 
                fill="rgba(245, 130, 31, 0.2)" 
              />
              {/* Primary Navy Wave */}
              <path 
                d="M0 120L0 40C240 80 480 0 720 40C960 80 1200 0 1440 40L1440 120H0Z" 
                fill="#0B1736" 
              />
            </svg>
          </div>

          <Snowfall />

          {/* NEW SHOWCASE SECTION */}
          <section id="work" className="relative w-full pt-4 pb-8 md:pt-16 md:pb-12 bg-transparent scroll-mt-24 z-10">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <motion.div 
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-center mb-8 sm:mb-16 flex flex-col items-center -mt-12 md:-mt-20"
              >
                {/* Mobile Stacked Title */}
                <div className="flex flex-col sm:hidden items-center relative z-30">
                  <InteractiveHeader 
                    text="GENERAL" 
                    disableIcon={true}
                    className="text-4xl font-display font-extrabold text-white leading-[0.9] uppercase"
                  />
                  <InteractiveHeader 
                    text="CATEGORIES" 
                    className="text-4xl font-display font-extrabold text-white leading-[0.9] uppercase"
                  />
                </div>
                {/* Desktop Title */}
                <InteractiveHeader 
                  text="GENERAL CATEGORIES" 
                  className="hidden sm:block text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight sm:tracking-tighter md:tracking-widest uppercase px-4"
                />
                <div className="w-24 h-1 bg-orange/30 mt-4 rounded-full blur-[1px]" />
              </motion.div>

              <div className="w-full flex justify-center items-center py-6 md:py-12 overflow-visible">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-12 md:gap-16 w-full max-w-7xl justify-items-center overflow-visible">
              <Card 
                videoSrc={VideoEditingVid}
                title="VIDEO EDITING"
                category="Multimedia Storytelling"
                delay={0.2}
                href="https://vimeo.com/manage/videos/1072070534"
              />
              <Card 
                videoSrc={DesignShowVid}
                title="GRAPHIC DESIGN"
                category="Visual Identity"
                delay={0.4}
                href="https://www.behance.net/greenieruwa"
              />
              <Card 
                videoSrc={VoiceOverVid}
                title="VOICE OVERS"
                category="CUSTOM EDIT VOICE"
                delay={0.6}
                href="https://vimeo.com/1186774214?share=copy&fl=sv&fe=ci"
              />
              <Card 
                videoSrc={MotionGraphicsVid}
                title="MOTION GRAPHICS"
                category="Dynamic Visuals"
                delay={0.8}
                href="https://vimeo.com/manage/videos/1169248818"
              />
                </div>
            </div>
            </div>
          </section>
          
          {/* SOFTWARE TOOLKIT SECTION */}
          <section className="w-full pt-8 pb-8 md:pt-12 md:pb-24 bg-navy/30">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-orange font-black text-[14px] tracking-[0.5em] uppercase mb-1">MY ARSENAL</h2>
                <InteractiveHeader 
                  text="SOFTWARE TOOLKIT" 
                  className="text-white text-2xl sm:text-3xl md:text-5xl font-display font-extrabold uppercase tracking-tighter md:tracking-widest px-4"
                />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { name: "PHOTOSHOP", color: "#00A3FF", img: PhotoshopImg },
                  { name: "ILLUSTRATOR", color: "#FF9A00", img: IllustratorImg },
                  { name: "VS CODE & CANVA", color: "#00C4CC", img: VSCodeImg },
                  { name: "PREMIERE PRO", color: "#EA77FF", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=500&auto=format&fit=crop" },
                  { name: "AFTER EFFECTS", color: "#CF96FD", img: AfterEffectsImg }
                ].map((tool, i) => (
                  <motion.div
                    key={i}
                    initial="initial"
                    whileHover={{ y: -10 }}
                    className="relative h-64 md:h-80 rounded-3xl overflow-hidden group border-2 shadow-2xl transition-all duration-300 flex flex-col justify-end"
                    style={{ borderColor: tool.color }}
                  >
                    {/* Dynamic Border Glow on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: `inset 0 0 20px ${tool.color}` }} />
                    
                    <img src={tool.img} alt={tool.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    
                    {/* Bottom-Heavy Overlay & Flickering Title Box */}
                    <div className="relative z-20 w-full p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-20 flex justify-center">
                      <div 
                        className="px-4 py-2 rounded-md border border-white/20 bg-black/40 backdrop-blur-sm animate-flicker group-hover:animate-none group-hover:bg-white/10 group-hover:border-white/50 transition-all flex items-center justify-center"
                        style={{ boxShadow: `0 0 15px ${tool.color}66` }}
                      >
                        <span className="text-white font-black text-[10px] tracking-[0.2em] text-center leading-tight">
                          {tool.name === "VS CODE & CANVA" ? (
                            <>VS CODE<br/><span className="text-[8px]">CANVA</span></>
                          ) : (
                            tool.name
                          )}
                        </span>
                      </div>
                    </div>
                    
                  </motion.div>
                ))}

                {/* Mobile-only 6th Card to fill 2x3 grid */}
                <div className="lg:hidden relative h-64 rounded-3xl overflow-hidden border-2 border-white/10 flex items-center justify-center p-6 text-center bg-gradient-to-br from-[#050B18] via-[#B65B22]/20 to-[#00FFFF]/20 backdrop-blur-xl">
                  <motion.div 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-white font-black text-[10px] tracking-widest uppercase"
                  >
                    NEW TOOLS<br/>COMING SOON
                  </motion.div>
                </div>

                {/* Desktop-only Full Width Bar */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="hidden lg:flex col-span-5 mt-8 h-16 rounded-2xl border border-white/10 items-center justify-center relative overflow-hidden bg-gradient-to-r from-[#050B18] via-[#B65B22]/30 to-[#00FFFF]/20 backdrop-blur-xl"
                >
                  <motion.div 
                    animate={{ x: [-20, 20, -20] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="text-white font-bold tracking-[0.5em] text-xs uppercase z-10"
                  >
                    NEW TOOLS & STACK UPDATES COMING SOON
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* SPIN TO WIN & RESOURCES */}
          <section id="resources" className="w-full py-6 sm:py-12 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-20">
              <div className="flex flex-col gap-6 w-full lg:max-w-[50%]">
                <h2 className="text-orange font-black text-[20px] md:text-[28px] tracking-tighter uppercase mb-0 mt-0">FREEBIES & PERKS</h2>
                <InteractiveHeader 
                  text="• SPIN FOR A CREATIVE GIFT" 
                  disableIcon={true}
                  className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold uppercase leading-tight tracking-[-0.07em] max-w-xl"
                />
                <p className="text-white/60 text-lg max-w-md leading-relaxed">
                  Unlock your creative potential with exclusive rewards. Spin our wheel for a chance to win premium academy resources and professional toolkits.
                </p>
                <div className="text-white font-medium tracking-tighter uppercase text-sm md:text-base">
                  SPIN TO <span className="font-[900] text-[#00FFFF] tracking-tighter">WIN NOW</span>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <SpinToWin />
              </div>
            </div>
          </section>

          {/* BLOG SECTION */}
          <section id="blog" className="hidden w-full py-8 sm:py-32 bg-navy/20 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex justify-between items-end mb-16">
                <div>
                  <h2 className="text-orange font-black text-[14px] tracking-[0.5em] uppercase mb-2">INSIGHTS</h2>
                  <InteractiveHeader 
                    text="CREATIVE BLOG" 
                    disableIcon={false}
                    className="text-white text-2xl sm:text-3xl md:text-5xl font-display font-extrabold uppercase tracking-tighter md:tracking-widest px-4"
                  />
                </div>
                <a 
                  href="https://www.behance.net/greenieruwa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange font-black text-[10px] tracking-widest uppercase border-b-2 border-orange pb-1 hover:text-white hover:border-white transition-colors"
                >
                  View All Posts
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Mastering Color Theory in 2026", cat: "Design Tips", url: "https://color.adobe.com/create/color-wheel", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500&auto=format&fit=crop" },
                  { title: "Why Video is the King of Content", cat: "Marketing", url: "https://vimeo.com/blog/category/video-marketing/", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=500&auto=format&fit=crop" },
                  { title: "Building a Brand from Scratch", cat: "Branding", url: "https://www.creativebloq.com/branding/branding-design-tips-12121492", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=500&auto=format&fit=crop" }
                ].map((post, i) => (
                  <motion.a 
                    key={i}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -10, scale: 1.05, boxShadow: "0 0 25px rgba(0, 255, 255, 0.6)" }}
                    className="bg-[#00FFFF]/90 backdrop-blur-md rounded-[2rem] overflow-hidden border border-white/20 group cursor-pointer block transition-all duration-300"
                  >
                    <div className="h-48 m-4 mb-0 relative overflow-hidden rounded-2xl shadow-inner">
                      <img 
                        src={post.img} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    </div>
                    <div className="p-6 md:p-8">
                      <span className="text-[#0B1736] font-black text-[9px] tracking-widest uppercase mb-3 block opacity-80">{post.cat}</span>
                      <h4 className="text-[#0B1736] text-xl font-display font-black uppercase mb-4 leading-tight">{post.title}</h4>
                      <div className="flex items-center gap-2 text-[#0B1736] font-black text-[10px] tracking-widest uppercase">
                        <span>READ MORE</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Categorizing with Symbols (Seamless Flow) */}
          <section id="services" className="w-full bg-transparent py-8 sm:py-32 border-none scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
            {/* Anchored Group (Structural Alignment) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-center mb-20">
                <h2 className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] mb-4">What I Do</h2>
                <InteractiveHeader 
                  text="TECHNICAL CREATIVE SERVICES" 
                  disableIcon={true}
                  className="text-white text-xl sm:text-2xl md:text-5xl font-display font-extrabold tracking-tighter md:tracking-widest px-4"
                />
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 w-full mb-24">
                <a href="https://www.behance.net/greenieruwa" target="_blank" rel="noopener noreferrer" className="block">
                  <SkillItem 
                    icon={<Layers size={24} />}
                    number="02" 
                    label="FLYERS & POSTERS" 
                  />
                </a>
                <a href="https://www.behance.net/greenieruwa" target="_blank" rel="noopener noreferrer" className="block">
                  <SkillItem 
                    icon={<Contact size={24} />}
                    number="03" 
                    label="BUSINESS CARDS" 
                  />
                </a>
                <a href="https://www.behance.net/greenieruwa" target="_blank" rel="noopener noreferrer" className="block">
                  <SkillItem 
                    icon={<Disc size={24} />}
                    number="04" 
                    label="MUSIC COVERS" 
                  />
                </a>
              </div>

              {/* WhatsApp CTA Anchor */}
              <div className="text-center">
                <InteractiveHeader 
                  text="AVAILABLE FOR WORK" 
                  className="text-white font-extrabold text-2xl sm:text-3xl md:text-6xl uppercase tracking-tighter md:tracking-widest mb-2 leading-none font-display px-4"
                />
                <p className="text-orange font-black text-[12px] tracking-[0.6em] uppercase">Multimedia Storytelling Expert</p>
              </div>
            </motion.div>
          </div>
        </section>

          {/* Testimonials & Footer CTA Wrap */}
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col items-center">
            {/* 5. The Testimonial Section - Infinite Scroller */}
            <section id="about" className="relative z-10 w-full pt-4 pb-12 sm:py-32 scroll-mt-24 -mt-8 md:-mt-12">
              <div 
                className="overflow-hidden"
                style={{ 
                  maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                }}
              >
                <motion.div 
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ 
                    duration: 50, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="flex gap-8 w-fit hover:[animation-play-state:paused]"
                >
                  {[...Array(2)].map((_, setIdx) => (
                    <React.Fragment key={setIdx}>
                      {[
                        { 
                          name: "CEO, Nairobi Creatives", 
                          quote: "Green's multimedia storytelling absolutely unlocked our brand’s potential." 
                        },
                        { 
                          name: "Founder, Studio 254", 
                          quote: "The logo and flyers brought a cinematic quality we never had before." 
                        },
                        { 
                          name: "Tech Startup Founder", 
                          quote: "Technical services were flawless. Our conversions doubled post-launch." 
                        },
                        { 
                          name: "Musician, Mombasa", 
                          quote: "Finally, visuals that actually match the sound. Pure passion." 
                        }
                      ].map((t, i) => (
                        <div
                          key={`${setIdx}-${i}`}
                          className="bg-white p-8 md:p-10 rounded-[2.5rem] flex flex-col gap-6 shadow-2xl relative group transition-all w-[80vw] md:w-[450px] flex-shrink-0"
                        >
                          <div className="flex justify-between items-start">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-navy border border-orange/20 rounded-full flex items-center justify-center text-white shadow-lg">
                              <User size={24} />
                            </div>
                            <span className="text-orange text-6xl md:text-8xl font-serif leading-none select-none opacity-90 h-10 md:h-12">"</span>
                          </div>
                          
                          <p className="text-navy text-base md:text-xl font-display font-bold leading-relaxed pr-4 md:pr-8 italic">
                            {t.quote}
                          </p>
                          
                          <div className="mt-auto">
                            <p className="text-navy/60 font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px]">
                              {t.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </motion.div>
              </div>
          </section>

            {/* 6. Contact & WhatsApp Footer */}
            <section id="quotation" className="w-full text-center pb-12 px-6 scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center">
                <InteractiveHeader 
                  text="CLICK TO GET" 
                  disableIcon={true}
                  className="sm:hidden text-white font-extrabold text-2xl uppercase tracking-tighter mb-0 leading-[0.9] font-display px-4"
                />
                <InteractiveHeader 
                  text="QUOTATION" 
                  className="sm:hidden text-white font-extrabold text-2xl uppercase tracking-tighter mb-12 leading-[0.9] font-display px-4"
                />
                <InteractiveHeader 
                  text="CLICK TO GET QUOTATION" 
                  className="hidden sm:block text-white font-extrabold sm:text-4xl md:text-7xl uppercase tracking-tighter md:tracking-widest mb-12 leading-[0.9] font-display px-4"
                />
              </div>
              
              <motion.a
                href="https://wa.me/254795665443"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -5, boxShadow: "0 25px 50px -12px rgba(37, 211, 102, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-4 bg-[#25D366] text-white px-10 py-6 rounded-2xl border-4 border-[#F5821F] font-black uppercase tracking-[0.2em] text-sm shadow-[0_20px_40px_rgba(37,211,102,0.2)] group transition-all"
              >
                <Phone size={20} fill="currentColor" />
                <span>WHATSAPP ME NOW: 0795665443</span>
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.a>
            </motion.div>
            </section>
          </div>
        </section>
          </>
        )}

        {view === 'training' && (
          <section id="training" className="w-full relative bg-[#0B1736] min-h-screen pt-20 pb-32">
            <Snowfall />
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20">
                <h2 className="text-orange font-black text-[14px] tracking-[0.5em] uppercase mb-4">GREEN RUWA ACADEMY</h2>
                <h1 className="text-white text-4xl md:text-7xl font-display font-black uppercase tracking-tighter">MASTER YOUR CRAFT</h1>
              </div>

              {/* Course Tiers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                {[
                  { title: "BEGINNER", price: "KSH 5,000", color: "#F5821F", features: ["Software Basics (Photoshop/Illustrator)", "Principles of Typography", "Basic Brand Identity", "2 Weeks Duration"] },
                  { title: "INTERMEDIATE", price: "KSH 12,000", color: "#00FFFF", features: ["Advanced Compositing", "Premium 3D Logo Effects (Gold/Silver)", "Professional Product Flyers", "4 Weeks Duration"] },
                  { title: "ADVANCED", price: "KSH 25,000", color: "#FFFFFF", features: ["Everything in Intermediate", "Motion Graphics & Transitions (After Effects)", "Basics of Web Design & Deployment", "Video Editing & Storytelling", "8 Weeks Duration"], popular: true }
                ].map((tier, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={window.innerWidth >= 768 ? { y: -10, backgroundColor: tier.color } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => document.getElementById('enrollment-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="relative p-8 border-2 rounded-3xl flex flex-col items-center text-center cursor-pointer group transition-all duration-300"
                    style={{ 
                      borderColor: tier.color,
                      backgroundColor: window.innerWidth < 768 ? tier.color : undefined 
                    }}
                  >
                    {tier.popular && (
                      <>
                        <div className="absolute inset-0 bg-[#B65B22]/10 blur-2xl -z-10" />
                        <div className="absolute -top-4 bg-[#0B1736] md:bg-orange text-white px-4 py-1 rounded-full text-[10px] font-black tracking-widest shadow-[0_0_15px_rgba(245,130,31,0.6)] z-20">MOST POPULAR</div>
                      </>
                    )}
                    <h3 className="text-black md:text-white md:group-hover:text-black font-display font-black text-2xl mb-2 transition-colors">{tier.title}</h3>
                    <div className="text-[#0B1736] md:text-orange md:group-hover:text-black font-black text-3xl mb-8 transition-colors">{tier.price}</div>
                    <div className="space-y-4 mb-10">
                      {tier.features.map((f, idx) => (
                        <p key={idx} className="text-black/80 md:text-white/80 md:group-hover:text-black font-bold text-sm uppercase tracking-wide transition-colors">
                          {f}
                        </p>
                      ))}
                    </div>
                    <motion.div 
                      whileTap={{ scale: 0.95 }}
                      className="mt-auto w-full py-4 rounded-xl font-black text-xs tracking-widest uppercase border-2 border-[#0B1736] md:border-current text-[#0B1736] md:text-white md:group-hover:text-black md:group-hover:border-black transition-colors"
                    >
                      SELECT PLAN
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Enrollment Form */}
              <div id="enrollment-form" className="max-w-3xl mx-auto bg-navy/50 p-8 md:p-16 rounded-[3rem] border border-white/10">
                <div className="text-center mb-12">
                  <h2 className="text-white text-3xl md:text-5xl font-display font-black uppercase tracking-[0.2em]">SECURE YOUR SPOT</h2>
                </div>
                
                {status === 'success' ? (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-cyan/10 border-2 border-[#00FFFF] p-10 rounded-3xl text-center shadow-[0_0_40px_rgba(0,255,255,0.4)]"
                  >
                    <h3 className="text-[#00FFFF] font-display font-black text-3xl mb-6 uppercase">APPLICATION SENT!</h3>
                    <p className="text-white font-black text-[11px] tracking-widest mb-8 uppercase leading-relaxed">CLICK TO DOWNLOAD FORM FOR MANUAL REGISTRATION THEN SCAN TO SEND TO WHATSAPP</p>
                    
                    <a 
                      href="/forms/application-form.pdf" 
                      download 
                      className="inline-block bg-orange text-white font-black px-8 py-4 rounded-xl text-xs tracking-widest uppercase hover:scale-105 transition-transform"
                    >
                      DOWNLOAD APPLICATION FORM
                    </a>
                    <button onClick={() => setStatus('idle')} className="block w-full mt-8 text-orange font-black text-[10px] tracking-[0.3em] uppercase underline animate-[pulse_0.5s_ease-in-out_infinite]">SEND ANOTHER APPLICATION</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-orange font-black text-[10px] tracking-widest uppercase ml-2">Student Name</label>
                      <input required name="name" type="text" className="bg-white/5 border border-white/20 rounded-xl p-4 text-white focus:border-orange outline-none" placeholder="John Doe" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-orange font-black text-[10px] tracking-widest uppercase ml-2">WhatsApp Number</label>
                      <input required name="whatsapp" type="tel" className="bg-white/5 border border-white/20 rounded-xl p-4 text-white focus:border-orange outline-none" placeholder="0712345678" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-orange font-black text-[10px] tracking-widest uppercase ml-2">Email Address</label>
                      <input required name="email" type="email" className="bg-white/5 border border-white/20 rounded-xl p-4 text-white focus:border-orange outline-none" placeholder="john@example.com" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-orange font-black text-[10px] tracking-widest uppercase ml-2">Course Level</label>
                      <select name="level" className="bg-white/5 border border-white/20 rounded-xl p-4 text-white focus:border-orange outline-none appearance-none">
                        <option className="bg-navy">Beginner</option>
                        <option className="bg-navy">Intermediate</option>
                        <option className="bg-navy">Advanced</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-orange font-black text-[10px] tracking-widest uppercase ml-2">What are your creative goals?</label>
                      <textarea name="goals" rows={4} className="bg-white/5 border border-white/20 rounded-xl p-4 text-white focus:border-orange outline-none resize-none" placeholder="Tell me what you want to achieve..."></textarea>
                    </div>
                    <button 
                      disabled={status === 'submitting'}
                      type="submit" 
                      className="md:col-span-2 bg-[#B65B22] hover:bg-orange-400 hover:scale-105 active:scale-95 transition-all duration-300 text-white font-black py-6 rounded-2xl text-sm tracking-[0.3em] uppercase mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? 'SENDING...' : 'SUBMIT APPLICATION'}
                    </button>
                    {status === 'error' && <p className="md:col-span-2 text-red-500 text-[10px] font-black text-center uppercase tracking-widest mt-2">SOMETHING WENT WRONG. PLEASE TRY AGAIN.</p>}
                  </form>
                )}
              </div>
            </div>
          </section>
        )}

        {view === 'about' && <AboutPage />}
      </main>

      <Footer />

      <FloatingCommHub isVisible={showCommHub} showScrollTop={showScrollTop} onScrollTop={scrollToTop} />
      <CursorFollower />
    </div>
  );
}

export function AboutPage() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full min-h-screen bg-white flex items-center justify-center py-20 px-6 overflow-hidden"
    >
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,#F5821F_0%,rgba(255,255,255,0)_60%)] opacity-20" />
      </div>
      
      <style>{`
        @keyframes mini-vibrate {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(1px, -1px); }
          50% { transform: translate(-1px, 1px); }
          75% { transform: translate(1px, 1px); }
        }
        .hover-vibrate:hover {
          animation: mini-vibrate 0.2s ease-in-out;
        }
      `}</style>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Image Side */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative flex justify-center group cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 hover-vibrate">
            {/* Navy Decorative Tab Top */}
            <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-32 h-10 bg-[#0B1736] rounded-t-2xl z-0" />
            
            <div className="relative w-full max-w-md aspect-[4/5] bg-[#00FFFF] rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white">
              <img 
                src={GreenMainImg} 
                alt="Green Ruwa" 
                className="w-full h-full object-cover object-[center_20%] scale-110 transition-transform duration-500 group-hover:scale-115"
              />
            </div>

            {/* Navy Decorative Tab Bottom */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-20 bg-[#0B1736] rounded-2xl z-20 shadow-2xl" />
          </div>
        </motion.div>

        {/* Content Side */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-2 -mb-12 md:-mb-16">
            <h2 className="text-[#0B1736] font-black text-6xl md:text-8xl font-display leading-none uppercase tracking-tighter">
              ABOUT ME
            </h2>
            <div className="flex gap-3 mt-4">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-[#0B1736] animate-bounce [animation-delay:-0.3s]" />
              <div className="w-6 h-6 rounded-full bg-[#F5821F] animate-bounce [animation-delay:-0.15s]" />
              <div className="w-6 h-6 rounded-full bg-[#0B1736] animate-bounce" />
              <div className="w-6 h-6 rounded-full bg-[#00FFFF] animate-bounce [animation-delay:0.15s]" />
            </div>
          </div>

          <div className="space-y-6 pt-12 md:pt-16">
            <p className="text-[#0B1736] text-xl md:text-2xl font-bold leading-relaxed">
              As a dedicated creative strategist and multimedia expert, I specialize in transforming complex ideas into high-impact visual narratives.
            </p>
            <p className="text-[#0B1736]/70 text-lg leading-relaxed">
              With years of experience across graphic design, video production, and motion graphics, my mission is to bridge the gap between technical precision and artistic passion. I don't just create designs; I build identities that resonate and stories that stick.
            </p>
          </div>

          <motion.a
            href="https://wa.me/254795665443"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-fit bg-[#F5821F] text-white font-black px-10 py-5 rounded-2xl tracking-[0.2em] uppercase shadow-xl mt-4 inline-block text-center"
          >
            Let's Collaborate
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Footer() {
  return (
    <footer className="relative w-full bg-[#0B1736] pt-0">
      <style>{`
        @keyframes endless-drop {
          0% { transform: translateY(-5px); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(15px); opacity: 0; }
        }
        .animate-endless-drop {
          animation: endless-drop 1.5s infinite linear;
        }
        @keyframes footer-blink {
          0%, 100% { color: #FFFFFF; }
          50% { color: #F5821F; }
        }
        .mobile-link-blink {
          animation: footer-blink 3s infinite ease-in-out;
        }
        @keyframes border-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .v-notch {
          clip-path: polygon(0 0, 42% 0, 50% 45%, 58% 0, 100% 0, 100% 100%, 0 100%);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 pb-20 flex flex-col items-center text-center pt-20">
        <div className="flex flex-col items-center gap-6 mb-12">
          <h2 className="text-white font-black uppercase tracking-[0.5em] text-[10px] mt-0">CONNECT WITH ME</h2>
          
          <div className="flex gap-6 items-center justify-center">
            {[
              { 
                icon: <Facebook size={22} strokeWidth={2.5} />, 
                href: "https://www.facebook.com/share/17CRKGQsij/",
                label: "Facebook"
              },
              { 
                icon: (
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                  </svg>
                ), 
                href: "https://www.tiktok.com/@green.ruwa?_r=1&_t=ZS-95rmL5JLQAM",
                label: "TikTok"
              },
              { 
                icon: (
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.431 5.63 1.432h.006c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                ), 
                href: "https://wa.me/0795665443",
                label: "WhatsApp"
              }
            ].map((social, i) => (
              <div key={i} className="relative group p-[2px]">
                {/* Spinning Border */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-orange opacity-60 group-hover:opacity-100 group-hover:scale-110 group-hover:animate-[spin_2s_linear_infinite] transition-all duration-500" style={{ animation: 'border-spin 8s linear infinite' }} />
                
                <motion.a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-orange hover:shadow-[0_0_20px_rgba(245,130,31,0.6)] transition-all duration-300"
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 md:gap-x-12 gap-y-6 text-[10px] font-black text-white tracking-[0.4em] uppercase">
          <a href="/#work" className="hover:text-orange transition-colors mobile-link-blink md:animate-none">Portfolio</a>
          <a href="/#services" className="hover:text-orange transition-colors mobile-link-blink md:animate-none">Services</a>
          <a href="/#about" className="hover:text-orange transition-colors mobile-link-blink md:animate-none">About</a>
          <a href="/#resources" className="hover:text-orange transition-colors mobile-link-blink md:animate-none">Resources</a>
        </div>
      </div>

      {/* Bottom Bar with Integrated V-Notch */}
      <div className="relative w-full bg-orange v-notch pt-12 pb-8 md:py-8 mt-[-1px]">
        {/* The Animated Triangle */}
        <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none">
          <div className="relative w-12 h-12">
             <svg 
              viewBox="0 0 24 24" 
              className="w-5 h-5 text-white absolute left-1/2 -translate-x-1/2 animate-endless-drop"
              fill="currentColor"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-center">
          <div className="hidden md:flex w-full justify-between text-[10px] text-white font-black uppercase tracking-[0.6em] lg:tracking-[1em]">
            <span>© 2026 GREEN RUWA</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
          <div className="md:hidden flex flex-col items-center justify-center flex-1">
            <div className="text-[9px] text-white font-black uppercase tracking-[0.3em] leading-tight text-center">
            © 2026 GREEN RUWA • ALL RIGHTS RESERVED
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Snowfall() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {[...Array(40)].map((_, i) => {
        const isOrange = Math.random() > 0.7;
        const size = Math.random() * 6 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = -Math.random() * 20;
        const opacity = Math.random() * 0.6 + 0.1;

        return (
          <div
            key={i}
            className="absolute top-0 star-fall"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: isOrange ? 'rgba(245, 130, 31, 0.5)' : 'rgba(255, 255, 255, 0.6)',
              borderRadius: '50%',
              boxShadow: isOrange ? '0 0 12px #F5821F' : 'none',
              filter: !isOrange ? 'blur(1px)' : 'none',
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              opacity: opacity,
            }}
          />
        );
      })}
    </div>
  );
}

function FloatingCommHub({ isVisible, showScrollTop, onScrollTop }: { isVisible: boolean, showScrollTop: boolean, onScrollTop: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isVisible) return null;

  const buttonClass = "w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300";
  const glassBg = "bg-navy/40";

  const WhatsAppLogo = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.431 5.63 1.432h.006c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-3">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Official WhatsApp Button */}
            <motion.a
              href="https://wa.me/254795665443"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`${buttonClass} bg-[#25D366] hover:scale-110`}
            >
              <WhatsAppLogo />
            </motion.a>

            {/* Blue Dialer Button */}
            <motion.a
              href="tel:+254795665443"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }}
              className={`${buttonClass} bg-[#007AFF] hover:scale-110`}
            >
              <Phone size={20} fill="white" />
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Transforming Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`${buttonClass} ${glassBg} backdrop-blur-md border border-white/20`}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-2xl font-light">✕</span>
            </motion.div>
          ) : (
            <motion.div
              key="call"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              >
                <Phone size={20} className="text-orange fill-orange" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Scroll to Top Integration */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onScrollTop}
            className={`${buttonClass} bg-white/10 backdrop-blur-md border border-white/20 hover:bg-orange`}
          >
            <ArrowUp size={20} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
function SpinToWin() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [tickerKey, setTickerKey] = useState(0);
  const [isClaiming, setIsClaiming] = useState(false);

  const prizes = [
    { label: "AFTER EFFECTS", color: "#FF8C00", link: "https://drive.google.com/drive/folders/1v1Lp05Vk_fMEHChdO45vGFkw9LMCJLyT" },
    { label: "PREMIERE PRO", color: "#001524", link: "https://drive.google.com/uc?export=download&id=1QXH-53jZiVUM9K08PYWL_zVS6YL_OxgF" },
    { label: "PHOTOSHOP", color: "#FF8C00", link: "https://drive.google.com/uc?export=download&id=1TKmhJuBYGqMKFDDPkoGTcs_EnVtBKiU8" },
    { label: "AI HINTS", color: "#001524", link: "https://drive.google.com/file/d/1BppRU34Jcq7QejXP6hlsAVwhERF8IBrM/view?usp=sharing" },
    { label: "TRY AGAIN", color: "#00FFFF", link: null }
  ];

  const sliceAngle = 360 / prizes.length;

  const handleClaim = () => {
    const prize = prizes.find(p => p.label === result);
    if (!prize || !prize.link) return;

    setIsClaiming(true);
    setTimeout(() => {
      window.open(prize.link!, "_blank");
      setIsClaiming(false);
    }, 1000);
  };

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    
    const extraSpins = (8 + Math.random() * 5) * 360;
    const newRotation = rotation + extraSpins;
    setRotation(newRotation);
    
    setTimeout(() => {
      setSpinning(false);
      const actualDegree = newRotation % 360;
      const winningIndex = Math.floor(((360 - (actualDegree % 360)) % 360) / sliceAngle);
      setResult(prizes[winningIndex].label);
    }, 5000);
  };

  useEffect(() => {
    if (spinning) {
      const interval = setInterval(() => {
        setTickerKey(prev => prev + 1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [spinning]);

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-72 h-72 md:w-96 md:h-96 relative">
        {/* Ticker Pointer */}
        <motion.div 
          key={tickerKey}
          animate={{ rotate: spinning ? [-15, 0] : 0 }}
          className="absolute -top-2 left-1/2 -translate-x-1/2 z-30 text-white drop-shadow-lg"
        >
          <div className="w-6 h-8 bg-white clip-path-triangle shadow-xl" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }} />
        </motion.div>

        {/* Wheel */}
        <motion.div 
          animate={{ rotate: rotation }}
          transition={{ duration: 5, ease: [0.2, 0, 0, 1] }}
          className="w-full h-full rounded-full border-[12px] border-[#001524] relative overflow-hidden shadow-[0_0_60px_rgba(0,255,255,0.2)]"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {prizes.map((prize, i) => {
              const startAngle = i * sliceAngle;
              const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
              const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
              const x2 = 50 + 50 * Math.cos((Math.PI * (startAngle + sliceAngle - 90)) / 180);
              const y2 = 50 + 50 * Math.sin((Math.PI * (startAngle + sliceAngle - 90)) / 180);
              
              return (
                <g key={i}>
                  <path 
                    d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`} 
                    fill={prize.color}
                    stroke="#ffffff22"
                    strokeWidth="0.5"
                  />
                  <defs>
                    <path id={`textPath${i}`} d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2}`} />
                  </defs>
                  <text 
                    transform={`rotate(${startAngle + sliceAngle/2} 50 50)`}
                    x="50" y="20" 
                    fill={prize.color === "#00FFFF" ? "#001524" : "white"}
                    textAnchor="middle" 
                    className="text-[4px] font-black uppercase tracking-tighter"
                    style={{ fontSize: '3.5px' }}
                  >
                    {prize.label}
                  </text>
                </g>
              );
            })}
          </svg>
          
          {/* Central Hub */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-16 h-16 bg-white rounded-full shadow-2xl z-10 flex items-center justify-center border-4 border-[#001524]">
                <div className="w-10 h-10 bg-[#001524] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      <button 
        onClick={spin}
        disabled={spinning}
        className="mt-8 bg-[#FF8C00] text-white font-black px-12 py-5 rounded-xl tracking-[0.3em] uppercase hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-2xl border-b-4 border-[#001524]"
      >
        {spinning ? "SPINNING..." : "LUCKY SPIN"}
      </button>

      {result && !spinning && (
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="mt-6 text-center"
        >
          <p className="text-white font-black text-[12px] tracking-[0.4em] uppercase mb-3">RESULT UNLOCKED</p>
          <motion.div 
            animate={{ scale: [1, 1.02, 1], boxShadow: ["0 0 10px #00FFFF", "0 0 30px #00FFFF", "0 0 10px #00FFFF"] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="bg-[#00FFFF] text-[#001524] px-8 py-4 rounded-xl font-black text-2xl uppercase tracking-widest flex flex-col items-center gap-4"
          >
            <span>{result}</span>
            {result !== "TRY AGAIN" ? (
              <button 
                onClick={handleClaim}
                disabled={isClaiming}
                className="bg-[#001524] text-white text-[10px] px-6 py-2 rounded-full hover:bg-navy/80 transition-colors flex items-center gap-2"
              >
                {isClaiming ? (
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : null}
                {isClaiming ? "GENERATING GIFT..." : "CLAIM REWARD"}
              </button>
            ) : (
              <button onClick={spin} className="bg-[#001524] text-white text-[10px] px-6 py-2 rounded-full">
                SPIN AGAIN
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function Card({ videoSrc, title, category, delay = 0, href = "#", isInitiallyActive = false }: { videoSrc: string; title: string; category: string; delay?: number; href?: string; isInitiallyActive?: boolean }) {
  const [isActive, setIsActive] = useState(isInitiallyActive);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTouch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isActive) {
      e.preventDefault();
      setIsActive(true);
    }
  };

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(() => {});
    } else {
      videoRef.current?.pause();
    }
  }, [isActive]);

  return (
    <a 
      href={href}
      target="_blank"
      onClick={handleTouch}
      onTouchStart={handleTouch}
      rel="noopener noreferrer"
      className="block w-full max-w-[320px]"
    > 
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay }}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        className="relative aspect-[4/5] flex flex-col items-center justify-center transition-all duration-500 bg-transparent p-2 md:p-4 border-[6px] md:border-[10px] border-white rounded-xl md:rounded-2xl shadow-2xl cursor-pointer group w-full scale-90 md:scale-100"
      >
        <video 
          ref={videoRef}
          src={videoSrc}
          loop
          muted
          autoPlay
          playsInline
          className={`absolute inset-0 w-full h-full object-cover z-0 rounded-lg transition-all duration-500 ${!isActive ? 'blur-md scale-105' : 'blur-0 scale-100'}`}
        />

        {/* Golden Inner Box Overlay */}
        <div className={`absolute inset-0 z-10 bg-orange/40 backdrop-blur-xl transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`} />

        {/* 3D Flipping Coin */}
        <AnimatePresence>
          {!isActive && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotateY: 180 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-24 h-24 flex items-center justify-center"
              >
                {/* Side A: Text */}
                <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full shadow-lg" style={{ backfaceVisibility: 'hidden' }}>
                  <span className="text-orange font-black text-[10px] tracking-tighter text-center">PLAY<br/>ME</span>
                </div>
                {/* Side B: Icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full shadow-lg" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-orange border-b-[10px] border-b-transparent ml-1" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sharp Badge Title Box */}
        <div className="absolute -bottom-2 md:-bottom-4 left-1/2 -translate-x-1/2 z-30 w-[95%] md:w-[90%]">
          <div className="bg-[#00ffff] md:bg-navy md:hover:bg-[#00ffff] border-2 border-white py-2 md:py-4 px-3 md:px-6 flex items-center justify-between overflow-hidden rounded-none transition-colors duration-300 group/badge">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut" }}
              className="text-[#2D1B4E] md:text-orange md:group-hover/badge:text-[#2D1B4E] font-black text-xl transition-colors duration-300"
            >
              <span className="hidden md:inline">▶</span>
            </motion.div>

            <div className="text-center flex flex-col">
              <h3 className="text-sm md:text-base font-display font-black text-[#2D1B4E] md:text-white md:group-hover/badge:text-[#2D1B4E] tracking-tighter uppercase leading-none animate-pulse transition-colors duration-300">
                {title}
              </h3>
              <span className="text-[7px] font-black text-[#2D1B4E]/80 md:text-orange md:group-hover/badge:text-[#2D1B4E] tracking-[0.2em] mt-1 transition-colors duration-300">
                CLICK TO SEE PROJECTS
              </span>
            </div>

            <motion.div
              animate={{ x: [0, -10, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut" }}
              className="text-[#2D1B4E] md:text-orange md:group-hover/badge:text-[#2D1B4E] font-black text-xl transition-colors duration-300"
            >
              <span className="hidden md:inline">◀</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </a>
  );
}

interface SkillItemProps {
  number: string;
  label: string;
  icon: React.ReactNode;
}

function SkillItem({ number, label, icon }: SkillItemProps) {
  return (
    <div className="relative p-[5px] rounded-[2.2rem] overflow-hidden group shadow-[0_0_25px_rgba(245,130,31,0.4)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-3 hover:scale-105 active:scale-95">
      {/* Rotating Border Effect */}
      <div className="absolute inset-[-100%] bg-[conic-gradient(transparent,#F5821F_20deg,transparent_120deg)] animate-spin-slow z-0" />
      
      {/* Inner Card Content */}
      <motion.div 
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        whileHover={{ scale: 0.98 }}
        className="relative z-10 bg-[#00FFFF] rounded-[2rem] p-10 flex flex-col items-center text-center cursor-pointer transition-all duration-300"
      >
        <div className="mb-8 w-16 h-16 rounded-2xl bg-[#0B1736]/10 flex items-center justify-center transition-all duration-500">
          {React.cloneElement(icon as React.ReactElement, { 
            className: "text-[#0B1736]", 
            strokeWidth: 3 
          })}
        </div>
        <div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-[10px] font-black text-[#0B1736]">{number}</span>
            <div className="h-[1px] w-4 bg-[#0B1736]/30" />
          </div>
          <p className="text-sm font-black uppercase tracking-[0.2em] leading-tight text-[#0B1736]">{label}</p>
        </div>
      </motion.div>
    </div>
  );
}
