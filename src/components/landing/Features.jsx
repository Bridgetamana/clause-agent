export default function Features() {
  const features = [
    {
      label: "Purpose",
      description:
        "Democratize legal review for freelancers and small teams who can't afford traditional counsel.",
    },
    {
      label: "Security",
      description:
        "Enterprise-grade encryption. Your contracts and playbooks never leave your control.",
    },
    {
      label: "Speed",
      description:
        "Seconds for what lawyers charge thousands. No delays, no back-and-forth.",
    },
  ];

  return (
    <section
      className="pt-12 border-t border-slate-800 animate-fade-in-up"
      style={{ animationDelay: "0.4s" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20">
        {features.map((feature) => (
          <div
            key={feature.label}
            className="space-y-3 hover:translate-y-[-2px] transition-transform duration-300"
          >
            <p className="text-xs uppercase tracking-widest text-slate-500">
              {feature.label}
            </p>
            <p className="text-slate-300 leading-relaxed font-light">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
