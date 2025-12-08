export function FeatureGrid({ features }) {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Powerful Features to Help You Decide
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to find the perfect phone
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-linear-to-br from-violet-50 to-purple-50 border border-violet-100 mb-4">
                  <Icon className="h-8 w-8 text-violet-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
