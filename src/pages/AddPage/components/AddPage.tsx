import {useState} from 'react';
import {AddBookForm} from '@/components/AddBookForm/AddBookForm';
import AddAuthorForm from '@/components/AddAuthorForm/AddAuthorForm';
import AddGenreForm from '@/components/AddGenreForm/AddGenreForm';
import {Text, Tabs} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import './AddPage.scss';

const b = block('addPage');

export const AddPage = () => {
    const [activeTab, setActiveTab] = useState('addBook');

    const tabs = [
        {id: 'addBook', title: 'Добавить книгу'},
        {id: 'addAuthor', title: 'Добавить автора'},
        {id: 'addGenre', title: 'Добавить жанр'},
    ];

    return (
        <div className={b()}>
            <Text variant="header-2">Добавить данные</Text>
            <Text variant="body-2" className={b('text')}>
                На этой странице с помощью форм вы можете добавить необходимые данные: новую книгу,
                нового автора, новый жанр. Заполняйте поля внимательно! Обратите внимание, что для
                прикрепления к книге автора и жанра, нужно указать их ID. Информацию об ID можно
                найти на странице "Авторы и жанры".
            </Text>
            <Tabs
                className={b('tabs')}
                activeTab={activeTab}
                onSelectTab={setActiveTab}
                items={tabs}
                size="l"
            />
            <div className={b('form')}>
                {activeTab === 'addBook' && (
                    <>
                        <AddBookForm />
                    </>
                )}
                {activeTab === 'addAuthor' && (
                    <>
                        <AddAuthorForm />
                    </>
                )}
                {activeTab === 'addGenre' && (
                    <>
                        <AddGenreForm />
                    </>
                )}
            </div>
        </div>
    );
};

export default AddPage;
