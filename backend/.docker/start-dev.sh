#!/bin/bash

# Instalar dependências
npm install

echo "Executando migrations..."
npx prisma migrate dev

npx prisma generate

npm run start:dev