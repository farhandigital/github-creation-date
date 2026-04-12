function isGithubRepoUrl(url: string): boolean {
    const githubRepoUrlPattern = /^https:\/\/github\.com\/[^\/]+\/[^\/]+(\/)?$/;
    return githubRepoUrlPattern.test(url);
}

export function extractUsernameAndRepo(url: string): { username: string; repo: string } | null {
    if (!isGithubRepoUrl(url)) {
        return null;
    }
    const parts = url.split('/').filter(part => part.length > 0);
    const username = parts[parts.length - 2];
    const repo = parts[parts.length - 1];
    return { username, repo };
}