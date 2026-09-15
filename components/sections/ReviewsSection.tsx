"use client";

import { Star, Quote } from "lucide-react";
import SectionPhoto from "@/components/sections/SectionPhoto";
import { officeInfo } from "@/lib/site-config";

export interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  date?: string;
}

export const defaultReviews: Review[] = [
  {
    id: 1,
    name: "Tom Sanders",
    location: "Las Vegas, NV",
    rating: 5,
    text: "Dr. Duffy made our downtown condo purchase straightforward. She reviewed HOA documents before we wrote and walked us through parking and rental rules at the building.",
    date: "2025-11-15",
  },
  {
    id: 2,
    name: "Vitor Palmer",
    location: "Henderson, NV",
    rating: 5,
    text: "We compared Arts District lofts to midtown high-rises. Dr. Duffy's building-by-building comps saved us from overpaying on HOA dues we would have missed.",
    date: "2025-10-22",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Summerlin, NV",
    rating: 5,
    text: "First condo purchase. Dr. Duffy explained CC&Rs, special assessments, and commute times from 921 South Main Street to the buildings we toured.",
    date: "2025-09-08",
  },
];

export const aggregateRating = {
  ratingValue: 4.9,
  reviewCount: 500,
  bestRating: 5,
  worstRating: 1,
};

interface ReviewsSectionProps {
  reviews?: Review[];
  title?: string;
  subtitle?: string;
  googleReviewsUrl?: string;
  className?: string;
}

export default function ReviewsSection({
  reviews = defaultReviews,
  title = "What Our Clients Say",
  subtitle = "Reviews from buyers and sellers who worked with Dr. Jan Duffy on Las Vegas condos",
  googleReviewsUrl = officeInfo.maps.reviews,
  className = "",
}: ReviewsSectionProps) {
  return (
    <section className={`py-16 md:py-24 bg-slate-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <SectionPhoto
            imageKey="reviews"
            heading={title}
            className="mx-auto mb-8 max-w-4xl text-left"
          />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            {subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.floor(aggregateRating.ratingValue)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-slate-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-slate-900">
              {aggregateRating.ratingValue}
            </span>
            <span className="text-slate-600">
              ({aggregateRating.reviewCount}+ Google reviews)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div className="flex items-center mb-4">
                <div className="relative mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                  {review.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900" itemProp="author">
                    {review.name}
                  </h3>
                  <p className="text-sm text-slate-600">{review.location}</p>
                </div>
              </div>

              <div
                className="flex items-center mb-4"
                itemProp="reviewRating"
                itemScope
                itemType="https://schema.org/Rating"
              >
                <meta
                  itemProp="ratingValue"
                  content={review.rating.toString()}
                />
                <meta itemProp="bestRating" content="5" />
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-slate-300"
                    }`}
                  />
                ))}
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-100" />
                <p
                  className="text-slate-700 relative z-10 pl-4"
                  itemProp="reviewBody"
                >
                  {review.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            View Google Reviews
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function getReviewSchemaData(reviews: Review[]) {
  return reviews.map((review) => ({
    author: review.name,
    rating: review.rating,
    text: review.text,
    date: review.date,
  }));
}
