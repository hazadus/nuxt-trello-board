# Trello Board with Nuxt 3

Trello (kanban) board clone implemented in TypeScript with Nuxt 3.

## Features

- Kanban board with columns, cards, and full drag-and-drop support.
- Mark cards as "done" or "favorite".
- Data stored on backend in MongoDB.
- User authentication (no sign up at the moment, login and logout only).

**Coming soon**: implement sign up page, allow to create and manage multiple boards. When these features will be ready, I'll deploy the app for public access.

See [Issues](https://github.com/hazadus/nuxt-trello-board/issues) tab for all planned features.

## Controls

- `tab`: cycle columns and cards.
- `space`: mark card as completed.
- `enter`: mark card as starred.
- `backspace`: delete card.

## Frameworks, modules and libraries used

- [Nuxt](https://nuxt.com/) as frontend and backend.
- [VueUse](https://nuxt.com/modules/vueuse)
- Backend:
  - Mongoose: [site](https://mongoosejs.com) / [repo](https://github.com/Automattic/mongoose) - cool ORM for MongoDB.
  - [Joi](https://www.npmjs.com/package/joi): The most powerful schema description language and data validator for JavaScript.
  - [bcrypt](https://www.npmjs.com/package/bcrypt): A library to help you hash passwords.
- State Management:
  - [Pinia](https://pinia.vuejs.org/) | [Pinia Nuxt Module](https://nuxt.com/modules/pinia). If you encounter problems installing Pinia, try `npm i pinia -f` ([reference](https://stackoverflow.com/questions/74003458/cannot-find-module-pinia-dist-pinia-mjs-when-using-run-dev)).
- UI:
  - [Tailwind CSS](https://nuxt.com/modules/tailwindcss)
    - [Headless UI](https://headlessui.com)
    - [Flowbite](https://flowbite.com/) – Tailwind components
  - [Vuedraggable](https://sortablejs.github.io/vue.draggable.next/#/simple), based on [Sortable.js](https://github.com/SortableJS/Sortable)
  - [Nuxt Icon Module](https://nuxt.com/modules/icon)
    - [Icons](https://icones.js.org/)
  - [vue-toastification](https://github.com/Maronato/vue-toastification/tree/next)
- Forms:
  - [vee-validate](https://www.npmjs.com/package/vee-validate)

## Starting the project on your own

All commands below are supposed to be executed from repo directory.

### Using Docker Compose

- Clone the repo
- Install Docker, or Docker Desktop, if you don't have it.
- Run `docker compose up`
- Open app in the browser at `http://localhost`

### Running in development mode

- Clone the repo
- Install dependencies with `npm install --force` (force if you get an error about Pinia).
- Add MongoDB URI to `.env` file

```
# .env example
MONGO_DB_ADDRESS=mongodb://localhost:27017/board
```

- Install Docker, or Docker Desktop, if you don't have it.
- Run `docker compose up` in one terminal tab to get MongoDB up and running.
- Run `npm run dev` in other terminal tab to have auto updates in browser window.
- Open app in the browser at `http://localhost:3000`
- Work with the code at your pleasure!

## Recommended VSCode plugins

- Volar
  - Disable built-in TypeScript plugin for project's workspace
- Tailwind CSS Intellisense
- Iconify Intellisense by Antfu

## Known issues

Quick reminder on what to improve later.

- Focus reset from task after toggling completed, favorite status.

## Notes

Stuff I learned while working on this project.

- Run with Node18. Node19 throws an error `Cannot start nuxt:  The "name" argument must be specified`.
- Downgraded Node version to 18 because of this error ([reference](https://medium.com/@georgeenathomas/3-step-process-to-downgrade-node-version-using-homebrew-bc0b0a72ae27)).
- `Dockerfile.dev` made for dev mode, `Dockerfile` is somewhat "prod" version.
- Nuxt differences with plain Vue3:
  - You don't have to import components, functions from VueUse, stuff like `ref()`, etc.
  - `composables` directory content is also auto-imported.
- MongoDB preserves order of the items in arrays. So, to reorder tasks or columns, we just need to reorder array items, and save updated array in MongoDB document!

## References

- [Что такое kanban-доска?](https://www.atlassian.com/ru/agile/kanban/boards)
- [Build a Drag-and-Drop Trello Board with Vue.js](https://vueschool.io/courses/build-a-drag-and-drop-trello-board)
- [Deploying Nuxt Static Site to Github Pages with GitHub Actions](https://donlalicon.dev/articles/nuxt-static-github-pages-action)
- [Nuxt 3 Server Routes CRUD w/ MongoDB ](https://www.youtube.com/watch?v=1uWHDdcDZWw)
