import { useEffect } from 'react';

export default function SpotifyCallbackPage() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (code) {
            if (window.opener) {
                window.opener.postMessage(
                    { success: true, code },
                    window.location.origin
                );
            }
        } else if (error) {
            if (window.opener) {
                window.opener.postMessage(
                    { success: false, error },
                    window.location.origin
                );
            }
        }
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Authorizing Spotify...</h2>
                <p>You can close this window.</p>
            </div>
        </div>
    );
}

