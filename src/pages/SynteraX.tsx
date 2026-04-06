import React from 'react';
import { Layout, VIDEO_SRC } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import {
  ArrowRight, Check, Star, Users, Zap, Globe, Database, RefreshCw,
  Shield, BarChart3, Clock, Target, Sparkles, Brain, Workflow, Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SynteraX = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" src={VIDEO_SRC} />
        <div className="absolute inset-0 bg-black/30 z-[1]" />

        {/* Left Panel */}
        <div className="relative z-10 w-full lg:w-[52%] min-h-screen flex flex-col p-4 lg:p-6">
          <div className="absolute inset-4 lg:inset-6 liquid-glass-strong rounded-3xl z-0" />

          {/* Hero Content */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center gap-8">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 liquid-glass-strong rounded-full border border-white/15 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Sparkles size={14} className="text-[#78C3AA]" />
              <span className="text-[10px] text-white/50 tracking-[0.2em] font-mono uppercase">Next-Generation AI Platform</span>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-7xl font-medium tracking-[-0.05em] text-white leading-[1.05] mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Meet <em className="font-serif not-italic text-white/80 italic">SynteraX</em>
              <br />
              The Future of Intelligent Automation
            </motion.h1>

            <motion.p
              className="text-white/40 text-md font-display leading-relaxed max-w-2xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Transform your business operations with our cutting-edge AI platform that learns, adapts, and optimizes workflows in real-time. Experience unprecedented efficiency and innovation.
            </motion.p>

            <motion.button
              onClick={() => window.open('https://app.synteratek.com', '_blank')}
              className="liquid-glass-strong rounded-full px-8 py-4 flex items-center gap-3 text-white font-medium hover:scale-105 active:scale-95 transition-transform"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Launch SynteraX
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                <ArrowRight size={14} />
              </span>
            </motion.button>

            <motion.div
              className="flex flex-wrap gap-3 justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              {['AI-Powered', 'Real-Time Sync', 'Enterprise Security'].map((t, i) => (
                <motion.span
                  key={t}
                  className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/80 cursor-pointer hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right Panel (desktop) */}
        <div className="relative z-10 hidden lg:flex w-[48%] min-h-screen flex-col p-6">
          <motion.div
            className="mt-6 self-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="liquid-glass-strong rounded-2xl p-5 w-56 border border-white/15">
              <h3 className="text-white text-sm font-medium mb-1">10,000+ Users</h3>
              <p className="text-white/60 text-xs leading-relaxed">Trusted by leading organizations worldwide</p>
            </div>
          </motion.div>

          <motion.div
            className="mt-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="liquid-glass-strong rounded-[2.5rem] p-4 border border-white/15">
              <div className="grid grid-cols-2 gap-3 mb-3">
                {[
                  { title: '99.9% Uptime', desc: 'Reliable performance' },
                  { title: '300% ROI', desc: 'Average return on investment' },
                ].map((card, i) => (
                  <motion.div key={card.title} className="liquid-glass-strong rounded-3xl p-5 border border-white/10" whileHover={{ scale: 1.03, y: -2 }}>
                    <h4 className="text-white text-sm font-medium mb-1">{card.title}</h4>
                    <p className="text-white/60 text-xs">{card.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="relative py-24 lg:py-40 bg-black/40 border-y border-white/5 overflow-hidden">
        {/* Decorative Orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#78C3AA]/5 blur-[200px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mb-24"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 liquid-glass-strong rounded-full border border-white/15 mb-8">
              <Zap size={14} className="text-[#78C3AA]" />
              <span className="text-[10px] text-white/50 tracking-[0.2em] font-mono uppercase">Powerful Features</span>
            </div>
            <h2 className="text-4xl lg:text-7xl font-medium tracking-tight text-white mb-8">
              Designed for <em className="font-serif italic text-white/80">Excellence.</em>
            </h2>
            <p className="text-white/40 text-md font-display leading-relaxed max-w-2xl">
              Discover the capabilities that make SynteraX the leading choice for intelligent automation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {[
              {
                icon: Brain,
                title: "AI-Powered Intelligence",
                description: "Advanced machine learning algorithms that continuously learn and improve your workflows"
              },
              {
                icon: Workflow,
                title: "Seamless Integration",
                description: "Connect with 500+ business applications and systems effortlessly"
              },
              {
                icon: Clock,
                title: "Real-Time Processing",
                description: "Handle 500M+ data points daily with sub-14ms latency using NVIDIA Morpheus powered streaming"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-grade security with end-to-end encryption and compliance standards"
              },
              {
                icon: Layers,
                title: "Scalable Architecture",
                description: "Built to grow with your business, powered by NVIDIA RAPIDS for workflow intelligence"
              },
              {
                icon: Target,
                title: "Precision Automation",
                description: "Eliminate errors with intelligent automation that adapts to your needs"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="liquid-glass-strong rounded-2xl hover:bg-white/[0.08] transition-all duration-300 h-full border-white/15">
                  <CardHeader>
                    <feature.icon className="w-10 h-10 text-[#78C3AA] mb-4" />
                    <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/70 text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden min-h-[80vh] flex items-center bg-black/20">
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl lg:text-7xl font-medium tracking-tight text-white mb-8">
              How It <em className="font-serif italic text-white/80">Works.</em>
            </h2>
            <p className="text-white/40 text-md font-display leading-relaxed max-w-3xl mx-auto">
              Experience the power of intelligent automation in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect & Configure",
                description: "Easily integrate SynteraX with your existing tools and set up your automation workflows"
              },
              {
                step: "02",
                title: "AI Learns & Optimizes",
                description: "Machine learning powered by RAPIDS discovers workflow bottlenecks and suggests optimizations"
              },
              {
                step: "03",
                title: "Scale & Succeed",
                description: "Watch your productivity soar as SynteraX handles complex tasks automatically"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="bg-[#78C3AA]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 border border-[#78C3AA]/20">
                  <span className="text-[#78C3AA] font-bold text-xl">{step.step}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-white/70 text-lg">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-24 lg:py-40 bg-black/40 border-y border-white/5 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 liquid-glass-strong rounded-full border border-white/15 mb-8">
                <BarChart3 size={14} className="text-[#78C3AA]" />
                <span className="text-[10px] text-white/50 tracking-[0.2em] font-mono uppercase">Measurable Results</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-medium tracking-tight text-white mb-8">
                Unlock Your Team's <em className="font-serif italic text-white/80">Full Potential.</em>
              </h2>
              <p className="text-white/40 text-md font-display leading-relaxed mb-8">
                SynteraX doesn't just automate tasks—it empowers your team to focus on what matters most: innovation and growth.
              </p>
              <ul className="space-y-4">
                {[
                  "Reduce operational costs by up to 60%",
                  "Increase team productivity by 3x",
                  "Minimize human errors significantly",
                  "Scale operations without adding headcount",
                  "Gain real-time insights into business performance",
                  "Accelerate decision-making with AI-powered analytics"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center text-white/90">
                    <Check className="w-5 h-5 text-[#78C3AA] mr-3 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="liquid-glass-strong rounded-3xl p-8 border border-white/15">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#78C3AA] mb-2">60%</div>
                    <div className="text-white/70">Cost Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#78C3AA] mb-2">3x</div>
                    <div className="text-white/70">Productivity Boost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#78C3AA] mb-2">99.9%</div>
                    <div className="text-white/70">Accuracy Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#78C3AA] mb-2">24/7</div>
                    <div className="text-white/70">Availability</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Overview Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-black/20">
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl lg:text-6xl font-medium tracking-tight text-white mb-8">
              Built for <em className="font-serif italic text-white/80">Enterprise Scale.</em>
            </h2>
            <p className="text-white/40 text-md font-display leading-relaxed max-w-3xl mx-auto">
              Advanced technical capabilities that ensure reliability, security, and performance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Database, title: "Cloud-Native", desc: "Powered by NVIDIA Triton for unified model deployment" },
              { icon: RefreshCw, title: "Real-Time Monitoring", desc: "NVIDIA Morpheus pipeline for instant anomaly detection" },
              { icon: Shield, title: "AI Intelligence", desc: "NVIDIA RAPIDS for predictive workflow optimization" },
              { icon: Globe, title: "Intelligent Insights", desc: "NVIDIA NeMo for human-readable AI analysis" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="liquid-glass-strong rounded-2xl text-center h-full border-white/15">
                  <CardHeader>
                    <tech.icon className="w-8 h-8 text-[#78C3AA] mx-auto mb-4" />
                    <CardTitle className="text-white text-lg">{tech.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/70">
                      {tech.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 liquid-glass-strong rounded-full border border-white/15 mb-8">
              <Users size={14} className="text-[#78C3AA]" />
              <span className="text-[10px] text-white/50 tracking-[0.2em] font-mono uppercase">Join the Revolution</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-medium tracking-tight text-white mb-8">
              Ready to Transform Your <em className="font-serif italic text-white/80">Business?</em>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Join thousands of companies already using SynteraX to revolutionize their operations
            </p>
            <button
              onClick={() => window.open('https://app.synteratek.com', '_blank')}
              className="liquid-glass-strong rounded-full px-12 py-6 text-white font-medium hover:scale-105 active:scale-95 transition-transform inline-flex items-center gap-3"
            >
              Start Your Free Trial
              <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SynteraX;