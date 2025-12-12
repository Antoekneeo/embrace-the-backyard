export default function Contact() {
  return (
    <main className="min-h-[60vh] bg-sand text-dark px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold text-primary [font-family:var(--font-heading)]">Contact</h1>
        <p className="mb-8 text-dark/80">
          We’d love to hear about your backyard. Get in touch and we’ll respond as soon as we can.
        </p>

        <section className="rounded-lg border border-dark/10 bg-white/70 p-6">
          <h2 className="mb-3 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Get in touch</h2>
          <ul className="space-y-3 text-dark/90">
            <li>
              <span className="block text-sm text-dark/60">Email</span>
              <a className="text-primary underline" href="mailto:embracethebackyard@gmail.com">
                embracethebackyard@gmail.com
              </a>
            </li>
            <li>
              <span className="block text-sm text-dark/60">Service area</span>
              Greater suburban areas in Australia (by appointment).
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">What to include</h2>
          <ul className="list-disc space-y-2 pl-5 text-dark/80">
            <li>Your suburb and any site constraints (access, slopes, existing structures).</li>
            <li>What you’d like to achieve (e.g., family space, native garden, entertaining area).</li>
            <li>Any inspiration images or notes on materials and style.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

