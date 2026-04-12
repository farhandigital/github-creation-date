import { GM_xmlhttpRequest } from "$";
import { getCached, setCached } from './cache';
import { log } from '../utils/logger'

interface GitHubRepo {
    id: number;
    name: string;
    repo: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    pushedAt: string;
    stars: number;
    watchers: number;
    forks: number;
    defaultBranch: string;
}

interface UnghRepoResponse {
    repo: GitHubRepo;
}

function isUnghRepoResponse(data: unknown): data is UnghRepoResponse {
    return (
        data !== null &&
        typeof data === 'object' &&
        'repo' in data &&
        typeof (data as UnghRepoResponse).repo === 'object' &&
        typeof (data as UnghRepoResponse).repo.createdAt === 'string'
    );
}

export async function getCreationDate(username: string, repo: string): Promise<string> {
    const cacheKey = `${username}/${repo}`;
    const cached = getCached(cacheKey);
    if (cached) {
        log(`[cache] ${cacheKey}: ${cached}`);
        return cached;
    }

    const apiUrl = `https://ungh.cc/repos/${username}/${repo}`;
    log('fetching API...', apiUrl);
    return new Promise((resolve) => {
        GM_xmlhttpRequest({
            method: 'GET',
            url: apiUrl,
            onload: (response) => {
                if (response.status !== 200) {
                    console.error('GitHub API error:', response.statusText);
                    resolve('Unknown');
                    return;
                }
                try {
                    const data: unknown = JSON.parse(response.responseText);
                    if (isUnghRepoResponse(data)) {
                        setCached(cacheKey, data.repo.createdAt);
                        resolve(data.repo.createdAt);
                    } else {
                        console.error('Invalid response data:', data);
                        resolve('Unknown');
                    }
                } catch (error) {
                    console.error('Error parsing response:', error);
                    resolve('Unknown');
                }
            },
            onerror: (error) => {
                console.error('Network error:', error);
                resolve('Unknown');
            },
        });
    });
}