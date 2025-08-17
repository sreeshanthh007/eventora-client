import { GoogleOAuthProvider , GoogleLogin , type CredentialResponse } from '@react-oauth/google';


interface GoogleAuthProps{
    handleGoogleSuccess:(CredentialResponse:CredentialResponse) => void
}


export const GoogleAuthButton : React.FC<GoogleAuthProps>=({
    handleGoogleSuccess
})=>{
    const cliendId  = import.meta.env.VITE_GOOGLE_CLIENT_ID

    return(
        <GoogleOAuthProvider clientId={cliendId}>
            <GoogleLogin 
            onSuccess={handleGoogleSuccess}
            onError={()=>{
                console.log("login failed")
            }}
            useOneTap
            type='standard'
            theme='outline'
            size='large'
            text='signin_with'
            shape='rectangular'
            logo_alignment='center'
            locale='en'
            />
        </GoogleOAuthProvider>
    )
}
