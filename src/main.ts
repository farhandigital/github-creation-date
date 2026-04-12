import { getCreationDate } from "./adapters/getCreationDate";
import { injectCreationDate, isAlreadyInjected } from "./ui/injector";
import { isGithubRepoPathname, extractUsernameAndRepo } from "./utils/url";
import { log } from './utils/logger'

let isRunning = false;

async function main() {
    if (isRunning) {
      log('Already running. Skipping.');
      return;
    }
    log('Starting...');
    isRunning = true;

    try {
        const hostname = window.location.hostname;
        if (hostname !== 'github.com') return;
        const pathname = window.location.pathname;
        if (!isGithubRepoPathname(pathname)) return;
        if (isAlreadyInjected()) {
            log('Creation date element already exists. Skipping injection.');
            return;
        }
        const repoInfo = extractUsernameAndRepo(pathname);
        if (!repoInfo) return;

        const { username, repo } = repoInfo;
        const creationDate = await getCreationDate(username, repo);
        injectCreationDate(creationDate);

        log(`Repository ${username}/${repo} was created on: ${creationDate}`);
    } finally {
        isRunning = false;
    }
}

setInterval(main, 300);
