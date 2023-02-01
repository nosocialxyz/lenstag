import { ProfileFragment, useFollow, useWalletLogin } from '@lens-protocol/react';
import AddIcon from '@mui/icons-material/Add';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

type ProfileFollowProps = {
  profile: ProfileFragment;
};

export function Follow ({ profile }: ProfileFollowProps) {
    console.log('profile::::', profile)
  const { follow, isPending } = useFollow({ profile });
  const { login, error: loginError, isPending: isLoginPending } = useWalletLogin();

  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });

  const onLoginClick = async () => {
    console.log('isConnected:::', isConnected)
    if (isConnected) {
      await disconnectAsync();
    }

    const { connector } = await connectAsync();

    if (connector instanceof InjectedConnector) {
      const signer = await connector.getSigner();
      await login(signer);
      console.log('isLoginPending::::', isLoginPending)
      await follow()
    }
  };


  if (profile.isFollowedByMe || profile.isOptimisticFollowedByMe) {
    return <div className='follow'>Following</div>;
  }

  return (
    // <button onClick={follow} disabled={isPending}>
    //   {isPending ? 'Follow in progress...' : 'Follow'}
    // </button>
    <div className='follow' onClick={onLoginClick}><AddIcon />{isPending ? 'Follow in progress...' : 'Follow'}</div>
  );
}
