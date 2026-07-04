"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface FAQ {
  question: string;
  answer: string;
}

// Default FAQs for midtown Las Vegas condos
export const defaultFaqs: FAQ[] = [
  {
    question: "What midtown Las Vegas condo buildings do you specialize in?",
    answer:
      "Dr. Jan Duffy specializes in midtown and downtown Las Vegas condos including One Las Vegas, The Martin, Ogden, Juhl, and Arts District lofts. She reviews HOA documents, rental restrictions, and comparable sales for every building.",
  },
  {
    question: "How long does buying a midtown Las Vegas condo take?",
    answer:
      "Typically 30–45 days from offer acceptance to closing. Condo transactions may take slightly longer due to HOA document review. Cash purchases can close in 7–14 days.",
  },
  {
    question: "Do you provide free condo valuations?",
    answer:
      "Yes! Dr. Jan provides free, no-obligation condo valuations using current midtown comparable sales and per-square-foot data. Call (702) 500-1942 for a consultation.",
  },
  {
    question: "What makes Dr. Jan different for condo buyers?",
    answer:
      "Serving Las Vegas since 2008 with 500+ transactions, Dr. Jan combines specialized condo expertise — HOA review, rental cap analysis, and building-specific knowledge — with Berkshire Hathaway HomeServices resources.",
  },
  {
    question: "Can you help with midtown condo investment properties?",
    answer:
      "Absolutely! Dr. Jan analyzes rental yields, short-term rental regulations, and cap rates for midtown condo investors. She knows which buildings allow STR and which have the strongest HOA reserves.",
  },
  {
    question: "What are your fees for condo transactions?",
    answer:
      "Commission structures are negotiable and transparent. For buyers, Dr. Jan's services are typically free as commissions are paid by the seller. Call (702) 500-1942 to discuss your midtown condo goals.",
  },
];


interface FAQSectionProps {
  /** Custom FAQs to display (defaults to defaultFaqs) */
  faqs?: FAQ[];
  /** Custom title for the section */
  title?: string;
  /** Custom subtitle for the section */
  subtitle?: string;
  /** Whether to include JSON-LD schema (handled separately by FAQSchema component) */
  className?: string;
}

export default function FAQSection({
  faqs = defaultFaqs,
  title = "Frequently Asked Questions",
  subtitle = "Common questions about buying and selling midtown Las Vegas condos",
  className = "",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-16 md:py-24 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-lg mb-4 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                  <p className="text-slate-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Helper to generate FAQ schema data from FAQ array
 * Use with FAQSchema component: <FAQSchema faqs={getFAQSchemaData(faqs)} />
 */
export function getFAQSchemaData(faqs: FAQ[]) {
  return faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));
}
