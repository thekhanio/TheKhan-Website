import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
import { ContactForm } from "@/components/ContactForm";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedUnderline } from "@/components/ui/animated-underline";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";
import {
  IconAlertTriangle,
  IconPlugOff,
  IconClock,
  IconHammer,
  IconSettings,
  IconTrendingUp,
  IconCheck,
  IconPhone,
  IconMail,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMapPinFilled,
  IconMenu2,
  IconX,
  IconWorldWww,
  IconRobot,
  IconSearch,
  IconTargetArrow,
  IconSocial,
  IconPalette,
  IconDatabase,
} from "@tabler/icons-react";

const premierSites = [
  { name: "Premier Partners", logo: "/portfolio/premier-partners-logo.png", url: "https://servicesfrompremier.com", label: "Hub Site" },
  { name: "Premier Power Washing", logo: "/portfolio/premier-powerwashing-logo.png", url: "https://powerwashingfrompremier.com", label: "Power Washing" },
  { name: "Premier Holiday Lighting", logo: "/portfolio/premier-lighting-logo.png", url: "https://lightingfrompremier.com", label: "Holiday Lighting" },
  { name: "Premier Auto Spa", logo: "/portfolio/premier-detailing-logo.png", url: "https://detailingfrompremier.com", label: "Auto Detailing" },
  { name: "Premier Seasonal Services", logo: "/portfolio/premier-plowing-logo.png", url: "https://plowingfrompremier.com", label: "Snow Removal" },
];

