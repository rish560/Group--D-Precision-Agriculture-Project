import { motion } from 'framer-motion';
import { Award, Compass, HeartHandshake, ShieldCheck, Sprout } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useLanguage } from '../context/LanguageContext';

export const AboutPage = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Compass,
      title: t('valuePrecisionTitle'),
      desc: t('valuePrecisionDesc'),
    },
    {
      icon: ShieldCheck,
      title: t('valueSecureTitle'),
      desc: t('valueSecureDesc'),
    },
    {
      icon: HeartHandshake,
      title: t('valueFarmerTitle'),
      desc: t('valueFarmerDesc'),
    },
    {
      icon: Award,
      title: t('valueExcellenceTitle'),
      desc: t('valueExcellenceDesc'),
    },
  ];

  return (
    <div className="space-y-6">
      {/* About header */}
      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest text-green-600 dark:text-green-400">{t('aboutPageEyebrow')}</p>
        <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">{t('aboutPageTitle')}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {t('aboutPageIntro')}
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Status card */}
      <Card className="py-8 text-center">
        <Sprout className="mx-auto h-10 w-10 animate-pulse text-green-600 dark:text-green-400" />
        <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-100">{t('syncActiveTitle')}</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
          {t('syncActiveDesc')}
        </p>
        <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-green-200 dark:border-green-500/30 bg-green-50 dark:bg-green-500/10 px-4 py-1.5 text-xs font-medium text-green-700 dark:text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> {t('allSystemsOperational')}
        </div>
      </Card>
    </div>
  );
};
