import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.profile.deleteMany();

  const profile = await prisma.profile.create({
    data: {
      name: 'Кирилл',
      description:
        'Full-stack разработчик с опытом создания масштабируемых веб-приложений.',
      githubUrl: 'https://github.com/kravxc',
      linkedinUrl: null,
      websiteUrl: 'https://amnam.dev',
      skills: {
        create: [
          { name: 'TypeScript', sortOrder: 1 },
          { name: 'NestJS', sortOrder: 2 },
          { name: 'Node.js', sortOrder: 3 },
          { name: 'GraphQL', sortOrder: 4 },
          { name: 'PostgreSQL', sortOrder: 5 },
          { name: 'Docker', sortOrder: 6 },
          { name: 'PHP', sortOrder: 7 },
          { name: 'Java', sortOrder: 8 },
          { name: 'Spring Framework', sortOrder: 9 },
          { name: 'Laravel', sortOrder: 10 },
          { name: 'VueJS', sortOrder: 11 },
          { name: 'ReactJS', sortOrder: 12 },
        ],
      },
      experience: {
        create: [
          {
            company: 'Tech Corp',
            position: 'Full-Stack Developer',
            startDate: new Date('2026-01-01'),
            endDate: new Date('2026-12-31'),
            achievments: [
              'Разработал fullstack веб-приложение для IT-школы; упаковал фронтенд и бэкенд в Docker-контейнеры (Dockerfile + Docker Compose) и поднял приложение в контейнерном окружении',
              'Разработал fullstack веб-приложение для публикации и обсуждения рецензий на музыкальный контент; развернул его в Railway с настройкой автодеплоя из Git-репозитория и переменных окружения',
              'Помогал junior-разработчику в обучении: объяснял архитектуру, помогал с задачами, проводил код-ревью',
            ],
            sortOrder: 1,
          },
        ],
      },
      projects: {
        create: [
          {
            name: 'Платформа для публикации и обсуждения рецензий — Backend',
            url: null,
            repoUrl: 'https://github.com/kravxc/critique-V2',
            description:
              'Бэкенд-часть платформы для публикации и обсуждения рецензий: REST API на Spring Boot для регистрации, аутентификации и авторизации пользователей с использованием JWT-токенов. Данные хранятся в MySQL, файлы (аватары пользователей) — в объектном S3-совместимом хранилище MinIO. Реализованы регистрация и вход, выдача JWT с разграничением доступа по ролям, загрузка/замена/удаление аватаров и генерация временных presigned-URL для безопасного доступа к ним. Фронтенд проекта — в отдельном репозитории.',
            sortOrder: 1,
          },
          {
            name: 'Платформа для публикации и обсуждения рецензий — Frontend',
            url: null,
            repoUrl: 'https://github.com/kravxc/critique-v2-frontend',
            description:
              'Клиентская часть платформы для публикации и обсуждения рецензий: SPA на Vue.js + TypeScript с централизованным управлением состоянием через Pinia и типизированным слоем HTTP-запросов на Axios. Приложение контейнеризировано (Docker + Docker Compose) и взаимодействует с REST API бэкенда (Spring Boot) — отдельный репозиторий.',
            sortOrder: 2,
          },
          {
            name: 'Fullstack веб-приложение для IT-школы',
            url: null,
            repoUrl: 'https://github.com/kravxc/it-school',
            description:
              'Fullstack веб-приложение для IT-школы: бэкенд на Spring (REST API), хранение загруженных файлов — локально на сервере; клиентская часть на React + MobX (JavaScript) с централизованным управлением состоянием. Приложение контейнеризировано и поднято в Docker (Docker Compose) для воспроизводимого окружения и деплоя.',
            sortOrder: 3,
          },
          {
            name: 'Веб-приложение для бургерной',
            url: null,
            repoUrl: 'https://github.com/kravxc/burger',
            description:
              'Клиентское веб-приложение для бургерной на React + TypeScript, собранное на Vite: каталог бургеров и интерактивный интерфейс заказа. Настроены строгая типизация TypeScript, ESLint (включая type-aware правила и плагины для React) и React Compiler; менеджер пакетов — Bun.',
            sortOrder: 4,
          },
        ],
      },
    },
  });

  console.log('Seed completed successfully');
  console.log(`Created profile: ${profile.name} (${profile.id})`);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
