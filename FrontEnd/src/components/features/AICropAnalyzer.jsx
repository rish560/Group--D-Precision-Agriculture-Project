import { Camera, ScanLine, ShieldAlert, Sparkles, Sprout } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { Card } from '../ui/Card';
import CameraUpload from '../ui/CameraUpload';
import ImageWithFallback from '../ui/ImageWithFallback';
import { diseaseResponses } from '../../mock/ai_responses';

export const AICropAnalyzer = () => {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState('');

  const suggestion = useMemo(() => result, [result]);

  const handleChange = (payload) => {
    if (!payload) {
      setPreview('');
      setResult(null);
      return;
    }
    setPreview(payload.dataUrl);
    // simulate AI
    const simulated = diseaseResponses[Math.floor(Math.random() * diseaseResponses.length)];
    setResult(simulated);
    addToast(t('diseaseAnalysisPrepared') || 'AI diagnosis prepared successfully', 'success');
  };

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">{t('diseaseTitle')}</p>
          <h3 className="text-xl font-semibold text-slate-900">{t('cropHealthTitle') || 'Image-based crop health intelligence'}</h3>
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
          {preview ? <ImageWithFallback src={preview} alt="Uploaded crop preview" className="h-44 w-full rounded-2xl object-cover" /> : <div className="flex h-44 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-sm text-slate-500">{t('noImageTitle')}</div>}
          <div className="mt-4 flex items-center gap-2 text-emerald-700">
            <ScanLine className="h-4 w-4" />
            <p className="text-sm font-semibold">{t('detectedPattern')}: {suggestion?.disease ?? t('healthyCrop')}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-4">
          <div className="flex items-center gap-2 text-slate-900"><ShieldAlert className="h-4 w-4 text-amber-600" />{t('severity')}</div>
          <p className="mt-2 text-sm text-slate-600">{suggestion?.severity ?? '--'}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4">
          <div className="flex items-center gap-2 text-slate-900"><Sprout className="h-4 w-4 text-emerald-700" />{t('symptoms')}</div>
          <p className="mt-2 text-sm text-slate-600">{suggestion?.symptoms ?? '--'}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4">
          <div className="flex items-center gap-2 text-slate-900"><Sparkles className="h-4 w-4 text-sky-700" />{t('recommendation')}</div>
          <p className="mt-2 text-sm text-slate-600">{suggestion?.treatment ?? '--'}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4">
          <div className="flex items-center gap-2 text-slate-900"><Camera className="h-4 w-4 text-rose-700" />{t('preventiveMeasures') || t('pesticides')}</div>
          <p className="mt-2 text-sm text-slate-600">{suggestion?.prevention ?? suggestion?.pesticides ?? '--'}</p>
        </div>
      </div>
    </Card>
  );
};
