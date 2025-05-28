FROM php:8-fpm-alpine

ARG UID
ARG GID

ENV UID=${UID}
ENV GID=${GID}

RUN mkdir -p /var/www/html

WORKDIR /var/www/html

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Evita conflito de GID 20 com macOS
RUN delgroup dialout

# Cria grupo e usuário laravel com UID/GID personalizados
RUN addgroup -g ${GID} --system laravel \
    && adduser -G laravel --system -D -s /bin/sh -u ${UID} laravel

# Ajusta configuração do PHP-FPM para usar o novo usuário
RUN sed -i "s/user = www-data/user = laravel/g" /usr/local/etc/php-fpm.d/www.conf \
    && sed -i "s/group = www-data/group = laravel/g" /usr/local/etc/php-fpm.d/www.conf \
    && echo "php_admin_flag[log_errors] = on" >> /usr/local/etc/php-fpm.d/www.conf

# Instala extensões PDO e Redis
RUN docker-php-ext-install pdo pdo_mysql

# Instala Redis via PECL (forma mais confiável)
RUN apk add --no-cache $PHPIZE_DEPS \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del $PHPIZE_DEPS

# Define o usuário padrão como laravel
USER laravel

CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]
