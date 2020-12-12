import Header from './Header';

const Layout = (props) => {

    return (
        <>
            <Header 
                name={props.name}
                userid={props.userid}
                authenticated={props.authenticated}
                width={props.width}
            />
            {props.children}
        </>
    );
};

export default Layout;