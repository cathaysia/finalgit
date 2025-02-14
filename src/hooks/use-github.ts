import { useQuery } from '@tanstack/react-query';
import { Octokit } from 'octokit';
import { useAppStore } from './use-store';

export function useGhAvatar(userName: string) {
  const [ghApi, token] = useAppStore(s => [s.githubApiUrl, s.githubToken]);

  return useQuery({
    queryKey: ['github_avatar', userName, ghApi],
    queryFn: async () => {
      const octokit = new Octokit({
        auth: token.length === 0 ? undefined : token,
      });
      if (token.length !== 0) {
        await octokit.rest.users.getAuthenticated();
      }

      const res = await octokit.rest.search.users({ q: userName });
      if (res.status !== 200) {
        throw Error(`query failed: ${res.status}`);
      }

      const item = res.data.items;
      if (item.length === 0) {
        throw Error('result is empty');
      }

      return item[0].avatar_url;
    },
  });
}
