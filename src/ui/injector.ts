import { formatDate } from '../utils/date';

function getTargetElement() {
    // The selector targets the "Readme" metadata element in the sidebar
    const selector = "a[href='#readme-ov-file']";
    return document.querySelector(selector)?.parentElement;
}

function createCreationDateElement(creationDate: string) {
    const container = document.createElement('div');
    container.classList.add('mt-2');
    container.dataset.creationDate = "creation-date-container";

    const creationDateElement = document.createElement('a');
    creationDateElement.classList.add('Link--muted');
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 tmp-mr-2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>`;
    creationDateElement.innerHTML = `${svgString}${formatDate(new Date(creationDate))}`;
    creationDateElement.dataset.creationDate = "creation-date-element";
    container.appendChild(creationDateElement);
    return container;
}

export function isAlreadyInjected() {
    const existingElement = document.querySelector('div[data-creation-date="creation-date-container"]');
    return existingElement !== null;
}

export function injectCreationDate(creationDate: string) {
    const targetElement = getTargetElement();
    if (targetElement) {
        const creationDateElement = createCreationDateElement(creationDate);
        targetElement.insertAdjacentElement('afterend', creationDateElement);
    }
}