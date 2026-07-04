import Image from "next/image";
import { agentImage, getAgentImageSrc } from "@/lib/site-config";

type AgentPhotoProps = {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  priority?: boolean;
};

const sizeMap = {
  sm: { box: "h-20 w-20", px: 80 },
  md: { box: "h-32 w-32", px: 128 },
  lg: { box: "h-48 w-48", px: 192 },
  xl: { box: "h-64 w-64 md:h-80 md:w-80", px: 320 },
};

export default function AgentPhoto({
  size = "lg",
  className = "",
  priority = false,
}: AgentPhotoProps) {
  const { box, px } = sizeMap[size];

  return (
    <div
      className={`relative ${box} overflow-hidden rounded-full border-4 border-white shadow-lg ring-2 ring-blue-100 ${className}`}
    >
      <Image
        src={getAgentImageSrc()}
        alt={agentImage.alt}
        width={px}
        height={px}
        priority={priority}
        className="h-full w-full object-cover object-top"
        sizes={`${px}px`}
      />
    </div>
  );
}
