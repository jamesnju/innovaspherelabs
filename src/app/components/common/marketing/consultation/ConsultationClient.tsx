'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  Calendar,
  CheckCircle,
  Clock,
  Lightbulb,
  Mail,
  MessageCircle,
  Monitor,
  ArrowRight,
  Send,
  Smartphone,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { Input } from '../../../ui/Input';
import { Button } from '../../../ui/Button';

if (typeof window !== 'undefined') {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');
}

interface ConsultationForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

const initialForm: ConsultationForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  budget: '',
  preferredDate: '',
  preferredTime: '',
  message: '',
};

const projectTypes = [
  {
    value: 'Website',
    label: 'Website',
    description: 'Business website or landing page',
    icon: Monitor,
  },
  {
    value: 'Web Application',
    label: 'Web Application',
    description: 'Custom web-based software',
    icon: Monitor,
  },
  {
    value: 'Mobile Application',
    label: 'Mobile Application',
    description: 'Android or iOS application',
    icon: Smartphone,
  },
  {
    value: 'Custom Software',
    label: 'Custom Software',
    description: 'Business automation or internal system',
    icon: Lightbulb,
  },
];

const budgetOptions = [
  'Not sure yet',
  'Below KES 50,000',
  'KES 50,000 - 100,000',
  'KES 100,000 - 250,000',
  'KES 250,000 - 500,000',
  'Above KES 500,000',
];

const timeOptions = [
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
];

