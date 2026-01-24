// User types - consolidated from utils/types.ts
export interface NotificationSettings {
    pushNotifications?: boolean;
    emailNotifications?: boolean;
    smsNotifications?: boolean;
    promotions?: boolean;
    updates?: boolean;
    reminders?: boolean;
}

export interface PrivacySettings {
    locationAccess?: boolean;
    contactsAccess?: boolean;
    cameraAccess?: boolean;
    microphoneAccess?: boolean;
    profileVisibility?: 'public' | 'friends' | 'private';
    activityStatus?: boolean;
}

export interface SecuritySettings {
    twoFactorEnabled?: boolean;
    loginHistory?: LoginHistoryItem[];
    connectedDevices?: ConnectedDeviceItem[];
}

export interface LoginHistoryItem {
    timestamp?: string;
    device?: string;
    ip?: string;
    location?: string;
    status?: string;
}

export interface ConnectedDeviceItem {
    id?: string;
    name?: string;
    type?: string;
    lastActive?: string;
}

export interface User {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
    bio?: string;
    country?: string;
    interests: string[];
    hobby?: string;
    friendsCount?: number;
    followersCount?: number;
    rewardPoints?: number;
    totalCheckins?: number;
    totalBadges?: number;
    visitedPlaces?: number;
    phone?: string;
    dateOfBirth?: string;
    gender?: string;
    location?: string;
    notificationSettings?: NotificationSettings;
    privacySettings?: PrivacySettings;
    securitySettings?: SecuritySettings;
}

export interface UserBasic {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
    bio?: string;
    country?: string;
    interests?: string[];
    phone?: string;
    dateOfBirth?: string;
    gender?: string;
    hobby?: string;

}