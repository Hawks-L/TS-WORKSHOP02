# Mesa de ayuda

> Backend base con **Express + Prisma**, validación con **Zod**, logging con **Pino**, y tooling de **TypeScript** listo para desarrollo.

## Contenido
- [Requisitos](#requisitos)
- [Stack tecnológico](#stack-tecnológico)
- [Comandos de arranque](#comandos-de-arranque)
- [Scripts recomendados (package.json)](#scripts-recomendados-packagejson)
- [Troubleshooting](#troubleshooting)

---

## Requisitos
- Node.js 18+ (recomendado 20+)
- PostgreSQL 14+ (local o Docker)

---

## Stack tecnológico

| Paquete | Categoría | Propósito |
|---|---|---|
| **express** | Core HTTP | Framework minimalista para crear APIs REST |
| **cors** | HTTP utilidades | Middleware para habilitar CORS en Express |
| **morgan** | Observabilidad | Logging de peticiones HTTP en desarrollo |
| **dotenv** | Configuración | Carga variables de entorno desde `.env` |
| **zod** | Validación | Esquemas tipados y validación runtime |
| **pino** | Observabilidad | Logger rápido y eficiente para producción |
| **pino-pretty** | Observabilidad | Formateo legible de logs de Pino en desarrollo |
| **jsonwebtoken** | Seguridad & Auth | Generación y verificación de tokens **JWT** |
| **bcryptjs** | Seguridad | Hashing seguro de contraseñas |
| **class-validator** | DTOs/Validación | Validación declarativa con decoradores |
| **class-transformer** | DTOs/Transformación | Transformación entre clases y objetos planos (DTOs) |
| **reflect-metadata** | Decoradores | Necesario para metadatos con decoradores |
| **@prisma/client** | ORM/DB | Cliente de Prisma para acceder a la BD |
| **prisma** | ORM/DB (CLI) | Modelado de esquema, migraciones y generación de cliente |
| **tsx** | DX/TypeScript | Ejecuta TS con ESM y recarga rápida |
| **ts-node** | DX/TypeScript | Ejecuta `.ts` sin transpilar (alternativa) |
| **nodemon** | DX/Dev server | Reinicia el servidor al detectar cambios |
| **vitest** | Testing | Framework de tests rápido |
| **supertest** | Testing | Tests de endpoints HTTP (Express) |
| **eslint** | Calidad | Linter para detectar errores y malas prácticas |
| **@typescript-eslint/parser** | Calidad | Permite a ESLint entender TypeScript |
| **@typescript-eslint/eslint-plugin** | Calidad | Reglas específicas para TypeScript |
| **eslint-config-prettier** | Calidad | Desactiva reglas que chocan con Prettier |
| **prettier** | Estilo | Formateador de código consistente |
| **husky** | Git hooks | Ejecuta scripts en hooks de Git (ej. pre-commit) |
| **lint-staged** | Git hooks | Aplica linters solo a archivos staged |
| **@types/**… | Tipos TS | Tipados de terceros para paquetes de npm |

> 📝 **Notas**
> - Usa **@prisma/client** (no `@prima/client`).
> - Usa **class-transformer** (no `class-transform`).
> - Usa **pino-pretty** (no `pino-prettiy`).

---

## Comandos de arranque

1. **Inicializar proyecto Node.js**
   ```bash
   npm init -y
   
2. **Instalar TypeScript e iniciar configuración**
    ```bash
    npm install -D typescript
    npx tsc --init

3. **Instalar dependencias de runtime**
    ```bash
    npm i express zod pino pino-pretty jsonwebtoken bcryptjs class-validator class-transformer reflect-metadata cors dotenv morgan @prisma/client

4. **Instalar dependencias de desarrollo**
    ```bash
    # Ejecución/recarga y tipos
    npm i -D tsx ts-node nodemon @types/node @types/express @types/jsonwebtoken @types/cors @types/morgan

    # ORM/DB y testing
    npm i -D prisma vitest supertest @types/supertest

    # Lint & formato
    npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier prettier husky lint-staged

5. **Inicializar Prisma**
    ```bash
    npx prisma init

---

## Scripts recomendados (package.json)
    
    {
      "scripts": {
        "start:dev": "nodemon --watch src --ext ts --exec tsx src/main.ts",
        "build": "tsc -p tsconfig.json",
        "start:prod": "node dist/main.js",
    
        "prisma:generate": "prisma generate",
        "migrate:dev": "prisma migrate dev",
        "db:push": "prisma db push",
        "studio": "prisma studio",
    
        "test": "vitest",
        "lint": "eslint \"src/**/*.{ts,tsx}\"",
        "format": "prettier --write ."
      }
    }

## Troubleshooting

### Mapa rápido de errores comunes

| Síntoma (log) | Causa probable | Fix rápido |
|---|---|---|
| `Error: listen EADDRINUSE: ... :3000` | Puerto de la API ocupado | Cambia `PORT` (p. ej. 3001) o mata el proceso (`netstat` + `taskkill`) |
| `Prisma P1001: Can't reach database server at 'localhost:5432'` | Postgres apagado / puerto incorrecto | Inicia Postgres o ajusta `DATABASE_URL` |
| `ZodError: expected string ... DB_USER ...` | Variables faltantes o mal nombradas | Corre `.env` (usa `DB_USER`, no `DB_USERNAME`) |
| `Invalid URL` en `DATABASE_URL` | Comillas o `${...}` sin expandir | Escribe la URL completa sin interpolación |
| `app.use() requires a middleware function` | Pasaste un **array** a `app.use` | Itera y monta routers uno por uno |
| `Cannot find module 'cors'` (u otro) | Dependencia no instalada | `npm i <paquete>` (+ `@types/...` si aplica) |
| Prisma Client no existe | Falta `prisma generate` | `npm run prisma:generate` |

---

### 1) Puerto ocupado — `EADDRINUSE :<PUERTO>`

**Causa:** el puerto ya está en uso.

**Soluciones (Windows PowerShell):**
    ```powershell
    
    # Ver qué proceso usa 3000
    netstat -ano | findstr :3000
    
    # Matar el proceso por PID (reemplaza <PID>)
    taskkill /PID <PID> /F

### 2) Prisma P1001 — “Can't reach database server”

**Causa:** Postgres no está corriendo o DATABASE_URL apunta al puerto equivocado.

**Soluciones:**

>Docker (rápido):

    docker run --name workshop-pg \
      -e POSTGRES_DB=hospital_desk \
      -e POSTGRES_USER=postgres \
      -e POSTGRES_PASSWORD=postgres \
      -p 5432:5432 -d postgres:16


>Si usas otro puerto (5433), actualiza también:

    DATABASE_URL=postgresql://postgres:postgres@localhost:5433/hospital_desk?schema=public

>Verifica que 5432 está escuchando:

    netstat -ano | findstr :5432

>Sincroniza Prisma:

    npm run prisma:generate
    npx prisma migrate dev --name init    # o: npx prisma db push

## 3) ZodError por variables de entorno

**Síntoma:**

```
ZodError: expected string ... path: ["DB_USER"]
```

**Causas comunes:**
- Variables mal nombradas (`DB_USERNAME` en vez de `DB_USER`).
- Archivo `.env` en otra carpeta.
- `DATABASE_URL` con `${...}` sin expandir.

**Checklist:**

Muestra lo que carga dotenv desde `.env`:
```bash
node -e "require('dotenv').config(); console.log('PORT=',process.env.PORT,'DB_USER=',process.env.DB_USER,'DATABASE_URL=',process.env.DATABASE_URL)"
```

**Ejemplo correcto de `.env`:**

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=hospital_desk
DB_USER=postgres
DB_PASSWORD=postgres
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hospital_desk?schema=public
```

> 💡 Evita `${VAR}` en `DATABASE_URL` salvo que uses `dotenv-expand`.

---

## 4) Invalid URL en `DATABASE_URL`

**Causas:**
- Comillas al inicio/fin.
- Interpolación `${...}` no expandida.

**Solución:**

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hospital_desk?schema=public
```

**(Opcional)** Usar `${VAR}` con `dotenv-expand`:

```ts
// src/config/env.config.ts
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const env = dotenv.config();
dotenvExpand.expand(env);
```

---

## 5) `app.use()` requires a middleware function

**Causa:** Pasaste un array a `app.use()`.

**Fix:**

```ts
// ❌ Incorrecto
this._app.use("/api", this._routers());

// ✅ Correcto
for (const r of this._routers()) {
  this._app.use("/api", r);
}

private _routers(): Router[] {
  const health = Router();
  health.get("/health", (_req, res) => res.json({ status: "ok" }));
  return [health];
}
```

---

## 6) Cannot find module 'cors' (u otro paquete)

**Solución:**

```bash
npm i cors            # Dependencia en runtime
npm i -D @types/cors  # Tipos (si aplica)
```

Repite para cualquier paquete faltante: `express`, `morgan`, etc.

---

## 7) Prisma Client no generado

**Síntoma:** Errores de import o tipos faltantes.

**Solución:**

```bash
npm run prisma:generate
```

Asegúrate de que `schema.prisma` exista y que `DATABASE_URL` sea válida.

---

## 8) La API sigue mostrando el puerto “viejo”

**Causa:** `PORT` no se actualizó o `.env` equivocado.

**Pruebas:**

```bash
node -e "require('dotenv').config(); console.log('PORT=', process.env.PORT)"
```

Si no ves el valor esperado, revisa que estés editando el `.env` correcto (el de la raíz, donde está `package.json`).

**Solución de emergencia (PowerShell):**

```bash
$env:PORT=3001; npm run start:dev
```
