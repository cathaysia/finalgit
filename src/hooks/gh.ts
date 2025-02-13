import { useQuery } from '@tanstack/react-query';
import { P, isMatching } from 'ts-pattern';
import { useAppStore } from './use-store';

interface SearchUserItem {
  id: number;
  // biome-ignore lint/style/useNamingConvention: <explanation>
  avatar_url: string;
}
interface SearchUserProps {
  items: SearchUserItem[];
}

interface SearchError {
  status: string;
}

type SearchResult = SearchError | SearchUserProps;

export function useGhAvatar(userName: string) {
  const [ghApi] = useAppStore(s => [s.githubApiUrl]);
  return useQuery({
    queryKey: ['github_avatar', userName, ghApi],
    queryFn: async () => {
      const res = await fetch(`${ghApi}/search/users?q=${userName}`);
      const body = JSON.parse(await res.text()) as SearchResult;
      if (isMatching({ items: P.select() }, body)) {
        if (body.items.length === 0) {
          return '';
        }
        return body.items[0].avatar_url;
      }

      throw new Error(`query avatar for ${userName} failed`);
    },
  });
}
