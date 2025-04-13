import { LucideIcon } from "lucide-react"

type ButtonProps = {
    label: string
    icon?: LucideIcon
    onClick?: () => void
    className?: string
}

export default function Button({
    label,
    icon: Icon,
    onClick,
    className = "",
}: ButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex cursor-pointer items-center text-xs font-medium text-text-secondary hover:text-text-primary ${className}`}
        >
            {Icon && <Icon className="w-4 h-4 me-2" />}
            {label}
        </button>
    )
}

