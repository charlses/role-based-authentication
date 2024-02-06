import { KanbanListItem, KanbanList } from '@prisma/client'

export type ListWithItems = KanbanList & { kanbanListItem: KanbanListItem[] }

export type ItemWithList = KanbanListItem & { kanbanList: KanbanList[] }
