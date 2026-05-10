# REG.RU Host-0 deployment

Этот вариант нужен для обычного виртуального хостинга REG.RU Host-0.
Сайт собирается в статические файлы, а заявки отправляются через PHP-обработчик
`/api/lead.php`.

## Что будет работать

- Все публичные страницы сайта.
- Формы заявок.
- Отправка заявок на email.
- HTTPS/SSL, если он включен в панели REG.RU.

## Что не используется

- Next.js server runtime.
- PostgreSQL.
- Prisma.
- Docker.
- Админ-панель и хранение заявок в базе.
- Локальная аналитика через `/api/analytics`.

## Настройка email

Перед сборкой проверьте email получателя в `public/api/lead.php`:

```php
config_value('LEADS_EMAIL_TO', 'g30107@gmail.com')
```

Если нужен другой адрес, замените его:

```php
config_value('LEADS_EMAIL_TO', 'your-email@example.com')
```

Для поля From лучше использовать почтовый ящик на том же домене:

```php
config_value('LEADS_EMAIL_FROM', 'no-reply@auto-drug.online')
```

Если на хостинге доступны переменные окружения через `.htaccess`, можно не менять
PHP-файл, а задать:

```apache
SetEnv LEADS_EMAIL_TO g30107@gmail.com
SetEnv LEADS_EMAIL_FROM no-reply@auto-drug.online
SetEnv SITE_NAME auto-drug.online
```

## Сборка

На компьютере разработчика:

```bash
npm run build:hosting
```

После успешной сборки готовый сайт будет в папке `out`.

## Загрузка на REG.RU

1. В панели REG.RU привяжите домен `auto-drug.online` к хостингу.
2. Откройте файловый менеджер или FTP/SFTP.
3. Перейдите в папку сайта, обычно это `public_html`.
4. Загрузите внутрь `public_html` содержимое папки `out`, не саму папку `out`.
5. Проверьте, что файл обработчика доступен на сервере как:

```text
https://auto-drug.online/api/lead.php
```

GET-запрос может вернуть `Method not allowed` — это нормально. Формы отправляют
POST-запрос.

## Проверка после загрузки

1. Откройте главную страницу сайта.
2. Отправьте тестовую заявку.
3. Проверьте почту получателя и папку спама.
4. Если письмо не пришло, проверьте:
   - заменен ли `CHANGE_ME@example.com`;
   - создан ли ящик `no-reply@auto-drug.online` или другой адрес From;
   - разрешена ли отправка через PHP `mail()` на тарифе;
   - не попало ли письмо в спам.
