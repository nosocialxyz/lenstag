import { ProfileFragment, useFollow, useWalletLogin } from '@lens-protocol/react';
import AddIcon from '@mui/icons-material/Add';
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import lensIcon from '../../assets/icon/LENS_LOGO_Only.svg';

type ProfileFollowProps = {
    profile: ProfileFragment;
};

export function Follow({ profile }: ProfileFollowProps) {
    const { follow, isPending } = useFollow({ profile });
    const { login, error: loginError, isPending: isLoginPending } = useWalletLogin();

    const { isConnected } = useAccount();
    const { disconnectAsync } = useDisconnect();
    const [open, setOpen] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const { connectAsync } = useConnect({
        connector: new InjectedConnector(),
    });

    const onLoginClick = async () => {
        if (isConnected) {
            await disconnectAsync();
        }

        const { connector } = await connectAsync();

        if (connector instanceof InjectedConnector) {
            const signer = await connector.getSigner();
            await login(signer);
            follow().then().catch((error: any) => {
                setErrorMsg(error?.message)
                setOpen(true)
            });
        }
    };


    if (profile.isFollowedByMe || profile.isOptimisticFollowedByMe) {
        return <span className='widget-button'><img src={lensIcon} /> Following </span>
    }

    return (
        <div>
            <span className='widget-button' onClick={onLoginClick} ><img src={lensIcon} /> {isPending ? 'Following' : 'Follow'} </span>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ horizontal: 'center', vertical: 'top'}}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errorMsg}
                </Alert>
            </Snackbar>
        </div>
    );
}
