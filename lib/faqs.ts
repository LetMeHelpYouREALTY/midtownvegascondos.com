/**
 * Shared FAQ data — kept outside of 'use client' modules so Server Components
 * (e.g. FAQSchema / SchemaScript) can safely map over these values during SSR.
 */

export interface FAQ {
  question: string;
  answer: string;
}

/** Default FAQs for midtown Las Vegas condos */
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
      "Yes! Dr. Jan provides free, no-obligation condo valuations using current midtown comparable sales and per-square-foot data. Call (702) 500-1980 for a consultation.",
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
      "Commission structures are negotiable and transparent. For buyers, Dr. Jan's services are typically free as commissions are paid by the seller. Call (702) 500-1980 to discuss your midtown condo goals.",
  },
];

/** Normalize FAQ items for JSON-LD schema helpers */
export function getFAQSchemaData(faqs: FAQ[]) {
  return faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));
}
