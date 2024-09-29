# Docker images

This folder contains the things needed to run the website in a dockerized
manner.

## website/Dockerfile
For the website we currently only have a single Dockerfile located in the `website/` folder.
This Dockerfile can build into a few different images:

1) php-cli-environment
2) php-fpm-environment
3) router-environment
3) php-cli-development
4) php-fpm-development
5) builder
6) router-runtime
7) php-cli-runtime
8) php-fpm-runtime

The *-environment images are optimised base images that can be used to create
development and production environments. They do not yet contain any environment specific data.

The *-development images contain development tooling such as xDebug and can be
used in a docker compose environment.

The builder image is a disposable image that contains composer and is used to
bundle the files.

The *-runtime images contain all the build files and are optimised production
images that can be deployed using a cloud provider.
