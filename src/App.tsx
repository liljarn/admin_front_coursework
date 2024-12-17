import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {ThemeProvider} from '@gravity-ui/uikit';
import {BooksPage} from './pages/BooksPage';
import {Layout} from './components/Layout';
import {AddPage} from './pages/AddPage';
import {AuthorsAndGenresPage} from './pages/AuthorsAndGenresPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/books',
                element: <BooksPage />,
            },
            {
                path: '/add',
                element: <AddPage />,
            },
            {
                path: '/authorsAndGenres',
                element: <AuthorsAndGenresPage />,
            },
        ],
    },
]);

const App = () => {
    return (
        <ThemeProvider theme="dark">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
};

export default App;
