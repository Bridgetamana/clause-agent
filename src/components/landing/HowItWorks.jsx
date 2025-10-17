export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Define your rules",
      description: "Set up your company's non-negotiable terms once.",
    },
    {
      number: 2,
      title: "Upload a contract",
      description: "Drop in any PDF. Our AI reads it instantly.",
    },
    {
      number: 3,
      title: "Get a clear analysis",
      description:
        "See what's safe, what's risky, and what needs negotiation. In plain English.",
    },
  ];

  return (
    <section
      className="pt-12 border-t border-border space-y-8 animate-fade-in-up"
      style={{ animationDelay: "0.5s" }}
    >
      <p className="text-xs uppercase tracking-widest text-grey">
        How it works
      </p>
      <div className="space-y-12">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex gap-8 group hover:opacity-100 opacity-90 transition-opacity duration-300"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center text-xs font-light text-grey group-hover:border-grey transition-colors duration-300">
              {step.number}
            </div>
            <div>
              <h3 className="text-lg font-light mb-2">{step.title}</h3>
              <p className="text-grey font-light">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
