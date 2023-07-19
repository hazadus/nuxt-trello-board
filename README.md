# Trello Board with Nuxt 3

Trello board clone implemented in TypeScript with Nuxt 3.

Live demo at: https://hazadus.github.io/nuxt-trello-board/

Be aware that cards you create are saved in you local storage, not on the server! There's no backend in this demo, just static page.

## Controls

- `tab`: cycle columns and cards.
- `space`: mark card as completed.
- `enter`: mark card as starred.
- `backspace`: delete card.

## References

- [Что такое kanban-доска?](https://www.atlassian.com/ru/agile/kanban/boards)
- [Build a Drag-and-Drop Trello Board with Vue.js](https://vueschool.io/courses/build-a-drag-and-drop-trello-board)
- Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.
- [Deploying Nuxt Static Site to Github Pages with GitHub Actions](https://donlalicon.dev/articles/nuxt-static-github-pages-action)
- [Nuxt 3 Server Routes CRUD w/ MongoDB ](https://www.youtube.com/watch?v=1uWHDdcDZWw)

## Frameworks and modules used

- [Nuxt](https://nuxt.com/)
- [Tailwind CSS](https://nuxt.com/modules/tailwindcss)
- [Vuedraggable](https://sortablejs.github.io/vue.draggable.next/#/simple), based on [Sortable.js](https://github.com/SortableJS/Sortable)
- [VueUse](https://nuxt.com/modules/vueuse)
- [nanoid](https://www.npmjs.com/package/nanoid)
- [Nuxt Icon Module](https://nuxt.com/modules/icon)
  - [Icons](https://icones.js.org/)
- Mongoose: [site](https://mongoosejs.com) / [repo](https://github.com/Automattic/mongoose)
- [Joi](https://www.npmjs.com/package/joi): The most powerful schema description language and data validator for JavaScript.

## Notes

- Run with Node18. Node19 throws an error `Cannot start nuxt:  The "name" argument must be specified`.
- Downgraded Node version to 18 because of this error ([reference](https://medium.com/@georgeenathomas/3-step-process-to-downgrade-node-version-using-homebrew-bc0b0a72ae27)).
- `Dockerfile.dev` made for dev mode, `Dockerfile` is somewhat "prod" version.
- Nuxt differences with plain Vue3:
  - You don't have to import components, functions from VueUse, stuff like `ref()`, etc.

## ToDos

- 📌 Build Backend
- 📌 Handle task card cloning: change `id`, `createdAt` for cloned cards. See Sortable.js docs on how to do it.

## Ideas

- 💡 "Favorites" column (computed)
- 💡 "Soft" delete
- 💡 Tags for tasks
- 💡 Comments for tasks
- 💡 Image attachments
- 💡 File attachments

## Done

- 🚀 Add Stores (local storage).
- 🚀 Add "Delete" button for columns.
- 🚀 "Add new column" button.
- 🚀 Edit column title
- 🚀 Exclude checkboxes, star buttons from `tab` traverse (in Firefox, at least).

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

Tailwind Config viewer http://localhost:3000/\_tailwind/

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
