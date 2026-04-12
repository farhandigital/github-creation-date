export function isGithubRepoPathname(pathname: string): boolean {
    const pathLength = pathname.split('/').length;
    return pathLength === 3;
}

export function extractUsernameAndRepo(pathname: string): { username: string; repo: string } | null {
    if (!isGithubRepoPathname(pathname)) {
        return null;
    }
    const parts = pathname.split('/');
    const username = parts[0];
    const repo = parts[1];
    return { username, repo };
}