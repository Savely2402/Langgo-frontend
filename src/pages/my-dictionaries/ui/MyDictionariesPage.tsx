import { Plus } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { AppHeader } from '@/widgets/app-header'
import { HeaderProfile } from '@/widgets/header-profile'
import { UserDictionaries } from '@/widgets/user-dictionaries'

export const MyDictionariesPage = () => {
    return (
        <>
            <AppHeader rightSlot={<HeaderProfile />} />
            <div className="mx-auto max-w-[640px] px-4">
                <div className="flex items-center justify-between">
                    <h1 className="my-8 text-4xl font-black">Мои словари</h1>
                    <Button className="btn-3d hover-elevate">
                        <Plus />
                        Новый словарь
                    </Button>
                </div>

                <UserDictionaries />
            </div>
        </>
    )
}
