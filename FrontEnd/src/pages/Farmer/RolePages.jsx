import { Activity, AlertTriangle, ArrowRight, Clock3, Droplets, Landmark, Leaf, MapPin, Sprout, SunMedium, TrendingUp, Wheat } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { FarmMap } from '../../components/features/FarmMap';
import { Card } from '../../components/ui/Card';
import { LoadingState } from '../../components/ui/LoadingState';
import { StatCard } from '../../components/ui/StatCard';
import { getMarketPrices, getSchemes, getSoilReports, getWeather, getUpagStats } from '../../services/mockApi';
import { getCrops } from '../../api/cropApi';
import { getFarms } from '../../api/farmApi';

/* ── Shared helpers ── */

const EmptyState = ({ title, description, icon: Icon }) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-12 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
      <Icon className="h-5 w-5" />
    </div>
    <h3 className="mt-4 text-sm font-semibold text-gray-900">{title}</h3>
    <p className="mt-1 text-xs text-gray-500">{description}</p>
  </div>
);

const Badge = ({ children, variant = 'green' }) => {
  const variants = {
    green: 'bg-green-50 text-green-700',
    amber: 'bg-amber-50 text-amber-700',
    gray: 'bg-gray-100 text-gray-600',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

const SectionTitle = ({ children }) => (
  <p className="text-xs font-semibold uppercase tracking-widest text-green-600">{children}</p>
);

/* ── Farms ── */
export const FarmerFarmsPage = () => {
  const [farms, setFarms] = useState([]);
  const [sortDirection, setSortDirection] = useState('desc');
  const [showOptimizedOnly, setShowOptimizedOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFarms()
      .then((data) => { setFarms(data || []); setLoading(false); })
      .catch(() => { setFarms([]); setLoading(false); });
  }, []);

  const averageEfficiency = useMemo(
    () => (farms.length ? Math.round(farms.reduce((sum, farm) => sum + (farm.efficiency ?? 0), 0) / farms.length) : 0),
    [farms],
  );

  const topFarm = useMemo(
    () => (farms.length ? farms.reduce((best, farm) => (!best || (farm.efficiency ?? 0) > (best.efficiency ?? 0) ? farm : best), null) : null),
    [farms],
  );

  const displayedFarms = useMemo(
    () => (farms || [])
      .filter((farm) => !showOptimizedOnly || (farm.efficiency ?? 0) >= 90)
      .sort((a, b) => {
        const aEff = a.efficiency ?? 0, bEff = b.efficiency ?? 0;
        return sortDirection === 'desc' ? bEff - aEff : aEff - bEff;
      }),
    [farms, showOptimizedOnly, sortDirection],
  );

  if (loading) return <LoadingState label="Loading farms..." />;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Farms" value={farms.length.toString()} subtitle="Registered fields" icon={Leaf} />
        <StatCard title="Avg. Efficiency" value={farms.length ? `${averageEfficiency}%` : 'N/A'} subtitle="Performance across farms" icon={Sprout} />
        <StatCard title="Water Source" value={farms[0]?.waterSource ?? 'N/A'} subtitle="Primary field system" icon={Droplets} />
        <StatCard title="Healthy Count" value={farms.filter((f) => f.status === 'Healthy').length.toString()} subtitle="Optimal field condition" icon={Activity} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition"
          >
            Efficiency: {sortDirection === 'desc' ? 'High → Low' : 'Low → High'}
          </button>
          <button
            type="button"
            onClick={() => setShowOptimizedOnly((prev) => !prev)}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition"
          >
            {showOptimizedOnly ? 'Show all farms' : 'Optimized only'}
          </button>
        </div>
        {topFarm && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
            Top farm: {topFarm.name || topFarm.farmName} · {topFarm.efficiency ?? '--'}%
          </div>
        )}
      </div>

      {displayedFarms.length > 0 && <FarmMap farms={displayedFarms} />}

      <Card>
        <SectionTitle>Farm portfolio</SectionTitle>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {displayedFarms.length ? displayedFarms.map((farm) => (
            <div key={farm.id || farm.farmId} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              {farm.image && <img src={farm.image} alt={farm.name || farm.farmName} className="h-36 w-full object-cover" />}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{farm.name || farm.farmName}</h3>
                  <Badge variant={farm.status === 'Healthy' ? 'green' : 'amber'}>{farm.status || 'Active'}</Badge>
                </div>
                <div className="mt-3 space-y-1.5 text-sm text-gray-600">
                  <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-green-600" />{farm.location || 'N/A'} {farm.area ? `· ${farm.area}` : ''}</p>
                  {farm.currentCrop && <p className="flex items-center gap-2"><Sprout className="h-3.5 w-3.5 text-green-600" />Crop: {farm.currentCrop}</p>}
                  {farm.waterSource && <p className="flex items-center gap-2"><Droplets className="h-3.5 w-3.5 text-green-600" />Water: {farm.waterSource}</p>}
                  {farm.lastUpdated && <p className="flex items-center gap-2"><Clock3 className="h-3.5 w-3.5 text-gray-400" />Updated: {farm.lastUpdated}</p>}
                </div>
              </div>
            </div>
          )) : <EmptyState title="No farms registered" description="Farms will appear here as soon as they are added." icon={Leaf} />}
        </div>
      </Card>
    </div>
  );
};

