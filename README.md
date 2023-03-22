# Trello Board with Nuxt 3

## References
- [Что такое kanban-доска?](https://www.atlassian.com/ru/agile/kanban/boards)
- [Build a Drag-and-Drop Trello Board with Vue.js](https://vueschool.io/courses/build-a-drag-and-drop-trello-board)
- Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Frameworks and modules used
- [Nuxt](https://nuxt.com/)
- [Tailwind CSS](https://nuxt.com/modules/tailwindcss)
- [Vuedraggable](https://sortablejs.github.io/vue.draggable.next/#/simple), based on [Sortable.js](https://github.com/SortableJS/Sortable)
- [VueUse](https://nuxt.com/modules/vueuse)
- [nanoid](https://www.npmjs.com/package/nanoid)
- [Nuxt Icon Module](https://nuxt.com/modules/icon)
  - [Icons](https://icones.js.org/)

## Notes

- Run with Node18. Node19 throws an error `Cannot start nuxt:  The "name" argument must be specified`.
- Downgraded Node version to 18 because of this error ([reference](https://medium.com/@georgeenathomas/3-step-process-to-downgrade-node-version-using-homebrew-bc0b0a72ae27)).
- `Dockerfile.dev` made for dev mode, `Dockerfile` is somewhat "prod" version.
- Nuxt differences with plain Vue3:
  - You don't have to import components, functions from VueUse, stuff like `ref()`, etc.

## ToDos

- Exclude checkboxes, star buttons from `tab` traverse (in Firefox, at least).
- "Add new column" button.
- Handle task card cloning: change `id`, `createdAt` for cloned cards. See Sortable.js docs on how to do it.
- Add Stores (local storage).

## Ideas

- "Favorites" column (computed)
- Tags for tasks
- Comments for tasks
- Image attachments
- File attachments

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install --save-dev @nuxtjs/tailwindcss
npm i vuedraggable@next nanoid @vueuse/nuxt
npm install --save-dev nuxt-icon
npm install
```

## VSCode plugins

- Volar
- Disable built-in TypeScript plugin for this workspace
- Tailwind CSS

## Development Server

Start the development server on http://localhost:3000

Tailwind Config viewer http://localhost:3000/_tailwind/

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Run with Docker Compose using Node:

```bash
docker compose up
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
