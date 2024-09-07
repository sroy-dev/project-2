import {useField} from 'formik'
import {CSSProperties, ChangeEvent, FC, ReactNode, useCallback, useRef, useState} from 'react'
import {createReactEditorJS} from 'react-editor-js'
import Error from '../Error'
import Label from '../Label'
import {EDITOR_JS_TOOLS} from './tools'

const ReactEditorJS = createReactEditorJS()

interface Props {
    name: string
    value?: string
    label?: string | ReactNode
    labelStyle?: string | CSSProperties
    className?: string
    containerStyle?: string | CSSProperties
    size?: 'sm' | 'md' | 'lg' | 'xl'
    showOptionalLabel?: boolean
    validationError?: string
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
    noBorder?: boolean
    helperMessage?: string | ReactNode
}

const TextEditor: FC<Props> = ({
    name,
    label,
    value,
    showOptionalLabel = false,
    className = '',
    size = 'sm',
    containerStyle,
    labelStyle,
    validationError,
    onChange,
    noBorder = false,
    helperMessage,
}) => {
    const editorCore = useRef(null)

    const handleInitialize = useCallback((instance: any) => {
        editorCore.current = instance
        console.log('Editor is ready to work!', instance)
    }, [])

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

            <ReactEditorJS
                onInitialize={handleInitialize}
                tools={EDITOR_JS_TOOLS}
                defaultValue={{
                    time: 1556098174501,
                    blocks: [
                        {
                            type: 'header',
                            data: {
                                text: 'Editor.js',
                                level: 2,
                            },
                        },
                        {
                            type: 'paragraph',
                            data: {
                                text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.',
                            },
                        },
                    ],
                    version: '2.12.4',
                }}
                onChange={(e) => console.log(e)}
            />

            {helperMessage &&
                (typeof helperMessage === 'string' ? (
                    <div className='text-sm text-gray-500'>{helperMessage}</div>
                ) : (
                    helperMessage
                ))}
            {meta?.touched && <Error error={meta.error} />}
        </div>
    )
}

export default TextEditor
