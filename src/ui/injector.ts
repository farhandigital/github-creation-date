import { formatDate } from '../utils/date';

function getTargetElement() {
    // The selector targets the "Readme" metadata element in the sidebar
    const selector = "a[href='#readme-ov-file']";
    return document.querySelector(selector)?.parentElement;
}

function createCreationDateElement(creationDate: string) {
    const container = document.createElement('div');
    container.dataset.creationDate = "creation-date-container";
    container.classList.add('mt-2');

    const creationDateElement = document.createElement('p');
    creationDateElement.classList.add('Link', 'Link--muted');
    creationDateElement.textContent = `🗓️ ${formatDate(new Date(creationDate))}`;
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