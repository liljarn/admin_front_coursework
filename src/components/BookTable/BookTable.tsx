import React, {useState} from 'react';
import {BookManagment, BookStatus, Genre} from '@/api/types';
import {
    Button,
    Flex,
    Table,
    TableDataItem,
    TableSettingsData,
    withTableActions,
    withTableCopy,
    withTableSettings,
} from '@gravity-ui/uikit';
import {deleteBook} from '@/api/book/book';
import block from 'bem-cn-lite';
import './BookTable.scss';
import {acceptRent, endRent} from '@/api/rent';
import {mapBookStatus} from '@/helpers/mapBookStatus';
const b = block('bookTable');

const TableWithActionsAndSettings = withTableCopy(withTableSettings(withTableActions(Table)));

type TableItemType = {
    bookId: number;
    bookName: string;
    authorName: string;
    releaseYear: number;
    ageLimit: number;
    bookPhotoUrl: string;
    rating: number;
    status: BookStatus;
    genres: Genre[];
    email: string;
    firstName: string;
    lastName: string;
    dueDate: string;
};

const columns = [
    {id: 'bookId', name: 'ID книги'},
    {
        id: 'bookPhotoUrl',
        name: 'Обложка',
        template: (book: TableDataItem) => {
            return <img className={b('bookImg')} src={book.bookPhotoUrl} alt={book.bookName} />;
        },
    },
    {id: 'bookName', name: 'Название книги', meta: {copy: true}},
    {id: 'authorName', name: 'Автор', meta: {copy: true}},
    {
        id: 'status',
        name: 'Статус',
        template: (book: TableDataItem) => {
            return mapBookStatus(book.status);
        },
    },
    {id: 'dueDate', name: 'Дедлайн'},
    {id: 'ageLimit', name: 'Возрастное ограничение'},
    {id: 'rating', name: 'Рейтинг'},
    {
        id: 'genres',
        name: 'Жанры',
        template: (book: TableDataItem) => {
            return book.genres.map((genre: Genre) => genre.genreName).join(', ');
        },
    },
    {id: 'releaseYear', name: 'Год выпуска'},
    {id: 'firstName', name: 'Имя пользователя', className: b('user')},
    {id: 'lastName', name: 'Фамилия пользователя', className: b('user')},
    {id: 'email', name: 'Почта', className: b('user'), meta: {copy: true}},
];

const getRowActions = (
    bookId: number,
    handleDelete: (bookId: number) => void,
    handleAcceptRent: (bookId: number) => void,
    handleEndRent: (bookId: number) => void,
) => [
    {
        text: 'Сделать книгу недоступной',
        handler: () => handleDelete(bookId),
    },
    {
        text: 'Выдать книгу читателю',
        handler: () => handleAcceptRent(bookId),
    },
    {
        text: 'Вернуть книгу в библиотеку',
        handler: () => handleEndRent(bookId),
    },
];

export interface BookTableProps {
    books: BookManagment[];
}

export const BookTable: React.FC<BookTableProps> = ({books}) => {
    const [settings, setSettings] = useState<TableSettingsData>([]);
    const [data] = useState<TableItemType[]>(
        books.map(({book, userData, dueDate}) => ({
            bookId: book.bookId,
            bookName: book.bookName,
            authorName: book.authorName,
            releaseYear: book.releaseYear,
            ageLimit: book.ageLimit,
            rating: book.rating,
            bookPhotoUrl: book.photoUrl,
            status: book.status,
            genres: book.genres,
            email: userData?.email,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            dueDate: dueDate,
        })),
    );

    console.log(data);

    const handleDelete = async (bookId: number) => {
        try {
            await deleteBook(bookId);
            alert('Книга удалена, обновите страницу');
        } catch (error) {
            console.error('Ошибка при удалении книги:', error);
        }
    };

    const handleAcceptRent = async (bookId: number) => {
        try {
            await acceptRent(bookId);
            alert('Аренда книги принята');
        } catch (error) {
            console.error('Ошибка при принятии аренды книги:', error);
        }
    };

    const handleEndRent = async (bookId: number) => {
        try {
            await endRent(bookId);
            alert('Аренда книги завершена');
        } catch (error) {
            console.error('Ошибка при завершении аренды книги:', error);
        }
    };

    return (
        <TableWithActionsAndSettings
            className={b()}
            data={data}
            columns={columns}
            getRowActions={(row) =>
                getRowActions(row.bookId, handleDelete, handleAcceptRent, handleEndRent)
            }
            settings={settings}
            updateSettings={(settings) => {
                setSettings(settings);
                return Promise.resolve();
            }}
            renderControls={({onApply}) => (
                <Flex gapRow="1" direction="column">
                    <Button
                        view="outlined"
                        onClick={() => {
                            onApply();
                            setSettings([]);
                        }}
                    >
                        Сбросить
                    </Button>
                    <Button
                        view="action"
                        onClick={() => {
                            onApply();
                        }}
                    >
                        Применить
                    </Button>
                </Flex>
            )}
            rowActionsSize="l"
        />
    );
};
