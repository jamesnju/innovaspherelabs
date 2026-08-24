// src/app/(marketing)/contact/ContactClient.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  Calendar,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '../../../ui/Input';
import { Button } from '../../../ui/Button';

if (typeof window !== 'undefined') {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');
}

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'savo@gmail.com',
      href: 'mailto:savo@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+254 (100) 992686',
      href: 'tel:+254100992686',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Nairobi, Kenya',
      href: 'https://maps.google.com',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'support@multisaas.com',
      };

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams
      );

      if (result.status === 200) {
        setIsSuccess(true);

        toast.success(
          "Message sent successfully! We'll get back to you soon."
        );

        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });

        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-950 py-24 text-white">
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-secondary-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />
        </div>

        <div className="container-custom relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80">
              <MessageCircle className="h-4 w-4" />
              Let's build something together
            </div>

            <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
              Have an idea?
              <br />
              <span className="gradient-text">
                Let's turn it into reality.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-300">
              Tell us about your idea, business challenge or project. You
              don't need a complete technical specification. We'll help you
              figure out the next step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  Talk to Savo
                </h2>

                <p className="mb-8 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  Whether you have a fully defined project or just an idea,
                  we'd love to hear about it.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={
                          item.label === 'Location' ? '_blank' : undefined
                        }
                        rel={
                          item.label === 'Location'
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        className="group flex items-start gap-4"
                      >
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-secondary-50 text-secondary-500 transition group-hover:bg-secondary-500 group-hover:text-white dark:bg-secondary-900/20">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.label}
                          </p>

                          <p className="font-medium text-gray-900 group-hover:text-secondary-500 dark:text-white">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>

                <div className="mt-8 border-t border-gray-200 pt-7 dark:border-gray-800">
                  <div className="mb-4 flex items-center gap-3">
                    <Clock className="h-5 w-5 text-secondary-500" />

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Working Hours
                    </h3>
                  </div>

                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>

                <div className="mt-7 rounded-2xl bg-gray-50 p-5 dark:bg-gray-800">
                  <Calendar className="mb-3 h-6 w-6 text-secondary-500" />

                  <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                    Prefer a meeting?
                  </h3>

                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Book a free consultation and choose a convenient time to
                    discuss your project.
                  </p>

                  <a
                    href="/consultation"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-secondary-500"
                  >
                    Book a Free Consultation
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm md:p-9 dark:border-gray-800 dark:bg-gray-900">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center"
                  >
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>

                    <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                      Message Sent!
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300">
                      Thanks for reaching out. We'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                        Tell us about your project
                      </h2>

                      <p className="text-gray-600 dark:text-gray-400">
                        Don't worry if you don't have all the details yet.
                        Start with what you know.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Your Name *
                          </label>

                          <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                name: e.target.value,
                              })
                            }
                            required
                            disabled={isLoading}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Email Address *
                          </label>

                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          What can we help you with? *
                        </label>

                        <Input
                          id="subject"
                          type="text"
                          placeholder="e.g. I want to build an e-commerce platform"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            })
                          }
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Tell us about your idea *
                        </label>

                        <textarea
                          id="message"
                          rows={7}
                          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-secondary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                          placeholder="Tell us what you are trying to build, the problem you are solving, or what you would like the software to do..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full btn-primary"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="spinner" />
                            Sending...
                          </div>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Project Enquiry
                          </>
                        )}
                      </Button>

                      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                        No obligation. Your initial consultation is free.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

// // src/app/(marketing)/contact/ContactClient.tsx
// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import emailjs from '@emailjs/browser';
// import { 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Send,
//   CheckCircle,
//   AlertCircle
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { Input } from '../../../ui/Input';
// import { Button } from '../../../ui/Button';

// // Initialize EmailJS with your public key
// // Get this from your EmailJS dashboard
// if (typeof window !== 'undefined') {
//   emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');
// }

// export default function ContactClient() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);

