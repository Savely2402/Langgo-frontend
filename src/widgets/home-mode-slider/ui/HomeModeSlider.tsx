import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, LogIn, Play } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useUser } from '@/entities/user'
import { AuthRequiredDialog } from '@/features/auth-required-dialog'
import { routes } from '@/shared/config'
import { cn } from '@/shared/lib/classNames'
import { Button } from '@/shared/ui/Button'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from '@/shared/ui/Carousel'
import { HOME_MODES, RANKED_MODE_INDEX } from '../config/homeModesConfig'
import { HomeModeCard } from './HomeModeCard'

export const HomeModeSlider = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const [api, setApi] = useState<CarouselApi>()
    const [activeIndex, setActiveIndex] = useState(RANKED_MODE_INDEX)
    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)

    useEffect(() => {
        if (!api) return

        const syncActiveSlide = () => setActiveIndex(api.selectedScrollSnap())

        syncActiveSlide()
        api.on('select', syncActiveSlide)
        api.on('reInit', syncActiveSlide)

        return () => {
            api.off('select', syncActiveSlide)
            api.off('reInit', syncActiveSlide)
        }
    }, [api])

    return (
        <>
            <section className="relative isolate overflow-hidden px-4 pt-6 pb-14 sm:px-6 lg:px-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(253,224,71,0.22),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,250,249,0.92))]" />
                <div className="pointer-events-none absolute top-12 left-[6%] h-56 w-56 rounded-full bg-sky-100/80 blur-3xl" />
                <div className="pointer-events-none absolute top-8 right-[8%] h-44 w-44 rounded-full bg-amber-100/80 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-emerald-100/60 blur-3xl" />
                <div className="pointer-events-none absolute top-10 right-[14%] hidden size-14 rounded-full border border-sky-100/90 sm:block" />

                <div className="relative mx-auto max-w-[1240px]">
                    <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
                        <div className="space-y-3">
                            <div className="space-y-2">
                                <h1 className="max-w-[14ch] text-3xl leading-none font-black tracking-tight text-slate-800 sm:text-4xl md:text-[54px]">
                                    Выберите идеальный режим для следующей игры
                                </h1>
                            </div>
                        </div>

                        <div className="hidden items-center gap-3 lg:flex">
                            <Button
                                variant="outline"
                                size="icon-lg"
                                className="rounded-full border-white/70 bg-white/80 shadow-[0_12px_24px_rgba(148,163,184,0.18)] backdrop-blur"
                                onClick={() => api?.scrollPrev()}
                            >
                                <ChevronLeft className="size-6" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon-lg"
                                className="rounded-full border-white/70 bg-white/80 shadow-[0_12px_24px_rgba(148,163,184,0.18)] backdrop-blur"
                                onClick={() => api?.scrollNext()}
                            >
                                <ChevronRight className="size-6" />
                            </Button>
                        </div>
                    </div>

                    <div className="relative">
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute top-1/2 left-0 z-20 size-11 -translate-y-1/2 rounded-full border-white/70 bg-white/90 shadow-[0_12px_24px_rgba(148,163,184,0.18)] backdrop-blur lg:hidden"
                            onClick={() => api?.scrollPrev()}
                        >
                            <ChevronLeft className="size-5" />
                        </Button>

                        <Carousel
                            setApi={setApi}
                            opts={{
                                align: 'center',
                                loop: true,
                                startIndex: RANKED_MODE_INDEX,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="ml-0 items-stretch">
                                {HOME_MODES.map((mode, index) => (
                                    <CarouselItem
                                        key={mode.id}
                                        className="h-[500px] basis-[86%] pl-3 min-[480px]:basis-[72%] sm:basis-[62%] md:h-[560px] md:basis-[54%] lg:basis-[46%] xl:basis-[40%]"
                                    >
                                        <HomeModeCard
                                            mode={mode}
                                            isActive={index === activeIndex}
                                            isAuthenticated={!!user}
                                            onActivate={() =>
                                                api?.scrollTo(index)
                                            }
                                            onOpenAuthDialog={() =>
                                                setIsAuthDialogOpen(true)
                                            }
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>

                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute top-1/2 right-0 z-20 size-11 -translate-y-1/2 rounded-full border-white/70 bg-white/90 shadow-[0_12px_24px_rgba(148,163,184,0.18)] backdrop-blur lg:hidden"
                            onClick={() => api?.scrollNext()}
                        >
                            <ChevronRight className="size-5" />
                        </Button>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-2 lg:hidden">
                        {HOME_MODES.map((mode, index) => (
                            <button
                                key={mode.id}
                                type="button"
                                className={cn(
                                    'size-2.5 rounded-full transition-all',
                                    index === activeIndex
                                        ? 'w-9 bg-primary'
                                        : 'bg-slate-300 hover:bg-slate-400',
                                )}
                                onClick={() => api?.scrollTo(index)}
                            />
                        ))}
                    </div>

                    {!user && HOME_MODES[activeIndex]?.id === 'custom' && (
                        <div className="mx-auto mt-8 flex max-w-[720px] items-center justify-center gap-3 rounded-full border border-white/80 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-[0_16px_30px_rgba(148,163,184,0.14)] backdrop-blur-xl">
                            <Play className="size-4 text-primary" />
                            <span className="text-center">
                                Гостям уже доступна своя игра. Остальные режимы
                                откроются после входа в аккаунт.
                            </span>
                            <Button
                                type="button"
                                variant="secondary"
                                className="hidden rounded-full sm:inline-flex"
                                onClick={() => navigate(routes.login)}
                            >
                                <LogIn className="size-4" />
                                Войти
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            <AuthRequiredDialog
                open={isAuthDialogOpen}
                onOpenChange={setIsAuthDialogOpen}
            />
        </>
    )
}
