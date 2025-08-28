import styles from "./extension-cards.css?inline";
import page from "./extension-card.html?raw";
import { getObjectsFromJson } from "../../src/extension-cards-json.ts";

interface ExtensionsArray {
  name: string;
  logo: string;
  description: string;
  isActive: boolean;
}

const extensionsArray: ExtensionsArray[] = await getObjectsFromJson();
const extensionsObject = Object.fromEntries(extensionsArray.map(extension => [extension.name.toLowerCase().replace(/\s+/g, "_"), extension]));

export class Extension extends HTMLElement {
  private shadow: ShadowRoot;

  constructor(){
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.renderHTML();
  }

  static get observedAttributes() {
    return ["extension", "state"];
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === "extension" && oldValue !== newValue) {
      this.updateContent();
    }
  }

  connectedCallback() {
    this.updateContent();
  }

  private renderHTML(){
    const template = document.createElement("template");
    template.innerHTML = `<style>${styles}</style>${page}`;
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  updateContent() {
    const extensionKey = this.getAttribute("extension").toLowerCase().replace(/\s+/g, "_");

    if (!extensionKey) {
      console.error("O atributo 'extension' está faltando no elemento.");
      return;
    }

    const extensionData = extensionsObject[extensionKey];

    if (!extensionData) {
      console.error(`Nenhum dado de extensão encontrado para a chave: ${extensionKey}`);
      return;
    }

    const extensionImg = this.shadow.getElementById("extension__img") as HTMLImageElement;

    if (extensionImg) {
      extensionImg.src = extensionData.logo;
    }
    
    const extensionTitle = this.shadow.getElementById("extension__title") as HTMLHeadingElement;

    if (extensionTitle) {
      extensionTitle.innerHTML = extensionData.name;
    }

    const extensionDescription = this.shadow.getElementById("extension__description") as HTMLParagraphElement;

    if (extensionDescription) {
      extensionDescription.innerHTML = extensionData.description;
    }

    const extensionOnOffToggleInput = this.shadow.getElementById("extension__on-off-toggle-input") as HTMLInputElement;

    const state = () => {
      if (extensionOnOffToggleInput.checked) {
        return `active`;
      } else {
        return `inactive`;
      }
    }
    
    if (extensionOnOffToggleInput) {
      extensionOnOffToggleInput.checked = extensionData.isActive;
      this.setAttribute(`state`, `${state()}`)
    }    

    this.removeExtension();
    
    extensionOnOffToggleInput.addEventListener(`input`, () => {this.setAttribute(`state`, `${state()}`)});
  }

  removeExtension() {
    const extensionRemoveButton = this.shadow.getElementById("extension__remove-button");
    extensionRemoveButton?.addEventListener(`click`, () => {
      if (confirm(`Are you sure you want to remove the extension? This action cannot be undone.`)) {
        this.remove();
      }
    })
  }
}