/* ── Crops ── */
export const FarmerCropsPage = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCrops()
      .then((data) => { setCrops(data || []); setLoading(false); })
      .catch(() => { setCrops([]); setLoading(false); });
  }, []);

  if (loading) return <LoadingState label="Loading crops..." />;

  return (
    <div className="space-y-6">
      {crops.length ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {crops.map((crop) => (
            <Card key={crop.id || crop.cropId} className="overflow-hidden p-0">
              {crop.image && <img src={crop.image} alt={crop.name || crop.cropName} className="h-40 w-full object-cover" />}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900">{crop.name || crop.cropName}</h3>
                  <Badge>{crop.health || crop.status || 'Active'}</Badge>
                </div>
                <div className="mt-3 space-y-1.5 rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm text-gray-700">
                  {crop.farm && <p><span className="font-medium text-gray-900">Farm:</span> {crop.farm}</p>}
                  {crop.stage && <p><span className="font-medium text-gray-900">Growth stage:</span> {crop.stage}</p>}
                  {crop.plantingDate && <p><span className="font-medium text-gray-900">Planting date:</span> {crop.plantingDate}</p>}
                  {crop.expectedYield && <p><span className="font-medium text-gray-900">Expected yield:</span> {crop.expectedYield}</p>}
                  {crop.marketPrice && <p><span className="font-medium text-gray-900">Market price:</span> {crop.marketPrice}</p>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="No crops registered" description="Crop records will appear here as soon as they are added." icon={Wheat} />
      )}
    </div>
  );
};

/* ── Weather ── */
export const FarmerWeatherPage = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => { getWeather().then(setWeather); }, []);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <Card className="space-y-4">
        <SectionTitle>Weather monitoring</SectionTitle>
        <div className="rounded-xl bg-green-600 p-5 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-green-100">{weather?.location ?? 'Field Location'}</p>
              <p className="mt-2 text-4xl font-bold">{weather?.current?.temp ?? '--'}°C</p>
              <p className="mt-1 text-sm text-green-100">
                Humidity {weather?.current?.humidity ?? '--'}% · Wind {weather?.current?.windSpeed ?? '--'} km/h
              </p>
            </div>
            <SunMedium className="h-12 w-12 text-white/60" />
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {weather?.forecast?.map((day) => (
            <div key={day.day} className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">{day.day}</span>
                <span className="text-green-600">{day.condition}</span>
              </div>
              <p className="mt-1.5 text-gray-500">High {day.high}° · Low {day.low}°</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-4">
        <SectionTitle>Weather alerts</SectionTitle>
        <div className="space-y-3">
          {weather?.alerts?.length ? weather.alerts.map((alert) => (
            <div key={alert.type} className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="h-4 w-4" /> {alert.type}
              </div>
              <p className="mt-2">{alert.message}</p>
            </div>
          )) : <EmptyState title="No active alerts" description="Weather conditions are stable." icon={AlertTriangle} />}
        </div>
      </Card>
    </div>
  );
};

/* ── Soil ── */
export const FarmerSoilPage = () => {
  const [soilReports, setSoilReports] = useState([]);

  useEffect(() => { getSoilReports().then(setSoilReports); }, []);

  const activeReport = soilReports[0];

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <SectionTitle>Soil analysis</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Soil health score</p>
            <p className="mt-1.5 text-3xl font-bold text-gray-900">{activeReport ? '94/100' : '--'}</p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
            <p className="text-sm text-gray-500">NPK balance</p>
            <p className="mt-1.5 text-sm font-semibold text-gray-900">
              N: {activeReport?.nitrogen ?? '--'} · P: {activeReport?.phosphorus ?? '--'} · K: {activeReport?.potassium ?? '--'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

/* ── Market ── */
export const FarmerMarketPage = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => { getMarketPrices().then(setPrices); }, []);

  return (
    <Card className="space-y-4">
      <SectionTitle>Market intelligence</SectionTitle>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {prices.length ? prices.map((price) => (
          <div key={price.crop} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-900">{price.crop}</p>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p>{price.marketName}</p>
              <p className="font-medium text-gray-900">{price.priceToday}</p>
            </div>
          </div>
        )) : <EmptyState title="No market data" description="Pricing feeds will populate as market updates sync." icon={TrendingUp} />}
      </div>
    </Card>
  );
};

/* ── Government schemes ── */
export const FarmerGovernmentPage = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => { getSchemes().then(setSchemes); }, []);

  return (
    <Card className="space-y-4">
      <SectionTitle>Government schemes</SectionTitle>
      <div className="space-y-3">
        {schemes.length ? schemes.map((scheme) => (
          <div key={scheme.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900">{scheme.title}</p>
                <p className="mt-1 text-sm text-gray-500">{scheme.description}</p>
              </div>
              <Landmark className="h-5 w-5 shrink-0 text-green-600" />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-3 text-sm">
              <p className="text-gray-500"><span className="font-medium text-gray-700">Eligibility:</span> {scheme.eligibility}</p>
              <button className="ml-auto flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-100 transition">
                Apply <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )) : <EmptyState title="No schemes available" description="New schemes will appear when published." icon={Landmark} />}
      </div>
    </Card>
  );
};

/* ── Dynamic Farmer profile ── */
export const FarmerProfilePage = () => {
  const { user } = useAuth();
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative h-40 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80"
          alt="Agriculture field"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xl font-bold text-gray-900">{user?.fullName || 'User Profile'}</p>
            <p className="mt-0.5 text-sm text-gray-500">{user?.role || 'Farmer'} {user?.address ? `· ${user.address}` : ''}</p>
          </div>
          <Badge variant="green">{user?.role || 'Active User'}</Badge>
        </div>
        <div className="mt-5 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
          {[
            ['Role', user?.role || 'Farmer'],
            ['Mobile', user?.phone || 'Not specified'],
            ['Email', user?.email || 'Not specified'],
            ['Address', user?.address || 'Not specified'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs text-gray-400">{label}</p>
              <p className="mt-0.5 font-medium text-gray-900">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
