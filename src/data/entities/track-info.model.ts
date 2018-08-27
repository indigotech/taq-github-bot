import { OpenStepType } from '@domain/entities/step.model';
import { OpenTrackType } from '@domain/entities/track.model';

export interface TrackInfo {
    title: string;
    openStrategy: OpenTrackType;
    openStepStrategy: OpenStepType;
}
