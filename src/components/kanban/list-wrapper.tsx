interface ListWrapperProps {
  children: React.ReactNode
}

export const ListWrapper = ({ children }: ListWrapperProps) => {
  return <li className='relative min-h-full min-w-[250px]'>{children}</li>
}
