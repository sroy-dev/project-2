import {Badge} from '@/components/badge'
import {Attachment} from '@/types/attachments'
import {formatSize, getFileUrl} from '@/utils/fileUtils'
import {FC} from 'react'
import {AiOutlineFileText} from 'react-icons/ai'
import {BsTrash} from 'react-icons/bs'

interface Props {
    file: File | Attachment
    onRemove?: () => void
    isNew?: boolean
}

const FilePreview: FC<Props> = ({file, onRemove, isNew}) => {
    return (
        <div className='flex items-center gap-3 py-2'>
            {file instanceof File && file.type.includes('image') ? (
                <img
                    className='w-[50px] h-[50px] object-cover border rounded'
                    src={getFileUrl(file)}
                    alt={file?.name}
                />
            ) : 'mimeType' in file && file.mimeType.includes('image') ? (
                <img
                    className='w-[50px] h-[50px] object-cover border rounded'
                    src={file?.url}
                    alt={file?.fileName}
                />
            ) : (
                <div className='w-[50px] h-[50px] flex items-center justify-center bg-gray-200'>
                    <AiOutlineFileText className='text-[30px] text-gray-500' />
                </div>
            )}
            <div className='grow min-w-0'>
                {file instanceof File ? (
                    <div className='text-xs text-gray-400 truncate'>{file?.name}</div>
                ) : (
                    <div className='text-xs text-gray-400 truncate'>{file?.fileName}</div>
                )}

                <div className='flex gap-3'>
                    <div className='text-[10px] text-gray-400'>
                        {file instanceof File
                            ? formatSize(file?.size)
                            : formatSize(file?.fileSize) || ''}
                    </div>
                    {isNew && (
                        <Badge theme='blue' size='sm'>
                            New
                        </Badge>
                    )}
                </div>
            </div>
            <button className='ml-auto' type='button' onClick={() => onRemove && onRemove()}>
                <BsTrash />
            </button>
        </div>
    )
}

export default FilePreview
