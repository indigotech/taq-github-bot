import { OpenTrackType } from "domain/entities/track.model";
import { OpenStepType } from "domain/entities/step.model";

export interface TrackInfo {
    title: string;
    bodyPath: string;
    openStrategy: OpenTrackType;
    openStepStrategy: OpenStepType;
}