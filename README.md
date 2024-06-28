# alexandervarwijk.com
This repository contains Alexander's website that's hosted at www.alexandervarwijk.com.

## Development
Cloning this repository and running `composer install` will download all the
dependencies needed for the website.

## Docker
This repository contains docker files that build images for development, continuous integration,
and production.

### Compose philosophy
This repository contains various compose files that provide ways to run the docker set-up in
development, build the production images, run images in the CI and run production images locally.
The goal of the files is to make sure that local development "just works" without having to
specify any arguments to `docker compose`. Additionally running a production-like set-up or building
production images should require at most specifying two compose files together, but is ideally
limited to one. As a result of these goals, CI commands may need to chain together multiple compose
files, but this is considered to be okay since those are static in workflow files and not often
typed out or copy-pasted.

#### `compose.prod.yaml`
This file contains the services that needed to run in production and is used as a base
configuration by other files to document the dependencies needed between the different services.

#### `compose.yaml` and `compose.override.yaml`
`compose.yaml` contains a docker-compose file that
[builds the production images](#publishing-a-production-image) and `compose. override.yaml`
contains overrides [specific to local development](#for-development). The override file is
automatically loaded if no compose file is specified to `docker compose`.

#### Other `compose.*.yaml` files
The other files are used to split out shared configuration for various services and automated
tasks. Refer to the header of the individual files for an explanation of their purpose, but you
should find that unless you're working on the compose set-up specifically or changing how the CI
works, there should be no need to load a file beyond the ones documented above.

### Env files
Docker and application behaviour is controlled through a set of `.env` files. The primary `.env`
file contains versioning information for the different images in use (e.g. nginx, PHP, MariaDB
versions).

The `.env.development` file is ignored by git and can be used to tweak your local development
environment and application behaviour during development. The `.env.development.dist`  file
contains the latest reference example for `.env.development` and you should be able to copy the
dist-file at any point to get a working local installation.

```bash
cp .env.development.dist .env.development
```

The environment variables in the env-files are required by the application and are provided in
production through the env-manager of the target host.

### For development
For full information on the commands and flags you can pass to `docker compose` view the
[docker compose CLI reference](https://docs.docker.com/compose/reference/).

To run the docker set-up in development mode, make sure you have a local `.env.development` file and
then run Docker compose:
```bash
docker compose up -d
```

The `-d` flag  will `--detach` and run the containers in the background, requiring the
containers to be stopped with `docker compose stop`. To instead view the
logs for the container, remove this flag, this will require you to stop the containers using
`ctrl + c`.

#### Using the CLI container to run Drush
Running CLI commands is only available through the special CLI container that is separate from
the primary community container. Use `docker compose run`

```bash
docker compose run --no-deps --rm cli drush status
```

The `--no-deps` flag ensures the Open Social PHP, router, and database container are not started
multiple times. The `--rm` flag cleans up the CLI container afterward as any run invocation
will create a new instance.

### Running a production image
It can be useful to run a specific version of Open Social locally, you can do this by specifying
the `compose.yaml` as the only compose file Docker should use. However, this does require
specifying an Open Social version, for example:

```bash
WEBSITE_VERSION=2024.1.0 docker compose -f compose.prod.yaml up --no-build -d
```

Since the `compose.yaml` file does not automatically load .env files into the application
container you will need to specify this manually:
```bash
# Use a custom production-like configuration
WEBSITE_VERSION=2024.1.0 docker compose -f compose.prod.yaml --env-file=.env --env-file=.env.production up --no-build  -d

# Re-use your local development configuration
WEBSITE_VERSION=2024.1.0 docker compose -f compose.prod.yaml --env-file=.env --env-file=.env.development up --no-build  -d
```

The `--no-build` argument ensures Docker only uses released images and does not build your
current file system as the specified version in case it does not exist.

If you receive the error `unable to get image 'ghcr.io/kingdutch/alexandervarwijk-website-router:':
Error response from daemon: invalid reference format` then you've forgotten to specify the
`WEBSITE_VERSION` environment variable in your command.

### Publishing a production image
Prefer using automated processes such as GitHub workflows to publish images. However, if you
find yourself in the need to publish an image manually, follow the steps below.

Make sure you have the version of the code checked out that you wish to create the image with.
This includes `composer.json` and `composer.lock` files, as well as the various `docker/`
configuration files.

Before continuing you must make sure you're authenticated with the GitHub container registry.
Once authenticated you can use `docker compose` to build and push the image.

```bash
WEBSITE_VERSION=<version> docker compose -f compose.yaml --profile cli build --push
```

The above command will build the images, tag them with `<version>` and push them to the correct
place in GitHub's container registry. `--profile cli` is needed to ensure the CLI image is also
built. It'll include the PHP FPM and Router image automatically.

The command expects that Composer credentials are available in the `COMPOSER_AUTH` environment
as is the case in the CI. However, you may wish to use your local Composer credentials instead.
You can do this by including the `compose.composer_auth.yaml` file:

```bash
WEBSITE_VERSION=<version> docker compose -f compose.yaml -f compose.composer_auth.yaml --profile cli build --push
```

### GitHub Container Registry
In order to use GitHub container registry you will need to follow the GitHub instructions and
[authenticate using a personal access token](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-with-a-personal-access-token-classic).
