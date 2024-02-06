'use client'

import { ListWithItems } from '../../../types'

interface ListItemProps {
  data: ListWithItems
  index: number
}

export const ListItem = ({ data, index }: ListItemProps) => {
  return (
    <li className='shrink-0 h-[calc(screen-16rem)] w-[250px] select-none'>
      <div className='w-full rounded-md shadow-md bg-accent'>
        <div className='pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2'>
          <div className='w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent'>
            {data.title}
          </div>
        </div>
      </div>
    </li>
  )
}
