"use client";

export default function SpecTable({ specs }) {
  // Organize specs into categories
  const specCategories = [
    {
      title: "Display",
      icon: "📺",
      specs: [
        { label: "Screen Size", key: "display" },
        { label: "Resolution", key: "resolution" },
        { label: "Display Type", key: "displayType" },
        { label: "Refresh Rate", key: "refreshRate" },
      ],
    },
    {
      title: "Performance",
      icon: "⚡",
      specs: [
        { label: "Processor", key: "processor" },
        { label: "RAM", key: "ram" },
        { label: "Storage", key: "storage" },
        { label: "GPU", key: "gpu" },
      ],
    },
    {
      title: "Camera",
      icon: "📷",
      specs: [
        { label: "Main Camera", key: "mainCamera" },
        { label: "Front Camera", key: "frontCamera" },
        { label: "Video Recording", key: "video" },
      ],
    },
    {
      title: "Battery",
      icon: "🔋",
      specs: [
        { label: "Battery Capacity", key: "battery" },
        { label: "Charging", key: "charging" },
        { label: "Wireless Charging", key: "wirelessCharging" },
      ],
    },
    {
      title: "Connectivity",
      icon: "📡",
      specs: [
        { label: "Network", key: "network" },
        { label: "SIM", key: "sim" },
        { label: "WiFi", key: "wifi" },
        { label: "Bluetooth", key: "bluetooth" },
        { label: "NFC", key: "nfc" },
      ],
    },
    {
      title: "Design",
      icon: "📐",
      specs: [
        { label: "Dimensions", key: "dimensions" },
        { label: "Weight", key: "weight" },
        { label: "Build", key: "build" },
        { label: "Colors", key: "colors" },
      ],
    },
  ];

  // Default values for specs that may not exist
  const getSpecValue = (key) => {
    if (specs?.[key]) return specs[key];

    // Fallback defaults based on key
    const defaults = {
      display: '6.7" Super AMOLED',
      resolution: "2796 x 1290 pixels",
      displayType: "LTPO OLED",
      refreshRate: "120Hz",
      processor: "Latest Flagship Chipset",
      ram: "8GB",
      storage: "256GB",
      gpu: "Integrated GPU",
      mainCamera: "50MP + 12MP + 10MP",
      frontCamera: "12MP",
      video: "4K @ 60fps",
      battery: "5000mAh",
      charging: "65W Fast Charging",
      wirelessCharging: "15W",
      network: "5G, 4G LTE",
      sim: "Dual SIM (Nano)",
      wifi: "Wi-Fi 6E",
      bluetooth: "5.3",
      nfc: "Yes",
      dimensions: "160 x 76 x 8.5mm",
      weight: "195g",
      build: "Glass front & back, Aluminum frame",
      colors: "Black, White, Blue",
    };

    return defaults[key] || "—";
  };

  return (
    <div className="space-y-6">
      {specCategories.map((category) => (
        <div key={category.title}>
          {/* Category Header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{category.icon}</span>
            <h3 className="text-sm md:text-base font-semibold text-slate-900">
              {category.title}
            </h3>
          </div>

          {/* Specs Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-slate-100">
                {category.specs.map((spec) => (
                  <tr
                    key={spec.key}
                    className={
                      category.title.length % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                    }
                  >
                    <td className="px-4 py-3 text-xs md:text-sm text-slate-500 font-medium w-1/3 md:w-2/5">
                      {spec.label}
                    </td>
                    <td className="px-4 py-3 text-xs md:text-sm text-slate-900 font-medium">
                      {getSpecValue(spec.key)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
