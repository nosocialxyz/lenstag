import { ProfileFragment, useFollow, useWalletLogin } from '@lens-protocol/react';
import AddIcon from '@mui/icons-material/Add';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import lensIcon from '../../assets/icon/lens.svg';

type ProfileFollowProps = {
  profile: ProfileFragment;
};

export function Follow ({ profile }: ProfileFollowProps) {
  const { follow, isPending } = useFollow({ profile });
  const { login, error: loginError, isPending: isLoginPending } = useWalletLogin();

  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

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
      await follow()
    }
  };


  if (profile.isFollowedByMe || profile.isOptimisticFollowedByMe) {
    return <span className='widget-button'><img src={lensIcon} /> Following </span>
  }

  return (
    <span className='widget-button' onClick={onLoginClick} ><img src={lensIcon} /> {isPending ? 'Following' : 'Follow'} </span>
  );
}
