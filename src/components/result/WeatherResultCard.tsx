import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RouteBadge } from "../ui/RouteBadge";

export function WeatherResultCard({ data }: any) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Card className="border border-dashed shadow-sm bg-white/60 backdrop-blur-sm">
        <CardContent className="py-10 text-center text-muted-foreground">
          No weather data found for this location.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md border border-blue-100 rounded-xl bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 backdrop-blur-sm">

      {/* HEADER */}
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold text-blue-950">
            Weather Insight
          </CardTitle>

          {data.location && (
            <p className="text-sm text-muted-foreground">
              {data.location}
            </p>
          )}
        </div>

        <RouteBadge type="weather" />
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="space-y-6">

        {/* ANALYSIS */}
        {data.explanation && (
          <Section title="Analysis" text={data.explanation} />
        )}

        {/* SUMMARY */}
        {data.summary && (
          <div className="p-4 rounded-lg border border-blue-100 bg-blue-50/40 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-blue-700 font-medium mb-1">
              Quick Summary
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {data.summary}
            </p>
          </div>
        )}

        {/* METRICS */}
        {(data.temperature || data.condition) && (
          <div className="grid grid-cols-2 gap-3">

            {data.temperature && (
              <div className="p-4 rounded-lg border border-blue-100 bg-white/80 text-center shadow-sm hover:shadow-md transition">
                <p className="text-xs text-muted-foreground">Temperature</p>
                <p className="text-xl font-semibold text-blue-900 mt-1">
                  {data.temperature}
                </p>
              </div>
            )}

            {data.condition && (
              <div className="p-4 rounded-lg border border-blue-100 bg-white/80 text-center shadow-sm hover:shadow-md transition">
                <p className="text-xs text-muted-foreground">Condition</p>
                <p className="text-sm font-medium text-blue-900 mt-1">
                  {data.condition}
                </p>
              </div>
            )}

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
      <h3 className="text-sm font-semibold text-blue-900">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
        {text}
      </p>
    </div>
  );
}