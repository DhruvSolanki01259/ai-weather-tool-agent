import { DirectSystemPromptTemplate } from "../template/direct/direct.system.prompt.template";
import { DirectHumanPromptTemplate } from "../template/direct/direct.human.prompt.template";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getChatModel } from "@/modules/model/chat.model";
import { NextResponse } from "next/server";
import { convertDirectResponseToJson } from "@/utils/convertResponseToJson";

export const directPath = async (query: string, route: string) => {
  try {
    const model = getChatModel({ temperature: 2 });

    const DirectSystemPrompt = DirectSystemPromptTemplate();
    const DirectHumanPrompt = DirectHumanPromptTemplate(query);

    const response = await model.invoke([
      new SystemMessage(DirectSystemPrompt),
      new HumanMessage(DirectHumanPrompt),
    ]);

    const result = convertDirectResponseToJson(response.content as string);

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
