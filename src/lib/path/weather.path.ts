import { WeatherSystemPromptTemplate } from "../template/weather/weather.system.prompt.template";
import { WeatherHumanPromptTemplate } from "../template/weather/weather.human.prompt.template";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { weatherAPIFlow } from "@/modules/weather/weather.api.flow";
import { getChatModel } from "@/modules/model/chat.model";
import { NextResponse } from "next/server";
import { convertWeatherResponseToJson } from "@/utils/convertResponseToJson";

export const weatherPath = async (query: string, route: string) => {
  try {
    const model = getChatModel({ temperature: 2 });
    const weatherData = await weatherAPIFlow(query);

    const WeatherSystemPrompt = WeatherSystemPromptTemplate(weatherData);
    const WeatherHumanPrompt = WeatherHumanPromptTemplate(query);

    const response = await model.invoke([
      new SystemMessage(WeatherSystemPrompt),
      new HumanMessage(WeatherHumanPrompt),
    ]);

    const result = convertWeatherResponseToJson(response.content as string);

    return NextResponse.json(
      {
        success: true,
        error: null,
        message: "Request sent Successfully.",
        result,
        path: route,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: true,
        error:
          error instanceof Error ? error.message : "Unknown Error Occured.",
        message: "Something went wrong.",
      },
      { status: 500 },
    );
  }
};
