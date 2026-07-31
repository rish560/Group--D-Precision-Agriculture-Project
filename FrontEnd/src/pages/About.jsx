import { motion } from 'framer-motion';
import { Award, Compass, HeartHandshake, ShieldCheck, Sprout } from 'lucide-react';
import { Card } from '../components/ui/Card';

const values = [
  {
    icon: Compass,
    title: 'Precision Agriculture',
    desc: 'Harnessing real-time sensor metrics and AI-driven alerts for optimum crop lifecycle guidance.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Infrastructure',
    desc: 'Enterprise-grade role-based access control protecting telemetry and agricultural data.',
  },
  {
    icon: HeartHandshake,
    title: 'Farmer First',
    desc: 'Guided recommendations and official statistics designed to support decision making on the ground.',
  },
  {
    icon: Award,
    title: 'Operational Excellence',
    desc: 'Standardized crop production reporting, soil recommendations, and mapping tools.',
  },
];

export const AboutPage = () => {
  return (
    <div className="space-y-6">
      {/* About header */}
      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest text-green-600">Platform vision</p>
        <h2 className="mt-2 text-2xl font-bold text-gray-900">About FarmVerse</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
          FarmVerse is an industry-level precision agriculture management platform designed to orchestrate and
          simplify modern agricultural operations. By bridging physical telemetry (soil moisture, nutrient levels,
          weather forecast) with decision workflows, FarmVerse empowers farmers, managers, and administrators to
          act confidently and sustainably.
        </p>
      </Card>

      {/* Values grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {values.map(({ icon: Icon, title, desc }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Card className="flex h-full flex-col gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Status card */}
      <Card className="py-8 text-center">
        <Sprout className="mx-auto h-10 w-10 animate-pulse text-green-600" />
        <h3 className="mt-4 font-semibold text-gray-900">Agronomic Intel Sync Active</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
          Currently running v1.0.4. Live syncing is active across regional nodes. Contact your platform
          administrator for integrations.
        </p>
        <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-medium text-green-700">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> All systems operational
        </div>
      </Card>
    </div>
  );
};
