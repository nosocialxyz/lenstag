import { useProfile } from '@lens-protocol/react';

import AddIcon from '@mui/icons-material/Add';
import { SearchResult } from 'src/lib/types';
import { Follow } from './follow';

type ProfileFollowProps = {
    searchRes: SearchResult;
};

export function FollowProfile({ searchRes }: ProfileFollowProps) {
    console.log('searchRes:::', searchRes)
    const { data: profile } = useProfile({ handle: searchRes.handle });
    console.log('profile:::', profile)
    if (profile) {
        return <Follow profile={profile} ></Follow>
    } else {
        return (
            <div className='follow'><AddIcon /> FOLLOW</div>
        );
    }
}