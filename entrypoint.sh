#!/bin/bash

# Wait for the database to be ready
until pg_isready -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" -h e-chiro-db -p 5432; do
  echo "Waiting for database to be ready..."
  sleep 2
done

# Create the initial migration (if needed)
if [ ! -d prisma/migrations ]; then
  npx prisma migrate dev --name init --skip-generate
fi

# Apply migrations
npx prisma migrate deploy

# Start the application
npm run dev