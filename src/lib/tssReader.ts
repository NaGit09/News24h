import { createRecord } from "@/services/TTS.service"
import type { TTSSuccessResponse } from "@/types/tts"

export const tssReader = async (content: string) : Promise<TTSSuccessResponse> => {
    return await createRecord(content)
}