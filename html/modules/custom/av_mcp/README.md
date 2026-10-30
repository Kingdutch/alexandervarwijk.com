# AV MCP

Exposes the site's posts, pages, talks and resources to AI assistants through
the [MCP Server](https://www.drupal.org/project/mcp_server) module, so they
can be used as context while writing.

## Tools

- `list_content`: lists content newest first, optionally filtered by type,
  publication status or a search on title and body.
- `get_content`: returns a single item by id or URL, including the body HTML,
  SEO fields and, for Layout Builder pages, the text of the inline blocks.

Both tools are read-only and use Drupal's node access for the account the
OAuth token belongs to. Unpublished content is only visible to its author.

## Authentication

The `/mcp` endpoint accepts OAuth 2.1 bearer tokens issued by Simple OAuth.
MCP clients discover the authorization server through
`/.well-known/oauth-protected-resource/mcp` and register themselves through
dynamic client registration at `/oauth/register`.

MCP clients request the `mcp` scope, which this module advertises in the
protected resource metadata. It is an umbrella scope whose child scopes each
grant one permission:

- `mcp:access`: `access mcp server`
- `mcp:content`: `access content`
- `mcp:unpublished`: `view own unpublished content`

A token is limited to the permissions its scopes grant that the user who
authorized it also has. Authors have `access mcp server` and
`grant simple_oauth codes`, so they can authorize clients, but an AI assistant
can't do more than read content even though authors can edit it. User 1 is
the exception: core's super user policy still applies to its tokens, so
authorize with a regular account.

## Required secrets

An RSA key pair at `/app/files_private/oauth/{private,public}.key`, used to
sign access tokens. Generate it with
`drush simple-oauth:generate-keys /app/files_private/oauth` after creating the
directory.
