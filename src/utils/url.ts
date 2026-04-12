export function isGithubRepoPathname(pathname: string): boolean {
    const pathLength = pathname.split('/').length;
    return pathLength === 3;
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