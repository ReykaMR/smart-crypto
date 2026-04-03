import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({ url: "file:dev.db" });

const prisma = new PrismaClient({ adapter });
const SALT_ROUNDS = 12;

async function main() {
  console.log("🌱 Seeding database...");

  // Hash password helper
  const hashPassword = async (password: string) =>
    bcrypt.hash(password, SALT_ROUNDS);

  // Create admin user
  const adminPassword = await hashPassword("admin123");
  const admin = await prisma.user.upsert({
    where: { email: "admin@smartcrypto.com" },
    update: {},
    create: {
      email: "admin@smartcrypto.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Created admin user:", admin.email);

  // Create demo user
  const userPassword = await hashPassword("user123");
  const user = await prisma.user.upsert({
    where: { email: "user@smartcrypto.com" },
    update: {},
    create: {
      email: "user@smartcrypto.com",
      name: "Demo User",
      password: userPassword,
      role: "USER",
    },
  });
  console.log("✅ Created demo user:", user.email);

  // Create Beginner Course
  const beginnerCourse = await prisma.course.upsert({
    where: { slug: "crypto-for-complete-beginners" },
    update: {},
    create: {
      title: "Crypto for Complete Beginners",
      slug: "crypto-for-complete-beginners",
      description:
        "Start your crypto journey from zero. Learn the fundamentals without jargon.",
      order: 1,
      isPublished: true,
      modules: {
        create: [
          {
            title: "What is Cryptocurrency?",
            description: "Understanding the basics of digital money",
            order: 1,
            lessons: {
              create: [
                {
                  title: "Welcome to Crypto!",
                  slug: "welcome-to-crypto",
                  content: `# Welcome to Crypto!

## What Will You Learn?

In this course, you'll discover:
- What cryptocurrency actually is
- How blockchain technology works
- How to safely buy and store crypto
- Common terms and concepts

## Let's Start Simple

Imagine you're sending money to a friend overseas. Traditionally, you'd need a bank, which takes days and charges high fees. 

**Cryptocurrency makes this instant, cheaper, and doesn't need a bank.**

Think of it like email for money - you can send it directly to anyone, anywhere, without a middleman.

> 💡 **Key Point:** Crypto is digital money that works without banks, using technology called blockchain.`,
                  order: 1,
                  duration: 5,
                  isFree: true,
                  quiz: {
                    create: {
                      title: "Welcome Quiz",
                      passingScore: 70,
                      questions: {
                        create: [
                          {
                            question: "What is cryptocurrency?",
                            order: 1,
                            points: 1,
                            options: {
                              create: [
                                {
                                  text: "Physical digital coins",
                                  isCorrect: false,
                                  order: 1,
                                },
                                {
                                  text: "Digital money without banks",
                                  isCorrect: true,
                                  order: 2,
                                },
                                {
                                  text: "A type of bank",
                                  isCorrect: false,
                                  order: 3,
                                },
                                {
                                  text: "Gaming currency only",
                                  isCorrect: false,
                                  order: 4,
                                },
                              ],
                            },
                          },
                          {
                            question: "What problem does crypto solve?",
                            order: 2,
                            points: 1,
                            options: {
                              create: [
                                {
                                  text: "Makes money heavier",
                                  isCorrect: false,
                                  order: 1,
                                },
                                {
                                  text: "Removes the need for middlemen like banks",
                                  isCorrect: true,
                                  order: 2,
                                },
                                {
                                  text: "Only works in one country",
                                  isCorrect: false,
                                  order: 3,
                                },
                                {
                                  text: "Makes transactions slower",
                                  isCorrect: false,
                                  order: 4,
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  title: "What is Blockchain?",
                  slug: "what-is-blockchain",
                  content: `# What is Blockchain?

## The Digital Ledger

Imagine a notebook that records every transaction. But instead of one person keeping it, **everyone has a copy**.

That's blockchain - a shared digital record book that no single person controls.

## How It Works

1. **Someone sends crypto** → The transaction is broadcast
2. **Network verifies** → Computers check if it's valid
3. **Added to block** → Verified transactions are grouped
4. **Chain update** → The block is added to the chain
5. **Everyone updates** → All copies are synchronized

## Why It's Secure

- ✅ **Transparent:** Everyone can see transactions
- ✅ **Immutable:** Can't change past records
- ✅ **Decentralized:** No single point of failure
- ✅ **Secure:** Protected by cryptography

> 🔒 **Security:** Once something is recorded, it cannot be changed or deleted.`,
                  order: 2,
                  duration: 8,
                  isFree: true,
                  quiz: {
                    create: {
                      title: "Blockchain Basics Quiz",
                      passingScore: 70,
                      questions: {
                        create: [
                          {
                            question: "What is blockchain?",
                            order: 1,
                            points: 1,
                            options: {
                              create: [
                                {
                                  text: "A physical chain",
                                  isCorrect: false,
                                  order: 1,
                                },
                                {
                                  text: "A shared digital record book",
                                  isCorrect: true,
                                  order: 2,
                                },
                                {
                                  text: "A type of cryptocurrency",
                                  isCorrect: false,
                                  order: 3,
                                },
                                {
                                  text: "A gaming platform",
                                  isCorrect: false,
                                  order: 4,
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            title: "Types of Cryptocurrency",
            description: "Bitcoin, altcoins, and tokens explained",
            order: 2,
            isLocked: true,
            lessons: {
              create: [
                {
                  title: "Bitcoin and Altcoins",
                  slug: "bitcoin-and-altcoins",
                  content: `# Bitcoin and Altcoins

## Bitcoin (BTC) - The Original

Created in 2009, Bitcoin was the **first cryptocurrency**. Think of it as digital gold.

**Key Features:**
- Limited supply (only 21 million will exist)
- Decentralized - no government controls it
- Store of value - like digital gold

## Altcoins - Alternatives to Bitcoin

**Altcoin** = Any crypto that's not Bitcoin

### Popular Altcoins:

1. **Ethereum (ETH)** - Smart contracts platform
2. **Cardano (ADA)** - Research-based blockchain
3. **Solana (SOL)** - Fast transactions
4. **Ripple (XRP)** - Bank transfers

## Tokens vs Coins

- **Coins** have their own blockchain (BTC, ETH)
- **Tokens** are built on existing blockchains

> 📊 **Remember:** Bitcoin is the original, altcoins are alternatives with different features.`,
                  order: 1,
                  duration: 10,
                  quiz: {
                    create: {
                      title: "Bitcoin & Altcoins Quiz",
                      passingScore: 70,
                      questions: {
                        create: [
                          {
                            question: "What is the maximum supply of Bitcoin?",
                            order: 1,
                            points: 1,
                            options: {
                              create: [
                                {
                                  text: "Unlimited",
                                  isCorrect: false,
                                  order: 1,
                                },
                                {
                                  text: "21 million",
                                  isCorrect: true,
                                  order: 2,
                                },
                                {
                                  text: "100 million",
                                  isCorrect: false,
                                  order: 3,
                                },
                                {
                                  text: "1 billion",
                                  isCorrect: false,
                                  order: 4,
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
  console.log("✅ Created beginner course");

  // Create glossary terms
  const glossaryTerms = [
    {
      term: "Bitcoin",
      definition:
        "The first and most well-known cryptocurrency, created in 2009.",
      example: "Bitcoin is often called digital gold.",
      category: "Cryptocurrency",
    },
    {
      term: "Blockchain",
      definition:
        "A distributed digital ledger that records transactions across many computers.",
      example: "Every Bitcoin transaction is recorded on the blockchain.",
      category: "Technology",
    },
    {
      term: "Wallet",
      definition:
        "A digital tool or app that lets you store and manage your cryptocurrency.",
      example: "Keep your crypto safe in a hardware wallet.",
      category: "Security",
    },
    {
      term: "Gas Fee",
      definition:
        "The fee paid to process a transaction on a blockchain network.",
      example: "Ethereum gas fees can be high during busy times.",
      category: "Trading",
    },
    {
      term: "Altcoin",
      definition: "Any cryptocurrency other than Bitcoin.",
      example: "Ethereum and Cardano are popular altcoins.",
      category: "Cryptocurrency",
    },
    {
      term: "HODL",
      definition:
        "Slang for holding cryptocurrency long-term instead of selling.",
      example: "True believers HODL through market ups and downs.",
      category: "Trading",
    },
    {
      term: "FOMO",
      definition:
        "Fear Of Missing Out - buying because others are, not based on research.",
      example: "Dont let FOMO drive your investment decisions.",
      category: "Trading",
    },
    {
      term: "DeFi",
      definition:
        "Decentralized Finance - financial services without traditional intermediaries.",
      example: "DeFi lets you earn interest without a bank.",
      category: "Technology",
    },
    {
      term: "NFT",
      definition:
        "Non-Fungible Token - unique digital items verified on blockchain.",
      example: "Digital art can be sold as NFTs.",
      category: "Technology",
    },
    {
      term: "Stablecoin",
      definition:
        "Cryptocurrency designed to maintain a stable value, often pegged to USD.",
      example: "USDT and USDC are popular stablecoins.",
      category: "Cryptocurrency",
    },
  ];

  for (const item of glossaryTerms) {
    await prisma.glossaryTerm.upsert({
      where: { term: item.term },
      update: {},
      create: {
        ...item,
        slug: item.term.toLowerCase().replace(/\s+/g, "-"),
      },
    });
  }
  console.log("✅ Created glossary terms");

  // Create simulation portfolio for demo user
  await prisma.simulationPortfolio.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      balance: 10000,
      holdings: {
        create: [
          { symbol: "BTC", amount: 0.1, avgBuyPrice: 45000 },
          { symbol: "ETH", amount: 2.5, avgBuyPrice: 2800 },
        ],
      },
    },
  });
  console.log("✅ Created simulation portfolio");

  // Create badges
  const badges = [
    {
      name: "First Steps",
      description: "Selesaikan pelajaran pertama Anda",
      icon: "🌟",
      category: "learning",
      requirement: 1,
    },
    {
      name: "Quick Learner",
      description: "Selesaikan 5 pelajaran",
      icon: "⚡",
      category: "learning",
      requirement: 5,
    },
    {
      name: "Dedicated Student",
      description: "Selesaikan 10 pelajaran",
      icon: "📚",
      category: "learning",
      requirement: 10,
    },
    {
      name: "Scholar",
      description: "Selesaikan 25 pelajaran",
      icon: "🎓",
      category: "learning",
      requirement: 25,
    },
    {
      name: "Quiz Master",
      description: "Lulus 5 kuis",
      icon: "🏆",
      category: "quiz",
      requirement: 5,
    },
    {
      name: "Perfect Score",
      description: "Lulus 10 kuis",
      icon: "💯",
      category: "quiz",
      requirement: 10,
    },
    {
      name: "Graduate",
      description: "Dapatkan 1 sertifikat",
      icon: "🎓",
      category: "certificate",
      requirement: 1,
    },
    {
      name: "Overachiever",
      description: "Dapatkan 3 sertifikat",
      icon: "👑",
      category: "certificate",
      requirement: 3,
    },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: {},
      create: badge,
    });
  }
  console.log("✅ Created badges");

  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
