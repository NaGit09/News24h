import { ChevronRight, Mail, User } from "lucide-react";
import { Link } from "react-router";

interface AuthorProfileCardProps {
  name: string;
  bio: string;
  avatar?: string;
  articleCount: number;
  email?: string;
}

export function AuthorProfileCard({
  name,
  bio,
  avatar,
  articleCount,
  email,
}: AuthorProfileCardProps) {
  return (
    <div className="my-8 border-y border-border py-6">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          {avatar ? (
            <img
              src={avatar || "/placeholder.svg"}
              alt={name}
              width="80"
              height="80"
              className="rounded-full"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-lg font-bold text-foreground">{name}</h3>
            <span className="text-sm text-muted-foreground">
              {articleCount} bài viết
            </span>
          </div>

          <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
            {bio}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary/80"
              >
                <Mail className="h-4 w-4" />
                <span>Liên hệ</span>
              </a>
            )}

            <Link
              to={`/tac-gia/${name.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary/80"
            >
              <span>Xem tất cả bài viết</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
