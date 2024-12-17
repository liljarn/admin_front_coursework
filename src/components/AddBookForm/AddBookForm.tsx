import React, {useState, useCallback} from 'react';
import {Button, TextInput, TextArea, Text} from '@gravity-ui/uikit';
import {addNewBook} from '@/api/book';
import {FileUpload} from '../FileUpload/FileUpload';

import block from 'bem-cn-lite';
import './AddBookForm.scss';
const b = block('add-book-form');

export const AddBookForm: React.FC = () => {
    const [authorId, setAuthorId] = useState<number | string>('');
    const [bookName, setBookName] = useState<string>('');
    const [releaseYear, setReleaseYear] = useState<number>();
    const [ageLimit, setAgeLimit] = useState<number>();
    const [description, setDescription] = useState<string>('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [genresInput, setGenresInput] = useState<string>('');

    const [authorIdError, setAuthorIdError] = useState<string>('');
    const [bookNameError, setBookNameError] = useState<string>('');
    const [releaseYearError, setReleaseYearError] = useState<string>('');
    const [ageLimitError, setAgeLimitError] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<string>('');
    const [photoError, setPhotoError] = useState<string>('');
    const [genresError, setGenresError] = useState<string>('');

    const handleFileChange = useCallback((file: File | null) => {
        setPhoto(file);
        console.log(photo);
    }, []);

    const handleGenresChange = useCallback((value: string) => {
        setGenresInput(value);
    }, []);

    const handleSubmit = useCallback(() => {
        const isValid = validateForm();
        if (!isValid) return;

        const genresArray = genresInput
            .split(',')
            .map((genre) => parseInt(genre.trim(), 10))
            .filter(Boolean);

        if (!authorId || isNaN(Number(authorId))) {
            setAuthorIdError('ID автора обязателен и должен быть числом');
            return;
        }

        const formData = new FormData();
        formData.append('bookName', bookName);
        formData.append('releaseYear', releaseYear!.toString());
        formData.append('ageLimit', ageLimit!.toString());
        formData.append('description', description);
        if (photo) formData.append('photo', photo);
        formData.append('genres', genresArray.join(', '));

        console.log(bookName);

        addNewBook(Number(authorId), formData)
            .then(() => {
                alert('Книга успешно добавлена');
            })
            .catch((error) => {
                console.error('Ошибка при добавлении книги:', error);
                alert('Произошла ошибка при добавлении книги');
            });
    }, [authorId, bookName, releaseYear, ageLimit, description, photo, genresInput]);

    const validateForm = () => {
        let isValid = true;

        if (!authorId || isNaN(Number(authorId))) {
            setAuthorIdError('ID автора обязателен');
            isValid = false;
        }

        if (!bookName) {
            setBookNameError('Обязательное поле');
            isValid = false;
        }

        if (!releaseYear || releaseYear < 1900) {
            setReleaseYearError('Год выпуска обязателен и должен быть больше 1900');
            isValid = false;
        }

        if (!ageLimit || ageLimit < 0) {
            setAgeLimitError('Возрастное ограничение обязательно и не может быть отрицательным');
            isValid = false;
        }

        if (!description) {
            setDescriptionError('Обязательное поле');
            isValid = false;
        }

        if (!photo) {
            setPhotoError('Фото обязательно');
            isValid = false;
        }

        if (!genresInput) {
            setGenresError('Жанры обязательны');
            isValid = false;
        } else {
            const genresArray = genresInput.split(',').map((genre) => parseInt(genre.trim(), 10));
            if (genresArray.some(isNaN)) {
                setGenresError('Жанры должны быть числами');
                isValid = false;
            }
        }

        return isValid;
    };

    return (
        <div className={b()}>
            <TextInput
                label="ID автора"
                value={authorId.toString()}
                onUpdate={(val) => setAuthorId(val)}
                error={authorIdError}
                type="number"
                size="l"
            />

            <TextInput
                label="ID жанров (через запятую)"
                value={genresInput}
                onUpdate={handleGenresChange}
                error={genresError}
                size="l"
            />

            <TextInput
                label="Название книги"
                value={bookName}
                onUpdate={setBookName}
                error={bookNameError}
                size="l"
            />

            <TextInput
                label="Год выпуска"
                value={releaseYear?.toString()}
                onUpdate={(val) => setReleaseYear(parseInt(val, 10))}
                error={releaseYearError}
                type="number"
                size="l"
            />

            <TextInput
                label="Возрастное ограничение"
                value={ageLimit?.toString()}
                onUpdate={(val) => setAgeLimit(parseInt(val, 10))}
                error={ageLimitError}
                type="number"
                size="l"
            />

            <TextArea
                placeholder="Описание книги"
                value={description}
                onUpdate={setDescription}
                error={descriptionError}
                size="l"
            />

            <FileUpload
                placeholder="Добавить фото книги"
                onFileChange={handleFileChange}
                value={photo ? URL.createObjectURL(photo) : ''}
            />
            {photoError && <Text color="danger">{photoError}</Text>}

            <Button onClick={handleSubmit} type="submit" size="l" view="action">
                Добавить книгу
            </Button>
        </div>
    );
};
