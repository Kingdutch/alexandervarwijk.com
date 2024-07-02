################################################################################
# Multi-Stage Docker Build file for Drupal                                     #
#                                                                              #
# A multi-stage build file that is used to create PHP-FPM, PHP-CLI and nginx   #
# images. The PHP-FPM image is used to serve PHP web requests, the PHP-CLI can #
# be used for site maintenance and Drush updates and the nginx image is made   #
# to allow service static files.                                               #
################################################################################
# The arguments below should be controlled through .env
ARG PHP_VERSION
ARG PHP_ALPINE_VERSION
ARG NGINX_VERSION
ARG NGINX_ALPINE_VERSION

ARG COMPOSER_VERSION

# This is set to 1001 which matches the runner of GitHub hosted standard
# runners. In case you're using larger runners or are self-hosting runners
# you'll likely want to set this to 1000 instead.
ARG PROCESS_UID=1000
ARG PROCESS_GID=1000

################################################################################
# Composer versioning                                                          #
#                                                                              #
# Works around the inability to use build-args in COPY --from                  #
################################################################################
FROM composer:${COMPOSER_VERSION} AS composer

################################################################################
# Shared base images                                                           #
################################################################################
FROM php:${PHP_VERSION}-cli-alpine${PHP_ALPINE_VERSION} AS php-cli-environment
ARG PROCESS_UID
ARG PROCESS_GID

RUN apk add --no-cache \
            # Bash is installed to make developer live easier and make script
            # execution predictable.
            bash \
            bash-completion \
            # MariaDB Client is needed to make Drush database commands work.
            mariadb-client \
            # GD
            libjpeg-turbo-dev \
            libpng-dev \
            libwebp-dev \
            freetype-dev \
            # intl
            icu-dev \
            # gmp
            gmp-dev \
            # zip
            libzip-dev \
            zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install \
            gd  \
            pdo_mysql \
            intl \
            gmp \
            zip

RUN addgroup -g $PROCESS_GID web && \
    adduser --uid $PROCESS_UID --ingroup web --home /app --shell /bin/bash --disabled-password web

USER web
WORKDIR /app
ENV PATH="$PATH:/app/vendor/bin"

FROM php:${PHP_VERSION}-fpm-alpine${PHP_ALPINE_VERSION} AS php-fpm-environment
ARG PROCESS_UID
ARG PROCESS_GID

RUN apk add --no-cache \
            # Bash is installed to make developer live easier and make script
            # execution predictable.
            bash \
            bash-completion \
            # MariaDB Client is needed to make Drush database commands work.
            mariadb-client \
            # GD
            libjpeg-turbo-dev \
            libpng-dev \
            libwebp-dev \
            freetype-dev \
            # intl
            icu-dev \
            # gmp
            gmp-dev \
            # zip
            libzip-dev \
            zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install \
            gd  \
            pdo_mysql \
            intl \
            gmp \
            zip

RUN addgroup -g $PROCESS_GID web && \
    adduser --uid $PROCESS_UID --ingroup web --home /app --shell /bin/bash --disabled-password web

USER web
WORKDIR /app

FROM nginx:${NGINX_VERSION}-alpine${NGINX_ALPINE_VERSION} AS router-environment
ARG PROCESS_UID
ARG PROCESS_GID

RUN apk add --no-cache \
            # Bash is installed to make developer live easier and make script
            # execution predictable.
            bash \
            bash-completion

RUN addgroup -g $PROCESS_GID web && \
    adduser --uid $PROCESS_UID --ingroup web --home /app --shell /bin/bash --disabled-password web

RUN rm -r /etc/nginx/conf.d && mkdir /etc/nginx/conf.d
ADD docker/web/nginx /etc/nginx

WORKDIR /app

################################################################################
# Development specific images                                                  #
#                                                                              #
# Includes tools like xdebug.                                                  #
################################################################################
# Create a development image that includes tools like xdebug for PHP.
FROM router-environment AS router-development
LABEL org.opencontainers.image.description="Development router for Drupal (does not include source code)"
LABEL org.opencontainers.image.licenses="GPL-2.0-only"

FROM php-cli-environment AS php-cli-development
LABEL org.opencontainers.image.description="Development PHP CLI image for Drupal (does not include source code)"
LABEL org.opencontainers.image.licenses="GPL-2.0-only"

USER root

RUN apk add --no-cache \
            linux-headers \
            $PHPIZE_DEPS \
    && pecl update-channels \
    && pecl install  \
            xdebug \
    && docker-php-ext-enable \
            xdebug \
    && apk del $PHPIZE_DEPS \
    && rm -rf /tmp/pear

USER web

FROM php-fpm-environment AS php-fpm-development
LABEL org.opencontainers.image.description="Development PHP FPM image for Drupal (does not include source code)"
LABEL org.opencontainers.image.licenses="GPL-2.0-only"

USER root

RUN apk add --no-cache \
            linux-headers \
            $PHPIZE_DEPS \
    && pecl update-channels \
    && pecl install  \
            xdebug \
    && docker-php-ext-enable \
            xdebug \
    && apk del $PHPIZE_DEPS \
    && rm -rf /tmp/pear

USER web

################################################################################
# Production builder                                                           #
#                                                                              #
# Builds the source code for the production image and includes build-tools     #
# that shouldn't end up in the optimized production image.                     #
################################################################################
# A separate step is used which will download all the dependencies, allowing us
# to use composer without including composer in the end-resut.
FROM php-cli-environment AS builder
ENV COMPOSER_MEMORY_LIMIT=-1
ENV COMPOSER_NO_INTERACTION=1
WORKDIR /app

USER root
RUN apk add --no-cache \
            patch
USER web

COPY --from=composer /usr/bin/composer /usr/bin/composer

ADD --chown=web:web . /app/

RUN --mount=type=secret,target=auth.json,id=composer-auth,required=true,mode=444  \
    --mount=type=cache,target=.composer/cache,id=composer-cache,sharing=locked \
    composer install --no-dev --no-progress --optimize-autoloader

# Tests are removed to reduce the image size, these are not expected to be run
# in production. We use `-f` here because some modules (especially in core) have
# nested `tests` folders which match multiple times with `find` but then don't
# exist with the second `rm` invocation.
RUN find html/{modules,core} -name tests -type d | xargs rm -rf

################################################################################
# Production images                                                            #
#                                                                              #
# Optimized images that only contain the absolute minimum to run.              #
################################################################################
FROM router-environment AS router-runtime
LABEL org.opencontainers.image.description="alexandervarwijk.com - Router"
LABEL org.opencontainers.image.licenses="Proprietary"

COPY --from=builder --chown=web:web /app /app

FROM php-cli-environment AS php-cli-runtime
LABEL org.opencontainers.image.description="alexandervarwijk.com - CLI"
LABEL org.opencontainers.image.licenses="Proprietary"

ADD --chown=root:root ../../docker/web/php/cli-production.ini /usr/local/etc/php/conf.d/drupal-php.ini
COPY --from=builder --chown=web:web /app /app

FROM php-fpm-environment AS php-fpm-runtime
LABEL org.opencontainers.image.description="alexandervarwijk.com - PHP-FPM"
LABEL org.opencontainers.image.licenses="Proprietary"

ADD --chown=root:root ../../docker/web/php/fpm-production.ini /usr/local/etc/php/conf.d/drupal-php.ini
COPY --from=builder --chown=web:web /app /app
