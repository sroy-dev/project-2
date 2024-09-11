import { Dialog } from 'primereact/dialog'
import { forwardRef, useImperativeHandle, useState } from 'react'

export interface ModalRef {
    open: (data?: any) => void
    close: () => void
    toggle?: () => void
}
interface Props {
    children: any
    title?: string
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    disableBackdropClick?: boolean
    onClose?: () => void
    onOpen?: () => void
}

const Modal = forwardRef<ModalRef, Props>(
    ({ children, title, size = 'lg', disableBackdropClick = true, onClose, onOpen }, ref) => {
        const [visible, setVisible] = useState(false)
        const onHide = () => {
            setVisible(false)
            onClose?.()
        }
        useImperativeHandle(ref, () => ({
            open: () => {
                setVisible(true)
                onOpen?.()
            },
            close: () => {
                setVisible(false)
                onClose?.()
            },
            toggle: () => {
                setVisible((prevState) => !prevState)
            },
        }))

        const sizeMap: Record<string, string> = {
            sm: 'w-[400px]',
            md: 'w-[500px]',
            lg: 'w-[600px]',
            xl: 'w-[800px]',
            '2xl': 'w-[1000px]',
        }

        return (
            <Dialog
                visible={visible}
                onHide={onHide}
                header={title}
                draggable={false}
                dismissableMask={disableBackdropClick}
                resizable={false}
                pt={{
                    root: {
                        className: `bg-slate-800 border border-slate-700 text-slate-400 rounded font-inter text-[14px] max-w-[90vw] ${sizeMap[size]}`,
                    },
                    header: {
                        className: 'pt-3 px-3 font-medium',
                    },
                    headerTitle: {
                        className: 'text-base',
                    },
                    content: {
                        className: 'text-sm thin-scrollbar',
                    },
                    mask: {
                        className: 'bg-black/30 backdrop-blur-[1px]',
                    },
                }}
            >
                {children}
            </Dialog>
        )
    }
)

export default Modal
