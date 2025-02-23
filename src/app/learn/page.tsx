'use client';

import React from 'react';
import GlassCard from '@/components/common/GlassCard';
import GradientButton from '@/components/common/GradientButton';
import FeatureCard from '@/components/learn/FeatureCard';
import ResourceCard from '@/components/learn/ResourceCard';
import FaqAccordion from '@/components/learn/FaqAccordion';
import { FaDownload, FaCalendar, FaRocket, FaRobot, FaChartLine, FaShieldAlt, FaMoneyBillWave, FaBolt, FaCogs, FaHandshake } from 'react-icons/fa';

const LearnPage = () => {
  return (
    <main className="min-h-screen bg-blue-600 text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <GlassCard>
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                The Future of Insurance is AI-Driven
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl mb-4 text-blue-100">
                Invest in Aiko – The AI-Powered Insurtech for Hybrid Workers
              </p>
              <p className="text-lg mb-8 max-w-3xl mx-auto text-blue-200">
                Aiko is redefining insurance with AI-driven risk assessment, dynamic pricing, and automated claims processing. Join us in building the future of insurance.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <GradientButton
                  href="/investor-resources/Pitch_Deck_Latest.pdf"
                  icon={<FaDownload />}
                  openInNewTab
                >
                  Download Pitch Deck
                </GradientButton>
                <GradientButton
                  href="/investor-resources/Aiko_Whitepaper_Latest.pdf"
                  icon={<FaDownload />}
                  openInNewTab
                >
                  Download Whitepaper
                </GradientButton>
                <GradientButton
                  href="/schedule"
                  icon={<FaCalendar />}
                >
                  Schedule a Meeting
                </GradientButton>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <GlassCard>
            <h2 className="text-3xl font-bold mb-4 text-center">Why Invest in Aiko?</h2>
            <p className="text-lg mb-6 text-center text-blue-100">
              Aiko is not just another insurtech—we are pioneering a new category of AI-driven, adaptive insurance for the UK's 4M+ hybrid workers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FaRocket className="text-4xl" />}
                title="Massive Market Opportunity"
                description="The UK's hybrid workforce represents a £14.1B insurance gap, with 47% of Brits engaging in side hustles."
              />
              <FeatureCard
                icon={<FaRobot className="text-4xl" />}
                title="AI-First Approach"
                description="Aiko's real-time risk assessment, dynamic pricing, and automated claims processing set us apart from traditional insurers."
              />
              <FeatureCard
                icon={<FaChartLine className="text-4xl" />}
                title="Scalable Business Model"
                description="Embedded insurance partnerships with gig platforms, fintechs, and SME networks drive low-cost customer acquisition."
              />
              <FeatureCard
                icon={<FaShieldAlt className="text-4xl" />}
                title="Regulatory-First Strategy"
                description="Early engagement with the FCA ensures compliance and smooth scaling."
              />
              <FeatureCard
                icon={<FaMoneyBillWave className="text-4xl" />}
                title="High-Growth Potential"
                description="Aiko is targeting £1.75M in GWP within 12 months and a Series A raise in 2025."
              />
            </div>
          </GlassCard>
        </div>
      </section>

      {/* How Aiko Works Section */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <GlassCard>
            <h2 className="text-3xl font-bold mb-4 text-center">How Aiko Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FeatureCard
                icon={<FaRobot className="text-4xl" />}
                title="AI-Powered Risk Assessment"
                description="Aiko's AI continuously evaluates telematics, financial stability, cybersecurity habits, and work patterns to provide real-time, personalised pricing."
              />
              <FeatureCard
                icon={<FaBolt className="text-4xl" />}
                title="Dynamic Pricing Model"
                description="Unlike traditional insurers, Aiko's pricing adjusts in real-time, ensuring that low-risk users pay less."
              />
              <FeatureCard
                icon={<FaCogs className="text-4xl" />}
                title="Automated Claims Processing"
                description="AI-powered decision-making reduces claims approval time by 80%, improving efficiency and customer experience."
              />
              <FeatureCard
                icon={<FaHandshake className="text-4xl" />}
                title="Embedded Insurance Partnerships"
                description="Aiko integrates directly into gig platforms, fintech apps, and SME marketplaces, enabling seamless distribution."
              />
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <GlassCard>
            <h2 className="text-3xl font-bold mb-4 text-center">Downloadable Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ResourceCard
                title="Pitch Deck"
                description="A high-level overview of Aiko's business model, financials, and investment opportunity."
                icon={<FaDownload />}
                href="/investor-resources/Pitch_Deck_Latest.pdf"
              />
              <ResourceCard
                title="Whitepaper"
                description="A deep dive into Aiko's AI architecture, risk models, and market opportunity."
                icon={<FaDownload />}
                href="/investor-resources/Aiko_Whitepaper_Latest.pdf"
              />
              {/* Temporarily hide one-pager until file is added */}
              {/* <ResourceCard
                title="One-Pager"
                description="A concise summary of Aiko's value proposition and traction."
                icon={<FaDownload />}
                href="/investor-resources/one-pager.pdf"
              /> */}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <GlassCard>
            <h2 className="text-3xl font-bold mb-4 text-center">Investor FAQs</h2>
            <FaqAccordion
              items={[
                {
                  question: "What is Aiko's business model?",
                  answer: "Aiko operates on a B2B2C model, partnering with gig platforms, fintechs, and SME networks to embed our AI-driven insurance products. We earn revenue through commission on premiums and licensing our AI risk assessment technology."
                },
                {
                  question: "How does Aiko's AI technology work?",
                  answer: "Our proprietary AI models analyze real-time data from multiple sources to assess risk, dynamically price policies, and automate claims processing. This enables us to offer personalized coverage and instant claims settlement while maintaining profitability."
                },
                {
                  question: "What is the market opportunity?",
                  answer: "The UK's hybrid workforce of 4M+ represents a £14.1B insurance gap, with 47% of Brits engaging in side hustles. This underserved market is growing rapidly as traditional insurers struggle to adapt to evolving work patterns."
                },
                {
                  question: "What is your regulatory status?",
                  answer: "We are actively engaged with the FCA through their Innovation Hub and are on track for full authorization. Our regulatory-first approach ensures compliance while enabling innovation in product design and delivery."
                },
                {
                  question: "What are your growth projections?",
                  answer: "We are targeting £1.75M in GWP within 12 months and planning a Series A raise in 2025. Our embedded distribution strategy and AI-driven operations enable rapid scaling with controlled customer acquisition costs."
                },
                {
                  question: "Who are your competitors?",
                  answer: "While traditional insurers and some insurtechs operate in the gig economy space, Aiko is unique in combining AI-driven risk assessment, dynamic pricing, and automated claims processing specifically for hybrid workers."
                }
              ]}
            />
          </GlassCard>
        </div>
      </section>
    </main>
  );
};

export default LearnPage;
