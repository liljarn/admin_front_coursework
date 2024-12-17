import {useState, useCallback} from 'react';
import {Button, Icon, TextInput, Text} from '@gravity-ui/uikit';
import {Magnifier} from '@gravity-ui/icons';
import GenreFilter from '../GenreFilter/GenreFilter';
import block from 'bem-cn-lite';
import './BooksFilter.scss';
const b = block('booksFilter');

export interface BooksFilterProps {
    onConfirm: (filters: {bookTitle?: string; author?: string; genreIds?: number[]}) => void;
}

export const BooksFilter = ({onConfirm}: BooksFilterProps) => {
    const [bookTitleLocal, setBookTitleLocal] = useState('');
    const [authorNameLocal, setAuthorNameLocal] = useState('');
    const [genresLocal, setGenresLocal] = useState<number[]>([]);

    const handleConfirm = useCallback(() => {
        onConfirm({bookTitle: bookTitleLocal, author: authorNameLocal, genreIds: genresLocal});
    }, [bookTitleLocal, authorNameLocal, genresLocal, onConfirm]);

    const handleReset = useCallback(() => {
        setBookTitleLocal('');
        setAuthorNameLocal('');
        setGenresLocal([]);
        onConfirm({bookTitle: '', author: '', genreIds: []}); // Reset filters
    }, [onConfirm]);

    return (
        <div className={b()}>
            <Text variant="display-2">Каталог книг</Text>
            <div className={b('filters')}>
                <div>
                    <Text>Название книги</Text>
                    <TextInput
                        startContent={<Icon data={Magnifier} />}
                        value={bookTitleLocal}
                        onChange={(e) => setBookTitleLocal(e.target.value)}
                        hasClear
                    />
                </div>
                <div>
                    <Text>Автор</Text>
                    <TextInput
                        startContent={<Icon data={Magnifier} />}
                        value={authorNameLocal}
                        onChange={(e) => setAuthorNameLocal(e.target.value)}
                        hasClear
                    />
                </div>
                <div>
                    <Text>Жанры</Text>
                    <div className={b('genres_container')}>
                        <GenreFilter selectedGenres={genresLocal} onChange={setGenresLocal} />
                    </div>
                </div>

                <Button onClick={handleConfirm} view="action" type="submit">
                    применить
                </Button>
                <Button onClick={handleReset} view="action" type="reset">
                    сбросить
                </Button>
            </div>
        </div>
    );
};

export default BooksFilter;
