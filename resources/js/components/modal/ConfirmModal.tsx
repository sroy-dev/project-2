import {Button} from '@/components/button'
import {Dialog} from 'primereact/dialog'
import {ReactNode, forwardRef, useImperativeHandle, useState} from 'react'

interface ConfirmOptions {
    confirmAction: () => Promise<any>
}

export interface ConfirmModalRef {
    show: (options: ConfirmOptions) => void
    hide: () => void
}
interface ConfirmModalProps {
    header: string
    message?: string
    visible?: boolean
    confirmLabel?: string
    cancelLabel?: string
    onHide?: () => void
    onConfirm?: () => void
    children?: ReactNode
}

const ConfirmModal = forwardRef<ConfirmModalRef, ConfirmModalProps>(
    ({header, message, visible, confirmLabel, cancelLabel, onHide, onConfirm, children}, ref) => {
        const [isLoading, setIsLoading] = useState(false)
        const [isVisible, setIsVisible] = useState(visible ?? false)

        const [confirmHandler, setConfirmHandler] = useState<(() => Promise<void>) | undefined>()

        useImperativeHandle(ref, () => ({
            show: ({confirmAction}) => {
                setIsVisible(true)
                setConfirmHandler(() => confirmAction)
            },
            hide: () => {
                setIsVisible(false)
                setConfirmHandler(undefined)
            },
        }))

        const handleConfirm = async () => {
            if (confirmHandler) {
                setIsLoading(true)
                await confirmHandler()
                    .then(() => {
                        onConfirm?.()
                        setIsVisible(false)
                    })
                    .finally(() => {
                        setIsLoading(false)
                    })
            } else {
                onConfirm?.()
                setIsVisible(false)
                setConfirmHandler(undefined)
            }
        }

        const handleCancel = () => {
            setIsVisible(false)
            onHide?.()
            setConfirmHandler(undefined)
        }

        return (
            <Dialog
                visible={isVisible}
                header={header}
                onHide={handleCancel}
                draggable={false}
                pt={{
                    root: {
                        className: 'font-inter border w-[400px]',
                    },
                    header: {
                        className: 'pt-4',
                    },
                    headerTitle: {
                        className: 'text-base',
                    },
                    content: {
                        className: 'text-sm pb-5',
                    },
                    mask: {
                        className: 'backdrop-blur-[1px]',
                    },
                }}
            >
                {message && <p>{message}</p>}
                {children}
                <div className='flex justify-end mt-6 gap-2'>
                    <Button variant='transparent' onClick={handleCancel}>
                        {cancelLabel ?? 'Cancel'}
                    </Button>
                    <Button
                        variant='primary'
                        onClick={handleConfirm}
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        {confirmLabel ?? 'Delete'}
                    </Button>
                </div>
            </Dialog>
        )
    }
)

export default ConfirmModal
