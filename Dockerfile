# Etapa 1: Builder
FROM node:20-alpine AS builder

# Soporte para Prisma y OpenSSL en Alpine
RUN apk add --no-cache libc6-compat openssl openssl-dev

WORKDIR /app

# Copia los archivos de configuración de dependencias.
COPY package*.json ./

# Instala las dependencias del proyecto.
RUN npm ci

# Copia el resto del código fuente de la aplicación.
COPY . .

# Generar el cliente de Prisma para que esté disponible en runtime
RUN npx prisma generate

# Crea la carpeta 'public' si no existe
RUN mkdir -p public

# Construye la aplicación Next.js en modo normal.
RUN npm run build

# Etapa 2: Runner
FROM node:20-alpine AS runner

# Instala OpenSSL necesario para Prisma en runtime en Alpine
RUN apk add --no-cache openssl

WORKDIR /app

# Copia el directorio .next completo para el modo normal
COPY --from=builder /app/.next ./.next

# Copia las dependencias de producción
COPY --from=builder /app/node_modules ./node_modules
# Copia la carpeta 'public'
COPY --from=builder /app/public ./public
# Copia package.json
COPY --from=builder /app/package.json ./package.json

# Copia el directorio 'src/chatbot' completo.
COPY --from=builder /app/src/chatbot ./src/chatbot
# Copia la carpeta de prisma para la base de datos
COPY --from=builder /app/prisma ./prisma

# Crea grupo y usuario nextjs con UID y GID libres para mayor seguridad.
RUN set -eux; \
    gid=1000; \
    while getent group "$gid" > /dev/null 2>&1; do \
      gid=$((gid + 1)); \
    done; \
    if ! getent group nextjs > /dev/null 2>&1; then \
      addgroup -g "$gid" -S nextjs; \
    else \
      gid=$(getent group nextjs | cut -d: -f3); \
    fi; \
    uid=1000; \
    while cut -d: -f3 /etc/passwd | grep -qw "$uid" || [ "$uid" -eq 0 ]; do \
      uid=$((uid + 1)); \
    done; \
    if ! id -u nextjs > /dev/null 2>&1; then \
      adduser -u "$uid" -S -G nextjs -s /bin/sh nextjs; \
    fi; \
    # Arreglo de permisos para chatbot, public y la caché de Next.js
    mkdir -p /app/.next/cache/images && \
    chown -R nextjs:nextjs /app/src/chatbot /app/public /app/.next /app/prisma

# Cambia al usuario seguro 'nextjs' para ejecutar la aplicación.
USER nextjs

# Define las variables de entorno para la producción.
ENV NODE_ENV=production
ENV PORT=3000

# Expone el puerto en el que la aplicación escuchará las conexiones.
EXPOSE 3000

# Comando para iniciar la aplicación Next.js en modo normal.
CMD ["npm", "start"]
