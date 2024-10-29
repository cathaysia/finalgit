import { useQuery } from '@tanstack/react-query';
import { P, isMatching } from 'ts-pattern';

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
  return useQuery({
    queryKey: ['github_avatar', userName],
    queryFn: async () => {
      const res = await fetch(
        `https://api.github.com/search/users?q=${userName}`,
      );
      const body = JSON.parse(await res.text()) as SearchResult;
      if (isMatching({ status: P.select() }, body)) {
        throw new Error(`query avatar for ${userName} failed`);
      }

      if (body.items.length === 0) {
        return '';
      }
      return body.items[0].avatar_url;
    },
  });
}
