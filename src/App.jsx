import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

const nav = [
  ['Overview', '#overview'],
  ['Design', '#design'],
  ['Features', '#features'],
  ['Compare', '#compare'],
  ['Proof', '#proof'],
]

const colors = [
  ['Fresh Mint', '#c9f0cf'],
  ['Sage', '#9fd8ab'],
  ['Fern', '#5fbb74'],
  ['Forest', '#2d5f40'],
]

const stats = [
  ['Pure', 'Light green surfaces with calm breathing room'],
  ['Fresh', 'Slow, expensive motion that stays readable'],
  ['Organic', 'Product-first hierarchy with eco warmth'],
]

const cards = [
  {
    title: 'Clean. Fresh. Calm.',
    copy: 'A centered hero and airy spacing make the product read like a premium eco launch page.',
    span: 'lg:col-span-2 lg:row-span-2',
    tag: 'hero',
  },
  {
    title: 'Liquid motion',
    copy: 'Subtle parallax, soft hover lift, and smooth reveal timing keep the page calm and alive.',
    span: 'lg:col-span-1',
    tag: 'motion',
  },
  {
    title: 'Modular details',
    copy: 'Bento tiles divide the story into clear compartments, so the experience stays easy to scan.',
    span: 'lg:col-span-1',
    tag: 'grid',
  },
  {
    title: 'Product logic',
    copy: 'The layout is still dense enough to sell the product, but it feels clean and deliberate.',
    span: 'lg:col-span-2',
    tag: 'clarity',
  },
]

const featureRows = [
  ['Eco clarity', 'The page speaks in large headline statements, then lets the modules fill in the detail.'],
  ['Soft green surfaces', 'Rounded containers, pale borders, and restrained shadows create a polished botanical feel.'],
  ['Bento storytelling', 'Each section owns a single idea, then displays it inside a distinct tile or panel.'],
  ['Quiet motion', 'Nothing moves too fast. The animations feel like a premium product page, not a demo reel.'],
]

const compareRows = [
  ['Display', '14.2"', '13.6"', 'Retina-like'],
  ['Battery', '18 hrs', '15 hrs', 'All day'],
  ['Performance', 'M5', 'M4', 'AI ready'],
  ['Colors', '4 options', '3 options', 'Eco palette'],
]

const proofRows = [
  'Eco-style pages work because they make the product feel centered, fresh, and easy to understand.',
  'The best bento pages use clear size contrast, not decorative clutter, to guide the eye.',
  'Premium motion is slow enough to trust and fast enough to feel alive.',
]

const tickerWords = [
  'Thin design',
  'Soft motion',
  'Bento layout',
  'Product focus',
  'Quiet surfaces',
  'Clean hierarchy',
]

const ecoImages = {
  greenhouse:
    'https://images.pexels.com/photos/3306796/pexels-photo-3306796.jpeg?cs=srgb&dl=pexels-kimberley-lee-702408-3306796.jpg&fm=jpg',
  leaves:
    'https://images.pexels.com/photos/24374781/pexels-photo-24374781.jpeg?cs=srgb&dl=pexels-mak_-jp-107017486-24374781.jpg&fm=jpg',
  field:
    'https://images.pexels.com/photos/6135325/pexels-photo-6135325.jpeg?cs=srgb&dl=pexels-tomfisk-6135325.jpg&fm=jpg',
}

const storyModes = [
  {
    id: 'leaves',
    label: 'Leaf detail',
    title: 'Textured and close.',
    copy: 'A tight crop with visible veins gives the design real physical detail and a more tactile eco mood.',
    image: ecoImages.leaves,
  },
  {
    id: 'greenhouse',
    label: 'Greenhouse light',
    title: 'Bright and architectural.',
    copy: 'Sunlight through the glass roof makes the page feel open, airy, and grounded in natural structure.',
    image: ecoImages.greenhouse,
  },
  {
    id: 'field',
    label: 'Field layer',
    title: 'Wide and organic.',
    copy: 'A broad field view adds scale and keeps the page from feeling too studio-like or synthetic.',
    image: ecoImages.field,
  },
]

