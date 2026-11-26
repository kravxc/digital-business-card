# Цифровая визитка

GraphQL API на NestJS с профилем, навыками, опытом работы и проектами. Схема и данные поднимаются сами при старте контейнера.

## Стек

TypeScript, Node.js, NestJS, Prisma, PostgreSQL, GraphQL (Apollo Server), Docker.

## Запуск

Нужен Docker.

```bash
docker compose up -d --build
```

Apollo Sandbox: http://localhost:3000/graphql

Postgres снаружи доступен на `localhost:5433`. Приложение ходит в базу по внутренней сети compose, порт снаружи ему не нужен.

При старте контейнер применяет миграции (`prisma migrate deploy`) и заполняет базу (`prisma db seed`). Повторный запуск сида очищает таблицы и создаёт данные заново.

Локально без Docker: скопируйте `.env.example` в `.env`, поднимите Postgres, затем `bun install`, `bunx prisma migrate dev`, `bunx prisma db seed`, `bun run start:dev`.

## Запрос

Корень называется `getProfile`: профиль один, отдельный список профилей не нужен.

```graphql
query {
  getProfile {
    name
    description
    githubUrl
    skills {
      name
    }
    experience {
      company
      position
      startDate
      endDate
      achievments
    }
    projects {
      name
      repoUrl
      url
    }
  }
}
```

Мутация `updateProfile` меняет только поля профиля и закрыта заголовком `x-api-key` (`ADMIN_API_KEY`). Чтение открыто.

## Архитектура

Один профиль-синглтон. Визитка описывает одного человека, поэтому нет пользователей, пагинации и `profile(id)`. `ProfileService.getSingleton()` берёт первую запись.

Слои разделены по ответственности:

- `src/profile/models` — GraphQL-типы, контракт API.
- `src/profile/profile.resolver.ts` — вход в API: достаёт данные и отдаёт их наружу, без запросов к базе.
- `src/profile/profile.service.ts` — бизнес-логика и единственное место, где профиль читается и обновляется.
- `src/prisma` — подключение к Postgres. Сервис зависит от `PrismaService`, не от драйвера напрямую.
- `src/auth` — `ApiKeyGuard` только для мутации. Чтение визитки не требует ключа.

Prisma — источник схемы базы. GraphQL-модели повторяют её поля, но живут отдельно: клиент не должен зависеть от имён колонок (`github_url` снаружи `githubUrl`). Общие `id`, `createdAt`, `updatedAt` вынесены в `BaseModel`.

Связи грузятся одним `findFirst({ include })`, а не отдельными резолверами. На один `getProfile` Prisma отправляет 4 SQL: профиль и по одному на `skills`, `experience`, `projects` через `WHERE profile_id IN (...)`. Число запросов не растёт с числом навыков или проектов, поэтому это не N+1. DataLoader не используется: родитель один, батчить нечего. Он понадобится, если появится список профилей и поле связи будет резолвиться отдельно для каждого родителя.

`sortOrder` и индексы `(profile_id, sort_order)` задают стабильный порядок навыков, опыта и проектов без сортировки на клиенте.

## Почему так, а не иначе

- Code-first GraphQL (`@nestjs/graphql`) вместо отдельной `.graphql`-схемы: типы и валидация лежат рядом с Nest-модулем, `schema.gql` только генерируется.
- Миграции, а не `db push`: старт с пустой базы воспроизводим, схема меняется версионируемыми SQL-файлами.
- Сид при старте контейнера: проверяющий поднимает проект одной командой и сразу видит данные.
- Мутация показывает, что запись отделена от чтения и защищена, не раздувая модель.
