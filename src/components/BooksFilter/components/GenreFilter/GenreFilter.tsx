import {Select, Skeleton, Text} from '@gravity-ui/uikit';
import {useEffect, useState} from 'react';
import {getGenres} from '@/api/genre/genre';

export interface GenreFilterProps {
    selectedGenres?: number[];
    onChange: (newGenreIds: number[]) => void;
}

export const GenreFilter = ({selectedGenres, onChange}: GenreFilterProps) => {
    const [genreFilters, setGenreFilters] = useState<{value: string; content: string}[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genreData = await getGenres();
                const genres = genreData.map(
                    ({genreId, genreName}: {genreId: number; genreName: string}) => ({
                        value: genreId.toString(),
                        content: genreName,
                    }),
                );
                setGenreFilters(genres);
            } catch (error) {
                setError('Не удалось загрузить жанры');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    const handleGenreChange = (newGenreIds: string[]) => {
        onChange(newGenreIds.map((id) => Number(id)));
    };

    if (loading) {
        return <Skeleton />;
    }

    if (error) {
        return <Text>Ошибка загрузки</Text>;
    }

    return (
        <Select
            placeholder={'Жанр книги'}
            multiple={true}
            options={genreFilters}
            filterable={true}
            width={200}
            value={selectedGenres?.map((id) => id.toString())}
            onUpdate={handleGenreChange}
        />
    );
};

export default GenreFilter;
