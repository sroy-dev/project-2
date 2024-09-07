import {useField} from 'formik'
import {Dropdown, DropdownChangeEvent, DropdownPassThroughMethodOptions} from 'primereact/dropdown'
import {classNames} from 'primereact/utils'
import {FC, ReactNode, useState} from 'react'
import Error from '../Error'
import Label from '../Label'

type Option = {
    label: string
    value: string | number
}

interface Props {
    containerClassName?: string
    className?: string
    label?: string
    showOptionalLabel?: boolean
    name?: string
    placeholder?: string
    disabled?: boolean
    options: Option[]
    onChange?: (value: any) => void
    value?: any
    initialValue?: any
    size?: 'sm' | 'md' | 'lg'
    searchable?: boolean
    valueTemplate?: (option: Option) => ReactNode
}

const SelectInput: FC<Props> = ({
    containerClassName,
    className = '',
    name,
    label,
    showOptionalLabel = false,
    onChange,
    value,
    initialValue,
    size = 'sm',
    searchable = true,
    valueTemplate,
    ...rest
}) => {
    const [values, setValues] = useState<any>(initialValue)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [field, meta, helpers] = name ? useField(name || '') : [null, null, null]

    const handleChange = (e: DropdownChangeEvent) => {
        const value = e.target.value
        field?.onChange({
            target: {
                name,
                value,
            },
        })
        setValues(value)
        onChange && onChange(e.target.value)
    }

    return (
        <div className={`mb-3 ${containerClassName}`}>
            <Label label={label} isOptional={showOptionalLabel} />
            <Dropdown
                filter={searchable}
                value={field?.value || value || values || ''}
                onChange={handleChange}
                valueTemplate={valueTemplate}
                {...rest}
                pt={{
                    root: ({state}: DropdownPassThroughMethodOptions) => {
                        return {
                            className: classNames(
                                `w-full text-[14px] font-inter ring-1 ring-inset ring-gray-300 rounded ${className}`,
                                {
                                    // 'ring-2 ring-inset ring-secondary': state.overlayVisible,
                                    'h-[56px]': size === 'lg',
                                    'h-[42px]': size === 'md',
                                    'h-[34px]': size === 'sm',
                                }
                            ),
                        }
                    },
                    input: ({props}: DropdownPassThroughMethodOptions) => {
                        return {
                            className: classNames('pl-3 pr-0 text-[13px]', {
                                'text-slate-300': props.value === '',
                                'text-slate-500': props.value,
                                'py-3': size === 'lg',
                                'py-2': size === 'md',
                                'py-[6px]': size === 'sm',
                            }),
                        }
                    },
                    wrapper: {
                        className: 'thin-scrollbar',
                    },
                    panel: {
                        className: 'border shadow-md',
                    },
                    item: ({context}: DropdownPassThroughMethodOptions) => {
                        return {
                            className: classNames('text-[13px] py-2 px-3 ', {
                                'bg-dark-200/10 text-dark-200': context.selected,
                                'text-dark-200': !context.selected,
                            }),
                        }
                    },
                    header: {
                        className: 'p-1 bg-slate-100 border-b border-gray-200',
                    },
                    filterInput: {
                        className:
                            'text-[13px] px-2 py-1 bg-transparent focus:outline-none focus:shadow-none',
                    },
                    filterIcon: {
                        className: 'h-[12px] -mt-[6px]',
                    },
                    emptyMessage: {
                        className: 'text-slate-500 text-[14px]',
                    },
                    trigger: () => {
                        return {
                            className: classNames({
                                'w-[42px]': size === 'lg',
                                'w-[36px]': size === 'md',
                                'w-[30px]': size === 'sm',
                            }),
                        }
                    },
                }}
            />
            {meta?.touched && <Error error={meta.error} />}
        </div>
    )
}

export default SelectInput
