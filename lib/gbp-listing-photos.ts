/**
 * Curated photos from the live Google Business Profile listing
 * (locations/9450623171278607714, Place ID ChIJiembhLDDyIARk7jrJaU1dfs).
 * Read 2026-09-15 via GBP media API. Do not treat this as a live write.
 *
 * These are the same Maps gallery photos homebuyers see in the local pack.
 */
export type GbpListingPhoto = {
  id: string;
  src: string;
  alt: string;
  category: "EXTERIOR" | "ADDITIONAL";
};

const THUMB = "s800";

function gcs(photoId: string): string {
  return `https://lh3.googleusercontent.com/p/${photoId}=${THUMB}`;
}

export const gbpListingPhotos: GbpListingPhoto[] = [
  {
    id: "AF1QipP9u2HhoYS_ySyrvHqbLWQDvNl30_yVoEqIUuPJ",
    src: gcs("AF1QipP9u2HhoYS_ySyrvHqbLWQDvNl30_yVoEqIUuPJ"),
    alt: "Exterior of Las Vegas Arts District Condos | Homes by Dr. Jan Duffy at 921 South Main Street",
    category: "EXTERIOR",
  },
  {
    id: "AF1QipPzSdtzqNpeWAPXMbUzoEs0RTXABqs7EfiC99Mh",
    src: gcs("AF1QipPzSdtzqNpeWAPXMbUzoEs0RTXABqs7EfiC99Mh"),
    alt: "Google Business Profile photo for downtown Las Vegas condo representation at 921 South Main Street",
    category: "ADDITIONAL",
  },
  {
    id: "AF1QipMH3DmgIooyYJYVLEC5ic3AsTjCoyQLBEaNZwZI",
    src: gcs("AF1QipMH3DmgIooyYJYVLEC5ic3AsTjCoyQLBEaNZwZI"),
    alt: "Arts District Las Vegas office listing photo for Dr. Jan Duffy midtown condo clients",
    category: "ADDITIONAL",
  },
  {
    id: "AF1QipMSdl0H7RyJQlnyQJY1XR2vIaxsZX91q52UkW6Y",
    src: gcs("AF1QipMSdl0H7RyJQlnyQJY1XR2vIaxsZX91q52UkW6Y"),
    alt: "Downtown Las Vegas and Arts District condo photography from the Google Business Profile",
    category: "ADDITIONAL",
  },
  {
    id: "AF1QipMBJqJ_h9wXAaKcvT1F6LX0LA75zKwDuxFr2hL3",
    src: gcs("AF1QipMBJqJ_h9wXAaKcvT1F6LX0LA75zKwDuxFr2hL3"),
    alt: "Midtown Las Vegas condo and office photo linked from Google Maps for 921 South Main Street",
    category: "ADDITIONAL",
  },
  {
    id: "AF1QipPD2SYfxpXOO9lh-8FqScuEA66A0Kw9lQFZxE7L",
    src: gcs("AF1QipPD2SYfxpXOO9lh-8FqScuEA66A0Kw9lQFZxE7L"),
    alt: "Google listing photo for Las Vegas Arts District Condos | Homes by Dr. Jan Duffy",
    category: "ADDITIONAL",
  },
  {
    id: "AF1QipNgHKfZ1fPn9aIFM2lw_wDqFCoC7QTbxE3IuiGV",
    src: gcs("AF1QipNgHKfZ1fPn9aIFM2lw_wDqFCoC7QTbxE3IuiGV"),
    alt: "Additional Google Business Profile photo of the Arts District Las Vegas office listing",
    category: "ADDITIONAL",
  },
  {
    id: "AF1QipNWKG7bovcX6eorrf3d-ioatEJQ6c_jfT9AaLT9",
    src: gcs("AF1QipNWKG7bovcX6eorrf3d-ioatEJQ6c_jfT9AaLT9"),
    alt: "Google Maps photo for Dr. Jan Duffy at 921 South Main Street, Las Vegas, NV 89101",
    category: "ADDITIONAL",
  },
];
