import { FC, useState, useCallback } from 'react'
import { useDropzone, FileWithPath } from 'react-dropzone'
import Icon from '@/components/shared/Icon'
import { Button } from '@/components/ui/button'

interface IUploaderProps {
  fieldChange: (files: File[]) => void
  mediaUrl: string
}

const Uploader: FC<IUploaderProps> = ({ fieldChange }) => {

  const [files, setFiles] = useState<File[]>([])
  const [fileUrl, setFileUrl] = useState('')

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles)
    fieldChange(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [ files ])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    }
  })

  return (
    <div
      className={'flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'}
      {...getRootProps()}
    >
      <input
        className={'cursor-pointer'}
        {...getInputProps()}
      />
      {
        fileUrl
          ? (
            <>
              <div className={'flex flex-1 justify-center w-full p-5 lg:p-10'}>
                <img
                  src={fileUrl}
                  alt={'uploaded photo'}
                  className={'uploader-img'}
                />
              </div>
              <p className={'uploader-label'}>
                Click or drag photo to replace
              </p>
            </>
          )
          : (
            <div className={'uploader-box'}>
              <Icon
                asset={'image'}
                width={96}
                height={77}
              />
              <h3 className={'base-medium text-light-2 mb-2 mt-6'}>
                Drag photo here
              </h3>
              <p className={'text-light-4 small-regular mb-6'}>
                PNG, JPG, JPEG
              </p>
              <Button className={'shad-button_dark_4 '}>
                Browse your photo
              </Button>
            </div>
          )
      }
    </div>
  )
}

export default Uploader