import { env } from "./env";

interface ZoomTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface ZoomMeetingResponse {
  id: number;
  join_url: string;
  start_url: string;
  password: string;
  topic: string;
  start_time: string;
  duration: number;
}

interface CreateMeetingParams {
  topic: string;
  startTime: string; // ISO 8601 format
  duration?: number; // in minutes
  agenda?: string;
}

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const credentials = Buffer.from(
    `${env.ZOOM_CLIENT_ID}:${env.ZOOM_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${env.ZOOM_ACCOUNT_ID}`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get Zoom access token: ${error}`);
  }

  const data: ZoomTokenResponse = await response.json();

  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 300) * 1000,
  };

  return data.access_token;
}

export async function createZoomMeeting({
  topic,
  startTime,
  duration = 60,
  agenda,
}: CreateMeetingParams): Promise<{
  joinUrl: string;
  meetingId: string;
  password: string;
}> {
  const accessToken = await getAccessToken();

  const response = await fetch("https://api.zoom.us/v2/users/me/meetings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic,
      type: 2,
      start_time: startTime,
      duration,
      timezone: "Europe/Lisbon",
      agenda,
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        mute_upon_entry: true,
        waiting_room: true,
        auto_recording: "none",
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create Zoom meeting: ${error}`);
  }

  const data: ZoomMeetingResponse = await response.json();

  return {
    joinUrl: data.join_url,
    meetingId: data.id.toString(),
    password: data.password,
  };
}
