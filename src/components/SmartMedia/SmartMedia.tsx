"use client";

import React from "react";
import { Media, MediaTypes, MimeTypes, Src } from "utils/types/media";
import BaseImage from "components/BaseVideoImage/BaseImage";
import BaseVideo from "components/BaseVideoImage/BaseVideo";
import { getMediaPath } from "utils/functions/mediaFunctions";

type Props = {
  className?: string;
  item: Media;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  skeletonClassName?: string;
};

const SmartMedia = ({
  className = "",
  item,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  playsInline = false,
  skeletonClassName = "",
  ...restProps
}: Props) => {
  const { src, alt }: Media = item;
  const { type, mime, url }: Src = src;

  const getUrl = (): string => {
    const urlParts = url.split("/");
    const videoId = urlParts[urlParts.length - 1];
    let baseUrl = url + `?`;
    const params: string[] = [
      `?controls=${controls ? 1 : 0}`,
      "playsinline=1",
      `playlist=${videoId}`,
      `showinfo=${controls ? 1 : 0}`,
      "rel=0",
    ];
    if (autoPlay) {
      params.push("autoplay=1");
    }
    if (loop) {
      params.push("loop=1");
    }
    if (muted) {
      params.push("mute=1");
    }
    return baseUrl + params.join("&");
  };

  if (mime === MimeTypes.VIDEO) {
    if (type === MediaTypes.INTERNAL) {
      return (
        <BaseVideo
          className={`media ${className}`}
          src={getMediaPath(url)}
          controls={controls}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          skeletonClassName={skeletonClassName}
        />
      );
    } else if (type === MediaTypes.EXTERNAL) {
      const fullUrl = getUrl();
      return (
        <div className={`media ${className}`}>
          <iframe
            src={fullUrl}
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
            allowFullScreen
          />
        </div>
      );
    }
  } else if (mime === MimeTypes.IMAGE) {
    const isInternal = type === MediaTypes.INTERNAL;
    return (
      <BaseImage
        className={`media ${className}`}
        src={isInternal ? getMediaPath(url) : url}
        alt={alt ?? ""}
        skeletonClassName={skeletonClassName}
      />
    );
  }
  return <></>;
};

export default SmartMedia;
