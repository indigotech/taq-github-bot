import { Track } from '@domain/entities';
import { mapTrackerfromFolder } from './mappers';

export function createTracksFromFolder(): Track[] {
    const trackFolders = ['track-1'];

    return trackFolders.map(trackFolder => mapTrackerfromFolder(trackFolder));
}
