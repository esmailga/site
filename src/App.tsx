import React from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import {
  Code2,
  Smartphone,
  GraduationCap,
  Award,
  LayoutDashboard,
  Cpu,
  ArrowUpRight,
  Sun,
  Moon,
  FileText
} from "lucide-react";

import resume from './assets/resume.pdf';
import profileImage from './assets/profile.jpg';
import samaformPage from './assets/samaformpage.webp';
import flexibleeaPage from './assets/flexibleeapage.webp';
import whatsapp from './assets/whatsapp.svg';
import gmail from './assets/gmail.svg';
import linkedin from './assets/linkedin.svg';
import github from './assets/github.svg';
import FlutterIcon from './assets/flutter.svg?react';
import ERPNextIcon from './assets/Erpnext.svg?react';
import JavascriptIcon from './assets/javascript.svg?react';
import PhpIcon from './assets/php.svg?react';
import PythonIcon from './assets/python.svg?react';
import HtmlIcon from './assets/html.svg?react';
import DjangoIcon from './assets/django.svg?react';
import MysqlIcon from './assets/mysql.svg?react';
import GitIcon from './assets/git.svg?react';
import CppIcon from './assets/c-plus.svg?react';
import PostgresqlIcon from './assets/postgresql.svg?react';
import ReactIcon from './assets/react.svg?react';
import NodejsIcon from './assets/nodejs.svg?react';

const SocialsMenu = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleY = useTransform(
    [scrollY, scrollYProgress],
    ([latestY, latestProgress]: [number, number]) => {
      if (latestY < 0) return 0.05;
      return Math.min(1, 0.2 + latestProgress * 0.75);
    }
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 150);
  });
  const shouldHideIcons = isScrolled && isMobile;
  const socials = [
    {
      icon: <img src={whatsapp} alt="Contact" className="w-5 h-5 md:w-7 md:h-7" />,
      href: "https://wa.me/967733794400",
      target: "_blank",
      rel: "noopener noreferrer",
      bg: "bg-green-500"
    },
    {
      icon: <img src={gmail} alt="Gmail" className="w-5 h-5 md:w-7 md:h-7" />,
      href: "mailto:esmaeelf007@gmail.com",
      bg: "bg-white"
    },
    {
      icon: <img src={linkedin} alt="LinkedIn" className="w-5 h-5 md:w-8 md:h-8 object-contain brightness-0 invert" />,
      href: "https://www.linkedin.com/in/esmail-alwahbani",
      target: "_blank",
      rel: "noopener noreferrer",
      bg: "bg-[#0b66c2]"
    },
    {
      icon: <img src={github} alt="GitHub" className="w-6 h-6 md:w-8 md:h-8 object-contain brightness-0 invert" />,
      href: "https://github.com/esmailga",
      target: "_blank",
      rel: "noopener noreferrer",
      bg: "bg-neutral-800"
    },
  ];

  return (
    <div className="fixed left-2 md:left-7 top-28 md:top-24 z-50 flex flex-col items-center gap-4 md:gap-4 pointer-events-auto">

      <div className="flex flex-col items-center gap-4 md:gap-4">
        {socials.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            target={item.target}
            rel={item.rel}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: shouldHideIcons ? 0 : 1,
              y: shouldHideIcons ? -20 : 0
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
              delay: shouldHideIcons ? 0 : index * 0.1
            }}
            className={`w-8 h-8 md:w-12 md:h-12 rounded-full ${item.bg} text-white shadow-lg hover:scale-120 transition-transform flex items-center justify-center ${shouldHideIcons ? "pointer-events-none" : "pointer-events-auto"
              }`}
          >
            {item.icon}
          </motion.a>
        ))}
      </div>
      <motion.div
        style={{ scaleY }}
        className={`w-0.5 h-[300px] bg-[var(--muted)]/90 origin-top transition-transform duration-[1s] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${shouldHideIcons ? "-translate-y-[220px]" : "translate-y-0"
          }`}
      />
    </div>
  );
};

