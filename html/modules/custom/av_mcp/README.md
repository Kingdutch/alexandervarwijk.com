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

A token can only reach the MCP server when:

- it was issued with the `mcp` scope, which this module advertises in the
  protected resource metadata, and
- the user who authorized it has the `MCP client` role.

The `mcp` scope limits a token to the permissions of the `MCP client` role,
so an AI assistant can't do more than read content even when the user who
authorized it is an administrator. User 1 is the exception: core's super user
policy still applies to its tokens, so authorize with a regular account.

## Required secrets

- An RSA key pair at `/app/files_private/oauth/{private,public}.key`, used to
  sign access tokens. Generate it with
  `drush simple-oauth:generate-keys /app/files_private/oauth` after creating
  the directory.
- A secret `hash_salt` of at least 32 characters. Simple OAuth uses it to
  encrypt authorization codes and refresh tokens, so it must not be the value
  committed to this public repository. On Platform.sh set it as the sensitive
  variable `drupalsettings:hash_salt`.
