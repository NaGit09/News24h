import type { TTSSuccessResponse } from "@/types/tts";
import axios from "axios";

export const createRecord = async (
  text: string
): Promise<TTSSuccessResponse> => {
  try {
    const response = await axios.post("/tts", {
      text,
      voice_id: "Lia",
      multiNativeLocale: "vi-VN",
      format: "wav",
    });

    return {
      audioFile: response.data.audioFile,
      encodeAudio: response.data.encodeAudio,
      audioLengthInSeconds: response.data.audioLengthInSeconds,
    };
  } catch (err: any) {
    console.error(
      "TTS error:",
      err.response?.status,
      err.response?.data || err.message
    );
    throw err;
  }
};
