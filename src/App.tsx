import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useInView } from "motion/react";
import { useRef, useState, useEffect, useLayoutEffect, type ReactNode } from "react";
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
  FileText,
  Globe,
  Droplet,
  ShieldCheck
} from "lucide-react";

import resume from './assets/resume.pdf';
import profileImage from './assets/profile.jpg';
import sarahbeautyPage from './assets/sarabeauty.webp';
import samaformDesktop from './assets/samaform/desktop.webp';
import samaformMobile from './assets/samaform/mobile.webp';
import samaformProjectsDesktop from './assets/samaform/projects-desktop.webp';
import samaformProjectsMobile from './assets/samaform/projects-mobile.webp';
import samaformFormDesktop from './assets/samaform/form-desktop.webp';
import samaformFormMobile from './assets/samaform/form-mobile.webp';
import samaformResponsesDesktop from './assets/samaform/responses-desktop.webp';
import samaformResponsesMobile from './assets/samaform/responses-mobile.webp';
import shamsDesktop from './assets/shams/desktop.webp';
import shamsMobile from './assets/shams/mobile.webp';
import flexExplore from './assets/flexibleea/explore.webp';
import flexDetails from './assets/flexibleea/details.webp';
import flexPeople from './assets/flexibleea/people.webp';
import flexProfile from './assets/flexibleea/profile.webp';
import flexListingForm from './assets/flexibleea/listing-form.webp';
import flexExploreDark from './assets/flexibleea/explore-dark.webp';
import flexAdmin from './assets/flexibleea/admin.webp';
import wellUser from './assets/wellbooking/user.webp';
import wellAdmin from './assets/wellbooking/admin.webp';
import wellNotifications from './assets/wellbooking/notifications.webp';
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
import { IphoneFrame, MacbookFrame } from './components/DeviceFrames';
import { idsSteps } from './components/IdsVisual';

