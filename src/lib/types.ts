export interface ProfileInfo {
    info: ProfileBaseInfo;
    aiTags: ProfileBaseAITags[];
    achievements: ProfileBaseAchievement[];
    activities: ProfileBaseActivity;
    benefits: ProfileBaseBenefit[];
}

interface Attributes {
    location: string;
    website: string;
    twitter: string;
}

export interface Profile {
    handle: string;
    id: string;
    name: string;
}

export interface Activity {
    posts: number;
    comments: number;
    mirrors: number;
    collects: number;
}

export interface Achievement {
    id: string;
    category: string;
    provider: string;
    name: string;
    description: string;
    tokenId: string;
    picture: string;
    url: string;
    status: string;
}

export interface AppBase {
    id: string;
    name: string;
    description: string;
    picture: string;
    url: string;
    activities: Activity;
    achievements: Achievement[];
}

export interface AppBaseInfo {
    actived: AppBase[];
    notStart: AppBase[];
}

export interface BenefitBase {
    id: string;
    rewardType: string;
    category: string;
    provider: string;
    name: string;
    benefitName: string;
    description: string;
    picture: string;
    providerPicture: string;
    url: string;
    status: string;
    tasks: BenefitTask[];
}

export interface BenefitTask {
    id: string;
    name: string;
    bio: string;
    description: string;
    url: string;
    isFinished: boolean;
}

export interface BenefitBaseInfo {
    achieved: BenefitBase[];
    inProgress: BenefitBase[];
    notStart: BenefitBase[];
}

export interface ProfileBaseInfo {
    picture: string;
    coverPicture: string;
    id: string;
    name: string;
    handle: string;
    bio: string;
    followers: number;
    following: number;
    attributes: Attributes;
    createdAt: string;
}

export interface ProfileBaseAITags {
    id: string;
    name: string;
    category: string;
    provider: string;
    description: string;
    picture: string;
    tokenId: string;
    url: string;
}

export interface ProfileBaseAchievement {
    id: string;
    category: string;
    provider: string;
    name: string;
    description: string;
    picture: string;
    tokenId: string;
    url: string;
    status: string;
}

export interface ProfileActivityBase {
    total: number;
    lastWeek: number;
}

export interface ProfileBaseActivity {
    posts: ProfileActivityBase;
    comments: ProfileActivityBase;
    mirrors: ProfileActivityBase;
    collects: ProfileActivityBase;
}

export interface ProfileBaseBenefit {
    id: string;
    rewardType: string;
    category: string;
    provider: string;
    name: string;
    benefitName: string;
    description: string;
    picture: string;
    providerPicture: string;
    url: string;
    status: string;
}
