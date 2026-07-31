import { Beaker, Droplets, Gauge, Leaf, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { Card } from '../ui/Card';
import CameraUpload from '../ui/CameraUpload';
import ImageWithFallback from '../ui/ImageWithFallback';
import { soilResponses } from '../../mock/ai_responses';

export const AISoilAnalyzer = () => {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState(null);

  const handleChange = (payload) => {
    if (!payload) {
      setPreview('');
      setResult(null);
      return;
    }
    setPreview(payload.dataUrl);
    const simulated = soilResponses[Math.floor(Math.random() * soilResponses.length)];
    setResult(simulated);
    addToast(t('soilAnalysisCompleted') || 'Soil analysis completed', 'success');
  };

  const insights = useMemo(() => [
    { label: t('moistureLevel'), value: result?.moisture ?? '--' },
    { label: t('phValue'), value: result?.ph ?? '--' },
    { label: t('nitrogenLevel'), value: result?.nitrogen ?? '--' },
    { label: t('phosphorusLevel'), value: result?.phosphorus ?? '--' },
  ], [result, t]);

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">{t('soilTitle')}</p>
          <h3 className="text-xl font-semibold text-slate-900">{t('soilAnalysisPageTitle') || 'Sensor or image-driven soil intelligence'}</h3>
        </div>
        <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
          <Sparkles className="mr-2 inline h-4 w-4" />AI assisted
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <CameraUpload onChange={handleChange} />
        </div>
        <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4">
          {preview ? <ImageWithFallback src={preview} alt="Uploaded soil preview" className="h-44 w-full rounded-2xl object-cover" /> : <div className="flex h-44 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-sm text-slate-500">{t('noSoilSample')}</div>}
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {insights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-100 bg-white p-3 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">{item.label}</p>
                <p className="mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-4">
          <div className="flex items-center gap-2 text-slate-900"><Gauge className="h-4 w-4 text-sky-700" />{t('soilRecommendation')}</div>
          <p className="mt-2 text-sm text-slate-600">{result?.recommendations ?? result?.fertilizer ?? '--'}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4">
          <div className="flex items-center gap-2 text-slate-900"><Droplets className="h-4 w-4 text-emerald-700" />{t('waterRequirement')}</div>
          <p className="mt-2 text-sm text-slate-600">{result?.waterReq ?? '--'}</p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-4">
          <p className="font-semibold text-slate-900">{t('soilType')}</p>
          <p className="mt-2">{result?.soilType ?? '--'}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4">
          <p className="font-semibold text-slate-900">{t('soilQualityScore')}</p>
          <p className="mt-2">{result?.qualityScore ?? '--'}</p>
        </div>
      </div>
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">
        <p className="font-semibold">{t('suitableCrops')}</p>
        <p className="mt-2">{(result?.suitableCrops || []).join(', ') || '--'}</p>
      </div>
    </Card>
  );
};
