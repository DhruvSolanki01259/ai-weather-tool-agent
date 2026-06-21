import { WeatherSystemPromptTemplate } from "@/lib/template/weather/weather.system.prompt.template";
import { WeatherHumanPromptTemplate } from "@/lib/template/weather/weather.human.prompt.template";
import { DirectSystemPromptTemplate } from "@/lib/template/direct/direct.system.prompt.template";
import { DirectHumanPromptTemplate } from "@/lib/template/direct/direct.human.prompt.template";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { NextRequest, NextResponse } from "next/server";
import { getWeatherData } from "@/modules/weather/weather.api";
import { getChatModel } from "@/modules/model/chat.model";
import { QueryValidateSchema } from "@/lib/schema/query.schema";
import { getWeatherDetails } from "@/modules/weather/weather.details";

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
    const weatherDetails = getWeatherDetails(validateQuery);
    const weatherData = await getWeatherData("Mumbai");

    // 4. Decide the Path/Route.
    const route = "direct";

    // 5. Generate the Data/Content.
    const model = getChatModel({ temperature: 0.3 });

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
        },
        { status: 200 },
      );
    } else {
      const WeatherSystemPrompt = WeatherSystemPromptTemplate();
      const WeatherHumanPrompt = WeatherHumanPromptTemplate(weatherData);

      console.log(`Weather Path`);

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
        },
        { status: 200 },
      );
    }

    // 6. Structured JSON Format.

    // return NextResponse.json(
    //   {
    //     success: false,
    //     error: null,
    //     message: "Request sent Successfully.",
    //     response: response.content,
    //     weatherData,
    //   },
    //   { status: 200 },
    // );
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
