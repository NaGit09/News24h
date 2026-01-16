import { formatRelativeTime } from "@/lib/time";
import { Link } from "react-router";

interface NewsStackItem {
  title: string;
  sapo?: string;
  href: string;
  publishedAt: string;
}

interface NewsStackProps {
  items: NewsStackItem[];
  title?: string;
}

export function NewsStack({ items, title = "Tin mới nhất" }: NewsStackProps) {
  return (
    <div className="border-l-2 border-primary pl-4">
      <h3 className="mb-4 border-b border-border pb-2 text-sm font-bold uppercase tracking-wider text-foreground">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex gap-2 pb-3 border-b border-border/30 last:border-0"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <Link to={item.href} className="group flex-1">
              <h4 className="text-sm font-semibold leading-tight text-foreground transition-colors group-hover:text-primary line-clamp-2">
                {item.title}
              </h4>
              {item.sapo && (
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {item.sapo}
                </p>
              )}
              <time className="mt-1 block text-xs text-muted-foreground">
              {formatRelativeTime(item.publishedAt)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
