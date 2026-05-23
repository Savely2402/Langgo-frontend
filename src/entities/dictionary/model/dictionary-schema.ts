import { z } from 'zod'
import { languageCodeSchema } from '@/shared/config'

export const wordPairSchema = z
    .object({
        originalWord: z.string(),
        translatedWord: z.string(),
    })
    .superRefine((data, ctx) => {
        const isOriginalEmpty = data.originalWord.trim() === ''
        const isTranslatedEmpty = data.translatedWord.trim() === ''

        if (isOriginalEmpty && isTranslatedEmpty) {
            return
        }

        if (isOriginalEmpty && !isTranslatedEmpty) {
            ctx.addIssue({
                code: 'custom',
                message: 'Введите слово',
                path: ['originalWord'],
            })
        }

        if (!isOriginalEmpty && isTranslatedEmpty) {
            ctx.addIssue({
                code: 'custom',
                message: 'Введите перевод',
                path: ['translatedWord'],
            })
        }
    })

export const dictionarySchema = z.object({
    name: z.string().min(2, 'Слишком короткое название'),
    langFrom: languageCodeSchema,
    langTo: languageCodeSchema,
    words: z.array(wordPairSchema).superRefine((words, ctx) => {
        const validPairs = words.filter(
            (w) =>
                w.originalWord.trim() !== '' && w.translatedWord.trim() !== '',
        )

        if (validPairs.length === 0) {
            ctx.addIssue({
                code: 'custom',
                message: 'Словарь не может быть пустым',
                path: ['root'],
            })
        }
    }),
})

export const quickAddWordsSchema = z.object({
    words: z.array(wordPairSchema).min(1),
})

export type DictionaryFormSchema = z.infer<typeof dictionarySchema>
export type QuickAddWordsSchema = z.infer<typeof quickAddWordsSchema>