const SocialsMenu = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleY = useTransform(
    [scrollY, scrollYProgress],
    ([latestY, latestProgress]: number[]) => {
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
      href: "https://wa.me/966553923781",
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

// `image` is the phone screen; `desktopImage` adds a MacBook screen for projects shown on both.
type Screen = { title: string; image: string; desc: string; desktopImage?: string };

type Project = {
  title: string;
  type: string;
  year: string;
  desc: string;
  techs: string[];
  icon: ReactNode;
  image: string;
  // Without a website, the screens get no link or hover layer.
  website?: string;
  screens?: Screen[];
  desktopImage?: string;
  // Replaces the device frames for projects without screens, e.g. research work.
  visual?: ReactNode;
  // A tour of illustrated cards instead of screenshots.
  visualScreens?: VisualScreen[];
};

type VisualScreen = { title: string; desc: string; visual: ReactNode };

// Shown when a project has no device frame to carry the link.
const CodeLink = ({ href }: { href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--accent)] text-white text-xs md:text-sm font-bold uppercase hover:gap-3 transition-all"
  >
    View the code <ArrowUpRight className="w-4 h-4" />
  </a>
);

// Hover link, laid over a device screen.
const ScreenOverlay = ({ project, children }: { project: Project; children: ReactNode }) => (
  <div className="absolute inset-0">
    {children}
    {project.website && (
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
    )}
  </div>
);

const PhoneFrame = ({ project, className, children }: { project: Project; className: string; children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.4 }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    className={`relative group ${className} aspect-[732/1410] shrink-0 drop-shadow-[0_25px_25px_rgba(0,0,0,0.35)]`}
  >
    <IphoneFrame>
      <ScreenOverlay project={project}>{children}</ScreenOverlay>
    </IphoneFrame>
  </motion.div>
);

// Stacked screen images that cross-fade to the active one.
const FadeImages = ({ images, active, alts, className }: { images: string[]; active: number; alts: string[]; className: string }) => (
  <>
    {images.map((src, i) => (
      <motion.img
        key={`${i}-${src}`}
        src={src}
        alt={alts[i]}
        aria-hidden={i !== active}
        initial={false}
        animate={{ opacity: i === active ? 0.85 : 0 }}
        transition={{ duration: 0.5 }}
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
      />
    ))}
  </>
);

type DeviceShot = { desktop: string; mobile: string; label: string };

// MacBook with the phone layered over its corner, both showing the site. The lid swings open on first view.
// With several shots, both screens cross-fade together to `active`.
const DeviceStack = ({ project, shots, active = 0 }: { project: Project; shots: DeviceShot[]; active?: number }) => {
  const stackRef = useRef<HTMLDivElement>(null);
  const open = useInView(stackRef, { once: true, margin: "0px 0px -25% 0px" });

  return (
    <motion.div
      ref={stackRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative group w-full md:basis-3/5 pb-[3%]"
    >
      <div className="mr-[15%] drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)]">
        <MacbookFrame open={open}>
          <ScreenOverlay project={project}>
            <FadeImages
              images={shots.map((s) => s.desktop)}
              active={active}
              alts={shots.map((s) => `${project.title} on desktop: ${s.label}`)}
              className="object-top"
            />
          </ScreenOverlay>
        </MacbookFrame>
      </div>
      <a
        href={project.website}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute bottom-0 right-3 md:right-6 w-[26%] drop-shadow-[0_25px_25px_rgba(0,0,0,0.35)]"
      >
        <IphoneFrame>
          <FadeImages images={shots.map((s) => s.mobile)} active={active} alts={shots.map(() => "")} className="" />
        </IphoneFrame>
      </a>
    </motion.div>
  );
};

// Screenshots for the tour. Projects with a desktop image show the MacBook and phone together; others show the phone alone.
const DeviceTourStage = ({ project, screens, active }: { project: Project; screens: Screen[]; active: number }) =>
  project.desktopImage ? (
    <DeviceStack
      project={project}
      active={active}
      shots={screens.map((s) => ({ desktop: s.desktopImage ?? project.desktopImage!, mobile: s.image, label: s.title }))}
    />
  ) : (
    <PhoneFrame
      project={project}
      className="h-[min(480px,calc(100svh-17rem))] md:h-[min(667px,calc(100svh-8rem))]"
    >
      <FadeImages
        images={screens.map((s) => s.image)}
        active={active}
        alts={screens.map((s) => `${project.title}: ${s.title}`)}
        className=""
      />
    </PhoneFrame>
  );

// Illustrated cards for the tour, cross-fading to the active one.
const CardTourStage = ({ screens, active }: { screens: VisualScreen[]; active: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.4 }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    className="relative w-full max-w-[420px] shrink-0 h-[min(400px,calc(100svh-22rem))] md:h-[min(560px,calc(100svh-8rem))]"
  >
    {screens.map((s, i) => (
      <motion.div
        key={s.title}
        aria-hidden={i !== active}
        initial={false}
        animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 0.97 }}
        transition={{ duration: 0.5 }}
        className={`absolute inset-0 ${i === active ? "" : "pointer-events-none"}`}
      >
        {s.visual}
      </motion.div>
    ))}
  </motion.div>
);

type TourStep = { title: string; desc: string };

