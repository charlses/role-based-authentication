'use client'
import { ListHeader } from './list-header'
import { ListWithItems } from '../../../types'
import { useState } from 'react'
import { CardForm } from './card-form'

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
    <li className='shrink-0 h-full w-[250px] select-none'>
      <div className='w-full rounded-md shadow-md bg-accent'>
        <ListHeader onAddCard={enableEditing} data={data} />
        <CardForm
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
          listId={data.id}
        />
      </div>
    </li>
  )
}
