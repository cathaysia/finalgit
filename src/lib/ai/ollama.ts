export interface StatePullDigestName {
  status: string;
  digest: string;
  total: number;
  completed: number;
}

export interface StatePullSuccess {
  status: 'success';
}

export interface StateError {
  error: string;
}

export type PullStat = StatePullDigestName | StatePullSuccess | StateError;

export type OllamaResponse = PullStat[];

export async function fetchModel(
  endpoint: string,
  moduleName: string,
  onDataComing: (data: PullStat) => boolean | undefined,
) {
  const cancelToken = new AbortController();
  const rep = await fetch(`${endpoint}/api/pull`, {
    method: 'POST',
    body: JSON.stringify({
      name: moduleName,
      stream: true,
    }),
    signal: cancelToken.signal,
  });
  const reader = rep.body?.getReader();
  if (!reader) {
    return;
  }

  let buffer = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const text = new TextDecoder().decode(value);
      buffer += text;
      if (buffer.includes('\n')) {
        if (onDataComing(JSON.parse(buffer))) {
          cancelToken.abort();
        }
        buffer = '';
      }
    }
    // biome-ignore lint/correctness/noUnusedVariables:
  } catch (e) {
    //
  }
}
