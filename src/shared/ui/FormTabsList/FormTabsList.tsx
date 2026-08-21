import { TabsList, TabsTrigger } from '../Tabs'

type FormTabItem = {
    value: string
    label: React.ReactNode
}

interface FormTabsListProps {
    items: FormTabItem[]
}

export const FormTabsList = ({ items }: FormTabsListProps) => {
    return (
        <TabsList className="w-full rounded-4xl">
            {items.map(({ value, label }) => (
                <TabsTrigger
                    key={value}
                    value={value}
                    className="rounded-4xl font-semibold data-[state=active]:text-primary"
                >
                    {label}
                </TabsTrigger>
            ))}
        </TabsList>
    )
}
