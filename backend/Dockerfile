FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
  git curl libpq-dev unzip \
  && docker-php-ext-install pdo pdo_pgsql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html

CMD php artisan serve --host=0.0.0.0 --port=80