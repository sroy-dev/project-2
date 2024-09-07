import {useField} from 'formik'
import {CSSProperties, ChangeEvent, FC, ReactNode, TextareaHTMLAttributes, useState} from 'react'
import Error from '../Error'
import Label from '../Label'

interface Props extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'onChange'> {
    name: string
    value?: string
    label?: string | ReactNode
    labelStyle?: string | CSSProperties
    containerStyle?: string | CSSProperties
    size?: 'sm' | 'md' | 'lg' | 'xl'
    showOptionalLabel?: boolean
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
    noBorder?: boolean
    helperMessage?: string | ReactNode
    hideError?: boolean
}

const TextArea: FC<Props> = ({
    name,
    label,
    value,
    showOptionalLabel = false,
    className = '',
    size = 'sm',
    containerStyle,
    labelStyle,
    onChange,
    noBorder = false,
    helperMessage,
    hideError = false,
    ...rest
}) => {
    const [inputValue, setInputValue] = useState(value)

    const sizeClass = {
        sm: 'text-xs px-3 py-1 min-h-[34px] rounded-[4px]',
        md: 'text px-4 py-1 min-h-[42px] rounded-[6px]',
        lg: 'text-lg px-6 py-2 min-h-[56px] rounded-[10px]',
        xl: 'text-xl px-8 py-3 min-h-[72px] rounded-[15]',
    }[size]

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [field, meta, helpers] = name ? useField(name || '') : [null, null, null]

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value)
        field?.onChange({target: {name, value: e.target.value}})
    }

    return (
        <div
            className={`mb-4 ${typeof containerStyle === 'string' && containerStyle}`}
            style={(typeof containerStyle === 'object' && containerStyle) || undefined}
        >
            <Label label={label} labelStyle={labelStyle} isOptional={showOptionalLabel} />
            <textarea
                className={` leading-[1.5] w-full block outline-none thin-scrollbar ${
                    noBorder ? '' : 'border border-gray-300  focus:border-primary'
                }  placeholder:text-gray-300 ${sizeClass} ${className}`}
                onChange={handleChange}
                value={field ? field?.value : inputValue || ''}
                {...rest}
            />

            {helperMessage &&
                (typeof helperMessage === 'string' ? (
                    <div className='text-sm text-gray-500'>{helperMessage}</div>
                ) : (
                    helperMessage
                ))}
            {meta?.touched && !hideError && <Error error={meta.error} />}
        </div>
    )
}

export default TextArea
