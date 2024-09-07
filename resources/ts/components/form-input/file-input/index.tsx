import {Attachment} from '@/types/attachments'
import {useField} from 'formik'
import {
    CSSProperties,
    ChangeEvent,
    FC,
    InputHTMLAttributes,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react'
import Error from '../Error'
import Label from '../Label'
import FilePreview from './FilePreview'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    name: string
    value?: string
    label?: string | ReactNode
    labelStyle?: string | CSSProperties
    containerStyle?: string | CSSProperties
    size?: 'sm' | 'md' | 'lg' | 'xl'
    showOptionalLabel?: boolean
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    oldFiles?: Attachment[]
    onOldFilesChange?: (files: Attachment[]) => void
    helperMessage?: string | ReactNode
}

const FileInput: FC<Props> = ({
    name,
    label,
    value,
    showOptionalLabel = false,
    className = '',
    size = 'sm',
    containerStyle,
    labelStyle,
    onChange,
    oldFiles,
    onOldFilesChange,
    helperMessage,
    ...rest
}) => {
    const fileInput = useRef<HTMLInputElement>(null)
    const [files, setFiles] = useState<File[]>([])
    const [prevFiles, setPrevFiles] = useState<any>([])

    // to handle the old files to be removed, it needs to be in state
    useEffect(() => {
        if (oldFiles) {
            setPrevFiles(oldFiles)
        }
    }, [oldFiles])

    const sizeClass = {
        sm: 'text-xs px-3 h-[32px] rounded',
        md: 'text-base px-4 h-[42px] rounded-[10px]',
        lg: 'text-lg px-6 h-[56px] rounded-lg',
        xl: 'text-xl px-8 h-[72px] rounded-xl',
    }[size]

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [field, meta, helpers] = name ? useField(name || '') : [null, null, null]

    const handleAttachmentClick = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        e.preventDefault()
        fileInput?.current?.click()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) return
        else if (rest.multiple) {
            const newFiles = [...files, ...Array.from(e.target.files || [])]

            onChange && onChange(e)
            setFiles(newFiles)
            field?.onChange({target: {name, value: Array.from(newFiles)}})
        } else {
            onChange && onChange(e)
            setFiles(Array.from(e.target.files || []))
            setPrevFiles([])
            field?.onChange({target: {name, value: e.target.files[0]}})
            onOldFilesChange && onOldFilesChange([])
        }
    }

    const handleRemoveFile = (index: number) => {
        const newFiles = [...files]
        newFiles.splice(index, 1)
        setFiles(newFiles)
    }

    // remove old files from state and passing the id that needs to be saved
    const handleRemoveOldFiles = (removeId: number) => {
        const updatedFiles = prevFiles.filter((file: any) => file.id !== removeId)
        setPrevFiles(updatedFiles)
        onOldFilesChange && onOldFilesChange(updatedFiles)
    }

    return (
        <div
            className={`mb-4 ${typeof containerStyle === 'string' && containerStyle}`}
            style={(typeof containerStyle === 'object' && containerStyle) || undefined}
        >
            <Label label={label} labelStyle={labelStyle} isOptional={showOptionalLabel} />

            <div>
                <input
                    className='hidden opacity-0'
                    type='file'
                    accept='.png, .jpg, .jpeg, .pdf, .doc, .docx, .xls, .xlsx, .csv'
                    ref={fileInput}
                    onChange={handleInputChange}
                    {...rest}
                />
                <button
                    type='button'
                    className='p-4 rounded-lg border-2 border-dotted dark:border-[#313336] pointer w-full'
                    onClick={handleAttachmentClick}
                >
                    drag and drop or <span className='text-primary'>browse</span>
                </button>
            </div>

            {helperMessage &&
                (typeof helperMessage === 'string' ? (
                    <div className='text-sm text-gray-500'>{helperMessage}</div>
                ) : (
                    helperMessage
                ))}
            {meta?.touched && <Error error={meta.error} />}

            <div className='mt-2 divide-y gap-y-2'>
                {files.length > 0 &&
                    files.map((file, index) => (
                        <FilePreview
                            key={index}
                            file={file}
                            onRemove={() => handleRemoveFile(index)}
                            isNew
                        />
                    ))}
                {prevFiles.map((file: any, index: number) => (
                    <FilePreview
                        key={index}
                        file={file}
                        onRemove={() => handleRemoveOldFiles(file.id)}
                    />
                ))}
            </div>
        </div>
    )
}
export default FileInput
