import { formatDate } from '../utils/date';
import { log } from '../utils/logger'

function getTargetElement() {
    // Find the parent container that has the "About" h2
    const aboutHeadings = document.querySelectorAll('h2');
    let parentContainer: Element | null = null;
    
    for (const heading of aboutHeadings) {
        if (heading.textContent?.trim().toLowerCase() === 'about') {
            parentContainer = heading.parentElement;
            break;
        }
    }

    // Must have About parent to proceed
    if (!parentContainer) {
        return undefined;
    }

    // Primary: Look for Readme within the About parent
    const readmeElement = parentContainer.querySelector("a[href='#readme-ov-file']");
    if (readmeElement) {
        return readmeElement.parentElement;
    }

    // Fallback: Look for Activity within the SAME About parent
    const activityElement = parentContainer.querySelector("a[href*='/activity']");
    if (activityElement) {
        return activityElement.parentElement;
    }

    return undefined;
}

function createCreationDateElement(creationDate: string) {
    const container = document.createElement('div');
    container.classList.add('mt-2');
    container.dataset.creationDate = "creation-date-container";

    const creationDateElement = document.createElement('a');
    creationDateElement.classList.add('Link--muted');
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 tmp-mr-2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>`;
    creationDateElement.innerHTML = `${svgString} ${formatDate(new Date(creationDate))}`;
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
        return;
    }
    log("Target element not found", targetElement);
}