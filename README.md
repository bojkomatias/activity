# Elysia with Bun runtime

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

## Project Structure

**/db** has the drizzle client and db init
**/components** has reusable UI components
**/models** has the logic, route handlers and components needed to function by itself... It attaches via plugin to Elysia main app
