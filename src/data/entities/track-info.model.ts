import { OpenStepType } from '@domain/entities/step.model';
import { OpenTrackType } from '@domain/entities/track.model';

export interface TrackInfo {
    title: string;
    bodyPath: string;
    openStrategy: OpenTrackType;
    openStepStrategy: OpenStepType;
}
