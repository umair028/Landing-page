/** Set on a video element once it has played to the end at least once (see `hasPlayedThrough`). */
export const PLAYED_THROUGH_ATTR = 'data-played-through'

/** Whether `video` has finished a full play since it was mounted. */
export const hasPlayedThrough = (video: HTMLVideoElement) => video.hasAttribute(PLAYED_THROUGH_ATTR)
