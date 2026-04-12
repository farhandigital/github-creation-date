export function isGithubRepoPathname(pathname: string): boolean {
    const notUsername = new Set([
        'settings',
        'topics',
        'organizations',
    ])
    const pathParts = pathname.split('/');
    const pathLength = pathParts.length;
    const username = pathParts[1];
    return !notUsername.has(username) && pathLength === 3;
}

export function extractUsernameAndRepo(pathname: string): { username: string; repo: string } | null {
    if (!isGithubRepoPathname(pathname)) {
        return null;
    }
    const parts = pathname.split('/');
    const username = parts[1];
    const repo = parts[2];
    return { username, repo };
}