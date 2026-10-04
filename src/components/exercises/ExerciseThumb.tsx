import { useEffect, useState } from "react";

const FALLBACK = "/default-image.webp";

/**
 * Cloudinary serves whatever was uploaded unless the URL asks otherwise, and
 * these are straight-from-the-phone shots — 3024x4032, ~12MP — painted into a
 * ~250px tile. Injecting a transformation segment after `/upload/` lets the CDN
 * do the resizing and format negotiation.
 */
function optimize(src: string, width: number) {
    if (!src.includes("res.cloudinary.com") || !src.includes("/upload/")) {
        return src;
    }
    if (/\/upload\/(c_|w_|f_|q_)/.test(src)) return src; // already transformed
    return src.replace(
        "/upload/",
        `/upload/f_auto,q_auto,c_limit,w_${width}/`
    );
}

type ExerciseThumbProps = {
    src?: string;
    name: string;
    width?: number;
    className?: string;
};

/**
 * Single source of truth for exercise imagery.
 *
 * Replaces the `src || "/default-image.webp"` idiom that was copy-pasted across
 * four files. That idiom only covered empty strings, so a stored-but-dead URL
 * rendered as a blank box; `onError` covers it. `object-contain` on a light tile
 * keeps white-background illustrations whole — `object-cover` was cropping
 * several of them to a blank sliver.
 */
export default function ExerciseThumb({
    src,
    name,
    width = 600,
    className = "",
}: ExerciseThumbProps) {
    const resolve = (value?: string) =>
        value ? optimize(value, width) : FALLBACK;

    const [imageSrc, setImageSrc] = useState(() => resolve(src));

    useEffect(() => {
        setImageSrc(resolve(src));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src, width]);

    return (
        <div
            className={`aspect-square w-full overflow-hidden bg-white ${className}`}
        >
            <img
                src={imageSrc}
                alt={name}
                width={400}
                height={300}
                loading="lazy"
                decoding="async"
                onError={() => setImageSrc(FALLBACK)}
                className="h-full w-full object-contain"
            />
        </div>
    );
}
