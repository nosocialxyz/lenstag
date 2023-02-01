import { ProfileFragment, useFollow, useProfile } from '@lens-protocol/react';

import AddIcon from '@mui/icons-material/Add';
import { SearchResult, TriggerResult } from 'src/lib/types';
import { Follow } from './follow';

type ProfileFollowProps = {
    searchRes: SearchResult ;
    triggerResult: TriggerResult;
};

export function FollowProfile({ searchRes, triggerResult }: ProfileFollowProps) {
    //   const { follow, isPending } = useFollow({ profile });

    //   if (profile.isFollowedByMe || profile.isOptimisticFollowedByMe) {
    //     return <div className='follow' onClick={follow} ><AddIcon /> FOLLOW</div>;
    //   }

    console.log('searchRes.handle:', searchRes.handle)

    const { data: profile } = useProfile({ handle: searchRes.handle });
    console.log('profile:::', profile)
    if (profile) {
        return <Follow profile={profile} ></Follow>
    } else {
        return (
            <div className='follow'><AddIcon /> FOLLOW</div>
        );
    }
    // if (triggerResult && triggerResult.statusCode === 200 && searchRes) {
        
    // }
    // return (
    //     <div className='follow'><AddIcon /> FOLLOW</div>
    // );
}