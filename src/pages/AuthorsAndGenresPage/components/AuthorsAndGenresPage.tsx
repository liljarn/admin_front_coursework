import {useState, useEffect} from 'react';
import {Pagination, Spin, Text} from '@gravity-ui/uikit';
import {getGenres} from '@/api/genre/genre';
import {getAuthors} from '@/api/author/author'; // Импортируем API для авторов
import {AuthorTable} from '@/components/AuthorTable'; // Импортируем таблицу авторов
import {GenreTable} from '@/components/GenreTable'; // Импортируем таблицу жанров
import block from 'bem-cn-lite';
import './AuthorsAndGenresPage.scss';

const b = block('authorsAndGenresPage');

const PAGE_SIZE = 20;

export const AuthorsAndGenresPage = () => {
    const [authorsPage, setAuthorsPage] = useState(1);
    const [loadingAuthors, setLoadingAuthors] = useState(true);
    const [loadingGenres, setLoadingGenres] = useState(true);
    const [authorsData, setAuthorsData] = useState<any | null>(null);
    const [genresData, setGenresData] = useState<any | null>(null);

    // Загрузка данных о авторах
    useEffect(() => {
        setLoadingAuthors(true);
        getAuthors(authorsPage - 1)
            .then((response) => {
                setAuthorsData(response);
                setLoadingAuthors(false);
            })
            .catch(() => {
                setLoadingAuthors(false);
            });
    }, [authorsPage]);

    // Загрузка данных о жанрах (без пагинации)
    useEffect(() => {
        setLoadingGenres(true);
        getGenres()
            .then((response) => {
                setGenresData(response);
                setLoadingGenres(false);
            })
            .catch(() => {
                setLoadingGenres(false);
            });
    }, []);

    const handlePageChangeAuthors = (newPage: number) => {
        setAuthorsPage(newPage);
    };

    return (
        <div className={b()}>
            {loadingAuthors ? (
                <Spin />
            ) : (
                <div className={b('table')}>
                    <Text variant="header-2">Список авторов</Text>
                    <AuthorTable authors={authorsData?.authors || []} />
                    <Pagination
                        page={authorsPage}
                        pageSize={PAGE_SIZE}
                        total={authorsData?.total || 0}
                        onUpdate={handlePageChangeAuthors}
                    />
                </div>
            )}

            {loadingGenres ? (
                <Spin />
            ) : (
                <div className={b('table')}>
                    <Text variant="header-2">Список жанров</Text>
                    <GenreTable genres={genresData || []} />
                </div>
            )}
        </div>
    );
};

export default AuthorsAndGenresPage;
