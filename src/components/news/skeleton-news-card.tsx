export function SkeletonNewsCardFeatured() {
    return (
        <div className="group block">
            <div className="relative aspect-video overflow-hidden mb-2 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="space-y-2">
                <div className="h-6 bg-gradient-to-r from-muted via-muted/50 to-muted rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded w-full animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded w-5/6 animate-pulse" />
                <div className="h-3 bg-gradient-to-r from-muted via-muted/50 to-muted rounded w-24 animate-pulse" />
            </div>
        </div>
    )
}

export function SkeletonNewsCardSmall() {
    return (
        <div className="flex gap-3 py-3 border-b border-border/50 last:border-0">
            <div className="relative h-20 w-28 shrink-0 overflow-hidden bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded w-full animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded w-4/5 animate-pulse" />
                <div className="h-3 bg-gradient-to-r from-muted via-muted/50 to-muted rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-gradient-to-r from-muted via-muted/50 to-muted rounded w-20 animate-pulse" />
            </div>
        </div>
    )
}


