import { PrismaConfig } from 'prisma/config';

const config: PrismaConfig = {
    migrations: {
        seed: "tsx prisma/seed.ts",
    },
};

export default config;
