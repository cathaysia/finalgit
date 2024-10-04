import type { CommitInfo } from '@/bindings';
import CommitItem from '../atoms/CommitItem';
import VirtualScrollArea from '../atoms/VirtualScrollArea';
import { Draggable, Droppable } from '@hello-pangea/dnd';

export interface GitHistoryProps
  extends React.ComponentProps<typeof VirtualScrollArea> {
  history: CommitInfo[];
}

export default function GitHistory({
  className,
  history,
  ...props
}: Omit<GitHistoryProps, 'count' | 'height' | 'getItem'>) {
  return (
    <Droppable
      droppableId="history"
      mode="virtual"
      renderClone={(provided, _, rubic) => {
        const item = history[rubic.source.index];
        return (
          <CommitItem
            ref={provided.innerRef}
            commit={item}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          />
        );
      }}
    >
      {(provided, _) => {
        return (
          <VirtualScrollArea
            count={history.length}
            height={75}
            ref={provided.innerRef}
            getItem={(idx: number) => {
              const item = history[idx];
              return (
                <Draggable key={item.hash} index={idx} draggableId={item.hash}>
                  {(provided, _) => {
                    return (
                      <CommitItem
                        ref={provided.innerRef}
                        commit={item}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      />
                    );
                  }}
                </Draggable>
              );
            }}
            className={className}
            {...provided.droppableProps}
            {...props}
          />
        );
      }}
    </Droppable>
  );
}
