import {Tooltip as PrimeTooltip} from 'primereact/tooltip'
import {FC, ReactNode, useRef} from 'react'

interface Props {
    message: string | ReactNode
    children: ReactNode
    position?: 'top' | 'bottom' | 'left' | 'right'
}

const Tooltip: FC<Props> = ({message, children, position = 'top'}) => {
    const targetClassName = useRef(`tooltip-${Math.random().toString(36).substr(2, 9)}`)
    return (
        <>
            <PrimeTooltip
                target={`.${targetClassName.current}`}
                position={position}
                pt={{
                    text: {
                        className:
                            'text-[12px] font-inter font-normal text-slate-200/80 bg-slate-700 shadow rounded py-1 px-2',
                    },
                    arrow: {
                        className: 'border-transparent',
                    },
                }}
            >
                {message}
            </PrimeTooltip>
            <div className={targetClassName.current}>{children}</div>
        </>
    )
}

export default Tooltip
