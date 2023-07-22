# Auth Nodejs
<p>This is a simple Nodejs Express project to Authorize and Authentication users<p>
<p>Can be easily use for other project</p>

<!-- TOC -->
* [Auth Nodejs](#auth-nodejs)
  * [Setup](#setup)
  * [Configuration details](#configuration-details)
    * [Supabase](#supabase)
    * [Typescript](#typescript)
  * [Usages](#usages)
    * [Routes](#routes)
<!-- TOC -->

## Setup
- Nodejs
- Express
- Typescript
- Supabase

## Configuration details
### Supabase
- Name : auth_nodejs
- Region : Singapore
- Organization : KhanhWorkTime

CLI
- `npx supabase login`
- `npx supabase gen types typescript --project-id [PROJECT-ID]`
- copy and create new models define

DB Config
- Authorization for public request !!!

### Typescript
`npx tsc --init --rootDir src --outDir build \--esModuleInterop --resolveJsonModule --lib es6 \--module commonjs --allowJs true --noImplicitAny true`

## Usages
### Routes
Authentication
- /login : 
  - param: {email, password}
  - return: {accessToken, refreshToken}
- /signup :
  - param: {email, password}
  - return: {id, email, created_at}
- /refreshToken :
  - param: {refreshToken}
  - return: {accessToken, refreshToken}

Users access
- /users : Get all users
  - required Authentication token
  - return: user list