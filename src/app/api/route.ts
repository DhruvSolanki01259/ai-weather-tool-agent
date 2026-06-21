import { NextRequest, NextResponse } from "next/server";
import { getChatModel } from "@/modules/model/chat.model";
import { QueryValidateSchema } from "@/lib/schema/query.schema";
import { routeStrategy } from "@/modules/route/route.strategy";
import { weatherAPIFlow } from "@/modules/weather/weather.api.flow";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { WeatherSystemPromptTemplate } from "@/lib/template/weather/weather.system.prompt.template";
import { WeatherHumanPromptTemplate } from "@/lib/template/weather/weather.human.prompt.template";
import { DirectSystemPromptTemplate } from "@/lib/template/direct/direct.system.prompt.template";
import { DirectHumanPromptTemplate } from "@/lib/template/direct/direct.human.prompt.template";

export const GET = async (request: NextRequest) => {
  try {
    return NextResponse.json(
      {
        success: false,
        error: null,
        message: "Test Route Working!!!.",
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
    // 1. User Input.
    const { query } = await request.json();

    // 2. Validate the Input.
    const validateQuery = QueryValidateSchema.parse(query);

    // 3. Extract information from the input.
    const weatherData = await weatherAPIFlow(validateQuery);

    // 4. Decide the Path/Route.
    const route = routeStrategy(validateQuery);

    // 5. Generate the Data/Content.
    const model = getChatModel({ temperature: 2 });

    if (route === "direct") {
      const DirectSystemPrompt = DirectSystemPromptTemplate();
      const DirectHumanPrompt = DirectHumanPromptTemplate(query);

      const response = await model.invoke([
        new SystemMessage(DirectSystemPrompt),
        new HumanMessage(DirectHumanPrompt),
      ]);

      return NextResponse.json(
        {
          success: true,
          error: null,
          message: "Request sent Successfully.",
          response: response.content,
          path: route,
        },
        { status: 200 },
      );
    } else {
      const WeatherSystemPrompt = WeatherSystemPromptTemplate(weatherData);
      const WeatherHumanPrompt = WeatherHumanPromptTemplate(validateQuery);

      const response = await model.invoke([
        new SystemMessage(WeatherSystemPrompt),
        new HumanMessage(WeatherHumanPrompt),
      ]);

      return NextResponse.json(
        {
          success: true,
          error: null,
          message: "Request sent Successfully.",
          response: response.content,
          path: route,
        },
        { status: 200 },
      );
    }

    // 6. Structured JSON Format.

    return NextResponse.json(
      {
        success: true,
        error: null,
        message: "Request sent Successfully.",
        weatherData,
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
