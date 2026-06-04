import { Plus } from 'lucide-react'
import { Link } from 'react-router'
import { routes } from '@/shared/config'
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
                    <h1 className="my-8 font-luckiest text-3xl tracking-widest sm:text-4xl">
                        Мои словари
                    </h1>
                    <Button asChild className="btn-3d hover-elevate">
                        <Link to={routes.dictionaryAdd}>
                            <Plus />
                            <span className="sm:hidden">Добавить</span>
                            <span className="hidden sm:block">
                                Новый словарь
                            </span>
                        </Link>
                    </Button>
                </div>

                <UserDictionaries />
            </div>
        </>
    )
}
