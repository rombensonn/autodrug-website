# Авто друг - production-ready сайт автосервиса

Next.js App Router сайт для автосервиса и шиномонтажа «Авто друг» в Балашихе. Проект рассчитан на деплой на VPS/VDS REG.RU с PostgreSQL на том же российском сервере.

## Стек

- Next.js 16, React 19, TypeScript
- Tailwind CSS, shadcn-style UI, Lucide React, Framer Motion
- React Hook Form, Zod
- Prisma ORM, PostgreSQL
- Docker Compose, Nginx reverse proxy

## Локальный запуск

1. Установите Node.js 22 LTS или новее.
2. Создайте `.env` из `.env.example`.
3. Поднимите PostgreSQL или используйте `docker compose up -d postgres`.
4. Установите зависимости:

```bash
npm ci
npm run db:generate
npm run db:migrate
npm run dev
```

Проверка здоровья: `http://localhost:3000/api/health`.

## Деплой на REG.RU VPS

1. Закажите VPS/VDS в REG.RU с размещением в России.
2. Выберите Ubuntu 22.04 LTS или Ubuntu 24.04 LTS.
3. Подключитесь по SSH:

```bash
ssh root@your_server_ip
```

4. Установите Docker и Docker Compose:

```bash
apt update
apt install -y ca-certificates curl git
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" > /etc/apt/sources.list.d/docker.list
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

5. Загрузите проект:

```bash
mkdir -p /opt/autodrug-website
cd /opt/autodrug-website
git clone <your-repository-url> .
```

6. Настройте `.env`:

```bash
cp .env.example .env
nano .env
```

Обязательно замените `DATABASE_URL`, `ADMIN_PASSWORD`, `SESSION_SECRET`, `IP_HASH_SALT`, `NEXT_PUBLIC_SITE_URL`.

7. Запустите миграции и сайт:

```bash
docker compose build
docker compose up -d postgres
docker compose run --rm app npx prisma migrate deploy
docker compose up -d
```

8. Настройте домен в REG.RU: A-запись должна указывать на IP VPS.
9. Настройте SSL: положите `fullchain.pem` и `privkey.pem` в `deploy/certs/` или подключите Let’s Encrypt/certbot и обновите volume в `docker-compose.yml`.
10. Проверьте:

```bash
curl -I https://your-domain.ru/robots.txt
curl -I https://your-domain.ru/sitemap.xml
curl https://your-domain.ru/api/health
```

## Проверка хранения ПДн

- Заявки сохраняются только в PostgreSQL из `DATABASE_URL`.
- IP не сохраняется в чистом виде: rate limit использует HMAC-хеш с `IP_HASH_SALT`.
- Telegram-уведомление содержит только ID заявки, услугу, источник и дату.
- CRM выключена по умолчанию. Персональные данные уходят в CRM только при `CRM_SEND_PERSONAL_DATA=true` и настроенном российском webhook.
- E-mail-уведомления включайте только через российский SMTP.
- WhatsApp-ссылка не получает данные из формы.

## Админ-панель

- Вход: `/admin/login`
- Заявки: `/admin/leads`
- Пароль задается в `ADMIN_PASSWORD`.
- Если `ADMIN_PASSWORD` не задан в production, админ-панель недоступна.
- Чтобы поменять пароль, обновите `.env` и перезапустите app:

```bash
docker compose up -d app
```

## Аналитика

Локальная аналитика включается через `ENABLE_LOCAL_ANALYTICS=true`. Сохраняются только события без ПДн: просмотр страницы, клик по телефону, WhatsApp, маршрут, показ карты и отправка формы.

Яндекс.Метрика выключена по умолчанию. Для включения:

```env
NEXT_PUBLIC_ENABLE_YANDEX_METRICA="true"
NEXT_PUBLIC_YANDEX_METRICA_ID="your_id"
```

Google Analytics, Meta Pixel, Hotjar, Amplitude, Mixpanel и зарубежные трекеры не используются.

## Telegram без ПДн

```env
TELEGRAM_BOT_TOKEN="..."
TELEGRAM_CHAT_ID="..."
TELEGRAM_SEND_PERSONAL_DATA="false"
```

Код отправляет в Telegram только безопасное уведомление без телефона, имени, автомобиля и описания проблемы.

## Backup и restore

Создать backup:

```bash
chmod +x deploy/scripts/backup-db.sh
./deploy/scripts/backup-db.sh
```

Восстановить backup:

```bash
chmod +x deploy/scripts/restore-db.sh
./deploy/scripts/restore-db.sh backups/autodrug-YYYYMMDD-HHMMSS.sql.gz
```

Если задан `BACKUP_ENCRYPTION_KEY`, backup шифруется через OpenSSL.

## Production checklist

- `npm run build` проходит без ошибок.
- `/api/health` возвращает `status: ok`.
- `/sitemap.xml` содержит главную, услуги, цены, отзывы, контакты, privacy и thanks.
- `/robots.txt` разрешает индексацию публичных страниц.
- Формы требуют согласие на обработку ПДн.
- Заявки не пишутся в localStorage/sessionStorage.
- Нет внешних CDN и Google Fonts.
- Карта Яндекса загружается только после клика «Показать карту».
