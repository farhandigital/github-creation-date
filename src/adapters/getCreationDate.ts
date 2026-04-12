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
    const apiUrl = `https://ungh.cc/repos/${username}/${repo}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.statusText}`);
        }
        const data: unknown = await response.json();
        if (!isUnghRepoResponse(data)) throw new Error('Invalid response data');

        return data.repo.createdAt;
    } catch (error) {
        console.error('Error fetching creation date:', error);
        return 'Unknown';
    }
}