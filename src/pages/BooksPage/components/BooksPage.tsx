import {useState, useEffect} from 'react';
import {Pagination, Spin} from '@gravity-ui/uikit';
import {BookManagmentPage} from '@/api/types';
import {getManagementBooksPage} from '@/api/book/book';
import {BookTable} from '@/components/BookTable';
import {BooksFilter} from '@/components/BooksFilter';

import block from 'bem-cn-lite';
import './BooksPage.scss';

const b = block('booksPage');

const PAGE_SIZE = 20;

export const BooksPage = () => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<BookManagmentPage | null>(null);
    const [filters, setFilters] = useState<{
        bookTitle?: string;
        author?: string;
        genreIds?: number[];
    }>({});

    useEffect(() => {
        setLoading(true);
        getManagementBooksPage(page - 1, filters.bookTitle, filters.author, filters.genreIds)
            .then((response) => {
                setData(response);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [page, filters]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleFilterChange = (newFilters: {
        bookTitle?: string;
        author?: string;
        genreIds?: number[];
    }) => {
        setFilters(newFilters); // Обновляем фильтры
    };

    return (
        <div className={b()}>
            <BooksFilter onConfirm={handleFilterChange} />

            {loading ? (
                <Spin />
            ) : (
                <div className={b('table')}>
                    <BookTable books={data?.managementBooks || []} />
                </div>
            )}

            {/* Пагинация */}
            <Pagination
                page={page}
                pageSize={PAGE_SIZE}
                total={data?.total || 0}
                onUpdate={handlePageChange}
            />
        </div>
    );
};

export default BooksPage;
