import { formatDate } from '../utils/date';

function getTargetElement() {
    // The selector targets the "Readme" metadata element in the sidebar
    const selector = "a[href='#readme-ov-file']";
    return document.querySelector(selector)?.parentElement;
}

function createCreationDateElement(creationDate: string) {
    const creationDateElement = document.createElement('p');
    creationDateElement.textContent = `Creation Date: ${formatDate(new Date(creationDate))}`;
    creationDateElement.dataset.creationDate = "creation-date-element";
    return creationDateElement;
}

export function isAlreadyInjected() {
    const existingElement = document.querySelector('p[data-creation-date="creation-date-element"]');
    return existingElement !== null;
}

export function injectCreationDate(creationDate: string) {
    const targetElement = getTargetElement();
    if (targetElement) {
        const creationDateElement = createCreationDateElement(creationDate);
        targetElement.insertAdjacentElement('afterend', creationDateElement);
    }
}