function SpotlightCard({ icon, title, desc, index }: { icon: React.ReactNode; title: string; desc: string; index: number }) {
  return (
    <ScrollReveal direction="up" delay={index * 0.08}>
      <SpotlightGlow tilt className="h-full">
        <div className="p-7 md:p-8 flex flex-col h-full">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563eb]/15 to-[#06b6d4]/15 border border-[#2563eb]/20 flex items-center justify-center mb-5 group-hover:border-[#06b6d4]/40 group-hover:from-[#2563eb]/25 group-hover:to-[#06b6d4]/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <div className="text-[#06b6d4] group-hover:text-[#38bdf8] transition-colors duration-500">{icon}</div>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: "'Cinzel', serif" }}>{title}</h3>
          <p className="text-[#a3a3a3] text-sm leading-relaxed">{desc}</p>
        </div>
      </SpotlightGlow>
    </ScrollReveal>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [premierExpanded, setPremierExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <main className="min-h-screen antialiased relative">
      <Helmet>
        <title>TheKhan | Custom Websites, AI Systems, Software &amp; Marketing</title>
        <meta name="description" content="Custom websites, software, AI systems, and marketing — built by a real team from real code. No templates, no platforms, no lock-in." />
        <link rel="canonical" href="https://thekhan.io/" />
        <meta property="og:title" content="TheKhan | Custom Websites, AI Systems, Software & Marketing" />
        <meta property="og:description" content="A founder, an engineer, and a strategist — building custom websites, AI systems, software, and marketing for growing businesses. Real code. Real team. No templates." />
        <meta property="og:url" content="https://thekhan.io/" />
        <meta property="og:image" content="https://thekhan.io/og-image.jpg" />
        <meta property="og:type" content="website" />
      </Helmet>

      <BackgroundPaths />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.05]" style={{ position: 'fixed' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-4 flex items-center justify-center md:justify-between relative">
          <a href="#" className="flex flex-col cursor-pointer overflow-visible" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <div className="scale-[0.85] md:scale-100 origin-center">
              <div className="inline-flex flex-col overflow-visible">
                <div className="relative inline-flex items-center overflow-visible" style={{ height: 44 }}>
                  {/* TK monogram */}
                  <img src="/portfolio/logo-white-tk.png" alt="" style={{ height: 38, width: 'auto', marginTop: 8 }} />

                  {/* Animated vertical divider line */}
                  <div className="relative self-stretch mx-[10px] -my-[4px] overflow-hidden rounded-full" style={{ width: 3 }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2563eb]/40 to-transparent" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2563eb] to-transparent"
                      initial={{ y: "-100%" }}
                      animate={{ y: "100%" }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-[#06b6d4] to-transparent"
                      initial={{ y: "-100%" }}
                      animate={{ y: "100%" }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.3 }}
                    />
                  </div>

                  {/* THE KHAN text */}
                  <img src="/portfolio/logo-white-text.png" alt="TheKhan" style={{ height: 44, width: 'auto', marginLeft: 4 }} />

                  {/* Horizontal underline — flowing sweep */}
                  <div className="absolute bottom-[-14px] left-0 right-0 h-[2px] z-10 overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2563eb]/30 to-transparent" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2563eb] to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[#06b6d4]/70 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.3 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-12">
            <a href="#services" className="nav-link text-[#d4d4d4] text-base tracking-wide">Services</a>
            <a href="#work" className="nav-link text-[#d4d4d4] text-base tracking-wide">Portfolio</a>
            <a href="#about" className="nav-link text-[#d4d4d4] text-base tracking-wide">About</a>
            <a href="#contact" className="nav-button-premium px-7 py-3 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white rounded-full text-base font-medium tracking-wide">
              Let&apos;s Talk
            </a>
          </div>

          <button className="md:hidden absolute right-4 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? (
              <IconX className="w-6 h-6 text-[#06b6d4]" />
            ) : (
              <IconMenu2 className="w-6 h-6 text-[#06b6d4]" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.05] overflow-hidden"
            >
              <div className="px-4 py-5 flex flex-col items-center gap-3">
                <a href="#services" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">Services</a>
                <a href="#work" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">Portfolio</a>
                <a href="#about" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">About</a>
                <a href="#contact" onClick={handleNavClick} className="nav-button-premium px-6 py-3 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white rounded-full text-base font-medium text-center mt-2">
                  Let&apos;s Talk
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="relative z-10 min-h-screen flex items-center overflow-hidden pt-0 md:pt-16">
        <div className="max-w-4xl mx-auto px-6 w-full text-center">
          <div className={`mb-6 md:mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-xs md:text-base font-medium tracking-[0.15em] md:tracking-[0.3em] uppercase text-[#2563eb]">
              Websites · Software · AI · Marketing
            </span>
          </div>

          <div className={`flex justify-center items-center mb-6 md:mb-8 transition-all duration-700 delay-75 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="scale-[0.8] sm:scale-90 md:scale-100 lg:scale-[1.15] origin-center">
              <Logo variant="white" size="lg" type="short" />
            </div>
          </div>

          <h1
            className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.15] mb-5 md:mb-7 tracking-[0.08em] md:tracking-[0.12em] text-center md:whitespace-nowrap md:-translate-x-[65px] transition-all duration-700 delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <span className="text-gradient">What happens when<br className="md:hidden" /> they Google<br className="md:hidden" /> your business?</span>
          </h1>

          <p className={`text-sm md:text-lg text-[#a3a3a3] mb-8 md:mb-10 max-w-2xl mx-auto text-center transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            We build custom websites, software, and marketing that make sure they find you first. No templates. No freelancers. A real team.
          </p>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <MovingBorderButton
              as="a"
              href="#contact"
              borderRadius="9999px"
              containerClassName="h-14 w-full sm:w-52 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-200 ease-out clickable-hover active:scale-[0.98]"
              className="text-base px-8 tracking-wide"
              duration={3000}
            >
              See If We&apos;re a Fit
            </MovingBorderButton>
            <a
              href="#work"
              className="clickable-hover w-full sm:w-auto px-8 py-4 rounded-full text-[#d4d4d4] hover:text-white border border-white/[0.1] hover:border-white/25 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-200 ease-out text-base tracking-wide active:scale-[0.98]"
            >
              See Our Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* ==================== THE PROBLEM ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                You already know the problem.
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((point, i) => (
              <ScrollReveal key={point.title} delay={i * 0.1} direction="up">
                <SpotlightGlow tilt className="h-full">
                  <div className="p-8 md:p-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563eb]/15 to-[#06b6d4]/15 flex items-center justify-center mb-6 border border-[#2563eb]/30 group-hover:border-[#06b6d4]/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      {point.icon}
                    </div>
                    <h3 className="text-white font-semibold text-xl mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                      {point.title}
                    </h3>
                    <p className="text-[#a3a3a3] text-base leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </SpotlightGlow>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-center text-lg md:text-xl text-white mt-16 max-w-xl mx-auto leading-relaxed">
              One team that builds it, runs it, and grows it — so you can focus on what you actually do.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== WHAT WE DO ==================== */}
      <section id="services" className="py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                What we do.
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                Three pillars. One team.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {serviceCards.map((card, i) => (
              <ScrollReveal key={card.title} direction="up" delay={i * 0.1}>
                <SpotlightGlow tilt className="h-full">
                  <div className="p-7 md:p-8 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563eb]/20 to-[#06b6d4]/20 flex items-center justify-center mb-6 border border-[#2563eb]/30 group-hover:border-[#06b6d4]/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      {card.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                      {card.title}
                    </h3>
                    <p className="text-[#d4d4d4] text-base leading-relaxed mb-5">
                      {card.desc}
                    </p>
                    <ul className="space-y-2.5 mb-6 flex-1">
                      {card.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-[#a3a3a3] text-sm">
                          <span className="text-[#2563eb] mt-0.5 flex-shrink-0">&rarr;</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="text-white/80 font-medium text-sm pt-4 border-t border-white/[0.06]">
                      {card.price}
                    </p>
                  </div>
                </SpotlightGlow>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW TO WORK WITH US ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Choose your path.
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                Project or partnership. Your call.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal direction="up" delay={0.1}>
              <SpotlightGlow tilt className="h-full">
                <div className="p-7 md:p-8 flex flex-col h-full">
                  <span className="text-[#2563eb] text-xs font-semibold tracking-[0.2em] uppercase mb-4">One-time</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3" style={{ fontFamily: "'Cinzel', serif" }}>The Project</h3>
                  <p className="text-[#d4d4d4] text-base leading-relaxed mb-5">Need a website, software, or a one-time build? We design it, build it, and hand it over. You own everything — code, assets, logins.</p>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    <li className="flex items-start gap-2.5 text-[#a3a3a3] text-sm"><span className="text-[#2563eb] mt-0.5 flex-shrink-0">&rarr;</span>Custom websites & software</li>
                    <li className="flex items-start gap-2.5 text-[#a3a3a3] text-sm"><span className="text-[#2563eb] mt-0.5 flex-shrink-0">&rarr;</span>AI systems & chatbots</li>
                    <li className="flex items-start gap-2.5 text-[#a3a3a3] text-sm"><span className="text-[#2563eb] mt-0.5 flex-shrink-0">&rarr;</span>CRM & business systems</li>
                    <li className="flex items-start gap-2.5 text-[#a3a3a3] text-sm"><span className="text-[#2563eb] mt-0.5 flex-shrink-0">&rarr;</span>Branding & logo design</li>
                  </ul>
                  <p className="text-white/80 font-medium text-sm pt-4 border-t border-white/[0.06]">Always available · Scoped to your needs</p>
                </div>
              </SpotlightGlow>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <SpotlightGlow tilt className="h-full">
                <div className="p-7 md:p-8 flex flex-col h-full relative">
                  <span className="text-[#06b6d4] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Ongoing</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3" style={{ fontFamily: "'Cinzel', serif" }}>The Partnership</h3>
                  <p className="text-[#d4d4d4] text-base leading-relaxed mb-5">Want more than a build? We become your digital team — websites, software, marketing, and AI managed month to month. No contracts.</p>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    <li className="flex items-start gap-2.5 text-[#a3a3a3] text-sm"><span className="text-[#2563eb] mt-0.5 flex-shrink-0">&rarr;</span>Everything in The Project, plus:</li>
                    <li className="flex items-start gap-2.5 text-[#a3a3a3] text-sm"><span className="text-[#2563eb] mt-0.5 flex-shrink-0">&rarr;</span>Ongoing management, updates & support</li>
                    <li className="flex items-start gap-2.5 text-[#a3a3a3] text-sm"><span className="text-[#2563eb] mt-0.5 flex-shrink-0">&rarr;</span>SEO, Google Ads & marketing</li>
                    <li className="flex items-start gap-2.5 text-[#a3a3a3] text-sm"><span className="text-[#2563eb] mt-0.5 flex-shrink-0">&rarr;</span>Custom software, AI tools & automations</li>
                  </ul>
                  <p className="text-white/80 font-medium text-sm pt-4 border-t border-white/[0.06]">Limited spots per quarter · Month to month</p>
                </div>
              </SpotlightGlow>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-center text-[#a3a3a3] text-sm mt-8">Need a website or one-time build? Always available. Looking for the full partnership? We only take on a few at a time so we can actually deliver — if we&apos;re at capacity, we&apos;ll tell you upfront.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== INDIVIDUAL SERVICES ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                What your digital team covers.
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                From custom code to marketing — everything handled in-house.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            {spotlightServices.map((svc, i) => (
              <div key={svc.title} className="w-full md:w-[calc(33.333%-14px)]">
                <SpotlightCard icon={svc.icon} title={svc.title} desc={svc.desc} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW WE WORK ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                How we work.
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                Same start. Two outcomes.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="space-y-0">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.12} direction="left">
                <div className="flex gap-6 md:gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {i + 1}
                    </div>
                    <AnimatedUnderline vertical className="flex-1 min-h-[40px] my-2" />
                  </div>
                  <div className="pb-12">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl md:text-2xl font-semibold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                        {step.title}
                      </h3>
                      <span className="text-xs text-[#2563eb] bg-[#2563eb]/10 px-2.5 py-1 rounded-full font-medium">
                        {step.timeline}
                      </span>
                    </div>
                    <p className="text-[#d4d4d4] text-base leading-relaxed">
                      {step.desc}
                    </p>
                    <p className="text-[#a3a3a3] text-sm mt-2">
                      &rarr; {step.deliverable}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            {/* Step 4 — Fork */}
            <ScrollReveal delay={0.36} direction="left">
              <div className="flex gap-6 md:gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    4
                  </div>
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl md:text-2xl font-semibold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                      Launch
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SpotlightGlow tilt>
                      <div className="p-5">
                        <p className="text-sm text-[#2563eb] font-medium mb-2 uppercase tracking-wider">Project</p>
                        <p className="text-[#d4d4d4] text-base leading-relaxed">
                          We hand it over. You own everything — code, assets, logins. Make edits yourself, bring in any developer, or keep us on call. You&apos;re never locked into a platform, a tool, or anyone — including us.
                        </p>
                        <p className="text-[#a3a3a3] text-sm mt-2">
                          &rarr; Full ownership and handoff
                        </p>
                      </div>
                    </SpotlightGlow>
                    <SpotlightGlow tilt>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-sm text-[#06b6d4] font-medium uppercase tracking-wider">Partnership</p>
                        </div>
                        <p className="text-[#d4d4d4] text-base leading-relaxed">
                          We go live, then handle the day-to-day — updates, marketing, support. You focus on running your business.
                        </p>
                        <p className="text-[#a3a3a3] text-sm mt-2">
                          &rarr; Ongoing management and growth
                        </p>
                      </div>
                    </SpotlightGlow>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Process stats */}
          <ScrollReveal direction="up" delay={0.48}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-8 pt-10 border-t border-white/[0.06]">
              <div className="text-center">
                <p className="text-xl md:text-2xl font-semibold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>1-6 weeks</p>
                <p className="text-[#a3a3a3] text-xs md:text-sm">From first call to launch</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-semibold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>A few calls</p>
                <p className="text-[#a3a3a3] text-xs md:text-sm">Time required from you</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-semibold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>Yours</p>
                <p className="text-[#a3a3a3] text-xs md:text-sm">Code, assets, and logins</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== OUR WORK ==================== */}
      <section id="work" className="py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Portfolio.
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                Real code. Real builds. No shortcuts.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-wrap justify-center items-start gap-6 md:gap-16">
              {clients.map((client, i) => {
                const isPremier = client.name === "Premier Partners";
                return (
                  <motion.a
                    key={client.name}
                    href={isPremier ? undefined : client.url}
                    target={isPremier ? undefined : "_blank"}
                    rel={isPremier ? undefined : "noopener noreferrer"}
                    className="cursor-pointer flex flex-col items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileTap={{ scale: 0.95 }}
                    title={client.name}
                    onClick={isPremier ? (e: React.MouseEvent) => { e.preventDefault(); setPremierExpanded(!premierExpanded); } : undefined}
                  >
                    <SpotlightGlow tilt>
                      <div className="p-6 md:p-8">
                        <img
                          src={client.logo}
                          alt={client.name}
                          className={`w-auto object-contain transition-all duration-300 ${client.size || 'h-32 md:h-40'}`}
                        />
                      </div>
                    </SpotlightGlow>
                    <div className="flex flex-col items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:translate-y-[-4px] md:group-hover:translate-y-0">
                      <span className="text-white text-sm font-medium">{client.name}</span>
                      <span className="text-[#a3a3a3] text-xs">{client.industry}</span>
                      {client.outcome && <span className="text-[#06b6d4] text-[10px] font-medium">{client.outcome}</span>}
                      <span className="text-[#2563eb] text-xs tracking-wide mt-0.5">{isPremier ? (premierExpanded ? "Click to collapse" : "Click to explore") : "Visit site"} &rarr;</span>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Premier expanded row */}
          <AnimatePresence>
            {premierExpanded && (
              <motion.div
                className="mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                  {premierSites.map((site, i) => (
                    <motion.a
                      key={site.name}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06, type: "spring", stiffness: 400, damping: 25 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SpotlightGlow tilt>
                        <div className="p-4 md:p-5 w-[140px] md:w-[170px] h-[120px] md:h-[140px] flex items-center justify-center">
                          <img src={site.logo} alt={site.name} className="h-16 md:h-20 w-auto object-contain" />
                        </div>
                      </SpotlightGlow>
                      <div className="flex flex-col items-center gap-0.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                        <span className="text-white text-xs font-medium text-center">{site.label}</span>
                        <span className="text-[#2563eb] text-[10px] tracking-wide">Visit site &rarr;</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats bar */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 pt-10 border-t border-white/[0.06]">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-semibold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>8+</p>
                <p className="text-[#a3a3a3] text-xs md:text-sm">Sites & systems built</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-semibold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>4</p>
                <p className="text-[#a3a3a3] text-xs md:text-sm">Industries served</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-semibold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>5 sites, 1 client</p>
                <p className="text-[#a3a3a3] text-xs md:text-sm">That&apos;s a partnership</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-semibold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>0</p>
                <p className="text-[#a3a3a3] text-xs md:text-sm">Templates used</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== WHAT MAKES THIS DIFFERENT ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                What makes this different.
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                We serve a select few. Here&apos;s why.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.1}>
            <SpotlightGlow>
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16">
                  <div>
                    <h3 className="text-[#a3a3a3] font-semibold text-lg mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
                      Not this
                    </h3>
                    <ul className="space-y-4">
                      {notThis.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[#a3a3a3]">
                          <IconX className="w-4 h-4 text-[#a3a3a3]/50 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
                      This instead
                    </h3>
                    <ul className="space-y-4">
                      {thisInstead.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[#d4d4d4]">
                          <IconCheck className="w-4 h-4 text-[#2563eb] mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== WHO THIS IS FOR ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Who this is for.
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                We work with a small number of clients at a time. Most stay for years.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.1}>
            <SpotlightGlow>
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
                      Good fit
                    </h3>
                    <ul className="space-y-4">
                      {goodFit.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[#d4d4d4]">
                          <IconCheck className="w-4 h-4 text-[#2563eb] mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[#a3a3a3] font-semibold text-lg mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
                      Not a fit
                    </h3>
                    <ul className="space-y-4">
                      {notAFit.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[#a3a3a3]">
                          <IconX className="w-4 h-4 text-[#a3a3a3]/50 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== WHO WE ARE ==================== */}
      <section id="about" className="py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Who we are.
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                One point of contact. A real team behind it.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          {/* Founder intro */}
          <ScrollReveal direction="up" delay={0.1}>
            <SpotlightGlow>
              <div className="p-8 md:p-12">
                <div className="space-y-6 text-[#d4d4d4] text-lg leading-relaxed">
                  <p>
                    I&apos;m Omair. I ran a home services operation — scaled it to 90 properties, went in the field myself, and spent my own money learning what works online. Now I build websites, run marketing, and I&apos;m your single point of contact. No account managers. No handoffs. When you call, I pick up.
                  </p>
                  <p className="text-white font-medium">
                    But I&apos;m not doing this alone.
                  </p>
                </div>
              </div>
            </SpotlightGlow>
          </ScrollReveal>

          {/* Three pillars — three people */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {teamPillars.map((pillar, i) => (
              <ScrollReveal key={pillar.title} direction="up" delay={0.15 + i * 0.1}>
                <SpotlightGlow tilt className="h-full">
                  <div className="p-7 md:p-8 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563eb]/20 to-[#06b6d4]/20 flex items-center justify-center mb-6 border border-[#2563eb]/30 group-hover:border-[#06b6d4]/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      {pillar.icon}
                    </div>
                    <span className="text-[#2563eb] text-xs font-semibold tracking-[0.2em] uppercase mb-2">{pillar.label}</span>
                    <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                      {pillar.title}
                    </h3>
                    <p className="text-[#a3a3a3] text-sm leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </SpotlightGlow>
              </ScrollReveal>
            ))}
          </div>

          {/* AI differentiator + limited capacity */}
          <ScrollReveal direction="up" delay={0.4}>
            <SpotlightGlow className="mt-6">
              <div className="p-8 md:p-12">
                <div className="space-y-6 text-[#d4d4d4] text-lg leading-relaxed">
                  <p>
                    Most companies in this space are running the same playbook from 2017. Same tools. Same strategy. Same monthly PDF nobody reads. We build with AI every day and ship new tools the moment they drop. You&apos;re not getting last year&apos;s strategy — you&apos;re getting what works right now, backed by a real engineer and a real strategist.
                  </p>
                  <p>
                    We take on a handful of clients at a time. That&apos;s not a sales tactic — the work falls apart if we&apos;re stretched across 30 accounts. If we&apos;re at capacity, we&apos;ll tell you upfront.
                  </p>
                </div>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">Let&apos;s see if we&apos;re the right fit.</p>
            <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Start a conversation.
            </h2>
            <p className="text-[#d4d4d4] text-lg">
              Fill out the form. We&apos;ll get back to you within 24 hours with honest feedback on where you stand and what we&apos;d do differently. We take on 5-6 clients at a time — if we&apos;re full, we&apos;ll tell you.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8 flex flex-col items-center lg:items-start">
              <div>
                <div className="space-y-6">
                  <a href="tel:8472208550" className="flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2563eb]/10 to-[#06b6d4]/10 border border-[#2563eb]/30 flex items-center justify-center group-hover:border-[#2563eb]/50 transition-colors flex-shrink-0">
                      <IconPhone className="w-4 h-4 text-[#2563eb]" />
                    </div>
                    <div className="flex flex-col pt-1">
                      <span className="text-[#2563eb] text-sm font-medium">Call or Text</span>
                      <span className="text-[#d0d0d0] group-hover:text-white transition-colors">(847) 220-8550</span>
                    </div>
                  </a>
                  <a href="mailto:hello@thekhan.io" className="flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2563eb]/10 to-[#06b6d4]/10 border border-[#2563eb]/30 flex items-center justify-center group-hover:border-[#2563eb]/50 transition-colors flex-shrink-0">
                      <IconMail className="w-4 h-4 text-[#2563eb]" />
                    </div>
                    <div className="flex flex-col pt-1">
                      <span className="text-[#2563eb] text-sm font-medium">Email</span>
                      <span className="text-[#d0d0d0] group-hover:text-white transition-colors">Hello@TheKhan.io</span>
                    </div>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white uppercase tracking-widest mb-5 text-center lg:text-left">Office</h3>
                <div className="flex items-start gap-4 text-[#d4d4d4]">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2563eb]/10 to-[#06b6d4]/10 border border-[#2563eb]/30 flex items-center justify-center flex-shrink-0">
                    <IconMapPinFilled className="w-4 h-4 text-[#2563eb]" />
                  </div>
                  <div className="pt-2.5 leading-relaxed">
                    655 Deerfield Rd<br />Suite 100, Unit 404<br />Deerfield, IL 60015
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-[#111111] rounded-2xl p-8 border border-white/[0.08]">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-16 px-6 border-t border-white/[0.06] relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <h4 className="text-sm font-medium text-[#a3a3a3] uppercase tracking-widest mb-5">Contact</h4>
              <div className="space-y-2 text-[#d4d4d4] text-sm leading-relaxed">
                <p>655 Deerfield Rd</p>
                <p>Suite 100, Unit 404</p>
                <p>Deerfield, IL 60015</p>
                <div className="border-t border-white/[0.06] my-4" />
                <p>
                  <a href="mailto:hello@thekhan.io" className="hover:text-white transition-colors">Hello@TheKhan.io</a>
                </p>
                <p>
                  <a href="tel:8472208550" className="hover:text-white transition-colors">(847) 220-8550</a>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <h4 className="text-sm font-medium text-[#a3a3a3] uppercase tracking-widest mb-5">Follow Us</h4>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/company/thekhanio" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-[#111111] border border-white/[0.08] flex items-center justify-center text-[#a3a3a3] hover:text-white hover:border-[#2563eb]/50 hover:bg-[#2563eb]/10 hover:scale-125 hover:-translate-y-1.5 hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-all duration-300">
                  <IconBrandLinkedin className="w-4 h-4" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61584909881446" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-[#111111] border border-white/[0.08] flex items-center justify-center text-[#a3a3a3] hover:text-white hover:border-[#2563eb]/50 hover:bg-[#2563eb]/10 hover:scale-125 hover:-translate-y-1.5 hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-all duration-300">
                  <IconBrandFacebook className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/thekhanio" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-[#111111] border border-white/[0.08] flex items-center justify-center text-[#a3a3a3] hover:text-white hover:border-[#2563eb]/50 hover:bg-[#2563eb]/10 hover:scale-125 hover:-translate-y-1.5 hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-all duration-300">
                  <IconBrandInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <Logo variant="white" size="md" className="mb-4" />
              <p className="text-[#a3a3a3] text-sm leading-relaxed">
                Build. Manage. Grow.<br />Your outsourced digital team.
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-white/[0.06] text-center">
            <p className="text-[#606060] text-sm">&copy; {new Date().getFullYear()} TheKhan. All rights reserved.</p>
            <p className="text-[#606060] text-sm mt-2 opacity-70">Designed and built by TheKhan</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ==================== DATA ====================

const painPoints = [
  {
    icon: <IconAlertTriangle className="w-6 h-6 text-[#2563eb]" />,
    title: "They Googled you. You weren't there.",
    desc: "A homeowner in your city just searched for exactly what you do. Your competitor showed up first. Their site loaded fast, looked professional, and had a phone number right at the top. They got the call. You didn't even know it happened.",
  },
  {
    icon: <IconPlugOff className="w-6 h-6 text-[#2563eb]" />,
    title: "Your business runs on duct tape.",
    desc: "A lead came in last Tuesday. It sat in your inbox for three days because you forgot. By the time you followed up, they'd already hired someone else. Your invoices are in one app, your schedule is in another, and your follow-ups live in your head. Every gap costs you money.",
  },
  {
    icon: <IconClock className="w-6 h-6 text-[#2563eb]" />,
    title: "You are the marketing department.",
    desc: "It's 10 PM and you're trying to figure out what to post on Instagram. Your last Google ad spent $400 and you can't tell if it brought in a single call. Meanwhile, your competitor has someone handling all of this — and it shows.",
  },
];

const serviceCards = [
  {
    icon: <IconHammer className="w-7 h-7 text-[#2563eb]" />,
    title: "Build",
    desc: "Your customers judge your business by what they see online. We build websites and software from real code — not templates — so your site loads faster, ranks higher, and actually converts visitors into calls. You own every line of code.",
    features: [
      "Custom websites that load fast and rank high",
      "Custom software and business applications",
      "AI chatbots and AI receptionists",
      "CRM, automation, and business systems",
    ],
    price: "One-time projects — scoped to your needs.",
  },
  {
    icon: <IconSettings className="w-7 h-7 text-[#2563eb]" />,
    title: "Manage",
    desc: "After launch day, most people disappear. We don't. Your site stays updated, your systems stay connected, and when something breaks at 9 PM on a Tuesday, there's a real person who picks up.",
    features: [
      "Updates and maintenance — nothing gets stale",
      "Security monitoring — threats caught early",
      "Hosting and uptime — your site stays live",
      "Same-day issue resolution",
    ],
    price: "Ongoing — included with partnerships.",
  },
  {
    icon: <IconTrendingUp className="w-7 h-7 text-[#2563eb]" />,
    title: "Grow",
    desc: "A website without traffic is a billboard in the desert. We put your business in front of the right people — on Google, on social media, and in AI search results — so your phone rings instead of collecting dust.",
    features: [
      "Google Business Profile — show up when they search",
      "SEO, AI search, and voice search optimization",
      "Google Ads and paid media management",
      "Social media — strategy, posting, and engagement",
    ],
    price: "Ongoing — built into every partnership.",
  },
];

const processSteps = [
  {
    title: "Discovery",
    timeline: "Day 1",
    desc: "A quick call. We learn your business, your goals, and what's not working. No pitch — just questions.",
    deliverable: "Clear picture of where you are and where we're headed",
  },
  {
    title: "Proposal",
    timeline: "Within 48 hours",
    desc: "Exact scope, timeline, and price. No surprises, no hidden fees. You know what you're getting before we start.",
    deliverable: "Approved plan and start date",
  },
  {
    title: "Build",
    timeline: "1-6 weeks",
    desc: "You see progress along the way. We test everything before it goes live. You're never in the dark.",
    deliverable: "Working product, tested and ready",
  },
];

const spotlightServices = [
  {
    icon: <IconWorldWww className="w-6 h-6" />,
    title: "Custom Websites",
    desc: "Hand-coded means faster load times, higher search rankings, and a site you actually own. Code will always outperform a template.",
  },
  {
    icon: <IconHammer className="w-6 h-6" />,
    title: "Custom Software",
    desc: "Web apps, internal tools, automations, APIs — built around how your business actually works. Not off-the-shelf. Built for you.",
  },
  {
    icon: <IconRobot className="w-6 h-6" />,
    title: "AI Chatbots & Receptionists",
    desc: "Custom AI that answers calls, books appointments, and handles customer questions 24/7 — even when you're on a job site.",
  },
  {
    icon: <IconDatabase className="w-6 h-6" />,
    title: "CRM & Business Systems",
    desc: "Leads, invoices, follow-ups, scheduling — connected in one place instead of scattered across five apps you barely check.",
  },
  {
    icon: <IconSearch className="w-6 h-6" />,
    title: "SEO & AI Search",
    desc: "Show up on Google, get cited by ChatGPT and Perplexity, and appear in voice search. We cover traditional and AI search.",
  },
  {
    icon: <IconTargetArrow className="w-6 h-6" />,
    title: "Google Ads & Paid Media",
    desc: "We manage your Google Ads end to end — budget, copy, targeting, and optimization. You see where every dollar goes.",
  },
  {
    icon: <IconSocial className="w-6 h-6" />,
    title: "Social Media",
    desc: "Strategy, content, posting, and engagement across Instagram, Facebook, and LinkedIn. Consistent presence without you lifting a finger.",
  },
  {
    icon: <IconPalette className="w-6 h-6" />,
    title: "Branding & Design",
    desc: "Logo, business cards, flyers, brochures — your brand looking sharp and consistent across every touchpoint.",
  },
];

const clients = [
  { name: "Clean & Green Property Care", industry: "Property Maintenance", url: "https://cleangreenproperty.com", logo: "/portfolio/clean-green-logo.png", outcome: "Website + GBP + Google Ads" },
  { name: "Shifa Home Care", industry: "Home Care", url: "https://shifahomecareservices.com", logo: "/portfolio/shifa-logo.png", outcome: "Website + SEO + Paid Ads" },
  { name: "Women's Association Forum", industry: "Nonprofit", url: "https://wafchicago.org", logo: "/portfolio/waf-logo.png", size: "h-28 md:h-36", outcome: "Full nonprofit web presence" },
  { name: "Premier Partners", industry: "Home Services", url: "https://servicesfrompremier.com", logo: "/portfolio/premier-partners-logo.png", outcome: "5-site brand ecosystem" },
];

const teamPillars = [
  {
    icon: <IconHammer className="w-7 h-7 text-[#06b6d4]" />,
    label: "Build",
    title: "The Engineer",
    desc: "Every site, every app, every system — built in-house from real code. Our lead engineer oversees every build and handles the complex work: AI systems, custom software, advanced automations. When something breaks, there's a real developer who fixes it. Not a support ticket.",
  },
  {
    icon: <IconSettings className="w-7 h-7 text-[#06b6d4]" />,
    label: "Manage",
    title: "The Strategist",
    desc: "5+ years building systems and infrastructure for companies. He keeps your tools connected, your operations running, and your business organized long after launch day. The part most people forget about — he owns it.",
  },
  {
    icon: <IconTrendingUp className="w-7 h-7 text-[#06b6d4]" />,
    label: "Grow",
    title: "The Founder",
    desc: "I run your marketing — SEO, Google Ads, social media, Google Business Profile. I didn't learn this in a classroom. I ran a home services operation, scaled to 90 properties, and spent my own money figuring out what actually works. Now I do the digital side for businesses like yours.",
  },
];

const notThis = [
  "A big agency where you're account #47",
  "A freelancer who disappears after launch",
  "A platform that locks you into their ecosystem",
  "A template that looks like everyone else's site",
];

const thisInstead = [
  "We're not a 50-person agency, but that means the founder is on every project — not a junior dev you've never met",
  "A real engineer and strategist behind every build — not outsourced overseas",
  "Hand-coded from scratch — code will always outperform a template",
  "You own everything. Code, domain, data, accounts. Walk away anytime.",
];

const goodFit = [
  "You're doing $300K+ and know your online presence should be better than it is",
  "You want one team handling everything — not five freelancers you have to manage",
  "You need custom software or systems built around how your business actually works",
  "You're tired of paying for tools and marketing that aren't delivering results",
  "You're ready to invest in something built to last — not a quick fix",
];

const notAFit = [
  "If you want the cheapest option, we're not it — we build things that last, and that costs more than a template",
  "You want to manage everything yourself and just need someone to push buttons",
  "You need results by Friday — real marketing takes time to compound",
  "You're not ready to invest in your online presence yet",
];
