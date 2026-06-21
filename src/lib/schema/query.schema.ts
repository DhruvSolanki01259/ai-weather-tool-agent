import { z } from "zod";

export const QueryValidateSchema = z.string().min(1);
