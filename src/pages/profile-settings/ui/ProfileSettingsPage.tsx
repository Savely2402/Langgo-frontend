import { ChangePasswordForm } from '@/features/change-password'
import { ProfileForm } from '@/features/edit-profie'
import { AppHeader } from '@/widgets/app-header'
import { HeaderProfile } from '@/widgets/header-profile'

export const ProfileSettingsPage = () => {
    return (
        <>
            <AppHeader rightSlot={<HeaderProfile />} />
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5 lg:gap-8">
                <div className="lg:col-span-3">
                    <ProfileForm />
                </div>

                <div className="lg:col-span-2">
                    <ChangePasswordForm />
                </div>
            </div>
        </>
    )
}
