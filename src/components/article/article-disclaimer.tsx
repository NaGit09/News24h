import {AlertCircle} from "lucide-react"

export function ArticleDisclaimer() {
    return (
        <div className="my-8 border-t border-border pt-6">
            <div className="flex gap-3 rounded-sm border-l-4 border-primary bg-muted/20 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary"/>
                <div className="space-y-1 text-sm">
                    <p className="font-semibold text-foreground">Nguồn tin</p>
                    <p className="text-muted-foreground">
                        Bài viết được tổng hợp từ <span className="font-semibold text-foreground">24h.com.vn</span>
                    </p>
                </div>
            </div>
        </div>
    )
}


