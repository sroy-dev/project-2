import {classNames} from 'primereact/utils'
import {CSSProperties, FC, ReactNode} from 'react'

interface Props {
    className?: string
    theme?: 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'transparent'
    size?: 'sm' | 'md' | 'lg' | 'xl'
    style?: CSSProperties
    children: ReactNode
}

const Badge: FC<Props> = ({className = '', theme = 'gray', size = 'md', children, style}) => {
    const themeClass = {
        gray: 'bg-gray-100 text-gray-800',
        red: 'bg-red-100 text-red-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        green: 'bg-green-100 text-green-800',
        blue: 'bg-blue-100 text-blue-800',
        indigo: 'bg-indigo-100 text-indigo-800',
        purple: 'bg-purple-100 text-purple-800',
        transparent: 'bg-transparent text-gray-800',
    }[theme]
    const sizeClass = {
        sm: 'px-1.5 py-[2px] text-[10px] leading-none',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-0.5 text-base',
        xl: 'px-4 py-1 text-lg',
    }[size]

    return (
        <span
            className={classNames(
                `inline-flex items-center ${sizeClass} rounded-full font-medium ${themeClass} ${className}`
            )}
            style={style}
        >
            {children}
        </span>
    )
}

export default Badge
