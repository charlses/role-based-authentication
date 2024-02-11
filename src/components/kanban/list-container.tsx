'use client'
import { ListWithItems } from '../../../types'
import { ListForm } from './list-form'
import { useState, useEffect } from 'react'
import { ListItem } from './list-item'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { updateListOrder } from '@/server/actions/kanban/update-list-order'
import { toast } from 'sonner'
import { updateCardOrder } from '@/server/actions/kanban/update-card-order'

interface ListContainerProps {
  data: ListWithItems[]
  boardId: string
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data)

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result
    if (!destination) {
      return
    }
    //if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    //use moves a list
    if (type === 'list') {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      )
      setOrderedData(items)
      //Todo: Trigger server Action!
      updateListOrder({ items, boardId }).then((data) => {
        if (data.error) {
          toast.error(data.error)
        }
        if (data.success) {
          toast.success(data.success)
        }
      })
    }
    //User moves a card
    if (type === 'card') {
      let newOrderedData = [...orderedData]

      //source and destination
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      )
      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      )

      if (!sourceList || !destinationList) {
        return
      }

      //check if cards exist on the sourceList
      if (!sourceList.kanbanListItem) {
        sourceList.kanbanListItem = []
      }
      if (!destinationList.kanbanListItem) {
        destinationList.kanbanListItem = []
      }

      //Moving the card in the smae list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.kanbanListItem,
          source.index,
          destination.index
        )
        reorderedCards.forEach((card, idx) => {
          card.order = idx
        })
        sourceList.kanbanListItem = reorderedCards
        setOrderedData(newOrderedData)
        //todo: trigger server action to do the same in the database
        updateCardOrder({
          items: reorderedCards,
          boardId
        })
          .then((data) => {
            if (data.error) {
              toast.error(data.error)
            }
            if (data.success) {
              toast.success(data.success)
            }
          })
          .catch((error) => {
            toast.error('Something went wrong try again later!')
          })

        //User moved the card to another list
      } else {
        const [movedCard] = sourceList.kanbanListItem.splice(source.index, 1)

        //assign new listId to the moved card
        movedCard.listId = destination.droppableId

        //add card do the destination list
        destinationList.kanbanListItem.splice(destination.index, 0, movedCard)

        //Reorder the new list
        sourceList.kanbanListItem.forEach((card, idx) => {
          card.order = idx
        })

        //update the order for each card in the destination list
        destinationList.kanbanListItem.forEach((card, idx) => {
          card.order = idx
        })
        setOrderedData(newOrderedData)

        //todo: trigger server action to do the same in the databases
        updateCardOrder({
          items: destinationList.kanbanListItem,
          boardId
        })
          .then((data) => {
            if (data.error) {
              toast.error(data.error)
            }
            if (data.success) {
              toast.success(data.success)
            }
          })
          .catch((error) => {
            toast.error('Something went wrong try again later!')
          })
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='lists' type='list' direction='horizontal'>
        {(provided) => (
          <ol
            className='flex gap-x-3 h-full'
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {orderedData &&
              orderedData.map((list, index) => {
                return <ListItem key={list.id} index={index} data={list} />
              })}
            <ListForm boardId={boardId} />
            <div className='flex-shrink-0 w-1' />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}
