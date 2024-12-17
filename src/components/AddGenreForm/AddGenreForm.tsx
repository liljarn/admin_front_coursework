import React, {useState} from 'react';
import {Button, TextInput} from '@gravity-ui/uikit';
import {addGenre} from '@/api/genre/genre';

import block from 'bem-cn-lite';
import './AddGenreForm.scss';
const b = block('add-genre-form');

const AddGenreForm: React.FC = () => {
    const [genreName, setGenreName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!genreName) {
            setError('Название жанра обязательно');
            return;
        }

        try {
            await addGenre(genreName); // Отправляем запрос на добавление жанра
            alert('Жанр успешно добавлен');
            setGenreName(''); // Очищаем поле после успешного добавления
        } catch (error) {
            console.error('Ошибка при добавлении жанра:', error);
            alert('Произошла ошибка при добавлении жанра');
        }
    };

    return (
        <div className={b()}>
            <TextInput
                label="Название жанра"
                value={genreName}
                onUpdate={setGenreName}
                error={error}
                size="l"
            />

            <Button onClick={handleSubmit} size="l" view="action">
                Добавить жанр
            </Button>
        </div>
    );
};

export default AddGenreForm;
