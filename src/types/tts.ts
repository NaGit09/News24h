export interface TTSRequest {
    text: string;
    voice_id: string;
    multiNativeLocale: string;
    format: string;
}
export interface TTSSuccessResponse {
    audioFile: string;
    encodeAudio: string;
    audioLengthInSeconds: number;
}