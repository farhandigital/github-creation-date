import { getCreationDate } from "./adapters/getCreationDate";
import { injectCreationDate, isAlreadyInjected } from "./ui/injector";
import { extractUsernameAndRepo } from "./utils/url";

let isRunning = false;

async function main() {
    if (isRunning) {
      console.log('Already running. Skipping.');
      return;
    }
    console.log('Starting...');
    isRunning = true;

    try {
        const hostname = window.location.hostname;
        if (hostname !== 'github.com') return;
        if (isAlreadyInjected()) {
            console.log('Creation date element already exists. Skipping injection.');
            return;
        }
        const url = window.location.href;
        const repoInfo = extractUsernameAndRepo(url);
        if (!repoInfo) return;

        const { username, repo } = repoInfo;
        const creationDate = await getCreationDate(username, repo);
        injectCreationDate(creationDate);

        console.log(`Repository ${username}/${repo} was created on: ${creationDate}`);
    } finally {
        isRunning = false;
    }
}

setInterval(main, 300);
