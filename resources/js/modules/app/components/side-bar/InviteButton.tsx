import { Button } from '@/components/button'
import { FC, useRef } from 'react'
import { GoPlus } from 'react-icons/go'
import InviteModal from './InviteModal'

const InviteButton: FC = () => {
    const modalRef = useRef<any>(null)

    return (
        <>
            <Button
                className='text-slate-400 border border-slate-700'
                variant='transparent'
                onClick={() => modalRef.current?.open()}
            >
                <GoPlus className='text-lg' />
                <span>Invite Member</span>
            </Button>

            <InviteModal ref={modalRef} />
        </>
    )
}

export default InviteButton
