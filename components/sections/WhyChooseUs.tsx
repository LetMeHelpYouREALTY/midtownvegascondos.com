import { Shield, Building2, FileSearch, Award, Clock, MapPin } from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Condo Building Expertise",
    description:
      "Deep knowledge of midtown towers — HOA reserves, rental caps, and floor-plan comparisons across One Las Vegas, Ogden, Juhl, and more.",
  },
  {
    icon: FileSearch,
    title: "HOA Document Review",
    description:
      "Every condo purchase includes CC&R analysis, special assessment checks, and rental restriction verification before you commit.",
  },
  {
    icon: MapPin,
    title: "Midtown Market Data",
    description:
      "Current per-square-foot pricing, days-on-market trends, and building-specific comparable sales for informed offers.",
  },
  {
    icon: Shield,
    title: "BHHS Trust & Resources",
    description:
      "Backed by Berkshire Hathaway HomeServices — Warren Buffett's brand with 50,000+ agents and world-class marketing.",
  },
  {
    icon: Award,
    title: "500+ Transactions",
    description:
      "Serving Las Vegas since 2008 with $127M+ closed — including high-rise, loft, and urban condo specialists.",
  },
  {
    icon: Clock,
    title: "Direct Access",
    description:
      "Call (702) 500-1942 and reach Dr. Jan directly — no assistant queue, no callback delays.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Why Choose Dr. Jan for Midtown Condos?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Condo transactions require specialized expertise — HOA review, rental rules, and
            building-specific market knowledge that generalist agents often miss.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="bg-blue-100 rounded-full p-4 mb-4">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