// Pins the stage while the section scrolls past, stepping through one screen per slice of scroll.
const ScreenTour = ({ project, screens, stage, isEven }: { project: Project; screens: TourStep[]; stage: (active: number) => ReactNode; isEven: boolean }) => {
  const tourRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: tourRef, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActive(Math.min(screens.length - 1, Math.floor(latest * screens.length)));
  });
  const screen = screens[active];

  return (
    <div ref={tourRef} className="relative" style={{ height: `${screens.length * 60 + 100}vh` }}>
      <div
        className={`sticky top-0 h-svh flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"
          } items-center justify-center gap-4 md:gap-24 pt-20 md:pt-0`}
      >
        {stage(active)}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 max-w-xl text-center md:text-left"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 mb-2 md:mb-6">
            <div className="hidden md:flex w-12 h-12 rounded-2xl glossy-card shadow-sm overflow-hidden shrink-0 items-center justify-center p-2">
              {project.icon}
            </div>
            <h3 className="text-2xl md:text-5xl font-black italic tracking-tighter">
              {project.title}
            </h3>
          </div>

          <div className="min-h-[6.5rem] md:min-h-[9rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <p className="font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-[var(--accent)] mb-2 md:mb-4">
                  {screen.title}
                </p>
                <p className="text-sm md:text-lg text-[var(--muted)] leading-relaxed">
                  {screen.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex gap-1.5 justify-center md:justify-start mt-3 md:mt-6" aria-hidden="true">
            {screens.map((s, i) => (
              <span
                key={s.title}
                className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-[var(--accent)]" : "w-3 bg-[var(--muted)]/40"}`}
              />
            ))}
          </div>

          <div className="hidden md:flex flex-wrap gap-3 justify-start mt-8">
            {project.techs.map((t) => (
              <span
                key={t}
                className="px-4 py-2 glossy-card rounded-full text-xs font-bold text-[var(--muted)] uppercase transition-colors duration-500"
              >
                {t}
              </span>
            ))}
          </div>

          {project.visualScreens && project.website && (
            <div className="mt-4 md:mt-8">
              <CodeLink href={project.website} />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

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

  const projects: Project[] = [
    {
      title: "Shams Solutions",
      type: "Full Stack Development",
      year: "2026",
      desc: "Bilingual English and Arabic website for an ERP and digital transformation company in Saudi Arabia. Server-rendered pages, interactive product demos, and a blog managed from a Firebase admin dashboard.",
      techs: ["React", "TypeScript", "Express", "Firebase"],
      icon: <Globe className="w-6 h-6" />,
      image: shamsMobile,
      desktopImage: shamsDesktop,
      website: "https://shamss.io"
    },
    {
      title: "IoT Intrusion Detection",
      type: "Machine Learning Research",
      year: "2026",
      desc: "Smart home devices like cameras, bulbs and sensors are easy to hack, and too small to run normal security software. I built a detector that learns what normal network traffic looks like and flags anything that doesn't fit, like a doorman who knows every regular by sight. It is under 0.1 MB, up to 700 times smaller than a typical model, and caught 89% of attacks on real smart-device traffic. Floods and break-ins are easy for it to spot; quiet scouting attacks are harder.",
      techs: ["Python", "TensorFlow", "scikit-learn", "Autoencoder"],
      icon: <ShieldCheck className="w-6 h-6" />,
      image: "",
      website: "https://github.com/esmailga/iot-sae-ids",
      visualScreens: idsSteps
    },
    {
      title: "Samaform CMS",
      type: "Full Stack Development",
      year: "2025",
      desc: "Custom CMS and client portal for an architectural firm with complete website customization from admin dashboard. With dynamic client onboarding form to capture spatial design plans and project requirements using RESTful APIs to process multi-step form, image uploads, and store client data.",
      techs: ["React", "Node.js", "PHP", "PostgreSQL"],
      icon: <LayoutDashboard className="w-6 h-6" />,
      image: samaformMobile,
      desktopImage: samaformDesktop,
      website: "https://samaform.com",
      screens: [
        { title: "Website", image: samaformMobile, desktopImage: samaformDesktop, desc: "Custom CMS and client portal for an architectural firm with complete website customization from admin dashboard. With dynamic client onboarding form to capture spatial design plans and project requirements using RESTful APIs to process multi-step form, image uploads, and store client data." },
        { title: "Admin: projects", image: samaformProjectsMobile, desktopImage: samaformProjectsDesktop, desc: "The firm adds, edits and removes the projects shown on the site, each with an English and Arabic name, a category and a photo." },
        { title: "Admin: form editor", image: samaformFormMobile, desktopImage: samaformFormDesktop, desc: "The onboarding form is edited from the dashboard: steps, questions, answer types and bilingual options, published as versions so older responses keep their labels." },
        { title: "Admin: responses", image: samaformResponsesMobile, desktopImage: samaformResponsesDesktop, desc: "Every client inquiry in one table, with the full answers and uploaded images on click, and export to Excel or a branded PDF." },
      ]
    },
    {
      title: "Well Irrigation Booking System",
      type: "Full Stack Development",
      year: "2026",
      desc: "Arabic booking system for hours on a shared irrigation well, with payment-proof review and per-farm limits.",
      techs: ["PHP", "SQLite", "JavaScript"],
      icon: <Droplet className="w-6 h-6" />,
      image: wellUser,
      screens: [
        { title: "Farmer booking", image: wellUser, desc: "Farmers pick a date and free hours for their farm, pay by bank transfer and upload a photo of the receipt. No account or password: the device remembers them." },
        { title: "Admin dashboard", image: wellAdmin, desc: "Admins sign in with two-factor codes, review payment proofs, and see today's schedule, duplicate-receipt flags and abuse alerts at a glance." },
        { title: "Phone notifications", image: wellNotifications, desc: "Each new payment proof pushes a notification to every admin's phone with the farm, date, hours and amount, and warns when a receipt image has been used before." },
      ]
    },
    {
      title: "SaraBeauty",
      type: "Full Stack Development",
      year: "2026",
      desc: "Website for an emerging beauty and care store with CRUD operations, real-time order tracking, and centralized payment oversight from a secure admin dashboard.",
      techs: ["React", "Node.js", "MySQL", "PHP"],
      icon: <LayoutDashboard className="w-6 h-6" />,
      image: sarahbeautyPage,
    },
    {
      title: "Flexibleea",
      type: "Mobile App Development",
      year: "2023",
      desc: "Cross-platform job recruitment app tailored for freelancers.",
      techs: ["Flutter", "Dart", "C++"],
      icon: <Smartphone className="w-6 h-6" />,
      image: flexExplore,
      website: "https://github.com/esmailga/Flexibleea",
      screens: [
        { title: "Explore", image: flexExplore, desc: "A cross-platform marketplace for freelancers. The Explore feed shows open listings live, with search and category filters." },
        { title: "Listing details", image: flexDetails, desc: "Each listing shows the freelancer's hourly rate, availability and reviews. Recruiters send requests through a prefilled email." },
        { title: "People", image: flexPeople, desc: "A directory of every member, searchable by name or email. Tap anyone to open their profile." },
        { title: "Freelancer profile", image: flexProfile, desc: "Profiles gather a freelancer's listings and let recruiters reach them directly by WhatsApp, email or phone." },
        { title: "Create / edit listing", image: flexListingForm, desc: "Freelancers set their own category, dates, working hours and hourly rate, with an optional qualification PDF." },
        { title: "Dark mode", image: flexExploreDark, desc: "Material 3 design with light and dark themes, smooth page transitions and micro-interactions throughout." },
        { title: "Admin console", image: flexAdmin, desc: "Admins rename or delete members, along with their listings, reviews and photos, and can remove any listing." },
      ]
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
              Software developer with experience spanning full-stack web development and ERP systems with hands-on exposure to industrial power environments. One of my passions is connecting with people through my work, transforming their ideas into lasting, tangible experiences. A tenacious mentality and strong adaptability allow me to execute effectively in any environment, from fast-moving startups to structured engineering teams.
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
          <div className="flex flex-col overflow-x-clip -mx-6 px-6">
            {projects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              const { screens, visualScreens } = project;
              if (screens) {
                return <ScreenTour key={idx} project={project} screens={screens} isEven={isEven} stage={(active) => <DeviceTourStage project={project} screens={screens} active={active} />} />;
              }
              if (visualScreens) {
                return <ScreenTour key={idx} project={project} screens={visualScreens} isEven={isEven} stage={(active) => <CardTourStage screens={visualScreens} active={active} />} />;
              }
              return (
                <div
                  key={idx}
                  className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center justify-center min-h-[100vh] mt-8 md:mt-0 gap-12 md:gap-24`}
                >
                  {project.visual ? (
                    project.visual
                  ) : project.desktopImage ? (
                    <DeviceStack project={project} shots={[{ desktop: project.desktopImage, mobile: project.image, label: project.title }]} />
                  ) : (
                    <PhoneFrame project={project} className="h-[480px] md:h-[667px]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-85"
                      />
                    </PhoneFrame>
                  )}
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

                    {project.visual && project.website && (
                      <div className="mt-8">
                        <CodeLink href={project.website} />
                      </div>
                    )}
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
            <p>© 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
