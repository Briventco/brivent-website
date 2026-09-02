import { BlogCategory, BlogPost } from "@/types/blog";

export const blogCategories: { label: BlogCategory; description: string }[] = [
  { label: "Company", description: "Milestones, announcements, and stories." },
  { label: "Product", description: "Product launches, updates, and lessons." },
  { label: "Engineering", description: "Technical work and engineering lessons." },
  { label: "AI", description: "Practical applications of artificial intelligence." },
  { label: "Partnerships", description: "Collaboration announcements and stories." },
  { label: "Community", description: "Events, people, and ecosystem activity." },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "building-brivent",
    title: "Building Brivent",
    excerpt:
      "Every company starts with a problem it wants to solve. For Brivent, the problem was bigger than simply building software.",
    category: "Company",
    tags: ["Company", "Servra", "Kinnoc", "BIIT"],
    author: "Brivent Team",
    publishedAt: "2026-08-19",
    readingTime: "8 min read",
    coverImage: "/images/blog/image.png",
    content: `Every company starts with a problem it wants to solve.

For Brivent, the problem was bigger than simply building software.

We wanted to build technology that solves real problems, create products that people can actually use, and build a company capable of growing ideas from Africa into meaningful businesses and platforms.

That is what Brivent is becoming.

## Building Brivent

Brivent Global Innovations Limited is a technology company focused on building digital solutions for businesses while developing and owning products of its own.

The company was founded by Oyindamola Caleb Abisoye alongside co-founder Oludare Deborah, with a growing team of engineers, operators, and contributors helping turn ideas into working technology.

Our work sits across two important areas: building technology for others and building products of our own.

On one side, we work with businesses and organisations to design and develop digital solutions that help them operate, communicate, and grow.

On the other, we build and develop products that address problems we believe are worth solving.

## Products We Are Building

Brivent currently has two major products: Servra and Kinnoc.

### Servra

Servra is an AI Order Agent built for businesses that take orders through WhatsApp.

Instead of asking customers to download another application or move to another platform, Servra works directly through a business's existing WhatsApp number.

It can respond to customers, share menus, take orders, calculate totals, and notify the business when an order is ready for confirmation.

The idea is simple:

Chat. Order. Done.

Servra represents one of Brivent's core beliefs — technology should fit into the way people already work rather than forcing them to completely change their behaviour.

### Kinnoc

Kinnoc is a community platform built to bring communities, events, opportunities, and resources together in one place.

The idea behind Kinnoc is straightforward: there are countless communities, events, opportunities, and resources around us, but discovering and staying connected to them can be difficult.

Kinnoc is being built to make that experience easier.

It gives people a place to discover communities they can belong to, find events and opportunities, and stay connected to the things that matter to them.

Kinnoc is currently being developed as part of Brivent's growing product portfolio.

## More Than Products

While products are an important part of Brivent, we believe technology companies are also built around people.

That belief led to the growth of Be Involved in Tech (BIIT), our technology community focused on connecting people, creating opportunities, and encouraging more people to participate in technology.

BIIT has grown beyond simply being a community. It has become a platform through which we connect with students, builders, founders, and other people interested in technology and innovation.

## Showing Up for the Ecosystem

Our work in technology has also taken us into spaces where ideas, innovation, and entrepreneurship are being celebrated.

In 2025, BIIT was one of the sponsors of TEDxUNIOSUN, supporting an event that brought together people with ideas, stories, and perspectives worth sharing.

Kinnoc also supported the Hult Prize UNIOSUN Chapter, a student-focused innovation and entrepreneurship initiative.

The Hult Prize is one of the world's largest student innovation programmes, giving young people an opportunity to develop ideas that address real-world problems.

For us, supporting initiatives like these is not simply about putting our name on an event.

It is about being part of the ecosystem we want to see grow.

It is about creating room for young people to build, experiment, learn, and turn their ideas into something real.

## From Ideas to Execution

One of the things we are learning as we build Brivent is that having an idea is only the beginning.

A product needs people.

People need systems.

Systems need structure.

And structure needs a company willing to keep learning and improving.

That is why we are intentionally building Brivent beyond individual projects.

We are building processes, developing our team, strengthening partnerships, and creating an environment where ideas can move from conversations to prototypes, products, and businesses.

## The People Behind Brivent

Brivent is being built by a growing team of founders, engineers, operators, and contributors.

Our engineering team works across frontend, backend, mobile development, quality assurance, and the infrastructure required to turn product ideas into functioning technology.

Our operations and leadership functions help coordinate projects, partnerships, communities, and the systems that keep the company moving.

Everyone plays a different role, but the objective remains the same:

Build meaningful technology.

## What Comes Next

Brivent is still early.

There is a lot we are still figuring out, a lot we are still building, and a lot more we want to accomplish.

But that is also what makes this stage exciting.

We are building from Africa, working with people and businesses around us, creating products of our own, and learning what it takes to build a technology company that can last.

There will be new products.

There will be new partnerships.

There will be new people joining the team.

There will be mistakes, experiments, launches, and lessons along the way.

And we intend to document the journey.

This is Brivent.

We are building.`,
    seoTitle: "Building Brivent — Our Story",
    seoDescription:
      "The story of Brivent Global Innovations — why we started, the products we're building (Servra and Kinnoc), and what comes next.",
  },
  {
    slug: "the-hidden-cost-of-building-with-ai",
    title: "The Hidden Cost of Building with AI: How System Design Breaks Down",
    excerpt:
      "Every company starts with a problem it wants to solve. For Brivent, the problem was bigger than simply building software.",
    category: "AI",
    tags: ["AI", "System Design", "Engineering"],
    author: "Enyata",
    publishedAt: "2026-08-19",
    readingTime: "8 min read",
    coverImage: "/images/blog/image.png",
    content: `The biggest problems in scaling a fintech product don't usually show up with a warning. They accumulate quietly, buried in your codebase, tucked away in manual compliance workflows, or hidden in third-party APIs, while you are busy chasing growth. By the time they actually blow up, the cost of fixing them has usually gone through the roof.

MEXC Foundation predicts that the global fintech market is on track to pass 1.1 trillion dollars by 2030. The momentum is massive, but behind the funding rounds and launch parties, there is a recurring nightmare: products that worked perfectly for 10,000 users start to fall apart at 500,000. Teams that moved fast in year one find themselves spending 80% of their time firefighting instead of building.

The real product killers aren't the obvious things like a buggy UI or slow onboarding. Those are easy to spot and fix. The real threats are the ones that disguise themselves as something else: compliance debt that looks like a hiring problem, or a bad architecture choice that shows up as a bottleneck in your updates.

## 6 Real-World Challenges That Break Fintechs at Scale

### 1. Compliance debt that quietly compounds

Every fintech team knows they need to be compliant. But too many treat it like a chore: pass the audit, check the box, and move on. That works when you are small. It is a death sentence when you are large.

FinTech Global reports that financial firms now spend an average of 19% of their revenue on compliance. This isn't just about paying lawyers; it is the cost of inefficient systems. When you're small, manual is okay. You can have a team lead review 10 flagged transactions a day. But when you scale, those 10 flags become 10,000. If your compliance logic is buried deep inside your product code rather than being a standalone, automated service, every regulatory change requires a full engineering sprint to fix.

A good example is Reuters report, which accounts for how Starling Bank was fined 28.9 million pounds in 2024 because their automated screening tools weren't updated to match their rapid expansion, leaving blind spots for financial crime.

What to do:

1. Decouple compliance: Build your compliance logic as an independent service that your product talks to via API.
2. Automate the easy stuff: If a human has to look at every ID, you aren't scaling; you're just hiring.

### 2. Early tech choices become load-bearing walls

In the early days, you build for speed. You use a single database and maybe some quick code to get the app live. This is technical debt, and it is a standard part of startups. McKinsey estimates that this debt makes up about 40% of the value of a large organisation's IT.

The problem in fintech is that these early choices become load-bearing. As you add more features, they all sit on that original, shaky foundation. Eventually, the foundation grows. You start seeing contention in your database where one service blocks another. A simple update to the onboarding screen suddenly crashes the withdrawal service because they share the same messy code. In fintech, this is dangerous. If a social media app lags, it stops at "annoying." If a ledger service lags, you risk double-spending or incorrect balances, the kind of errors that lead to immediate audits and massive user churn.

What to do:

1. Plan for modularisation: Write code that can be easily separated into different services later.
2. Database partitioning: Plan how you will split your data before your single database hits its breaking point.
3. Performance budgeting: Set strict limits on how long a transaction should take and don't launch features that push you over that limit.

### 3. Third-party partners are invisible risks

Modern fintech runs on integrations — payment processors, KYC providers, banking rails, fraud detection APIs, open banking data feeds. To move fast, you plug in to other companies: one for card issuing, another for KYC, and another for cross-border payments. This Lego-block approach is brilliant for getting to market, but it creates a massive invisible risk. A 2025 SecurityScorecard study found that 41.8% of fintech breaches actually started with a third-party vendor, not the fintech itself.

The risk isn't just about security hacks; it is about functional entanglement. When you integrate a third-party API, you are inheriting that partner's uptime, their latency, and their regulatory baggage. If your KYC provider has a 3-second lag, your entire onboarding experience now has a 3-second lag. If your payment processor hits a regulatory snag and gets their license suspended, your app is effectively dead until you find a workaround.

What to do:

1. Audit your talent: Be honest about where the gaps are and augment the original team with scaling specialists who have seen this movie before.
2. Invest in leadership: Give your early hires the training and mentorship they need to evolve into the leaders the larger company requires.
3. Leverage external support: This is where Enyata's team optimisation service thrives. We provide the seniority as a service that fintechs need during growth spurts, allowing your core team to focus on the vision while we handle the technical weight of scaling.

## What Scaling Fintechs Do Differently

The fintechs that scale successfully aren't just lucky. They follow a clear pattern that sets them apart from the companies that stall:

1. They treat operational risk as a core product feature.
2. They turn compliance into an automated technical asset.
3. They build for future architecture, not just today's bugs.
4. They seek outside perspective before they actually hit the wall.

At Enyata, we help teams navigate these exact moments. Whether it is cleaning up technical debt, navigating a geographic expansion, or beefing up your engineering team, we provide the expertise to keep your growth from becoming a disaster. These challenges are predictable, and if you can predict them, you can solve them.

Start Your Build`,
    seoTitle: "The Hidden Cost of Building with AI",
    seoDescription:
      "Understanding how system design breaks down when building with AI and how to avoid common pitfalls.",
  },
];