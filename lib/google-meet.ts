/**
 * Creates a Jitsi Meet room for interviews.
 * Jitsi is free, open source, and requires no authentication or API keys.
 * Rooms are created on-demand when participants join.
 */

interface CreateMeetingParams {
  topic: string;
  startTime: string;
  duration?: number;
  agenda?: string;
}

export async function createGoogleMeetMeeting({
  topic,
}: CreateMeetingParams): Promise<{
  meetLink: string;
  eventId: string;
  calendarLink: string;
}> {
  const sanitizedTopic = topic
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase()
    .slice(0, 30);

  const uniqueId = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const roomName = `pst-${sanitizedTopic}-${uniqueId}`;

  const meetLink = `https://meet.jit.si/${roomName}`;

  return {
    meetLink,
    eventId: roomName,
    calendarLink: meetLink,
  };
}
