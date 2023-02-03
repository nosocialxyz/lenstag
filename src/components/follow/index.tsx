import { useProfile } from '@lens-protocol/react';

import { SearchResult } from 'src/lib/types';
import { Follow } from './follow';
import lensIcon from '../../assets/icon/lens.svg';

type ProfileFollowProps = {
    searchRes: SearchResult;
};

export function FollowProfile({ searchRes }: ProfileFollowProps) {
    const { data: profile } = useProfile({ handle: searchRes.handle });
    if (profile) {
        return <Follow profile={profile} ></Follow>
    } else {
        return (
            <span className='widget-button'><img src={lensIcon} />Follow</span>
        );
    }
}