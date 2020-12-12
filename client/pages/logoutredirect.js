import { useEffect } from 'react'
import { useRouter } from 'next/router'

const LogoutRedirect = (props) => {

    const router = useRouter();
    const { id } = router.query

    useEffect(() => {
        localStorage.removeItem('token');
        router.push(`/login`);
    });

    return <div />;
}

export default LogoutRedirect;