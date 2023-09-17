# Bun + Elysia, HTMX, Hyperscript, Tailwind

### Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

### Project Structure

- **/db** contains the db connection + drizzle schemas
- **/components** has base layout, page and reusable UI components
- **/handlers** cointains route handlers and components close to business logic.


### Drizzle Schema

Update the schema adding files into /db/schema, then push the changes and run open the studio:

```bash
bun db:push

bun db:studio
```

### Create new handlers or extend the ones given

Separate the handler modules however you like.
Reusable parts can be built in 'setup.tsx' so you get type inference when creating a new handler.

### Build atomic components according to request and responses from your hypermedia server

Hypermedia driven applications with HTMX allow for a finegrained component swapping style. 
Organice your components clarifing separation of concerns and order of execution.
