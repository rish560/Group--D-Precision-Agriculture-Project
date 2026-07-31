import { motion } from 'framer-motion';
import {
  ArrowRight,
  Droplets,
  Leaf,
  ShieldCheck,
  SunMedium,
  Trees,
  TrendingUp,
  UserCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const features = [
  {
    icon: Leaf,
    title: 'Crop Health Intelligence',
    text: 'Monitor plant stress, soil quality, and pest risk in a unified dashboard.',
  },
  {
    icon: SunMedium,
    title: 'Weather-Driven Planning',
    text: 'Plan irrigation and field work around accurate, hyper-local forecasts.',
  },
  {
    icon: Droplets,
    title: 'Water Optimization',
    text: 'Reduce waste with smart irrigation guidance and efficiency alerts.',
  },
  {
    icon: ShieldCheck,
    title: 'Role-Based Operations',
    text: 'Secure workflows for farmers, managers, experts, and admins.',
  },
];

const stats = [
  { label: 'Active farms', value: '250+', icon: Trees },
  { label: 'Daily insights', value: '18k+', icon: TrendingUp },
  { label: 'Water savings', value: '32%', icon: Droplets },
  { label: 'Satisfaction', value: '4.9/5', icon: UserCircle },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ── Header ── */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">
              <Leaf className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold text-gray-900">FarmVerse</span>
          </div>

          {/* Nav */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 lg:flex">
            <a href="#features" className="transition hover:text-green-600">Features</a>
            <a href="#insights" className="transition hover:text-green-600">Insights</a>
            <a href="#contact" className="transition hover:text-green-600">Contact</a>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="secondary" className="px-4 py-2">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button className="px-4 py-2">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        {/* ── Hero ── */}
        <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Built for modern farm operations
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Turn farm data into<br />
              <span className="text-green-600">confident decisions</span>
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-gray-500">
              FarmVerse unifies crop planning, weather intelligence, and role-based workflows in one clean dashboard for every member of your agricultural team.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/register">
                <Button className="px-6 py-2.5 text-base">Start for free</Button>
              </Link>
              <a href="#features">
                <Button variant="secondary" className="px-6 py-2.5 text-base">
                  Explore features <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </a>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
              {stats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-xl border border-gray-200 bg-white p-3 text-center shadow-sm">
                  <Icon className="mx-auto h-4 w-4 text-green-600" />
                  <p className="mt-1.5 text-xl font-bold text-gray-900">{value}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1400&q=80"
                alt="Modern precision agriculture field"
                className="h-[420px] w-full object-cover"
              />
            </div>
            {/* Floating metric card */}
            <div className="absolute -bottom-5 left-6 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
              <p className="text-xs font-medium text-gray-500">Farm health index</p>
              <p className="mt-1 text-2xl font-bold text-green-600">94%</p>
              <div className="mt-2 flex gap-3 text-xs text-gray-600">
                <span>💧 18.6K L saved</span>
                <span>📈 +24% yield</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Features ── */}
        <section id="features" className="mt-24">
          <div className="mb-8 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-600">Product features</p>
            <h2 className="text-2xl font-bold text-gray-900">Everything your team needs</h2>
            <p className="max-w-2xl text-sm text-gray-500">
              A modern agriculture control plane built for every role — from field workers to enterprise admins.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{feature.text}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-green-600">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Insights ── */}
        <section id="insights" className="mt-24 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-600">Live signals</p>
            <h2 className="mt-2 text-xl font-bold text-gray-900">Stay ahead with real-time data</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-500">Weather outlook</p>
                <p className="mt-2 text-2xl font-bold text-green-600">Sunny</p>
                <p className="mt-1 text-xs text-gray-500">24°C • Light breeze • 6h sun</p>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-500">Soil moisture</p>
                <p className="mt-2 text-2xl font-bold text-green-600">62%</p>
                <p className="mt-1 text-xs text-gray-500">Optimal hydration levels</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-600">Why FarmVerse</p>
            <h2 className="mt-2 text-xl font-bold text-gray-900">Built for teams and scale</h2>
            <div className="mt-4 space-y-3">
              {[
                { title: 'Field-level clarity', text: 'Unified view of crop performance, soil health, and field activity.' },
                { title: 'Faster decisions', text: 'Actionable signals to respond quickly to changing conditions.' },
                { title: 'Team alignment', text: 'Secure, role-aware access keeps every stakeholder informed.' },
              ].map((p) => (
                <div key={p.title} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-900">{p.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="contact" className="mt-24 rounded-2xl border border-green-200 bg-green-50 p-8 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-green-600">Get started</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">Ready to modernize your farm operations?</h2>
              <p className="mt-2 max-w-xl text-sm text-gray-600">
                Book a walkthrough, explore a demo, or start your agriculture transformation today.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/register">
                <Button className="px-6 py-2.5">Start for free</Button>
              </Link>
              <a href="mailto:hello@farmverse.com">
                <Button variant="secondary" className="px-6 py-2.5">Contact us</Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-gray-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-green-600 text-white">
              <Leaf className="h-3 w-3" />
            </div>
            <span className="font-medium text-gray-700">FarmVerse</span>
            <span>· © 2026 Precision agriculture platform</span>
          </div>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-green-600 transition">Features</a>
            <a href="#insights" className="hover:text-green-600 transition">Insights</a>
            <a href="#contact" className="hover:text-green-600 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