export default function ConsultationClient() {
  const [formData, setFormData] =
    useState<ConsultationForm>(initialForm);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (
    field: keyof ConsultationForm,
    value: string
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.projectType) {
      toast.error('Please select a project type.');
      return;
    }

    if (!formData.preferredDate) {
      toast.error('Please select your preferred date.');
      return;
    }

    if (!formData.preferredTime) {
      toast.error('Please select your preferred time.');
      return;
    }

    setIsLoading(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company || 'Not provided',
        project_type: formData.projectType,
        budget: formData.budget || 'Not provided',
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
        message: formData.message,

        to_email: 'support@multisaas.com',
      };

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_CONSULTATION_TEMPLATE_ID ||
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams
      );

      if (result.status !== 200) {
        throw new Error('Failed to submit consultation request.');
      }

      setIsSuccess(true);

      toast.success(
        'Consultation request submitted successfully!'
      );

      setFormData(initialForm);
    } catch (error) {
      console.error(
        'Consultation submission error:',
        error
      );

      toast.error(
        'Unable to submit your request. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFormData(initialForm);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gray-950 py-24 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[15%] top-0 h-80 w-80 rounded-full bg-secondary-500/20 blur-3xl" />

          <div className="absolute bottom-0 right-[15%] h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />

          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white/80">
              <Calendar className="h-4 w-4 text-secondary-400" />
              Free Project Consultation
            </div>

            <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl md:leading-tight">
              Let's discuss your
              <br />
              <span className="gradient-text">
                next big idea.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-300">
              Book a free consultation with Savo and let's
              explore how technology can help turn your idea,
              business challenge or process into a practical
              digital solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 space-y-6">
                {/* Intro card */}
                <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-50 text-secondary-500 dark:bg-secondary-900/20">
                    <MessageCircle className="h-6 w-6" />
                  </div>

                  <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                    What happens next?
                  </h2>

                  <p className="mb-6 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    Your consultation is a relaxed conversation
                    where we learn about your project and help
                    you understand the best way forward.
                  </p>

                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-secondary-50 text-sm font-bold text-secondary-500 dark:bg-secondary-900/20">
                        1
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Tell us about your idea
                        </h3>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Explain what you're trying to build
                          or the problem you're solving.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-secondary-50 text-sm font-bold text-secondary-500 dark:bg-secondary-900/20">
                        2
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Explore the solution
                        </h3>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          We'll discuss features, technology
                          and possible approaches.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-secondary-50 text-sm font-bold text-secondary-500 dark:bg-secondary-900/20">
                        3
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Plan the next step
                        </h3>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          If we're a good fit, we'll discuss
                          the next steps together.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Free consultation */}
                <div className="rounded-3xl bg-gradient-to-br from-secondary-500 to-accent-500 p-7 text-white">
                  <Clock className="mb-4 h-7 w-7" />

                  <h3 className="mb-2 text-xl font-bold">
                    30-minute consultation
                  </h3>

                  <p className="mb-5 text-sm leading-6 text-white/80">
                    No complicated sales pitch. Just a
                    straightforward conversation about your
                    project.
                  </p>

                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <CheckCircle className="h-4 w-4" />
                    Completely free
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm font-semibold">
                    <CheckCircle className="h-4 w-4" />
                    No obligation
                  </div>
                </div>

                {/* Contact */}
                <div className="rounded-3xl border border-gray-200 bg-white p-7 dark:border-gray-800 dark:bg-gray-900">
                  <h3 className="mb-4 font-bold text-gray-900 dark:text-white">
                    Prefer email?
                  </h3>

                  <a
                    href="mailto:savo@gmail.com"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-secondary-500 transition hover:text-secondary-600"
                  >
                    <Mail className="h-4 w-4" />
                    savo@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm md:p-10 dark:border-gray-800 dark:bg-gray-900">
                {isSuccess ? (
                  <SuccessMessage onReset={resetForm} />
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
                        Book your consultation
                      </h2>

                      <p className="text-gray-600 dark:text-gray-400">
                        Give us a few details so we can make
                        the most of our conversation.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      {/* PERSONAL DETAILS */}
                      <div>
                        <h3 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
                          Your details
                        </h3>

                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <label
                              htmlFor="name"
                              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Full Name *
                            </label>

                            <Input
                              id="name"
                              type="text"
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={(e) =>
                                updateField(
                                  'name',
                                  e.target.value
                                )
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
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={(e) =>
                                updateField(
                                  'email',
                                  e.target.value
                                )
                              }
                              required
                              disabled={isLoading}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="phone"
                              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Phone Number
                            </label>

                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+254 700 000 000"
                              value={formData.phone}
                              onChange={(e) =>
                                updateField(
                                  'phone',
                                  e.target.value
                                )
                              }
                              disabled={isLoading}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="company"
                              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Company / Business
                            </label>

                            <Input
                              id="company"
                              type="text"
                              placeholder="Your company"
                              value={formData.company}
                              onChange={(e) =>
                                updateField(
                                  'company',
                                  e.target.value
                                )
                              }
                              disabled={isLoading}
                            />
                          </div>
                        </div>
                      </div>

                      {/* PROJECT TYPE */}
                      <div>
                        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                          What would you like to build?
                        </h3>

                        <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                          Select the option that best describes
                          your project.
                        </p>

                        <div className="grid gap-4 sm:grid-cols-2">
                          {projectTypes.map((project) => {
                            const Icon = project.icon;

                            const selected =
                              formData.projectType ===
                              project.value;

                            return (
                              <button
                                key={project.value}
                                type="button"
                                onClick={() =>
                                  updateField(
                                    'projectType',
                                    project.value
                                  )
                                }
                                disabled={isLoading}
                                className={`rounded-2xl border p-5 text-left transition-all ${
                                  selected
                                    ? 'border-secondary-500 bg-secondary-50 ring-2 ring-secondary-500/20 dark:bg-secondary-900/20'
                                    : 'border-gray-200 bg-white hover:border-secondary-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-secondary-700'
                                }`}
                              >
                                <div className="flex items-start gap-4">
                                  <div
                                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${
                                      selected
                                        ? 'bg-secondary-500 text-white'
                                        : 'bg-gray-100 text-gray-500 dark:bg-gray-800'
                                    }`}
                                  >
                                    <Icon className="h-5 w-5" />
                                  </div>

                                  <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                      {project.label}
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                                      {project.description}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* BUDGET */}
                      <div>
                        <label
                          htmlFor="budget"
                          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Estimated Budget
                        </label>

                        <select
                          id="budget"
                          value={formData.budget}
                          onChange={(e) =>
                            updateField(
                              'budget',
                              e.target.value
                            )
                          }
                          disabled={isLoading}
                          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-secondary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        >
                          <option value="">
                            Select a budget range
                          </option>

                          {budgetOptions.map((option) => (
                            <option
                              key={option}
                              value={option}
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* DATE AND TIME */}
                      <div>
                        <h3 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
                          Choose your preferred time
                        </h3>

                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <label
                              htmlFor="preferredDate"
                              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Preferred Date *
                            </label>

                            <div className="relative">
                              <Calendar className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                              <input
                                id="preferredDate"
                                type="date"
                                min={
                                  new Date()
                                    .toISOString()
                                    .split('T')[0]
                                }
                                value={
                                  formData.preferredDate
                                }
                                onChange={(e) =>
                                  updateField(
                                    'preferredDate',
                                    e.target.value
                                  )
                                }
                                required
                                disabled={isLoading}
                                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-secondary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="preferredTime"
                              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Preferred Time *
                            </label>

                            <select
                              id="preferredTime"
                              value={
                                formData.preferredTime
                              }
                              onChange={(e) =>
                                updateField(
                                  'preferredTime',
                                  e.target.value
                                )
                              }
                              required
                              disabled={isLoading}
                              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-secondary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            >
                              <option value="">
                                Select a time
                              </option>

                              {timeOptions.map((time) => (
                                <option
                                  key={time}
                                  value={time}
                                >
                                  {time}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <p className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3.5 w-3.5" />
                          Consultation hours: Monday -
                          Friday, 9:00 AM - 5:00 PM
                        </p>
                      </div>

                      {/* MESSAGE */}
                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Tell us about your project *
                        </label>

                        <textarea
                          id="message"
                          rows={7}
                          value={formData.message}
                          onChange={(e) =>
                            updateField(
                              'message',
                              e.target.value
                            )
                          }
                          required
                          disabled={isLoading}
                          placeholder="What are you trying to build? What problem are you trying to solve? What features do you have in mind?"
                          className="w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-secondary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        />
                      </div>

                      {/* SUBMIT */}
                      <div className="border-t border-gray-200 pt-7 dark:border-gray-800">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full btn-primary md:w-auto"
                          size="lg"
                        >
                          {isLoading ? (
                            <>
                              <div className="spinner mr-2" />
                              Sending Request...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Book Free Consultation
                            </>
                          )}
                        </Button>

                        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                          By submitting this form, you are
                          requesting a consultation. There is no
                          obligation to proceed with a project.
                        </p>
                      </div>
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

function SuccessMessage({
  onReset,
}: {
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-16 text-center"
    >
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
        <CheckCircle className="h-10 w-10 text-green-500" />
      </div>

      <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
        Consultation Requested!
      </h2>

      <p className="mx-auto mb-8 max-w-lg leading-7 text-gray-600 dark:text-gray-400">
        Thank you for reaching out to Savo. We've received
        your consultation request and will contact you to
        confirm the meeting time.
      </p>

      <div className="mx-auto mb-8 max-w-md rounded-2xl bg-gray-50 p-6 text-left dark:bg-gray-800">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-secondary-50 text-secondary-500 dark:bg-secondary-900/20">
            <Calendar className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              What happens next?
            </h3>

            <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
              We'll review your request and get in touch to
              confirm your preferred consultation time.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
        >
          <X className="mr-2 h-4 w-4" />
          Submit Another Request
        </Button>

        <a href="/">
          <Button type="button">
            Back to Home
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </div>
    </motion.div>
  );
}