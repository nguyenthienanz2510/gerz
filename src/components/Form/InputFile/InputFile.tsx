import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import config from 'src/constant/config'

interface InputFileProps {
  onchange: (file?: File) => void
}

export default function InputFile({onchange} : InputFileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation(['profile'])
  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error('Invalid image: Max file size: 1MB, Accept file types: .jpg, .jpeg, .png')
    } else {
      onchange && onchange(fileFromLocal)
    }
  }
  return (
    <>
      <input
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(event.target as any).value = null
        }}
        type='file'
        hidden
        accept='.jpg, .jpeg, .png'
        ref={fileInputRef}
        onChange={onFileChange}
      />
      <button
        type='button'
        className='rounded border px-5 py-2 transition-all hover:border-color-primary hover:text-color-primary'
        onClick={handleUpload}
      >
        {t('profile:choseImage')}
      </button>
    </>
  )
}
