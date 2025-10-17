import { useAuth0 } from "@auth0/auth0-react";

export default function Hero() {
  const { loginWithRedirect } = useAuth0();

  return (
    <section className="space-y-10">
      <div
        className="space-y-6 animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        <h2 className="text-5xl md:text-6xl font-light leading-tight tracking-tight">
          Your AI<span className="text-grey"> for contract</span> clarity.
        </h2>
        <p className="text-lg md:text-xl text-grey font-light leading-relaxed max-w-2xl">
          Analyze contracts in seconds. Understand every clause. Negotiate with
          confidence.
        </p>
      </div>

      <div
        className="pt-8 animate-fade-in-up"
        style={{ animationDelay: "0.3s" }}
      >
        <button
          onClick={() => loginWithRedirect()}
          className="px-8 py-3 border border-grey text-foreground hover:border-slate-200 hover:bg-background-alt hover:shadow-lg transition-all duration-300 text-sm font-medium tracking-wide"
        >
          Get started
        </button>
      </div>
    </section>
  );
}