const processSteps = [
  ['Discover', 'The first impression is soft, bright, and naturally framed.'],
  ['Explore', 'Bento modules and motion guide the eye through the story.'],
  ['Compare', 'The content stays useful with simple decision-making panels.'],
  ['Act', 'A clear closing CTA makes the page feel complete and shoppable.'],
]

function usePointerGlow() {
  const x = useMotionValue(50)
  const y = useMotionValue(20)

  useEffect(() => {
    const handler = (event) => {
      x.set((event.clientX / window.innerWidth) * 100)
      y.set((event.clientY / window.innerHeight) * 100)
    }
    window.addEventListener('pointermove', handler)
    return () => window.removeEventListener('pointermove', handler)
  }, [x, y])

  return useMotionTemplate`radial-gradient(circle at ${x}% ${y}%, rgba(105, 201, 107, 0.14), transparent 30%)`
}

function useFloat(ref) {
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useTransform(py, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(px, [-0.5, 0.5], [-8, 8])
  const springX = useSpring(rotateX, { stiffness: 90, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 90, damping: 20 })

  const onMove = (event) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((event.clientX - rect.left) / rect.width - 0.5)
    py.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  return { springX, springY, onMove, onLeave }
}

function App() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scrollBar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const scrollSpring = useSpring(scrollBar, { stiffness: 100, damping: 26 })
  const glow = usePointerGlow()
  const [selectedColor, setSelectedColor] = useState('Fresh Mint')
  const [compareMode, setCompareMode] = useState('MacBook Air')
  const [selectedStory, setSelectedStory] = useState(storyModes[0].id)
  const heroRef = useRef(null)
  const deviceRef = useRef(null)
  const deviceMotion = useFloat(deviceRef)

  const selectedSwatch = useMemo(
    () => colors.find(([name]) => name === selectedColor) ?? colors[0],
    [selectedColor],
  )
  const activeStory = useMemo(
    () => storyModes.find((story) => story.id === selectedStory) ?? storyModes[0],
    [selectedStory],
  )

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#e9f08f] text-[#26341f]">
      <motion.div className="pointer-events-none fixed inset-0 z-0 opacity-100" style={{ backgroundImage: glow }} />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.68),transparent_35%)]" />
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),rgba(233,240,143,0.95))]"
        animate={prefersReducedMotion ? {} : { opacity: [0.7, 1, 0.72] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div className="fixed left-0 top-0 z-40 h-1 bg-gradient-to-r from-[#aecd1f] via-[#cfe64a] to-[#f3f9c7]" style={{ width: scrollSpring }} />

      <header className="sticky top-0 z-30 border-b border-[#99ad3a]/15 bg-[#f4f7bd]/84 backdrop-blur-2xl">
        <div className="mx-auto flex w-full items-center justify-between gap-3 px-3 py-3 sm:px-4 lg:px-6">
          <a href="#overview" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#26341f] text-sm font-semibold text-[#f8fbdc] shadow-sm">
              B
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight text-[#26341f]">Bento Eco</div>
              <div className="text-xs text-[#6d7d4f]">Light lime product launch</div>
            </div>
          </a>

          <a
            href="#compare"
            className="inline-flex h-10 items-center justify-center rounded-full border border-[#99ad3a]/15 bg-[#fcfee9] px-4 text-sm font-medium text-[#26341f] shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Buy
          </a>
        </div>

        <div className="border-t border-[#99ad3a]/15 bg-[#f6f8c6]/78 backdrop-blur-xl">
          <div className="mx-auto flex w-full items-center gap-2 overflow-x-auto px-3 py-2 sm:px-4 lg:px-6">
            {nav.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="inline-flex shrink-0 items-center rounded-full border border-[#99ad3a]/15 bg-[#fcfee9] px-3 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-[#6d7d4f] transition hover:border-[#aecd1f] hover:text-[#26341f]"
              >
                {label}
              </a>
            ))}
            <div className="ml-auto hidden items-center gap-2 rounded-full border border-[#99ad3a]/15 bg-[#fcfee9] px-3 py-2 text-xs uppercase tracking-[0.18em] text-[#8c9f61] md:flex">
              Scroll guided
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section id="overview" ref={heroRef} className="w-full px-3 py-8 sm:px-4 lg:px-6 lg:py-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.06fr_0.94fr]">
            <div>
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#99ad3a]/15 bg-[#fcfee9] px-4 py-2 text-[0.75rem] uppercase tracking-[0.16em] text-[#6d7d4f] shadow-sm"
              >
                <span className="h-2 w-2 rounded-full bg-[#bede3c]" />
                Designed around nature
              </motion.div>

              <motion.h1
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-heading mt-5 max-w-[12ch] text-[clamp(3.25rem,7vw,7.2rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-[#26341f]"
              >
                Pure green elegance.
              </motion.h1>

              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-6 max-w-[56ch] text-base leading-8 text-[#6d7d4f] md:text-lg"
              >
                A cleaner, more eco-forward bento product page with centered storytelling, rounded modules, quiet motion, and a layout
                that makes the product feel fresh without becoming noisy.
              </motion.p>

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a
                  href="#grid"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[#26341f] px-5 text-sm font-medium text-[#f8fbdc] shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  Explore the grid
                </a>
                <a
                  href="#compare"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-[#99ad3a]/15 bg-[#fcfee9] px-5 text-sm font-medium text-[#26341f] shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  Compare models
                </a>
              </motion.div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {stats.map(([value, label], index) => (
                  <motion.div
                    key={label}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                    animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.45 + index * 0.08 }}
                    className="rounded-[1.5rem] border border-[#99ad3a]/15 bg-[#fcfee9] p-4 shadow-sm"
                  >
                    <div className="text-2xl font-semibold tracking-[-0.04em] text-[#26341f]">{value}</div>
                    <div className="mt-2 text-sm leading-6 text-[#6d7d4f]">{label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              ref={deviceRef}
              onPointerMove={deviceMotion.onMove}
              onPointerLeave={deviceMotion.onLeave}
              style={{ rotateX: deviceMotion.springX, rotateY: deviceMotion.springY }}
              className="relative mx-auto w-full max-w-[620px] [transform-style:preserve-3d]"
            >
              <motion.div
                aria-hidden
                className="absolute inset-[5%] rounded-[2.4rem] border border-[#99ad3a]/15 bg-[#fcfee9]/55 blur-[0.2px]"
                animate={prefersReducedMotion ? {} : { rotate: [0, 0.5, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="relative overflow-hidden rounded-[2.8rem] border border-[#99ad3a]/15 bg-[#fcfee9] p-3 shadow-[0_30px_100px_rgba(80,96,26,0.08)]">
                <div className="flex items-center justify-between border-b border-[#99ad3a]/15 px-1 pb-3">
                  <div className="text-[0.72rem] uppercase tracking-[0.2em] text-[#6d7d4f]">Real-world references</div>
                  <div className="text-[0.72rem] uppercase tracking-[0.2em] text-[#6d7d4f]">Eco-light design</div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                  <motion.div
                    animate={prefersReducedMotion ? {} : { y: [0, -6, 0] }}
                    transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative min-h-[520px] overflow-hidden rounded-[2.1rem] border border-[#99ad3a]/15 bg-[#f8fad7]"
                  >
                    <img
                      src={ecoImages.greenhouse}
                      alt="Sunlit greenhouse filled with tropical greenery"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(38,52,31,0.18))]" />
                    <div className="absolute left-5 top-5 rounded-full border border-white/40 bg-white/65 px-3 py-1 text-[0.72rem] uppercase tracking-[0.14em] text-[#26341f] backdrop-blur-xl">
                      Botanical light
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 rounded-[1.4rem] border border-white/35 bg-white/80 p-4 backdrop-blur-xl">
                      <div className="text-[0.72rem] uppercase tracking-[0.18em] text-[#6d7d4f]">Featured scene</div>
                      <div className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[#26341f]">Greenhouse glow at golden hour.</div>
                      <p className="mt-2 text-sm leading-6 text-[#5f6f47]">
                        The real photo texture gives the page a grounded, natural feel that flat gradients cannot fake.
                      </p>
                    </div>
                  </motion.div>

                  <div className="grid gap-4">
                    <motion.div
                      animate={prefersReducedMotion ? {} : { y: [0, -4, 0] }}
                      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                      className="overflow-hidden rounded-[2rem] border border-[#99ad3a]/15 bg-[#f7f8d9] shadow-sm"
                    >
                      <img
                        src={ecoImages.leaves}
                        alt="Close-up of fresh green leaves"
                        className="h-[238px] w-full object-cover"
                      />
                      <div className="p-4">
                        <div className="text-[0.72rem] uppercase tracking-[0.18em] text-[#6d7d4f]">Leaf detail</div>
                        <div className="mt-2 text-lg font-semibold tracking-[-0.03em] text-[#26341f]">Soft focus, real texture.</div>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
                      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                      className="overflow-hidden rounded-[2rem] border border-[#99ad3a]/15 bg-[#f7f8d9] shadow-sm"
                    >
                      <img
                        src={ecoImages.field}
                        alt="Aerial view of a lush green field"
                        className="h-[238px] w-full object-cover"
                      />
                      <div className="p-4">
                        <div className="text-[0.72rem] uppercase tracking-[0.18em] text-[#6d7d4f]">Field layer</div>
                        <div className="mt-2 text-lg font-semibold tracking-[-0.03em] text-[#26341f]">A richer natural backdrop.</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="grid" className="w-full px-3 py-6 sm:px-4 lg:px-6">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="font-heading text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-[#26341f]">
              Explore the lineup.
            </h2>
            <p className="max-w-[48ch] text-sm leading-7 text-[#6d7d4f] md:text-base">
              The grid uses asymmetric tiles, one large anchor block, and smaller companion tiles so the page feels modern and modular.
            </p>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="grid gap-3 lg:grid-cols-4 lg:grid-rows-3"
          >
            {cards.map((card) => (
              <motion.article
                key={card.title}
                whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.01 }}
                className={`group relative overflow-hidden rounded-[2rem] border border-[#99ad3a]/15 bg-[#fcfee9] p-4 shadow-sm ${card.span}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-[#99ad3a]/15 bg-[#f0f6c8] px-3 py-1 text-[0.72rem] uppercase tracking-[0.16em] text-[#6d7d4f]">
                      {card.tag}
                    </span>
                    <span className="text-[0.72rem] uppercase tracking-[0.16em] text-[#8c9f61]">active</span>
                  </div>
                  {card.tag === 'hero' ? (
                    <div className="mt-3 overflow-hidden rounded-[1.5rem] border border-[#99ad3a]/15 bg-[#f8fad7]">
                      <img
                        src={ecoImages.greenhouse}
                        alt="Sunlit greenhouse with dense foliage"
                        className="h-48 w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}
                  <div className="mt-auto">
                    <div className="font-heading max-w-[12ch] text-[clamp(2rem,3vw,3.5rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-[#26341f]">
                      {card.title}
                    </div>
                    <p className="mt-3 max-w-[32ch] text-sm leading-7 text-[#6d7d4f]">{card.copy}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section id="motion" className="overflow-hidden -mt-4 sm:-mt-6">
          <div className="border-y border-[#99ad3a]/15 bg-[#edf39f]/82 py-2 backdrop-blur-xl">
            <motion.div
              animate={prefersReducedMotion ? {} : { x: ['0%', '-50%'] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              className="flex min-w-max gap-4 px-3 font-heading text-[clamp(1rem,1.7vw,1.5rem)] font-semibold tracking-[-0.03em] text-[#4b5c28] sm:gap-6 sm:px-4 lg:px-6"
            >
              {tickerWords.map((word) => (
                <span key={word} className="flex items-center gap-4 sm:gap-6">
                  <span>{word}</span>
                  <span className="h-px w-6 bg-[#dbe789] sm:w-8" />
                </span>
              ))}
              {tickerWords.map((word) => (
                <span key={`${word}-dup`} className="flex items-center gap-4 sm:gap-6">
                  <span>{word}</span>
                  <span className="h-px w-6 bg-[#dbe789] sm:w-8" />
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="features" className="w-full px-3 py-6 sm:px-4 lg:px-6">
          <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="rounded-[2rem] border border-[#99ad3a]/15 bg-[#f8fad7] p-5 shadow-sm"
            >
              <div className="text-[0.72rem] uppercase tracking-[0.2em] text-[#6d7d4f]">Design notes</div>
              <div className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#26341f]">A layout that feels current, not crowded.</div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {featureRows.map(([title, copy], index) => (
                  <motion.div
                    key={title}
                    whileHover={prefersReducedMotion ? {} : { y: -6 }}
                    className="rounded-[1.4rem] border border-[#99ad3a]/15 bg-[#eef39a] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-[#26341f]">{title}</div>
                      <div className="text-[0.72rem] uppercase tracking-[0.16em] text-[#8c9f61]">{index + 1}</div>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[#6d7d4f]">{copy}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-4">
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, x: 18 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7 }}
                className="rounded-[2rem] border border-[#99ad3a]/15 bg-[#f8fad7] p-5 shadow-sm"
              >
                <div className="text-[0.72rem] uppercase tracking-[0.2em] text-[#6d7d4f]">Motion stance</div>
                <p className="mt-4 text-sm leading-7 text-[#6d7d4f]">
                  Eco-style motion is not flashy. It is measured, deliberate, and nearly invisible until you notice how good it feels.
                </p>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, x: 18 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="rounded-[2rem] border border-[#99ad3a]/15 bg-[linear-gradient(180deg,#f8fad7,#e7ee8d)] p-5 shadow-sm"
              >
                <div className="text-[0.72rem] uppercase tracking-[0.2em] text-[#6d7d4f]">Current cues</div>
                <div className="mt-3 grid gap-2.5">
                  {['Soft chrome borders', 'Rounded product surfaces', 'Large product frames', 'Tile-based storytelling'].map((item) => (
                    <div key={item} className="rounded-[1.15rem] border border-[#99ad3a]/15 bg-[#f8fad7] px-4 py-2.5 text-sm text-[#4f5f38]">
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="design" className="w-full px-3 py-6 sm:px-4 lg:px-6">
          <div className="grid gap-3 lg:grid-cols-[0.85fr_1.15fr]">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -18 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="rounded-[2rem] border border-[#99ad3a]/15 bg-[#f8fad7] p-5 shadow-sm"
            >
              <div className="text-[0.72rem] uppercase tracking-[0.2em] text-[#6d7d4f]">Design story</div>
              <div className="mt-4 font-heading text-[clamp(2rem,3.8vw,4rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-[#26341f]">
                Real texture, layered with motion.
              </div>
              <p className="mt-4 text-sm leading-7 text-[#6d7d4f]">
                This section gives the page a more editorial pace. Each image mode changes the mood without leaving the eco palette.
              </p>

              <div className="mt-5 grid gap-3">
                {storyModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedStory(mode.id)}
                    className={`rounded-[1.25rem] border px-4 py-4 text-left transition ${
                      selectedStory === mode.id
                    ? 'border-[#aecd1f] bg-[#f0f7b7]'
                        : 'border-[#99ad3a]/15 bg-[#f7f8d9] hover:bg-[#f0f5be]'
                    }`}
                  >
                    <div className="text-[0.72rem] uppercase tracking-[0.16em] text-[#8c9f61]">{mode.label}</div>
                    <div className="mt-1 text-base font-semibold tracking-[-0.03em] text-[#26341f]">{mode.title}</div>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="overflow-hidden rounded-[2rem] border border-[#99ad3a]/15 bg-[#f8fad7] p-3 shadow-sm"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStory.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? {} : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.5 }}
                  className="relative overflow-hidden rounded-[1.8rem] border border-[#99ad3a]/15 bg-[#f8fad7]"
                >
                  <img src={activeStory.image} alt={activeStory.title} className="h-[380px] w-full object-cover sm:h-[420px]" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(38,52,31,0.26))]" />
                  <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-[1.4rem] border border-white/35 bg-white/80 p-4 backdrop-blur-xl md:grid-cols-[1fr_auto] md:items-end">
                    <div>
                      <div className="text-[0.72rem] uppercase tracking-[0.18em] text-[#6d7d4f]">Selected mode</div>
                      <div className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#26341f]">{activeStory.title}</div>
                      <p className="mt-2 max-w-[42ch] text-sm leading-6 text-[#5f6f47]">{activeStory.copy}</p>
                    </div>
                    <div className="rounded-full border border-[#99ad3a]/15 bg-[#f0f6c8] px-4 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-[#6d7d4f]">
                      Swipe-ready view
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section id="compare" className="w-full px-3 py-6 sm:px-4 lg:px-6">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-heading text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-[#26341f]">
                Compare at a glance.
              </h2>
              <p className="mt-3 max-w-[46ch] text-sm leading-7 text-[#6d7d4f]">
                This section borrows the product comparison language from current Apple pages: clean rows, calm contrast, and simple choices.
              </p>
            </div>
            <div className="inline-flex rounded-full border border-[#99ad3a]/15 bg-[#fcfee9] p-1 shadow-sm">
              {['MacBook Air', 'MacBook Pro'].map((item) => (
                <button
                  key={item}
                  onClick={() => setCompareMode(item)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    compareMode === item ? 'bg-[#26341f] text-[#f8fbdc]' : 'text-[#6d7d4f] hover:text-[#26341f]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-[2rem] border border-[#99ad3a]/15 bg-[#f8fad7] shadow-sm"
          >
            <div className="grid grid-cols-4 border-b border-[#99ad3a]/15 bg-[#eef39a] px-4 py-3 text-xs uppercase tracking-[0.2em] text-[#6d7d4f] sm:px-5">
              <div>Spec</div>
              <div>{compareMode}</div>
              <div>Air-like</div>
              <div>Takeaway</div>
            </div>
            <div className="divide-y divide-[#99ad3a]/15">
              {compareRows.map(([spec, first, second, note]) => (
                <div key={spec} className="grid grid-cols-4 gap-3 px-4 py-3 text-sm sm:px-5">
                  <div className="font-medium text-[#26341f]">{spec}</div>
                  <div className="text-[#4f5f38]">{first}</div>
                  <div className="text-[#6d7d4f]">{second}</div>
                  <div className="text-[#87955d]">{note}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="w-full px-3 py-6 sm:px-4 lg:px-6">
          <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="rounded-[2rem] border border-[#99ad3a]/15 bg-[#f8fad7] p-5 shadow-sm"
            >
              <div className="text-[0.72rem] uppercase tracking-[0.2em] text-[#6d7d4f]">Process</div>
              <div className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#26341f]">A smoother path from first glance to final action.</div>
              <div className="mt-5 grid gap-3">
                {processSteps.map(([title, copy], index) => (
                  <motion.div
                    key={title}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    className="grid gap-4 rounded-[1.35rem] border border-[#99ad3a]/15 bg-[#f3f8c7] p-4 md:grid-cols-[auto_1fr]"
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-full border border-[#99ad3a]/15 bg-[#fcfee9] text-sm font-semibold text-[#26341f]">
                      0{index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-semibold tracking-[-0.03em] text-[#26341f]">{title}</div>
                      <p className="mt-2 text-sm leading-7 text-[#6d7d4f]">{copy}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="overflow-hidden rounded-[2rem] border border-[#99ad3a]/15 bg-[#f8fad7] p-5 shadow-sm"
            >
              <div className="text-[0.72rem] uppercase tracking-[0.2em] text-[#6d7d4f]">Final CTA</div>
              <div className="mt-4 font-heading text-[clamp(2rem,4vw,4.4rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-[#26341f]">
                Bring the light green story home.
              </div>
              <p className="mt-4 max-w-[40ch] text-sm leading-7 text-[#6d7d4f]">
                This closing block gives the page a stronger ending with a little more room, a little more confidence, and a clearer next step.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#overview"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[#26341f] px-5 text-sm font-medium text-[#f8fbdc] shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  Back to top
                </a>
                <a
                  href="#design"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-[#99ad3a]/15 bg-[#fcfee9] px-5 text-sm font-medium text-[#26341f] shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  View the story
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="proof" className="w-full px-3 py-6 pb-12 sm:px-4 lg:px-6">
          <div className="grid gap-3 lg:grid-cols-3">
            {proofRows.map((quote) => (
              <motion.article
                key={quote}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55 }}
                className="rounded-[1.8rem] border border-[#99ad3a]/15 bg-[#f8fad7] p-5 shadow-sm"
              >
                <p className="text-[0.98rem] leading-8 text-[#4f5f38]">"{quote}"</p>
                <div className="mt-8 text-[0.72rem] uppercase tracking-[0.2em] text-[#8c9f61]">Editorial proof</div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
