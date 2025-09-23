"use client";
import { useRef } from "react";
import RichText from "@/components/RichText";
import Image from "next/image";
import useInView from "@/lib/hooks/useInView";

import mediaStyles from "@/styles/Media.module.css";
import layoutStyles from "@/styles/Layout.module.css";

const MediaText = ({ slice }) => {
  const alignYClass = layoutStyles[`alignY__${slice.primary.align_y}`];
  const inverseClass = slice.primary.inverse ? layoutStyles.inverse : "";
  const widthClass = layoutStyles[`width__${slice.primary.width}`];
  const spacingTopClass = layoutStyles[`spacingTop__${slice.primary.spacing_top}`];
  const spacingBottomClass = layoutStyles[`spacingBottom__${slice.primary.spacing_bottom}`];

  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className={`${layoutStyles.sectionContainer} ${widthClass} ${spacingTopClass} ${spacingBottomClass}`}>

        {slice.variation === "default" && (
          <div ref={ref} className={`${layoutStyles.gridContainer} ${layoutStyles.grid2} ${inverseClass} ${isInView ? mediaStyles.inView : ""}`}>

            {/* Media block */}
            <div className={`${layoutStyles.gridItem}`}>
              {slice.primary.media?.map((item, index) => (
                <div key={index} className={`${layoutStyles.mediaContainer}`}>
                  <Image
                    src={item.image.url}
                    alt={item.image.alt || ""}
                    width={item.image.dimensions?.width || 800}
                    height={item.image.dimensions?.height || 600}
                    className="object-contain w-full h-auto"
                  />
                </div>
              ))}

              {/* Feature tags */}
              {slice.primary.media_feature?.length > 0 && (
                <ul className={mediaStyles.featureTags}>
                  {slice.primary.media_feature.map((item, index) => (
                    <li key={index} className={mediaStyles.featureTag} style={{ "--index": index }}>
                      {item.pill}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Text block */}
            <div className={`${layoutStyles.gridItem} ${layoutStyles.textContainer} ${alignYClass}`}>
              {slice.primary.text_feature?.map((item, index) => (
                <div key={index}>
                  <Image
                    src={item.image.url}
                    alt={item.image.alt || ""}
                    width={250}
                    height={200}
                    className="object-contain"
                  />
                </div>
              ))}
              {slice.primary.rich_text?.map((item, index) => (
                <div key={index}>
                  <RichText field={item} />
                </div>
              ))}
            </div>
          </div>
        )}

        {slice.variation === "withVideo" && (
          <div className={`${layoutStyles.gridContainer} ${layoutStyles.grid2} ${inverseClass} ${isInView ? mediaStyles.inView : ""}`}>

            {/* Video block */}
            <div className={`${layoutStyles.gridItem}`}>
              {slice.primary.media?.map((item, index) => (
                <div key={index} className={`${layoutStyles.mediaContainer}`}>
                  <video
                    src={item.video.url}
                    className="w-full h-auto object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              ))}

              {/* Feature tags */}
              {slice.primary.media_feature?.length > 0 && (
                <ul className={mediaStyles.featureTags}>
                  {slice.primary.media_feature.map((item, index) => (
                    <li key={index} className={mediaStyles.featureTag} style={{ "--index": index }}>
                      {item.pill}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Text block */}
            <div className={`${layoutStyles.gridItem} ${layoutStyles.textContainer} ${alignYClass}`}>
              {slice.primary.rich_text?.map((item, index) => (
                <div key={index}>
                  <RichText field={item} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default MediaText;