//   const contactInfo = [
//     {
//       icon: Mail,
//       label: 'Email',
//       value: 'savo@gmail.com',
//       href: 'mailto:savo@gmail.com',
//     },
//     {
//       icon: Phone,
//       label: 'Phone',
//       value: '+254 (100) 992686',
//       href: 'tel:+254100992686',
//     },
//     {
//       icon: MapPin,
//       label: 'Address',
//       value: 'University way, KENYA, NAIROBI',
//       href: 'https://maps.google.com',
//     },
//   ];

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       // Send email using EmailJS
//       const templateParams = {
//         from_name: formData.name,
//         from_email: formData.email,
//         subject: formData.subject,
//         message: formData.message,
//         to_email: 'support@multisaas.com',
//       };

//       const result = await emailjs.send(
//         process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
//         process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
//         templateParams
//       );

//       if (result.status === 200) {
//         setIsSuccess(true);
//         toast.success('Message sent successfully! We\'ll get back to you soon.');
//         setFormData({
//           name: '',
//           email: '',
//           subject: '',
//           message: '',
//         });
//         // Reset success message after 5 seconds
//         setTimeout(() => setIsSuccess(false), 5000);
//       } else {
//         throw new Error('Failed to send message');
//       }
//     } catch (error) {
//       console.error('Error sending email:', error);
//       toast.error('Failed to send message. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-950">
//       <div className="container-custom">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center max-w-3xl mx-auto mb-12"
//         >
//           <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
//             Get in <span className="gradient-text">Touch</span>
//           </h1>
//           <p className="text-lg text-gray-600 dark:text-gray-300">
//             Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Contact Information */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="lg:col-span-1"
//           >
//             <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 p-6">
//               <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
//                 Contact Information
//               </h2>
//               <div className="space-y-6">
//                 {contactInfo.map((item) => (
//                   <div key={item.label} className="flex items-start gap-3">
//                     <div className="p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-xl">
//                       <item.icon className="h-5 w-5 text-secondary-500" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         {item.label}
//                       </p>
//                       <a
//                         href={item.href}
//                         className="text-gray-900 dark:text-white hover:text-secondary-500 transition-colors"
//                         target={item.label === 'Address' ? '_blank' : undefined}
//                         rel={item.label === 'Address' ? 'noopener noreferrer' : undefined}
//                       >
//                         {item.value}
//                       </a>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
//                 <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
//                   Working Hours
//                 </h3>
//                 <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
//                   <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
//                   <p>Saturday: 10:00 AM - 4:00 PM</p>
//                   <p>Sunday: Closed</p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Contact Form */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="lg:col-span-2"
//           >
//             <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-800 p-6 md:p-8">
//               {isSuccess ? (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="text-center py-12"
//                 >
//                   <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <CheckCircle className="h-8 w-8 text-green-500" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//                     Message Sent!
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     Thank you for reaching out. We'll get back to you within 24 hours.
//                   </p>
//                 </motion.div>
//               ) : (
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                         Full Name *
//                       </label>
//                       <Input
//                         id="name"
//                         type="text"
//                         placeholder="John Doe"
//                         value={formData.name}
//                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                         required
//                         disabled={isLoading}
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                         Email Address *
//                       </label>
//                       <Input
//                         id="email"
//                         type="email"
//                         placeholder="john@example.com"
//                         value={formData.email}
//                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                         required
//                         disabled={isLoading}
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                       Subject *
//                     </label>
//                     <Input
//                       id="subject"
//                       type="text"
//                       placeholder="How can we help?"
//                       value={formData.subject}
//                       onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
//                       required
//                       disabled={isLoading}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                       Message *
//                     </label>
//                     <textarea
//                       id="message"
//                       rows={6}
//                       className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200"
//                       placeholder="Tell us about your project or question..."
//                       value={formData.message}
//                       onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                       required
//                       disabled={isLoading}
//                     />
//                   </div>

//                   <Button
//                     type="submit"
//                     className="w-full btn-primary"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? (
//                       <div className="flex items-center justify-center gap-2">
//                         <div className="spinner" />
//                         <span>Sending...</span>
//                       </div>
//                     ) : (
//                       <>
//                         <Send className="h-4 w-4 mr-2" />
//                         Send Message
//                       </>
//                     )}
//                   </Button>
//                 </form>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }