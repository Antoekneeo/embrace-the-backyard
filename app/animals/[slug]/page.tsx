import Image from "next/image";
import Link from "next/link";

const animals = {
  "blue-tongue-lizard": {
    name: "Blue-tongue Lizard",
    desc:
      "Slow-moving garden ally that eats snails; often shelters under shrubs. Harmless if left alone.",
    whatToDo: [
      "Leave it be; provide hiding spots with mulch and low shrubs.",
      "Keep dogs supervised; give the lizard space to move away.",
      "Avoid snail pellets; choose wildlife-safe alternatives.",
    ],
    thumb: "/animals/blue-tongue-lizard.svg",
  },
  "ringtail-possum": {
    name: "Ringtail Possum",
    desc:
      "Nocturnal tree-dweller building dreys in dense foliage. May travel along fences and powerlines.",
    whatToDo: [
      "If a joey is alone on the ground, call wildlife rescue; keep cats indoors at night.",
      "Plant native shrubs and climbers to provide habitat and corridors.",
      "Avoid pruning nests (dreys) during breeding season.",
    ],
    thumb: `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'>
        <rect width='100%' height='100%' fill='#C2A773'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='28' fill='#1F2421'>Ringtail Possum</text>
      </svg>`
    )}`,
  },
  lorikeet: {
    name: "Lorikeet",
    desc:
      "Colourful nectar-feeder attracted to native flowering plants like grevilleas and bottlebrush.",
    whatToDo: [
      "Plant nectar-rich natives; avoid offering bread or processed food.",
      "If feeding, use proper lorikeet nectar occasionally; clean feeders daily.",
      "Provide bird-safe water sources and sheltering trees.",
    ],
    thumb: `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'>
        <rect width='100%' height='100%' fill='#EFE7DA'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='28' fill='#1F2421'>Lorikeet</text>
      </svg>`
    )}`,
  },
  "huntsman-spider": {
    name: "Huntsman Spider",
    desc:
      "Large but generally non-aggressive; helps control household and garden insects.",
    whatToDo: [
      "If indoors, gently relocate using container and card; avoid pesticides.",
      "Seal large gaps around doors/windows; keep outdoor lights low to reduce insect influx.",
      "Appreciate their role as natural pest controllers.",
    ],
    thumb: `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'>
        <rect width='100%' height='100%' fill='#3A5A40'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='28' fill='#EFE7DA'>Huntsman Spider</text>
      </svg>`
    )}`,
  },
} as const;

export default async function AnimalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: raw } = await params;
  const slug = decodeURIComponent(raw || "").toLowerCase();
  // Debug log: will appear in server console during dev
  console.log("[animals/[slug]] params:", { slug, keys: Object.keys(animals) });
  const data = (animals as Record<string, (typeof animals)[keyof typeof animals]>)[slug];
  const isDetailed = [
    "blue-tongue-lizard",
    "ringtail-possum",
    "lorikeet",
    "huntsman-spider",
    "australian-magpie",
    "magpie",
    "snakes",
  ].includes(slug);
  if (!data && !isDetailed) {
    return (
      <main className="min-h-[60vh] bg-sand text-dark px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold text-primary [font-family:var(--font-heading)]">Animal not found</h1>
          <p className="text-dark/80">Return to the home page to browse common backyard animals.</p>
          <p className="mt-6"><Link href="/" className="text-primary underline">Back to Home</Link></p>
        </div>
      </main>
    );
  }

  // Detailed page for Snakes
  if (slug === "snakes") {
    return (
      <main className="min-h-[60vh] bg-sand text-dark px-6 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-6">
              <Link href="/" className="text-primary hover:opacity-80">← Back</Link>
            </div>

            <header className="mb-6">
              <h1 className="mb-2 text-4xl font-bold text-primary [font-family:var(--font-heading)]">Snakes</h1>
              <p className="text-dark/80">
                Snakes are an important part of Australian ecosystems and may occasionally be encountered in suburban backyards,
                bushland edges, and garden spaces. While many species are non-venomous, some are venomous and require cautious
                behaviour when nearby. Snakes help maintain ecological balance by controlling rodents, insects, and other small
                animals. Most species avoid confrontation and will retreat when given space, making safe coexistence possible when
                appropriate precautions are taken.
              </p>
            </header>

            <div className="relative h-64 w-full sm:h-80 md:h-96 lg:h-[32rem] mb-8">
              <Image
                src="/animals/snakes-hero.jpg"
                alt="Australian Snake"
                fill
                className="object-cover"
                priority
              />
            </div>

            <section id="identification" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Identification</h2>
                <p className="text-dark/80">
                  Because snake appearance varies widely by species, identification should be done with caution.
                </p>
                <p className="mt-3 text-dark/80">Common traits observed in backyard encounters include:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-dark/90">
                  <li>Long, cylindrical body covered in smooth scales</li>
                  <li>Movement through coordinated muscular contractions without limbs</li>
                  <li>Colours ranging from brown, grey, and black to patterned bands or speckling</li>
                  <li>Triangular or oval-shaped head depending on species</li>
                  <li>Behaviour usually focused on seeking warmth, shelter, or prey</li>
                </ul>
                <div className="mt-3 rounded-md bg-sand/60 p-3 text-sm text-dark/90">
                  <strong>Important note:</strong> Accurate species identification can be difficult, and misidentification may lead to
                  unsafe assumptions. If unsure, always treat a snake as potentially venomous and keep distance.
                </div>
              </div>
            </section>

            <section id="habitat" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Habitat</h2>
                <p className="text-dark/80">Snakes may occupy:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-dark/90">
                  <li>Garden beds with thick vegetation</li>
                  <li>Under rocks, timber piles, or sheets of metal</li>
                  <li>Roof cavities and shaded outdoor structures</li>
                  <li>Edges of creeks, drains, and bushland near residential areas</li>
                  <li>Warm surfaces such as paths, patios, or driveways during cooler afternoons</li>
                </ul>
                <p className="mt-3 text-dark/80">
                  Backyards with abundant rodent or frog populations may attract snakes seeking reliable food sources.
                </p>
              </div>
            </section>

            <section id="behaviour" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Behaviour</h2>
                <p className="text-dark/80">
                  Snakes are generally shy and avoid human contact. They do not attack unless provoked, cornered, or accidentally
                  stepped on. Their behaviour varies with temperature:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-dark/90">
                  <li><strong>Warm weather:</strong> Increased movement while hunting or searching for mates</li>
                  <li><strong>Cool weather:</strong> Reduced activity, often seeking sheltered resting spots</li>
                  <li><strong>Breeding season:</strong> Males may be more mobile while searching for females</li>
                </ul>
                <p className="mt-3 text-dark/80">
                  Most snakes rely on camouflage and stillness to avoid detection rather than aggression.
                </p>
              </div>
            </section>

            <section id="what-to-do" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">What To Do if You See One</h2>
                <h3 className="mt-3 text-lg font-semibold text-primary">If the snake is healthy and moving naturally:</h3>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Keep a safe distance (at least several metres).</li>
                  <li>Ensure children and pets remain indoors or away from the area.</li>
                  <li>Allow the snake to pass through the yard without interference.</li>
                </ul>

                <h3 className="mt-4 text-lg font-semibold text-primary">If the snake is in a high-risk location (e.g., inside a home, near a doorway):</h3>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Avoid attempting to move the snake yourself.</li>
                  <li>Contact a licensed snake catcher for safe relocation.</li>
                  <li>Keep the snake in sight from a distance until help arrives.</li>
                </ul>

                <h3 className="mt-4 text-lg font-semibold text-primary">If a pet has interacted with a snake:</h3>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Seek immediate veterinary attention.</li>
                  <li>Do not attempt to identify or capture the snake.</li>
                </ul>

                <div className="mt-4 rounded-md bg-sand/60 p-3 text-sm text-dark/90">
                  <strong>Do not attempt to:</strong> Pick up, corner, or scare the snake. Do not kill the snake—this is dangerous and
                  illegal in many areas.
                </div>
              </div>
            </section>

            <section id="benefits" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Benefits to Your Backyard</h2>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Controlling rodent populations naturally</li>
                  <li>Reducing pest numbers such as rats and mice</li>
                  <li>Supporting biodiversity within local ecosystems</li>
                  <li>Maintaining balance in food chains affecting both urban and natural habitats</li>
                </ul>
                <p className="mt-3 text-dark/80">
                  Their presence often indicates healthy ground cover and a functioning backyard ecosystem.
                </p>
              </div>
            </section>

            <section id="coexistence" className="mb-2 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Coexistence Tips</h2>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Keep grass trimmed and remove excess vegetation</li>
                  <li>Store firewood, garden pots, and building materials off the ground</li>
                  <li>Reduce food sources for rodents to avoid attracting snakes</li>
                  <li>Install snake-proof mesh on gaps under sheds or decks</li>
                  <li>Supervise pets when outdoors, especially near bushland edges</li>
                  <li>Seal small openings around the base of the house</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar TOC */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-24 space-y-2 rounded-lg border border-dark/10 bg-white/70 p-4 text-sm">
              <div className="mb-2 font-semibold text-primary [font-family:var(--font-heading)]">On this page</div>
              <a className="block text-dark/80 hover:text-primary" href="#identification">Identification</a>
              <a className="block text-dark/80 hover:text-primary" href="#habitat">Habitat</a>
              <a className="block text-dark/80 hover:text-primary" href="#behaviour">Behaviour</a>
              <a className="block text-dark/80 hover:text-primary" href="#what-to-do">What To Do</a>
              <a className="block text-dark/80 hover:text-primary" href="#benefits">Benefits</a>
              <a className="block text-dark/80 hover:text-primary" href="#coexistence">Coexistence</a>
            </div>
          </aside>
        </div>
      </main>
    );
  }

  // Detailed page for Australian Magpie
  if (slug === "australian-magpie" || slug === "magpie") {
    return (
      <main className="min-h-[60vh] bg-sand text-dark px-6 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-6">
              <Link href="/" className="text-primary hover:opacity-80">← Back</Link>
            </div>

            <header className="mb-6">
              <h1 className="mb-2 text-4xl font-bold text-primary [font-family:var(--font-heading)]">Australian Magpie</h1>
              <p className="text-dark/80">
                The Australian magpie is a highly recognisable and intelligent bird commonly found in suburban, rural, and urban
                environments across Australia. Known for its black-and-white plumage and rich, melodic warbling, the magpie is both
                admired and misunderstood. While generally calm and social, magpies may protect nesting territories during breeding
                season. Despite this seasonal behaviour, they play an important role in residential ecosystems through insect
                control, seed dispersal, and complex social dynamics that contribute to local biodiversity.
              </p>
            </header>

            <div className="relative h-64 w-full sm:h-80 md:h-96 lg:h-[32rem] mb-8">
              <Image
                src="/animals/australian-magpie-hero.jpg"
                alt="Australian Magpie"
                fill
                className="object-cover"
                priority
              />
            </div>

            <section id="identification" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Identification</h2>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Distinct black-and-white plumage, with patterns varying between regions</li>
                  <li>Robust body and strong legs adapted for foraging on the ground</li>
                  <li>Sharp, slightly hooked beak suited to catching insects and small animals</li>
                  <li>Complex vocalisations, including warbles, carols, and mimicry</li>
                  <li>Average length: 37–43 cm</li>
                  <li>Confident posture and purposeful walking gait</li>
                </ul>
                <p className="mt-3 text-dark/80">
                  Juvenile magpies can be identified by their mottled grey and brown colouring, which gradually transitions to adult
                  plumage.
                </p>
              </div>
            </section>

            <section id="habitat" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Habitat</h2>
                <p className="text-dark/80">Magpies thrive in locations such as:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-dark/90">
                  <li>Suburban yards and open lawns</li>
                  <li>Parks and gardens</li>
                  <li>School grounds and sporting fields</li>
                  <li>Farmland and lightly wooded areas</li>
                  <li>Street trees and residential neighbourhoods</li>
                </ul>
                <p className="mt-3 text-dark/80">
                  They prefer open spaces for foraging paired with tall trees for nesting and roosting.
                </p>
              </div>
            </section>

            <section id="behaviour" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Behaviour</h2>
                <p className="text-dark/80">
                  Magpies are diurnal and highly social, often living in stable family groups. They feed mainly on insects, larvae,
                  small reptiles, and occasionally seeds or fruits. Their intelligence is well established, with individuals
                  recognising human faces and forming long-term associations with their local environment. During breeding season
                  (typically August to October), some magpies may swoop to protect eggs or young. This behaviour is restricted to a
                  small number of individuals and usually lasts only a few weeks. Outside this period, magpies are calm, curious,
                  and tolerant of nearby humans.
                </p>
              </div>
            </section>

            <section id="what-to-do" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">What To Do if You See One</h2>
                <h3 className="mt-3 text-lg font-semibold text-primary">If the magpie is healthy:</h3>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Observe from a respectful distance.</li>
                  <li>Avoid sudden movements during breeding season.</li>
                  <li>Allow the bird access to lawns or gardens where it may forage naturally.</li>
                </ul>

                <h3 className="mt-4 text-lg font-semibold text-primary">If a swooping magpie is present:</h3>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Take a different route temporarily if possible.</li>
                  <li>Wear a hat and sunglasses to protect your face.</li>
                  <li>Do not run, shout, or throw objects, as this may escalate the behaviour.</li>
                  <li>Dismount bicycles; walking reduces perceived threat.</li>
                </ul>

                <h3 className="mt-4 text-lg font-semibold text-primary">If a juvenile is on the ground:</h3>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Young magpies often spend time learning to fly under adult supervision.</li>
                  <li>Avoid interfering unless the bird is injured.</li>
                  <li>Keep pets away until the young bird has moved on.</li>
                </ul>
              </div>
            </section>

            <section id="benefits" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Benefits to Your Backyard</h2>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Controlling insects, beetles, grubs, and small pest species</li>
                  <li>Reducing lawn pests through natural foraging</li>
                  <li>Supporting seed dispersal and plant diversity</li>
                  <li>Adding social and acoustic richness to the local environment</li>
                </ul>
                <p className="mt-3 text-dark/80">
                  Their presence indicates a stable habitat with access to food, water, and nesting trees.
                </p>
              </div>
            </section>

            <section id="coexistence" className="mb-2 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Coexistence Tips</h2>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Provide fresh water in bird baths, especially during warm weather</li>
                  <li>Avoid feeding mince or bread, which can cause nutritional issues</li>
                  <li>Plant native shrubs and trees to offer natural food sources</li>
                  <li>Respect nesting territories during breeding season by adjusting walking routes</li>
                  <li>Encourage children to remain calm and aware around foraging magpies</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar TOC */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-24 space-y-2 rounded-lg border border-dark/10 bg-white/70 p-4 text-sm">
              <div className="mb-2 font-semibold text-primary [font-family:var(--font-heading)]">On this page</div>
              <a className="block text-dark/80 hover:text-primary" href="#identification">Identification</a>
              <a className="block text-dark/80 hover:text-primary" href="#habitat">Habitat</a>
              <a className="block text-dark/80 hover:text-primary" href="#behaviour">Behaviour</a>
              <a className="block text-dark/80 hover:text-primary" href="#what-to-do">What To Do</a>
              <a className="block text-dark/80 hover:text-primary" href="#benefits">Benefits</a>
              <a className="block text-dark/80 hover:text-primary" href="#coexistence">Coexistence</a>
            </div>
          </aside>
        </div>
      </main>
    );
  }

  // Detailed page for Huntsman Spider
  if (slug === "huntsman-spider") {
    return (
      <main className="min-h-[60vh] bg-sand text-dark px-6 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-6">
              <Link href="/" className="text-primary hover:opacity-80">← Back</Link>
            </div>

            <header className="mb-6">
              <h1 className="mb-2 text-4xl font-bold text-primary [font-family:var(--font-heading)]">Huntsman Spider</h1>
              <p className="text-dark/80">
                The huntsman spider is one of the most commonly encountered arachnids in Australian homes and backyards. Known for
                its large size, flattened body, and rapid movements, the huntsman often appears intimidating but is generally
                harmless to humans. This species plays a valuable role in controlling insect populations, making it an important
                part of residential ecosystems. Despite their reputation, huntsmans are non-aggressive, preferring to escape rather
                than confront when disturbed.
              </p>
            </header>

            <div className="relative h-64 w-full sm:h-80 md:h-96 lg:h-[32rem] mb-8">
              <Image
                src="/animals/huntsman-spider-hero.jpg"
                alt="Huntsman Spider"
                fill
                className="object-cover"
                priority
              />
            </div>

            <section id="identification" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Identification</h2>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Large, flat body shape adapted for fitting behind bark, furniture, and crevices</li>
                  <li>Leg span typically up to 15 cm, with long, outward-facing legs</li>
                  <li>Body colours ranging from pale brown to dark grey, often mottled</li>
                  <li>Fast, sideways movement characteristic of the species</li>
                  <li>Distinctively low, wide stance compared to other common spiders</li>
                </ul>
                <p className="mt-3 text-dark/80">
                  These traits distinguish huntsmans from funnel-webs, wolf spiders, and other backyard species.
                </p>
              </div>
            </section>

            <section id="habitat" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Habitat</h2>
                <p className="text-dark/80">Huntsman spiders are commonly found in:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-dark/90">
                  <li>Under loose tree bark</li>
                  <li>Garden sheds, outdoor furniture, and garages</li>
                  <li>Inside homes, often entering during warm weather</li>
                  <li>Behind picture frames, curtains, or wall gaps</li>
                  <li>Cars, seeking shelter from heat or rain</li>
                </ul>
                <p className="mt-3 text-dark/80">
                  Their tendency to appear indoors is usually accidental, as they seek stable shelter or follow prey.
                </p>
              </div>
            </section>

            <section id="behaviour" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Behaviour</h2>
                <p className="text-dark/80">
                  Huntsmans are nocturnal predators that feed on insects, including cockroaches, moths, and other spiders. They rely
                  on speed rather than webs to capture prey. Although their size can be alarming, they avoid confrontation and rarely
                  bite. When threatened, they typically flee quickly or remain motionless against a surface. Females may guard their
                  egg sacs and can become defensive during this period, but still pose minimal risk when left undisturbed.
                </p>
              </div>
            </section>

            <section id="what-to-do" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">What To Do if You See One</h2>
                <h3 className="mt-3 text-lg font-semibold text-primary">If the spider is healthy and stationary:</h3>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Leave it undisturbed, as it will likely move on within hours.</li>
                  <li>Maintain distance to avoid startling it, as sudden movement can cause rapid retreats.</li>
                </ul>

                <h3 className="mt-4 text-lg font-semibold text-primary">If the spider is inside the house and needs relocating:</h3>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Use a container-and-card method to gently capture it.</li>
                  <li>Release it into a sheltered area outdoors, such as near plants or mulch.</li>
                  <li>Avoid using insecticides, as huntsmans help manage pests naturally.</li>
                </ul>

                <h3 className="mt-4 text-lg font-semibold text-primary">If the spider is in a car:</h3>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Safely pull over when possible.</li>
                  <li>Guide it out using a piece of cardboard or gently encourage it onto a surface that can be carried outside.</li>
                </ul>
              </div>
            </section>

            <section id="benefits" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Benefits to Your Backyard</h2>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Controlling insect populations, including cockroaches and household pests</li>
                  <li>Reducing the need for chemical pest control</li>
                  <li>Supporting natural balance within residential environments</li>
                </ul>
                <p className="mt-3 text-dark/80">
                  Their presence typically indicates a healthy backyard habitat with abundant insect life.
                </p>
              </div>
            </section>

            <section id="coexistence" className="mb-2 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Coexistence Tips</h2>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Seal gaps around windows and doors to reduce accidental indoor entry</li>
                  <li>Shake out outdoor equipment, clothing, and towels before use</li>
                  <li>Avoid disturbing areas where huntsmans commonly shelter, such as stacked wood or garden tools</li>
                  <li>Relocate spiders humanely rather than eliminating them</li>
                  <li>Encourage a balanced garden ecosystem to support natural predator-prey relationships</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar TOC */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-24 space-y-2 rounded-lg border border-dark/10 bg-white/70 p-4 text-sm">
              <div className="mb-2 font-semibold text-primary [font-family:var(--font-heading)]">On this page</div>
              <a className="block text-dark/80 hover:text-primary" href="#identification">Identification</a>
              <a className="block text-dark/80 hover:text-primary" href="#habitat">Habitat</a>
              <a className="block text-dark/80 hover:text-primary" href="#behaviour">Behaviour</a>
              <a className="block text-dark/80 hover:text-primary" href="#what-to-do">What To Do</a>
              <a className="block text-dark/80 hover:text-primary" href="#benefits">Benefits</a>
              <a className="block text-dark/80 hover:text-primary" href="#coexistence">Coexistence</a>
            </div>
          </aside>
        </div>
      </main>
    );
  }

  // Detailed page for Lorikeet
  if (slug === "lorikeet") {
    return (
      <main className="min-h-[60vh] bg-sand text-dark px-6 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-6">
              <Link href="/" className="text-primary hover:opacity-80">← Back</Link>
            </div>

            <header className="mb-6">
              <h1 className="mb-2 text-4xl font-bold text-primary [font-family:var(--font-heading)]">Lorikeets</h1>
              <p className="text-dark/80">
                Lorikeets are brightly coloured, highly active birds commonly seen in suburban gardens and streetscapes across
                Australia. Their distinctive plumage and energetic behaviour make them one of the most recognisable species in
                residential areas. Lorikeets play an essential ecological role as pollinators, contributing to the health and
                reproduction of native plants. Their adaptability, social nature, and frequent presence around flowering trees make
                them a familiar part of everyday backyard wildlife.
              </p>
            </header>

            <div className="relative h-64 w-full sm:h-80 md:h-96 lg:h-[32rem] mb-8">
              <Image
                src="/animals/lorikeet-hero.jpg"
                alt="Rainbow Lorikeet"
                fill
                className="object-cover"
                priority
              />
            </div>

            <section id="identification" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Identification</h2>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Bright, multicoloured plumage—typically green wings, blue head, orange breast, and yellow highlights</li>
                  <li>A curved orange beak suited to nectar feeding</li>
                  <li>Brush-tipped tongue used for collecting nectar and pollen</li>
                  <li>Agile, rapid flight and high-pitched chattering calls</li>
                  <li>Average length: 25–30 cm</li>
                </ul>
                <p className="mt-3 text-dark/80">
                  The Rainbow Lorikeet is the most commonly encountered species, but Scaly-breasted Lorikeets may also be present,
                  identified by their green body and yellow scalloping on the chest.
                </p>
              </div>
            </section>

            <section id="habitat" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Habitat</h2>
                <p className="text-dark/80">Lorikeets thrive in:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-dark/90">
                  <li>Suburban gardens with flowering natives (bottlebrush, grevillea, eucalypts)</li>
                  <li>Parks and urban reserves</li>
                  <li>Street trees and public green spaces</li>
                  <li>Forest edges and woodlands with abundant nectar sources</li>
                </ul>
                <p className="mt-3 text-dark/80">
                  Their adaptability allows them to utilise a wide range of residential environments, especially where nectar-rich
                  plants are available.
                </p>
              </div>
            </section>

            <section id="behaviour" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Behaviour</h2>
                <p className="text-dark/80">
                  Lorikeets are diurnal, social, and highly vocal. They travel in pairs or flocks, often feeding communally in
                  trees. Their diet consists primarily of nectar, pollen, and soft fruits. Due to their brush-like tongues, they are
                  well adapted to extracting nectar from deep flowers. At dusk, large flocks gather at communal roosting sites,
                  creating loud and energetic displays. During breeding season, pairs nest in tree hollows and show strong site
                  fidelity, often returning to the same hollow each year.
                </p>
              </div>
            </section>

            <section id="what-to-do" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">What To Do if You See One</h2>
                <h3 className="mt-3 text-lg font-semibold text-primary">If the lorikeet is healthy:</h3>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Observe from a distance and avoid approaching too closely.</li>
                  <li>Ensure pets are kept away from feeding trees.</li>
                  <li>Avoid offering processed foods such as bread, oats, or sugary mixes.</li>
                </ul>

                <h3 className="mt-4 text-lg font-semibold text-primary">If the bird appears unwell or unable to fly:</h3>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Sick lorikeets often show symptoms such as fluffing up, difficulty perching, or discharge around the beak.</li>
                  <li>Contact a wildlife rescue organisation for advice.</li>
                  <li>Contain the bird only if safe to do so, using a ventilated box with a towel on the base.</li>
                </ul>

                <h3 className="mt-4 text-lg font-semibold text-primary">If the bird is a fledgling on the ground:</h3>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Monitor from a distance, as parents often continue feeding young on the ground.</li>
                  <li>Keep pets and people away to reduce stress.</li>
                </ul>
              </div>
            </section>

            <section id="benefits" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Benefits to Your Backyard</h2>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Pollinating native flowering plants</li>
                  <li>Supporting plant regeneration and seed production</li>
                  <li>Encouraging biodiversity through their feeding activity</li>
                </ul>
                <p className="mt-3 text-dark/80">
                  Their presence often indicates a well-vegetated environment with strong nectar resources.
                </p>
              </div>
            </section>

            <section id="coexistence" className="mb-2 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Coexistence Tips</h2>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>To create a lorikeet-friendly backyard:</li>
                  <li>Plant native flowering trees and shrubs, especially grevilleas and bottlebrushes</li>
                  <li>Avoid artificial nectar feeders, which can spread disease if not maintained properly</li>
                  <li>Provide fresh water in shallow bird baths</li>
                  <li>Maintain tree hollows or install nest boxes where appropriate</li>
                  <li>Keep pruning light during spring and summer to avoid disturbing active nests</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar TOC */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-24 space-y-2 rounded-lg border border-dark/10 bg-white/70 p-4 text-sm">
              <div className="mb-2 font-semibold text-primary [font-family:var(--font-heading)]">On this page</div>
              <a className="block text-dark/80 hover:text-primary" href="#identification">Identification</a>
              <a className="block text-dark/80 hover:text-primary" href="#habitat">Habitat</a>
              <a className="block text-dark/80 hover:text-primary" href="#behaviour">Behaviour</a>
              <a className="block text-dark/80 hover:text-primary" href="#what-to-do">What To Do</a>
              <a className="block text-dark/80 hover:text-primary" href="#benefits">Benefits</a>
              <a className="block text-dark/80 hover:text-primary" href="#coexistence">Coexistence</a>
            </div>
          </aside>
        </div>
      </main>
    );
  }

  // Detailed page for Ringtail Possum
  if (slug === "ringtail-possum") {
    return (
      <main className="min-h-[60vh] bg-sand text-dark px-6 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-6">
              <Link href="/" className="text-primary hover:opacity-80">← Back</Link>
            </div>

            <header className="mb-6">
              <h1 className="mb-2 text-4xl font-bold text-primary [font-family:var(--font-heading)]">Ringtail Possum</h1>
              <p className="text-dark/80">
                The ringtail possum is a common nocturnal mammal frequently found in suburban and urban areas across Australia.
                Recognised for its curled, prehensile tail and gentle climbing behaviour, this species is well adapted to living
                alongside residential environments. Ringtail possums play an important ecological role by assisting with plant
                growth through selective feeding and seed dispersal. Their presence often indicates healthy vegetation and
                suitable nesting opportunities within the area.
              </p>
            </header>

            <div className="relative h-64 w-full sm:h-80 md:h-96 lg:h-[32rem] mb-8">
              <Image
                src="/animals/ringtail-possum-hero.jpg"
                alt="Ringtail Possum"
                fill
                className="object-cover"
                priority
              />
            </div>

            <section id="identification" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Identification</h2>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>A slender, grey-brown body with a pale underbelly</li>
                  <li>A long prehensile tail with a distinctive white tip</li>
                  <li>Large, rounded ears and bright, forward-facing eyes</li>
                  <li>Average length: 30–35 cm (body) with an additional 30–35 cm tail</li>
                  <li>Agile climbing movement and soft, high-pitched vocalisations</li>
                </ul>
                <p className="mt-3 text-dark/80">
                  These characteristics make ringtail possums easy to distinguish from brushtail possums, which are larger and
                  have a bushier tail.
                </p>
              </div>
            </section>

            <section id="habitat" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Habitat</h2>
                <p className="text-dark/80">Ringtails commonly occupy:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-dark/90">
                  <li>Dense shrubs and garden vegetation</li>
                  <li>Roof cavities and sheltered outdoor spaces</li>
                  <li>Purpose-built nest boxes</li>
                  <li>Native trees such as eucalypts and bottlebrushes</li>
                </ul>
                <p className="mt-3 text-dark/80">
                  They construct “dreys”, which are round, leafy nests typically built in shrubs or trees and used for shelter and
                  raising young.
                </p>
              </div>
            </section>

            <section id="behaviour" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Behaviour</h2>
                <p className="text-dark/80">
                  Ringtail possums are nocturnal, emerging at night to feed, climb, and move between trees. Their diet includes
                  leaves, flowers, fruits, and garden vegetation. They are social animals and often live in small family groups,
                  sharing dreys and caring cooperatively for young. Although naturally shy, they can adapt well to residential
                  environments when food sources and shelter are available.
                </p>
              </div>
            </section>

            <section id="what-to-do" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">What To Do if You See One</h2>
                <h3 className="mt-3 text-lg font-semibold text-primary">If the possum is healthy:</h3>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Allow it to move through the garden undisturbed.</li>
                  <li>Avoid shining lights directly at the animal, as it may cause stress.</li>
                  <li>Ensure pets are kept indoors during the night to prevent confrontation.</li>
                </ul>

                <h3 className="mt-4 text-lg font-semibold text-primary">If the possum is on the ground during the day:</h3>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>This may indicate injury or illness, as ringtails rarely come to ground in daylight.</li>
                  <li>Contact a wildlife rescue organisation immediately for guidance.</li>
                </ul>

                <h3 className="mt-4 text-lg font-semibold text-primary">If a baby possum is found alone:</h3>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Do not attempt to feed it.</li>
                  <li>Place it in a secure, ventilated box with a towel and keep it warm.</li>
                  <li>Seek assistance from local wildlife carers as soon as possible.</li>
                </ul>
              </div>
            </section>

            <section id="benefits" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Benefits to Your Backyard</h2>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Pollinating native plants through feeding behaviour</li>
                  <li>Dispersing seeds across the garden</li>
                  <li>Enhancing vegetation growth and overall ecosystem health</li>
                </ul>
                <p className="mt-3 text-dark/80">
                  Their presence also indicates strong backyard habitat quality, supported by food availability and safe nesting spaces.
                </p>
              </div>
            </section>

            <section id="coexistence" className="mb-2 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Coexistence Tips</h2>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Avoid removing dense vegetation that may contain dreys</li>
                  <li>Install nest boxes to provide safe alternatives to roof spaces</li>
                  <li>Keep pets indoors at night to reduce accidental injuries</li>
                  <li>Limit use of chemical sprays on gardens</li>
                  <li>Check trees carefully before pruning to avoid destroying active nests</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar TOC */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-24 space-y-2 rounded-lg border border-dark/10 bg-white/70 p-4 text-sm">
              <div className="mb-2 font-semibold text-primary [font-family:var(--font-heading)]">On this page</div>
              <a className="block text-dark/80 hover:text-primary" href="#identification">Identification</a>
              <a className="block text-dark/80 hover:text-primary" href="#habitat">Habitat</a>
              <a className="block text-dark/80 hover:text-primary" href="#behaviour">Behaviour</a>
              <a className="block text-dark/80 hover:text-primary" href="#what-to-do">What To Do</a>
              <a className="block text-dark/80 hover:text-primary" href="#benefits">Benefits</a>
              <a className="block text-dark/80 hover:text-primary" href="#coexistence">Coexistence</a>
            </div>
          </aside>
        </div>
      </main>
    );
  }

  // Detailed page for Blue-tongued Lizard
  if (slug === "blue-tongue-lizard") {
    return (
      <main className="min-h-[60vh] bg-sand text-dark px-6 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-6">
              <Link href="/" className="text-primary hover:opacity-80">← Back</Link>
            </div>

            <header className="mb-6">
              <h1 className="mb-2 text-4xl font-bold text-primary [font-family:var(--font-heading)]">Blue-tongued Lizard</h1>
              <p className="text-dark/80">
                The blue-tongued lizard is one of the most commonly encountered reptiles in suburban backyards across
                Australia. Known for its distinctive blue tongue and calm behaviour, this species plays an important role
                in residential ecosystems. Blue-tongues are generally slow-moving, non-aggressive, and highly beneficial,
                helping to manage pest populations such as snails, insects, and slugs.
              </p>
            </header>

            <div className="relative h-64 w-full sm:h-80 md:h-96 lg:h-[32rem] mb-8">
              <Image
                src="/animals/blue-tongue-lizard-hero.jpg"
                alt="Blue-tongue Lizard"
                fill
                className="object-cover"
                priority
              />
            </div>

            <section id="identification" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Identification</h2>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Broad, flat body with smooth, overlapping scales</li>
                  <li>Distinctive blue tongue displayed when threatened</li>
                  <li>Colouring ranges from grey to brown with banded patterns</li>
                  <li>Short legs and a rounded tail</li>
                  <li>Typical length: 40–60 cm</li>
                </ul>
                <p className="mt-3 text-dark/80">
                  These traits make the blue-tongued lizard easy to distinguish from snakes and other reptiles commonly
                  found in suburban areas.
                </p>
              </div>
            </section>

            <section id="habitat" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Habitat</h2>
                <p className="text-dark/80">Blue-tongues are frequently found in:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-dark/90">
                  <li>Garden beds</li>
                  <li>Leaf litter</li>
                  <li>Under decks and outdoor structures</li>
                  <li>Warm, sheltered spaces such as compost piles or wood stacks</li>
                </ul>
                <p className="mt-3 text-dark/80">
                  They prefer areas with ground-level cover and readily available food sources, which makes backyards an
                  ideal environment.
                </p>
              </div>
            </section>

            <section id="behaviour" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Behaviour</h2>
                <p className="text-dark/80">
                  Blue-tongues are solitary and diurnal, meaning they are most active during the day. When threatened, they
                  may hiss and display their blue tongue, but they rarely bite and prefer to retreat. During cooler months,
                  they may enter a state of reduced activity (brumation), often sheltering in protected spots around the yard.
                </p>
              </div>
            </section>

            <section id="what-to-do" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">What To Do if You See One</h2>
                <h3 className="mt-3 text-lg font-semibold text-primary">If the lizard is healthy:</h3>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Observe from a distance.</li>
                  <li>Allow it to continue moving through the yard undisturbed.</li>
                  <li>Keep pets away to prevent stress or injury.</li>
                </ul>

                <h3 className="mt-4 text-lg font-semibold text-primary">If the lizard is injured:</h3>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Avoid handling unless necessary.</li>
                  <li>Contact a local wildlife rescue organisation for assistance.</li>
                  <li>
                    If relocation is required for safety (e.g., stuck in a pool area), use a towel and gloves to gently lift
                    and place it in a shaded area nearby.
                  </li>
                </ul>

                <h3 className="mt-4 text-lg font-semibold text-primary">If it enters the home:</h3>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Stay calm.</li>
                  <li>
                    Open an exterior door and gently guide it out using a broom or piece of cardboard—avoid touching the
                    lizard directly.
                  </li>
                </ul>
              </div>
            </section>

            <section id="benefits" className="mb-8 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Benefits to Your Backyard</h2>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Controlling pests such as snails, slugs, beetles, and spiders</li>
                  <li>Reducing reliance on chemical pesticides</li>
                  <li>Supporting natural biodiversity in suburban areas</li>
                </ul>
                <p className="mt-3 text-dark/80">
                  Their presence is a strong indicator of a balanced, wildlife-friendly backyard.
                </p>
              </div>
            </section>

            <section id="coexistence" className="mb-2 scroll-mt-24">
              <div className="rounded-lg border border-dark/10 border-l-4 border-l-primary bg-white/70 p-5">
                <h2 className="mb-2 text-2xl font-semibold text-primary [font-family:var(--font-heading)]">Coexistence Tips</h2>
                <ul className="list-disc space-y-1 pl-5 text-dark/90">
                  <li>Avoid using snail baits and toxic pesticides</li>
                  <li>Keep dogs monitored outdoors, as they may harm lizards</li>
                  <li>Provide ground-level shelter with rocks, logs, or dense plants</li>
                  <li>Ensure gaps under fences are small to reduce road-related risks</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar TOC */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-24 space-y-2 rounded-lg border border-dark/10 bg-white/70 p-4 text-sm">
              <div className="mb-2 font-semibold text-primary [font-family:var(--font-heading)]">On this page</div>
              <a className="block text-dark/80 hover:text-primary" href="#identification">Identification</a>
              <a className="block text-dark/80 hover:text-primary" href="#habitat">Habitat</a>
              <a className="block text-dark/80 hover:text-primary" href="#behaviour">Behaviour</a>
              <a className="block text-dark/80 hover:text-primary" href="#what-to-do">What To Do</a>
              <a className="block text-dark/80 hover:text-primary" href="#benefits">Benefits</a>
              <a className="block text-dark/80 hover:text-primary" href="#coexistence">Coexistence</a>
            </div>
          </aside>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[60vh] bg-sand text-dark px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link href="/" className="text-primary hover:opacity-80">← Back</Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="relative h-56 w-full overflow-hidden rounded-md border border-dark/10 bg-white">
            <Image src={data.thumb} alt={data.name} fill className="object-cover" />
          </div>
          <div>
            <h1 className="mb-2 text-4xl font-bold text-primary [font-family:var(--font-heading)]">{data.name}</h1>
            <p className="mb-4 text-dark/80">{data.desc}</p>
            <h2 className="mb-2 text-xl font-semibold text-primary [font-family:var(--font-heading)]">What to do</h2>
            <ul className="list-disc space-y-2 pl-5 text-dark/90">
              {data.whatToDo.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
