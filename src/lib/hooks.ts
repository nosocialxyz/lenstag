import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useContext } from "react";
import store from 'store';
import { ProfileInfo } from "./types";

export interface LoginUser {
    address: string;
    profileId: string;
    basicInfo?: ProfileInfo;
    // appBaseInfo?: AppBaseInfo;
    // benefitBaseInfo?: BenefitBaseInfo;
    setLoginUser: (u: User) => void
}

interface User {
    address: string;
    profileId: string;
}

export function useLoginUser(key = 'login'): LoginUser {
    const [address, setAddress] = useState<string>('');
    const [profileId, setProfileId] = useState<string>('');
    const [basicInfo, setBasicInfo] = useState<ProfileInfo>();
    // const [appBaseInfo, setAppBaseInfo] = useState<AppBaseInfo>();
    // const [benefitBaseInfo, setBenefitBaseInfo] = useState<BenefitBaseInfo>();

    const setLoginUser = useCallback((loginUser: User) => {
        setAddress(loginUser.address)
        setProfileId(loginUser.profileId)
        if (loginUser.profileId) {

        }
        store.set(key, loginUser);
    }, [key, profileId])

    useEffect(() => {
        const u = store.get(key) as User;
        if (u) {
            setLoginUser(u)
        }
    }, [key, profileId])

    const user: LoginUser = useMemo(() => {
        const loginUser = {
            address,
            profileId,
            basicInfo,
            // appBaseInfo,
            // benefitBaseInfo,
            setLoginUser
        }
        return loginUser;
    }, [address, profileId, setLoginUser, basicInfo, setBasicInfo])

    return user;
}

// @ts-ignore
export const ContextLoginUser = React.createContext<LoginUser>(null)

export function useContextLoginUser(): LoginUser {
    return useContext(ContextLoginUser)
}