const SectionHeading = ({ title }: { title: string }) => (
  <div className="flex items-end gap-4 mb-8 md:mb-16 px-4 md:px-0">
    <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-none italic">{title}</h2>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="h-1 flex-1 bg-[var(--card)] mb-2 relative overflow-hidden"
    >
      <motion.div
        variants={{
          hidden: { x: "-100%" },
          visible: { x: "0%" }
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 bg-[var(--accent)]"
      />
    </motion.div>
  </div>
);
export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  useLayoutEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const technologies = [
    { Icon: DjangoIcon, alt: 'Django' },
    { Icon: PythonIcon, alt: 'Python' },
    { Icon: FlutterIcon, alt: 'Flutter' },
    { Icon: ERPNextIcon, alt: 'ERPNext' },
    { Icon: ReactIcon, alt: 'React' },
    { Icon: NodejsIcon, alt: 'Nodejs' },
    { Icon: JavascriptIcon, alt: 'JavaScript' },
    { Icon: CppIcon, alt: 'C++' },
    { Icon: PostgresqlIcon, alt: 'Postgresql' },
    { Icon: HtmlIcon, alt: 'HTML' },
    { Icon: MysqlIcon, alt: 'MySQL' },
    { Icon: PhpIcon, alt: 'PHP' },
    { Icon: GitIcon, alt: 'Git' },
  ];

  const projects = [
    {
      title: "SaraBeauty",
      type: "Full Stack Development",
      year: "2026",
      desc: "Custom CMS and client portal for an architectural firm with complete website customization from admin dashboard.",
      techs: ["React", "Node.js", "PostgreSQL"],
      icon: <LayoutDashboard className="w-6 h-6" />,
      image: samaformPage,
      website: "https://samaform.com"

    },
    {
      title: "Samaform CMS",
      type: "Full Stack Development",
      year: "2025",
      desc: "Custom CMS and client portal for an architectural firm with complete website customization from admin dashboard.",
      techs: ["React", "Node.js", "PostgreSQL"],
      icon: <LayoutDashboard className="w-6 h-6" />,
      image: samaformPage,
      website: "https://samaform.com"

    },
    {
      title: "Flexibleea",
      type: "Mobile App Development",
      year: "2023",
      desc: "Cross-platform job recruitment app tailored for freelancers.",
      techs: ["Flutter", "Dart", "C++"],
      icon: <Smartphone className="w-6 h-6" />,
      image: flexibleeaPage,
      website: "https://github.com/esmailga/Flexibleea"
    }
  ];

  return (
    <div className="min-h-screen selection:bg-blue-500 selection:text-white" ref={containerRef}>
      <nav className="fixed top-0 w-full z-50 p-6 bg-transparent md:mix-blend-difference">
        <div className="flex gap-4 items-center justify-end">
          <a
            href={resume}
            download
            className="px-5 py-2.5 flex bg-neutral-300/20 md:bg-neutral-900/50 items-center backdrop-blur-md font-black text-invert md:text-white rounded-full hover:bg-red-500/70 transition-all hover:scale-105 shadow-xl shadow-white/10"
            title="Download CV"
          >
            <FileText size={18} />
          </a>
          <motion.button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-neutral-300/20 md:bg-neutral-900/50 backdrop-blur-md text-invert md:text-white shadow-xl shadow-white/10 relative flex items-center justify-center overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.85 }}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <motion.div
              initial={false}
              animate={{
                rotate: theme === 'dark' ? 0 : -90,
                scale: theme === 'dark' ? 1 : 0,
                opacity: theme === 'dark' ? 1 : 0,
              }}
              transition={{ type: "spring", stiffness: 250, damping: 15 }}
              className="absolute"
            >
              <Moon size={18} />
            </motion.div>
            <motion.div
              initial={false}
              animate={{
                rotate: theme === 'light' ? 0 : 90,
                scale: theme === 'light' ? 1 : 0,
                opacity: theme === 'light' ? 1 : 0,
              }}
              transition={{ type: "spring", stiffness: 250, damping: 15 }}
            >
              <Sun size={18} />
            </motion.div>
          </motion.button>
        </div>
      </nav>
      <SocialsMenu />
      <section className="h-full md:h-[85vh] flex flex-col justify-center items-center relative px-3 overflow-hidden">
        <div className="mt-16 md:mt-12 max-w-6xl w-full mx-auto relative group">
          <div className="absolute inset-4 glossy-card rounded-t-[4rem] -z-8 transition-colors duration-500 border-b-0 [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]" />          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 p-8 md:py-14 px-16 items-center">
            <div className="space-y-8 order-2 md:order-1 md:col-span-2">
              <motion.div
                style={{ y }}
                className="relative z-10"
              >
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-[1.8rem] md:text-7xl font-black leading-[1.5] flex flex-col tracking-tighter"
                >
                  <span>Esmail Alwahbani</span>
                  <span className="italic text-[var(--accent)] text-lg md:text-4xl mt-6 md:mt-8 font-black uppercase tracking-wide">Software Developer</span>
                </motion.h1>
              </motion.div>
            </div>

            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div className="w-full max-w-[340px] aspect-square rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl">
                <img
                  src={profileImage}
                  alt='profile'
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="mb-18 px-12 md:px-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-[var(--muted)] text-center text-lg md:text-xl font-medium leading-[1.3] md:leading-relaxed transition-colors duration-500 tracking-wide"
            >
              Diverse expertise in bridging software technology with experience in ERP system development and exposure to high voltage substation protection systems and automation control.
              Skilled in backend development, system integration, and web development.
            </motion.p>
          </div>
        </div>
        <div
          className="absolute inset-0 -z-20 opacity-[0.05] transition-colors duration-500"
          style={{
            backgroundImage: `linear-gradient(${theme === 'dark' ? '#fff' : '#000'} 1.5px, transparent 2px), linear-gradient(90deg, ${theme === 'dark' ? '#fff' : '#000'} 1.5px, transparent 2px)`,
            backgroundSize: '90px 90px'
          }}
        />
      </section>
      <section className="py-7 bg-[var(--card)]/30 backdrop-blur-sm relative z-20 transition-colors duration-500 border-y border-[var(--border)]">
        <div className="mask-marquee flex overflow-hidden">
          <div className="flex animate-marquee group">
            {[...technologies, ...technologies].map((tech, i) => {
              const { Icon, alt } = tech;
              return (
                <div
                  key={i}
                  className={`flex-shrink-0 mx-6 md:mx-10 flex items-center justify-center transition-colors duration-500 
                    ${theme === 'dark' ? 'text-white' : 'text-black'}
                    ${alt === 'C++' ? 'scale-150 transform' : ''}
                    ${alt === 'Flutter' ? 'scale-80 transform' : ''}
                    ${alt === 'Postgresql' ? 'scale-80 transform' : ''}
                  `}
                  title={alt}
                >
                  <Icon className="w-20 md:w-32 h-10 md:h-[60px]" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <main className="max-w-7xl mx-auto py-22 px-6">
        <section id="expertise" className="mb-20 md:mb-30">
          <SectionHeading title="Expertise" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Web/Backend", icons: <Code2 />, desc: "High-performance React systems and ERPNext integration." },
              { title: "Machine Learning", icons: <Cpu />, desc: "Intrusion Detection model engineering and training." },
              { title: "Mobile Core", icons: <Smartphone />, desc: "Cross-platform engineering with Flutter and native C++ logic." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 glossy-card rounded-3xl hover:border-[var(--accent)] transition-all"
              >
                <div className="text-bg-500 mb-6 group-hover:scale-110 transition-transform">{item.icons}</div>
                <h3 className="text-md md:text-xl font-black uppercase italic mb-4">{item.title}</h3>
                <p className="text-[var(--muted)] leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
        <section id="works" className="mb-8 md:mb-30">
          <SectionHeading title="Projects" />
          <div className="flex flex-col overflow-hidden">
            {projects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center justify-center min-h-[100vh] mt-8 md:mt-0 gap-12 md:gap-24`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group w-[230px] md:w-[310px] h-[480px] md:h-[667px] rounded-[3.5rem] shrink-0 overflow-hidden border-[9px] border-black bg-black shadow-[0_0_0_2px_#3f3f46,0_0_0_4px_#18181b,0_25px_40px_-14px_rgba(0,0,0,0.7)]"
                  >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-22 h-5 bg-black rounded-full z-20" />
                    <div className="relative w-full h-full bg-[var(--card)] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-85"
                      />
                      <div className="absolute bottom-8 left-2 z-10">
                        <span className="font-mono text-[0.5rem] md:text-[0.7rem] font-bold text-white tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                          {project.year} // {project.type}
                        </span>
                      </div>
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-[var(--accent)]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 cursor-pointer"
                      >
                        <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center text-white rotate-0 group-hover:rotate-12 transition-transform">
                          <ArrowUpRight className="w-8 h-8" />
                        </div>
                      </a>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex-1 max-w-xl text-center ${isEven ? "md:text-left" : "md:text-left"
                      }`}
                  >
                    <div
                      className={`flex flex-col md:flex-row items-center gap-6 mb-6 ${isEven ? "md:justify-start" : " md:justify-start"
                        }`}
                    >
                      <div className="w-12 h-12 rounded-2xl glossy-card shadow-sm overflow-hidden shrink-0 flex items-center justify-center p-2">
                        {project.icon}
                      </div>
                      <h3 className="text-2xl md:text-5xl font-black italic tracking-tighter">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-md md:text-lg text-[var(--muted)] mb-8 leading-relaxed">
                      {project.desc}
                    </p>

                    <div
                      className={`flex flex-wrap gap-3 justify-center ${isEven ? "md:justify-start" : "md:justify-start"
                        }`}
                    >
                      {project.techs.map((t) => (
                        <span
                          key={t}
                          className="px-4 py-2 glossy-card rounded-full text-xs font-bold text-[var(--muted)] uppercase transition-colors duration-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>
        <section id="experience" className="mb-20 md:mb-30">
          <SectionHeading title="Experience" />
          <div className="space-y-4">
            {[
              { role: "Electrical & Control Systems Engineer", company: "Aden 120MWp PV Project", date: "2025 - 2026", details: "SCADA systems integration and high-voltage protection controls." },
              { role: "Software Developer", company: "ProSite Yemen", date: "2024 - 2025", details: "ERPNext development and custom business module architecture." }
            ].map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col md:flex-row md:items-center justify-between p-10 hover:bg-[var(--card)] rounded-3xl transition-colors border-b-4 border-[var(--border)]"
              >
                <div className="flex-1">
                  <h4 className="text-md md:text-2xl font-black uppercase italic mb-1 group-hover:text-[var(--accent)] transition-colors tracking-tighter">{exp.role}</h4>
                  <p className="text-[var(--muted)] font-bold uppercase tracking-widest text-xs transition-colors duration-500">{exp.company}</p>
                </div>
                <div className="mt-4 md:mt-0 text-left md:text-right">
                  <p className="text-[var(--accent)] font-mono font-bold mb-1">{exp.date}</p>
                  <p className="text-[var(--muted)] text-md max-w-lg transition-colors duration-500">{exp.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        <section id="extra" className="mb-10">
          <SectionHeading title="Background" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 glossy-card rounded-[2.5rem] flex flex-col justify-between transition-colors duration-500">
              <div>
                <GraduationCap className="w-10 h-10 text-[var(--accent)] mb-6" />
                <h4 className="text-lg md:text-2xl font-black uppercase italic mb-2">Bachelor of IT (Hons)</h4>
                <p className="mt-10 text-[var(--muted)] font-medium leading-relaxed transition-colors duration-500">MAHSA University - Malaysia<br />Mobile application development major with a focus on advanced software engineering, graduated with 2:1 Honors</p>
              </div>
              <div className="mt-8 pt-8 border-t border-[var(--border)] transition-colors duration-500">
                <span className="font-mono text-sm text-[var(--muted)] transition-colors duration-500">CLASS OF 2024</span>
              </div>
            </div>

            <div className="p-10 glossy-card rounded-[2.5rem] flex flex-col justify-between transition-colors duration-500">
              <div>
                <Award className="w-10 h-10 text-[var(--accent)] mb-6" />
                <h4 className="text-lg md:text-2xl font-black uppercase italic mb-10">Certifications</h4>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center text-[var(--muted)] font-medium transition-colors duration-500">
                    <span>IELTS Language Test</span>
                    <span className="text-[var(--fg)] font-mono text-xs md:text-sm font-black transition-colors duration-500">BAND 7.5</span>
                  </li>
                  <li className="flex justify-between items-center text-[var(--muted)] font-medium transition-colors duration-500">
                    <span>Deep Learning</span>
                    <span className="text-[var(--fg)] font-mono text-xs md:text-sm font-black transition-colors duration-500">MAHSA '21</span>
                  </li>
                  <li className="flex justify-between items-center text-[var(--muted)] font-medium transition-colors duration-500">
                    <span>Big Data Insights</span>
                    <span className="text-[var(--fg)] font-mono text-xs md:text-sm font-black transition-colors duration-500">MAHSA '20</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-8 border-t border-[var(--border)] space-y-1 transition-colors duration-500">
                <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest transition-colors duration-500">Language Proficiency</p>
                <p className="text-sm font-medium tracking-wide">Professional Arabic & English</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-8 px-2 border-t border-[var(--border)] bg-[var(--bg)] transition-colors duration-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-left gap-2">
          <div className="flex flex-col gap-2 items-left origin-left ml-2">
            <span className="font-black text-xl md:text-4xl tracking-tighter transition-all hover:text-blue-500 cursor-default">ESMAIL ALWAHBANI</span>
            <p className="font-mono text-[10px] text-[var(--muted)] font-bold uppercase transition-colors duration-500"> // Software Dev</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2 text-[var(--muted)] font-medium text-sm transition-colors duration-500">
            <p>© 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
}