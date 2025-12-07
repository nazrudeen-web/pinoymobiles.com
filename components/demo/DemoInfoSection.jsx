export default function DemoInfoSection() {
  const features = [
    {
      title: "Demo Data",
      description: "All pages are populated with sample phone data",
    },
    {
      title: "Responsive",
      description:
        "Try resizing your browser to see mobile/tablet/desktop layouts",
    },
    {
      title: "Interactive",
      description: "Click buttons, hover over cards, explore all features",
    },
    {
      title: "Components",
      description:
        "See hero sections, card grids, gradients, and all UI elements",
    },
    {
      title: "Phone Models",
      description: "10 different phones with full specifications",
    },
  ];

  return (
    <div className="mt-12 rounded-3xl border border-border/40 bg-linear-to-r from-blue-50 to-purple-50 p-8">
      <h2 className="text-2xl font-bold text-foreground">About This Preview</h2>
      <ul className="mt-4 space-y-3 text-muted-foreground">
        {features.map((feature) => (
          <li key={feature.title} className="flex gap-3">
            <span className="text-primary font-bold">✓</span>
            <span>
              <strong>{feature.title}:</strong> {feature.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
