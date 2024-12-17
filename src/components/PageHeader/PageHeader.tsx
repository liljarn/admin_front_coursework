import {useNavigate} from 'react-router-dom';
import {Button, Text} from '@gravity-ui/uikit';

import block from 'bem-cn-lite';
import './PageHeader.scss';
const b = block('pageHeader');

export const PageHeader = () => {
    const navigate = useNavigate();

    const onNavigationClick = (path: string) => {
        navigate(path);
    };

    return (
        <header className={b()}>
            <div className={b('stubBlock')}></div>
            <div className={b('name')} onClick={() => onNavigationClick('/')}>
                <Text variant="header-2">литературное гнездо</Text>
                <Text variant="subheader-1">помощник для менеджеров</Text>
            </div>
            <div className={b('buttons')}>
                <Button view="action" size="l" onClick={() => onNavigationClick('/books')}>
                    Книги
                </Button>
                <Button
                    view="action"
                    size="l"
                    onClick={() => onNavigationClick('/authorsAndGenres')}
                >
                    Авторы и жанры
                </Button>
                <Button view="action" size="l" onClick={() => onNavigationClick('/add')}>
                    Добавление данных
                </Button>
            </div>
        </header>
    );
};

export default PageHeader;
