'use client'
import { ListWithItems } from '../../../types'
import { ListForm } from './list-form'
import { useState, useEffect } from 'react'
import { ListItem } from './list-item'

interface ListContainerProps {
  data: ListWithItems[]
  boardId: string
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data)

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  return (
    <ol className='flex gap-x-3 h-full'>
      {orderedData &&
        orderedData.map((list, index) => {
          return <ListItem key={list.id} index={index} data={list} />
        })}
      <ListForm boardId={boardId} />
      <div className='flex-shrink-0 w-1' />
    </ol>
  )
}
