# Trello Board with Nuxt 3

## References 
- [Build a Drag-and-Drop Trello Board with Vue.js](https://vueschool.io/courses/build-a-drag-and-drop-trello-board)
- Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Frameworks and modules used
- [Nuxt](https://nuxt.com/)
- [Tailwind CSS](https://nuxt.com/modules/tailwindcss)
- [Vuedraggable](https://sortablejs.github.io/vue.draggable.next/#/simple)
- [VueUse](https://nuxt.com/modules/vueuse)
- nanoid
- [Nuxt Icon Module](https://nuxt.com/modules/icon)
  - [Icons](https://icones.js.org/)

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

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
