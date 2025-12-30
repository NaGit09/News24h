import type React from "react"
import {useState} from "react"
import {Check, Mail} from "lucide-react"

export function NewsletterSubscription() {
    const [email, setEmail] = useState("")
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setIsSubscribed(true)
        setIsLoading(false)
        setEmail("")

        // Reset after 3 seconds
        setTimeout(() => {
            setIsSubscribed(false)
        }, 3000)
    }

    return (
        <div className="my-8 border border-border bg-muted/30 p-6">
            <div className="mb-4 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary"/>
                </div>
                <div>
                    <h3 className="mb-1 text-lg font-bold text-foreground">Đăng ký nhận tin</h3>
                    <p className="text-sm text-muted-foreground">
                        Nhận tin tức mới nhất về kinh tế, tài chính và thị trường qua email mỗi ngày
                    </p>
                </div>
            </div>

            {isSubscribed ? (
                <div
                    className="flex items-center gap-2 rounded-md bg-green-500/10 px-4 py-3 text-green-700 dark:text-green-400">
                    <Check className="h-5 w-5"/>
                    <span className="text-sm font-medium">Đăng ký thành công! Kiểm tra email của bạn.</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="flex-1 rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                    >
                        {isLoading ? "Đang xử lý..." : "Đăng ký"}
                    </button>
                </form>
            )}

            <p className="mt-3 text-xs text-muted-foreground">
                Chúng tôi tôn trọng quyền riêng tư của bạn. Hủy đăng ký bất cứ lúc nào.
            </p>
        </div>
    )
}


