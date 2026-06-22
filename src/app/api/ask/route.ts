import { QueryValidateSchema } from "@/lib/schema/query.schema";
import { routeStrategy } from "@/modules/route/route.strategy";
import { NextRequest, NextResponse } from "next/server";
import { weatherPath } from "@/lib/path/weather.path";
import { directPath } from "@/lib/path/direct.path";

export const GET = async (request: NextRequest) => {
  try {
    const body = await request.json();
    return NextResponse.json(
      {
        success: false,
        error: null,
        message: "Test Route Working!!!.",
        body,
      },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error Occured.";
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        message: "Internal Server Error.",
      },
      { status: 500 },
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const { query } = await request.json();
    const validateQuery = QueryValidateSchema.parse(query);

    const route = routeStrategy(validateQuery);
    if (route === "direct") {
      return directPath(validateQuery, route);
    } else {
      return weatherPath(validateQuery, route);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error Occured.";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        message: "Internal Server Error.",
      },
      { status: 500 },
    );
  }
};
