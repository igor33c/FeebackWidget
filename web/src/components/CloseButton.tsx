
import { Popover } from '@headlessui/react'
import { X } from 'phosphor-react'

export function CloseButton(){
    return(
        <Popover.Button className='top-5 right-6 absolute text-violet-500 hover:text-zinc-100' title='Fechar Formulário'>
            <X weight='bold' className='w-4 h-4'></X>
        </Popover.Button>
    )
}