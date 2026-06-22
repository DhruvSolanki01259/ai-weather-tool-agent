import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RouteBadge } from "../ui/RouteBadge";

export function DirectResultCard({ data }: any) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Card className="border border-dashed shadow-sm bg-white/60 backdrop-blur-sm">
        <CardContent className="py-10 text-center text-muted-foreground">
          No data found for this query.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md border border-blue-100 rounded-xl bg-gradient-to-b from-blue-50/40 to-white backdrop-blur-sm">

      {/* HEADER */}
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold text-blue-950 leading-tight">
            {data.title}
          </CardTitle>

          {data.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        <RouteBadge type="direct" />
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="space-y-6">

        {/* ANALYSIS */}
        {data.explanation && (
          <Section title="Analysis" text={data.explanation} />
        )}

        {/* SUMMARY */}
        {data.summary && (
          <div className="p-4 rounded-lg border bg-white/80 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-blue-700 mb-1 font-medium">
              Quick Summary
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {data.summary}
            </p>
          </div>
        )}

        {/* EXAMPLES */}
        {Array.isArray(data.examples) && data.examples.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-blue-700 font-semibold">
              Examples
            </h3>

            <div className="space-y-3">
              {data.examples.map((ex: any, i: number) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border border-blue-100 bg-blue-50/30 hover:bg-blue-50/50 transition shadow-sm"
                >
                  {ex.input && (
                    <div className="text-sm">
                      <span className="font-semibold text-blue-900">Input:</span>{" "}
                      <span className="text-muted-foreground">{ex.input}</span>
                    </div>
                  )}

                  {ex.output && (
                    <div className="text-sm mt-1">
                      <span className="font-semibold text-blue-900">Output:</span>{" "}
                      <span className="text-muted-foreground">{ex.output}</span>
                    </div>
                  )}

                  {ex.note && (
                    <div className="text-xs mt-2 text-muted-foreground italic">
                      {ex.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* SECTION */
function Section({ title, text }: any) {
  if (!text) return null;

  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold text-blue-900">{title}</h3>
      <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
        {text}
      </p>
    </div>
  );
}