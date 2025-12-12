import Image from "next/image";
import Link from "next/link";

const animals = [
  {
    name: "Blue-tongue Lizard",
    slug: "blue-tongue-lizard",
    desc: "Slow-moving garden ally that eats snails; often shelters under shrubs.",
    thumb: "/animals/blue-tongue-lizard-thumb.jpg",
  },
  {
    name: "Ringtail Possum",
    slug: "ringtail-possum",
    desc: "Nocturnal tree-dweller; builds dreys in dense foliage.",
    thumb: "/animals/ringtail-possum-thumb.jpg",
  },
  {
    name: "Lorikeet",
    slug: "lorikeet",
    desc: "Colourful nectar-feeder; attracted to native flowering plants.",
    thumb: "/animals/lorikeet-thumb.jpg",
  },
  {
    name: "Huntsman Spider",
    slug: "huntsman-spider",
    desc: "Large but non-aggressive; helpful in controlling insects.",
    thumb: "/animals/huntsman-spider-thumb.jpg",
  },
  {
    name: "Australian Magpie",
    slug: "australian-magpie",
    desc: "Intelligent, vocal backyard bird; mostly calm, may defend nests in spring.",
    thumb: "/animals/australian-magpie-thumb.jpg",
  },
  {
    name: "Snakes",
    slug: "snakes",
    desc: "Important predators; give space and contact a catcher if indoors.",
    thumb: "/animals/snakes-thumb.jpg",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-20 sm:grid-cols-2">
          <div>
            <h1 className="mb-4 text-5xl font-bold leading-tight text-primary [font-family:var(--font-heading)] sm:text-6xl">
              Learn how to embrace your backyard
            </h1>
            <p className="mb-8 text-lg text-dark/80">
              Practical guidance on living with local wildlife and creating a thriving outdoor space.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#animals" className="rounded-md bg-primary px-5 py-3 text-sand shadow hover:opacity-90">
                Explore backyard animals
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-dark/10 bg-white/60 p-6 shadow-sm backdrop-blur dark:bg-white/70">
            <p className="text-dark/80">
              From friendly lizards to late-night possums, suburban Australian backyards are rich with life. Discover what to do—and
              what not to do—when you meet them.
            </p>
          </div>
        </div>
      </section>

      {/* Animals grid / carousel */}
      <section id="animals" className="border-t border-primary/20 bg-sand py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-6 text-3xl font-bold text-primary [font-family:var(--font-heading)]">Common backyard animals</h2>
          {/* Mobile: horizontal scroll with snap, Desktop: 3 columns */}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 sm:gap-6 lg:grid lg:grid-cols-3 lg:overflow-visible lg:snap-none">
            {animals.map((a) => (
              <article key={a.slug} className="min-w-[85%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-0 snap-start overflow-hidden rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className="relative w-full h-44 md:h-48">
                  <Image src={a.thumb} alt={a.name} fill className="object-cover" />
                </div>
                <div className="space-y-3 p-4">
                  <h3 className="text-xl font-semibold text-primary [font-family:var(--font-heading)]">{a.name}</h3>
                  <p className="text-sm text-dark/80">{a.desc}</p>
                  <div>
                    <Link href={`/animals/${a.slug}`} className="inline-block rounded-md bg-primary px-4 py-2 text-sand shadow hover:opacity-90">
                      Learn What To Do
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

