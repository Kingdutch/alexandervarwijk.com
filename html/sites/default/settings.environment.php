<?php

// phpcs:ignoreFile
/**
 * @file
 * This settings file exists to allow Drupal to be configured through
 * environment variables. For example in a docker environment on AWS.
 *
 * This file makes use of the null-coalesce operator (`??`) to indicate
 * optional values.
 */

$settings['file_private_path'] = $_ENV["DRUPAL_PRIVATE_FILE_PATH"] ?? '/app/files_private';

$settings['hash_salt'] = $_ENV["DRUPAL_PROJECT_ENTROPY"];

$databases['default']['default'] = [
  'database' => $_ENV["DRUPAL_DATABASE"],
  'username' => $_ENV["DRUPAL_DATABASE_USERNAME"],
  'password' => $_ENV["DRUPAL_DATABASE_PASSWORD"],
  'prefix' => '',
  'host' => $_ENV["DRUPAL_DATABASE_HOST"],
  'port' => $_ENV["DRUPAL_DATABASE_PORT"],
  'driver' => 'mysql',
];

