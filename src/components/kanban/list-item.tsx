'use client'
import { ListHeader } from './list-header'

import { ListWithItems } from '../../../types'

interface ListItemProps {
  data: ListWithItems
  index: number
}

export const ListItem = ({ data, index }: ListItemProps) => {
  return (
    <li className='shrink-0 h-[calc(screen-16rem)] w-[250px] select-none'>
      <div className='w-full rounded-md shadow-md bg-accent'>
        <ListHeader data={data} />
      </div>
    </li>
  )
}
