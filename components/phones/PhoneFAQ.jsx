"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

export default function PhoneFAQ({ phone }) {
  const faqs = [
    {
      q: "Does this phone support 5G?",
      a: phone.specs.connectivity?.includes("5G")
        ? "Yes, this phone has 5G support for ultra-fast mobile connectivity."
        : "No, this model does not support 5G networks.",
    },
    {
      q: "How long does the battery last?",
      a: `The ${phone.name} has a ${phone.specs.battery} battery that typically lasts 1-2 days with moderate usage.`,
    },
    {
      q: "Does it have expandable storage?",
      a: "Check with your retailer for expandable storage options on this model.",
    },
    {
      q: "Is it water-resistant?",
      a: "The build quality includes advanced glass protection. Check specifications for water resistance ratings.",
    },
  ];

  return (
    <section className="mt-8 mb-10">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Common questions answered
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white hover:bg-slate-50 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <span className="font-medium text-sm text-slate-900 pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-blue-500" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <p className="px-6 pb-4 text-sm text-slate-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}
