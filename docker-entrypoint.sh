#!/bin/sh
set -e

echo "🔄 Running Prisma migrations..."
npx prisma db push --accept-data-loss

echo "✅ Migrations complete!"

# Optional: Seed database if SEED_DB=true
if [ "$SEED_DB" = "true" ]; then
  echo "🌱 Seeding database..."
  npx tsx prisma/seed.ts
  echo "✅ Database seeded!"
fi

echo "🚀 Starting application..."
exec "$@"
