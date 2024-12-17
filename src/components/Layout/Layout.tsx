import {Footer} from '@gravity-ui/navigation';
import {Outlet} from 'react-router-dom';
import {PageHeader} from '../PageHeader';

export const Layout = () => {
    return (
        <>
            <PageHeader />
            <Outlet />
            <Footer copyright={`@ ${new Date().getFullYear()} "Точка с запятой"`} view="clear" />
        </>
    );
};

export default Layout;
