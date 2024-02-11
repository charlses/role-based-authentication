'use client'

import { KanbanListItem } from '@prisma/client'
import { Draggable } from '@hello-pangea/dnd'

type CardItemProps = {
  data: KanbanListItem
  index: number
}

export const CardItem = ({ data, index }: CardItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className='truncate border-transparent hover:border-background py-2 px-3 text-sm bg-background rounded-md shadow-sm hover:bg-primary-foreground'
          role='button'>
          {data.title}
        </div>
      )}
    </Draggable>
  )
}
