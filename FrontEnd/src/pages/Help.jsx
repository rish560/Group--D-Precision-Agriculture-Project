import { HelpCircle, Mail, MapPin, Phone, Search, Send } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useToast } from '../context/ToastContext';

export const HelpPage = () => {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [ticket, setTicket] = useState({ name: '', email: '', message: '' });

  const faqs = [
    { q: 'How does role-based access work in FarmVerse?', a: 'Users register with specific roles (Admin, Farm Manager, Guest User). Admins have complete CRUD access, Farm Managers manage farms/crops under their operational command, and Guest Users have read-only access.' },
    { q: 'Where do weather and soil updates come from?', a: 'Weather telemetry pulls live forecasts directly from OpenMeteo APIs for configured location markers, while soil recommendations are calculated based on loamy, clay, or laterite nitrogen-potassium levels.' },
    { q: 'How do I add a new farm or crop cycle?', a: 'Only Farm Managers can add farms and crops. Use the "Add Farm" and "Add Crop" buttons in the operations center or navigate via the Sidebar to submit the record form.' },
    { q: 'Can I change my account credentials?', a: 'Yes! Navigate to the "Profile" page where you can update your name, phone number, address, or initiate a secure password reset.' }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(search.toLowerCase()) || 
    faq.a.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Support request submitted. We will contact you shortly.', 'success');
    setTicket({ name: '', email: '', message: '' });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* FAQs */}
        <Card className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">FAQ Center</p>
          <h2 className="text-2xl font-semibold text-slate-900">Frequently Asked Questions</h2>
          <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
              placeholder="Search help articles..."
            />
          </label>
          <div className="mt-4 space-y-3">
            {filteredFaqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm">
                <div className="flex items-start gap-2 font-semibold text-slate-900">
                  <HelpCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <p className="mt-2 text-slate-600 leading-6 pl-6">{faq.a}</p>
              </div>
            ))}
            {!filteredFaqs.length && (
              <p className="text-center py-8 text-slate-500">No help articles found matching your query.</p>
            )}
          </div>
        </Card>

        {/* Contact Form & Info */}
        <div className="space-y-6">
          <Card className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Get Help</p>
            <h2 className="text-2xl font-semibold text-slate-900">Contact Support</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Your Name
                <input 
                  required
                  value={ticket.name}
                  onChange={(e) => setTicket(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-2 w-full rounded-2xl border bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:bg-white transition"
                  placeholder="Asha Nair"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Email Address
                <input 
                  required
                  type="email"
                  value={ticket.email}
                  onChange={(e) => setTicket(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-2 w-full rounded-2xl border bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:bg-white transition"
                  placeholder="name@agrisense.com"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Detailed Message
                <textarea 
                  required
                  value={ticket.message}
                  onChange={(e) => setTicket(prev => ({ ...prev, message: e.target.value }))}
                  className="mt-2 min-h-24 w-full rounded-2xl border bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:bg-white transition"
                  placeholder="Describe your issue or custom configuration request..."
                />
              </label>
              <Button type="submit" className="w-full flex items-center justify-center gap-2">
                <Send className="h-4 w-4" /> Send Request
              </Button>
            </form>
          </Card>

          <Card className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Mail className="h-4 w-4 text-emerald-700" />
              <span>support@farmverse.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Phone className="h-4 w-4 text-emerald-700" />
              <span>+91 422 243 9000</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <MapPin className="h-4 w-4 text-emerald-700" />
              <span>AgriTech Techpark, Coimbatore, TN</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
