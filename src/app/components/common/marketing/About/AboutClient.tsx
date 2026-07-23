// src/app/(marketing)/about/AboutClient.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, 
  Rocket, 
  Target, 
  Award,
  CheckCircle,
  ArrowRight,
  Building2,
  Globe,
  Zap,
  Shield
} from 'lucide-react';
import { Button } from '../../../ui/Button';

export default function AboutClient() {
  const values = [
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'We constantly push boundaries to deliver cutting-edge solutions that help businesses stay ahead of the curve.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do. We listen, learn, and build solutions that truly make a difference.',
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'We prioritize the security and privacy of your data with enterprise-grade protection and compliance standards.',
    },
    {
      icon: Zap,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our work, from code quality to customer support.',
    },
  ];

  const stats = [
    { label: 'Active Businesses', value: '10,000+' },
    { label: 'Countries', value: '50+' },
    { label: 'Transactions Processed', value: '1M+' },
    { label: 'Customer Satisfaction', value: '99.9%' },
  ];

  const team = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      image: '/images/team/john-doe.jpg',
      bio: 'Visionary leader with 15+ years of experience in SaaS and business technology.',
    },
    {
      name: 'Jane Smith',
      role: 'CTO',
      image: '/images/team/jane-smith.jpg',
      bio: 'Tech innovator passionate about building scalable and reliable systems.',
    },
    {
      name: 'Mike Johnson',
      role: 'Head of Product',
      image: '/images/team/mike-johnson.jpg',
      bio: 'Product strategist focused on creating intuitive and impactful solutions.',
    },
    {
      name: 'Sarah Wilson',
      role: 'Customer Success',
      image: '/images/team/sarah-wilson.jpg',
      bio: 'Dedicated to ensuring every customer achieves their business goals.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="container-custom py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              Empowering Businesses with{' '}
              <span className="gradient-text">Innovative Solutions</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We're on a mission to simplify business management and help entrepreneurs 
              around the world build and scale their dreams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-secondary-500 to-accent-500">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="text-3xl md:text-4xl font-extrabold">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission & Vision
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Target className="h-6 w-6 text-secondary-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Our Mission</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      To democratize access to powerful business tools and empower entrepreneurs 
                      to build and scale their businesses with confidence.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-6 w-6 text-secondary-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Our Vision</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      To become the world's leading business ecosystem that helps millions 
                      of businesses thrive in the digital economy.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/contact">
                  <Button className="btn-primary">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-secondary-500/10 to-accent-500/10 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 flex items-center justify-center"
                    >
                      <Building2 className="h-12 w-12 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core <span className="gradient-text">Values</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-950 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-800 hover:shadow-hard transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary-50 dark:bg-secondary-900/20 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-secondary-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet the <span className="gradient-text">Team</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The passionate people behind Multi-SaaS Platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 text-center hover:shadow-hard transition-all duration-300"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-secondary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-secondary-500 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary-500 to-accent-500">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using our platform to grow and succeed.
            </p>
            <Link href="/signup">
              <Button className="bg-white text-secondary-600 hover:bg-gray-100">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}