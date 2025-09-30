# Mesa de ayuda

## stack tecnologico

    |Paquete        |Próposito|
    |-------        |---------|
    |express        |Framework web minimalista para crear APIs REST|
    |zod            |Validación de datos tipado con fuerte, ideal para esquemas en TS|
    | pino          |Logger rádipo y eficiente para producción |
    |pino-prettiy   |Formatear los logs de Pino para enttorno de desarrollo |
    | jsonwebtoken  |Generación y verificación de tokens JWT para autenticación|
    | bcryptjs      | Encriptación de contraseñas con hashing seguro|
    |class-validator| Validación declarativa de clases usando decoradores|
    |class-transform| Transformación de objetos entre clases y planos (DTOs)|
    |reflect-metadata| Soporte para metadatos en decoradores (requerido por class-validator)|
    | cors          | Middleware para habilitar CORS (Cross-Origin Resource Sharing) en express|
    | dotenv        | Carga de variables de entorno desde el archivo .env|
    | morgan        | Middleware para logging de peticiones HTTP|
    | @prima/client | Cliente de prisma para interactuar con la base de datos |
    | tsx           | Ejecuta archivos TS con soporte para ESM y hot-reload|
    | ts-node       | Ejecuta archivos .ts directamente sin transpilar|
    | nodemon       | Reiniciar automáticamente el servidor al detectar cambios|
    | prisma        | ORM para modelar y migrar la base de datos|
    | vitest        | Framework de testing rápido y compatible con Vite|
    | supertest     | Permite testear endopints HTTP de express|
    | eslint        |Analizar el código para detectar errores y malas prácticas de código|
    | @typescript-eslint/parser| Permite que ESLint entienda TypeScript|
    | @typescript-eslint/eslint-plugin| Reglas especificas para TypeScript|
    | eslint-config-prettier| Desactivar reglas que interfieren con Prettier|
    | prettier| Formateador de código consistente |
    | husky         | Ejecuta scripts de hooks de Git (ej. antes de hacer commit)|
    | lint-staged   | Aplica linters solo a archivos modificados en el commit|
    | @types/...    | Proveen tipado TS a paquetes instalados|

##Comandos de arranque

1. Inicializar el proyecto NodeJS:

    ```bash
        npm init -y
    ```

2. Instalar TypeScript e iniciar la configuración:

    ```bash
        npm install -D typescript

        npx tsc --init
    ```
3. Instalar dependencias runtime

    ```bash
        npm i express zod pino pino-pretty jsonwebtoken bcryptjs class-validator class-transformer reflect-metadata cors dotenv morgan @prisma/client
    ```
4. Instalación de dependencias de desarrollo

    ```bash
        npm i -D tsx ts-node nodemon

        npm i -D @types/node @types/express @types/jsonwebtoken @types/cors @types/morgan

        npm i -D prisma vitest supertest @types/supertest

        npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier 

        npm i -D prettier husky lint-staged
    ```
5. Inicializar prisma

    ```bash
        npx prisma init
    ```