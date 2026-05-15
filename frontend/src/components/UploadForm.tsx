'use client';

import { ChangeEvent } from 'react';

interface Props {
    onUpload: (file: File) => void;
}

export function UploadForm ({ onUpload }: Props) {
    const handlerFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            onUpload(file);
        }
    };

    return (
        <div className='border rounded-x1 p-6 bg-white shadow-sm'>
            <input
                type='file'
                accept='.csv'
                onChange={handlerFileChange}
            />
        </div>
    )
}