import { Extension } from "../components/extension-cards/extension-card.ts";

customElements.define("extension-card", Extension);

const toggleTheme = document.getElementById(`toggle-theme`) as HTMLImageElement;
const html = document.documentElement as HTMLElement;
const sheme = document.getElementById(`sheme`) as HTMLMetaElement;
const logo = document.getElementById(`extensions-logo`) as HTMLImageElement;

toggleTheme.addEventListener(`click`, () => {
  if (toggleTheme.src.includes(`moon`)) {
    toggleTheme.src = `images/icon-sun.svg`;
    html.dataset.theme = `dark`;
    sheme.content = `dark`;
    logo.src = `images/logo-dark.svg`;
  } else {
    toggleTheme.src = `images/icon-moon.svg`;
    html.dataset.theme = `light`;
    sheme.content = `light`;
    logo.src = `images/logo.svg`;
  }
})

const extensions = Array.from(document.querySelectorAll(`extension-card`));
const toggleState = document.getElementById(`nav__state-buttons`) as HTMLElement;

toggleState.addEventListener(`input`, (event) => {
  if (event.target.id === `all`) {
    extensions.forEach(extension => extension.addEventListener(`input`, () => {
      extensions.forEach(extension => extension.setAttribute(`style`, `display:flex`));
    }))
    extensions.forEach(extension => extension.setAttribute(`style`, `display:flex`));
  } else if (event.target.id === `active`) {
      extensions.forEach(extension => extension.addEventListener(`input`, () => {
        extensions.forEach(extension => {
        if (extension.attributes[1].value === `active`) {
          extension.setAttribute(`style`, `display: flex`);
        } else {
          extension.setAttribute(`style`, `display: none`);
        }
      })
      }))
      extensions.forEach(extension => {
        if (extension.attributes[1].value === `active`) {
          extension.setAttribute(`style`, `display: flex`);
        } else {
          extension.setAttribute(`style`, `display: none`);
        }
      })
    } else if (event.target.id === `inactive`) {
      extensions.forEach(extension => extension.addEventListener(`input`, () => {
        extensions.forEach(extension => {
        if (extension.attributes[1].value === `inactive`) {
          extension.setAttribute(`style`, `display: flex`);
        } else {
          extension.setAttribute(`style`, `display: none`);
        }
      })
      }))
      extensions.forEach(extension => {
        if (extension.attributes[1].value === `inactive`) {
          extension.setAttribute(`style`, `display: flex`);
        } else {
          extension.setAttribute(`style`, `display: none`);
        }
      })
    }
})