import DeferredRealScoutWidget from "@/components/realscout/DeferredRealScoutWidget";

type RealScoutSimpleSearchProps = {
  agentEncodedId: string;
  className?: string;
};

/** Deferred simple-search widget — kept out of the LCP critical path. */
export default function RealScoutSimpleSearch({
  agentEncodedId,
  className = "",
}: RealScoutSimpleSearchProps) {
  const html = `<realscout-simple-search agent-encoded-id="${agentEncodedId}"></realscout-simple-search>`;

  return (
    <DeferredRealScoutWidget
      html={html}
      minHeight="56px"
      className={className}
      rootMargin="100px"
    />
  );
}
