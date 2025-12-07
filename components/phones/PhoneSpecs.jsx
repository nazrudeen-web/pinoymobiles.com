import {
  Smartphone,
  Cpu,
  HardDrive,
  Camera,
  Battery,
  Wifi,
  Monitor,
  Scale,
} from "lucide-react";

const specIcons = {
  display: Monitor,
  processor: Cpu,
  ram: HardDrive,
  storage: HardDrive,
  camera: Camera,
  battery: Battery,
  connectivity: Wifi,
  os: Smartphone,
  build: Smartphone,
  dimensions: Scale,
  weight: Scale,
};

export default function PhoneSpecsGrid({ specs }) {
  const keySpecs = Object.entries(specs).slice(0, 6);

  return (
    <section className="mt-8">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">
            Key Specifications
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Main technical features
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100">
          {keySpecs.map(([key, value]) => {
            const Icon = specIcons[key] || Smartphone;
            return (
              <div
                key={key}
                className="bg-white p-5 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                      {key}
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PhoneFullSpecs({ specs }) {
  return (
    <section className="mt-8">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">
            Full Specifications
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Complete technical details
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {Object.entries(specs).map(([key, value], index) => {
            const Icon = specIcons[key] || Smartphone;
            return (
              <div
                key={key}
                className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-slate-100">
                  <Icon className="w-4 h-4 text-slate-500" />
                </div>
                <div className="flex-1 grid sm:grid-cols-[200px,1fr] gap-4">
                  <dt className="text-sm font-semibold text-slate-500 capitalize">
                    {key}
                  </dt>
                  <dd className="text-sm text-slate-900">{value}</dd>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
