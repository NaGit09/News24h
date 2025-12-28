import { TrendingUp } from "lucide-react"

const sportMatches = [
  { team1: "Man City", team2: "Liverpool", score: "2-1", status: "LIVE", league: "Premier League" },
  { team1: "Real Madrid", team2: "Barcelona", score: "3-3", status: "FT", league: "La Liga" },
  { team1: "Bayern", team2: "Dortmund", score: "18:30", status: "Sắp diễn ra", league: "Bundesliga" },
]

export function SportWidget() {
  return (
    <div className="border border-border overflow-hidden">
      <div className="flex items-center justify-between border-b-2 border-primary bg-primary/5 px-4 py-2">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
          <TrendingUp className="h-4 w-4 text-primary" />
          Bóng đá - Thể thao
        </h3>
        <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-accent" />
      </div>

      <div className="divide-y divide-border">
        {sportMatches.map((match, index) => (
          <div key={index} className="p-3 transition-colors hover:bg-primary/5">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase text-muted-foreground">{match.league}</span>
              <span
                className={`text-xs font-semibold uppercase ${
                  match.status === "LIVE"
                    ? "text-accent"
                    : match.status === "FT"
                      ? "text-muted-foreground"
                      : "text-primary"
                }`}
              >
                {match.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-foreground">{match.team1}</span>
              <span className="font-bold text-primary text-base">{match.score}</span>
              <span className="font-bold text-foreground">{match.team2}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
