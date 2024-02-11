'use client'
import { ListHeader } from './list-header'
import { ListWithItems } from '../../../types'
import { useState } from 'react'
import { CardForm } from './card-form'
import { CardItem } from './kanban-item'
import { Draggable, Droppable } from '@hello-pangea/dnd'

interface ListItemProps {
  data: ListWithItems
  index: number
}

export const ListItem = ({ data, index }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const disableEditing = () => {
    setIsEditing(false)
  }
  const enableEditing = () => {
    setIsEditing(true)
  }
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className='shrink-0 h-full w-[250px] select-none'>
          <div
            {...provided.dragHandleProps}
            className='w-full rounded-md shadow-md bg-accent'>
            <ListHeader onAddCard={enableEditing} data={data} />
            <Droppable droppableId={data.id} type='card'>
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`mx-1 px-1 py-0.4 flex flex-col gap-y-2 ${
                    data.kanbanListItem.length > 0 ? 'mt-2' : 'mt-0 h-[1px]'
                  }`}>
                  {data.kanbanListItem.map((item, index) => (
                    <CardItem index={index} key={item.id} data={item} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
              listId={data.id}
            />
          </div>
        </li>
      )}
    </Draggable>
  )
}
