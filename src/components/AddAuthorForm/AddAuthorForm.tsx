import React, {useState} from 'react';
import {Button, TextInput} from '@gravity-ui/uikit';
import {FileUpload} from '../FileUpload/FileUpload';

import block from 'bem-cn-lite';
import './AddAuthorForm.scss';
import {addAuthor} from '@/api/author';
const b = block('add-author-form');

const AddAuthorForm: React.FC = () => {
    const [authorName, setAuthorName] = useState('');
    const [authorPhoto, setAuthorPhoto] = useState<File | null>(null);
    const [error, setError] = useState('');

    const handlePhotoChange = (file: File | null) => {
        setAuthorPhoto(file);
    };

    const handleSubmit = async () => {
        if (!authorName || !authorPhoto) {
            setError('Имя автора и фото обязательны');
            return;
        }

        try {
            await addAuthor(authorName, authorPhoto);
            alert('Автор успешно добавлен');
        } catch (error) {
            console.error('Ошибка при добавлении автора:', error);
            alert('Произошла ошибка при добавлении автора');
        }
    };

    return (
        <div className={b()}>
            <TextInput
                label="Имя автора"
                value={authorName}
                onUpdate={setAuthorName}
                error={error}
                size="l"
            />

            <FileUpload
                placeholder="Добавить фото автора"
                onFileChange={handlePhotoChange}
                value={authorPhoto ? URL.createObjectURL(authorPhoto) : ''}
            />

            <Button onClick={handleSubmit} size="l" view="action">
                Добавить автора
            </Button>
        </div>
    );
};

export default AddAuthorForm;
