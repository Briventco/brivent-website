"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import BlogCard from "@/components/shared/BlogCard";
import { blogPosts, blogCategories } from "@/data/blog";

export function BlogHero() {
  return (
    <section className="relative bg-surface pt-40 pb-20 overflow-hidden">
      <LinePattern />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface pointer-events-none" />

      <Container className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-accent text-xs tracking-[0.2em] font-semibold uppercase mb-6">
            Insights
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight mb-6">
            Ideas, products, lessons, and{" "}
            <span className="text-accent">stories from Brivent.</span>
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Follow what we are building, what we are learning, and how we
            think about technology.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

export function Categories() {
  return (
    <section className="bg-white py-16 border-b border-border">
      <Container>
        <div className="flex flex-wrap justify-center gap-3">
          {blogCategories.map((cat) => (
            <span
              key={cat.label}
              className="text-xs font-medium text-muted border border-border rounded-full px-4 py-2 hover:border-accent hover:text-accent transition-colors cursor-default"
              title={cat.description}
            >
              {cat.label}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

function formatDate(date: string | Date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 500;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.02;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#FF6B35"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}
export function GlobalSection() {
  return (
    <section className="mt-24 mb-20">
      <div className="relative overflow-hidden rounded-[28px] bg-[#210b5c] min-h-[360px]">

        <Canvas className="absolute inset-0 z-0">
          <ambientLight intensity={0.5} />
          <ParticleField />
        </Canvas>

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(
                circle,
                rgba(255,255,255,0.35) 1.5px,
                transparent 1.5px
              )
            `,
            backgroundSize: "7px 7px",
            maskImage: "url('/images/world-map.svg')",
            WebkitMaskImage: "url('/images/world-map.svg')",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskSize: "75% auto",
            WebkitMaskSize: "75% auto",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#210b5c]/40" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full px-6 text-center"
        >
          <p className="!text-center text-[#00AEEF] text-xs md:text-sm font-semibold tracking-[0.45em] uppercase mb-5">
            WE ARE GLOBAL
          </p>

          <h2 className="!text-center text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-7">
            Let&apos;s Build the future together
          </h2>

          <a
            href="/contact"
            className="
              inline-flex items-center justify-center
              px-8 py-3
              rounded-xl
              bg-white/20
              border border-white/50
              text-white
              font-semibold
              text-sm md:text-base
              backdrop-blur-sm
              shadow-lg
              transition-all duration-300
              hover:bg-white/30
              hover:border-white
              hover:-translate-y-0.5
            "
          >
            Build With Us
          </a>
        </motion.div>

      </div>
    </section>
  );
}

export function LatestPosts() {
  return (
    <section className="bg-surface py-24">
      <Container>
        <div className="text-center max-w-4xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight mb-4">
              {featuredPost?.title}
            </h2>
            <p className="text-lg text-muted mb-2">
              And why most teams don't see them coming
            </p>
            <p className="text-muted text-sm">
              Created on {featuredPost && formatDate(featuredPost.publishedAt)}
            </p>
          </motion.div>
        </div>

        <div className="relative w-full aspect-[16/9] md:aspect-[21/10] overflow-hidden rounded-lg mb-12">
          <img
            src={featuredPost?.coverImage || "/images/blog/image.png"}
            alt={featuredPost?.title || "Featured blog post"}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-4xl mx-auto prose prose-slate text-base text-muted leading-relaxed">
          {featuredPost?.content.split('\n').map((paragraph, index) => {
            if (paragraph.trim() === '') return null;
            if (paragraph.startsWith('# ')) {
              return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.replace('# ', '')}</h1>;
            }
            if (paragraph.startsWith('## ')) {
              return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={index} className="text-xl font-bold mt-5 mb-2">{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.startsWith('#### ')) {
              return <h4 key={index} className="text-lg font-bold mt-4 mb-2">{paragraph.replace('#### ', '')}</h4>;
            }
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return <p key={index} className="font-bold mb-4">{paragraph.replace(/\*\*/g, '')}</p>;
            }
            if (paragraph.startsWith('---')) {
              return <hr key={index} className="my-8 border-t border-border" />;
            }
            return <p key={index} className="mb-4">{paragraph}</p>;
          })}
        </div>

        <GlobalSection />

        <SectionHeading
          label="Latest"
          title="Read the latest from Brivent."
          className="mb-12"
        />
        
        {blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-border rounded-xl p-12 text-center">
            <p className="text-sm text-muted-light">
              Blog posts will appear here once published by Operations.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}