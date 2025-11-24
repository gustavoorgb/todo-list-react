FROM php:8.4-fpm

# Instalar dependências do sistema e extensões do PHP
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libonig-dev \
    libzip-dev \
    zip \
    curl \
    nginx \
    vim \
    && docker-php-ext-install intl pdo pdo_mysql mbstring zip \
    && apt-get clean

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Configurar diretório de trabalho
WORKDIR /var/www/html

# Copiar arquivos do projeto
COPY . .

# Configurar Nginx
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Expor porta
EXPOSE 80

# Rodar PHP-FPM e Nginx em foreground
CMD ["sh", "-c", "php-fpm & nginx -g 'daemon off;'"]
