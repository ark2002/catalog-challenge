import { ArrowDownRight, ArrowUpRight } from "lucide-react"

type StatCardProps = {
    label: string
    value: number
    from: number
    isPositive?: boolean
    unit?: string
}

export default function StatCard({
    label,
    value,
    from,
    isPositive,
    unit = "$",
}: StatCardProps) {
    const changePercentage = (((value - from) / from) * 100).toFixed(2)

    return (
        <article
            className="flex flex-col gap-4 rounded-2xl border border-text-primary bg-gradient-to-br from-primary/30 to-background p-5 shadow-md ring-1 ring-text-primary/30"
        >
            <div
                className={`inline-flex items-center gap-1.5 self-end rounded-md px-2 py-1 text-xs font-medium 
        ${isPositive ? "bg-success/20 text-success" : "bg-error/20 text-error"}`}
            >
                {isPositive ? (
                    <ArrowUpRight className="w-4 h-4" />
                ) : (
                    <ArrowDownRight className="w-4 h-4" />
                )}
                <span>{Math.abs(parseFloat(changePercentage))}%</span>
            </div>

            <div>
                <strong className="block text-sm font-medium text-text-secondary">{label}</strong>

                <p className="text-2xl font-semibold text-text-primary mt-1">
                    {unit}
                    {value.toLocaleString()}
                    <span className="ml-2 text-xs text-text-secondary">
                        from {unit}
                        {from.toLocaleString()}
                    </span>
                </p>
            </div>
        </article>
    )
}
