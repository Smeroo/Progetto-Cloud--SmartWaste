#!/bin/sh
# Wait for the database to be ready (optional, but good practice if not using healthchecks or if strict ordering is needed)
# In this setup, docker-compose depends_on condition: service_healthy handles it mostly.

echo "Pushing database schema..."
npx prisma db push --accept-data-loss

echo "Running database seed..."
npx prisma db seed || echo "Seed skipped or already done"

echo "Starting application..."
node server.js
