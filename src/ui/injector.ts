function getSidebar() {
    const allH2Elements = document.querySelectorAll('h2');
    const sidebar = Array.from(allH2Elements).find((h2) => h2.textContent === 'About');
    return sidebar;
}

function createCreationDateElement(creationDate: string) {
    const creationDateElement = document.createElement('p');
    creationDateElement.textContent = `Creation Date: ${creationDate}`;
    creationDateElement.dataset.creationDate = "creation-date-element";
    return creationDateElement;
}

export function isAlreadyInjected() {
    const existingElement = document.querySelector('p[data-creation-date="creation-date-element"]');
    return existingElement !== null;
}

export function injectCreationDate(creationDate: string) {
    const sidebar = getSidebar();
    if (sidebar) {
        const creationDateElement = createCreationDateElement(creationDate);
        sidebar.appendChild(creationDateElement);
    }
}