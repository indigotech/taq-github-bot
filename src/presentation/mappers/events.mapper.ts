import { Track } from '@domain/entities';
import { Event, EventType } from '@presentation/models';

export function mapTrackToEvent(currentTrack: Track): Event {
  if (!currentTrack || currentTrack.steps.length === 0) {
    return null;
  }

  if (currentTrack.number === 0 && currentTrack.steps.length === 1) {
    return {
      type: EventType.CreateFirstIssue,
      data: { title: currentTrack.title, body: currentTrack.steps[0].body },
    };
  }

  if (currentTrack.steps.length === 1) {
    return {
      type: EventType.CreateIssue,
      data: { title: currentTrack.title, body: currentTrack.steps[0].body },
    };
  }

  return {
    type: EventType.CreateComment,
    data: { body: currentTrack.steps[currentTrack.steps.length - 1].body },
  };
}
