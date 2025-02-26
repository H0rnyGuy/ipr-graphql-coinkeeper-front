import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useEmailVerification } from '../../hooks/emailVerificationPage/useEmailVerification.ts';

let isVerifying = false;

const EmailVerificationPage = () => {
    const location = useLocation();
    const { VerifyEmail } = useEmailVerification();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        if (token && !isVerifying) {
            isVerifying = true;
            VerifyEmail(token)
        }
    }, []);

    return (
        <div className="verification-page">
            <h2>Verifying your email...</h2>
        </div>
    );
};

export default EmailVerificationPage;
