/**
 * Decorative "review vector" blobs (a fan of overlapping circles) anchored in two
 * opposite corners of a section — top-right and a mirrored copy bottom-left.
 *
 * The parent section must be `relative overflow-hidden`, and its real content should
 * sit in a `relative z-10` wrapper so it stays above these accents. Used on the
 * contact-page CTA and the services stats band.
 */
const SECTION_VECTOR =
    "https://cdn.prod.website-files.com/65b8e12a56259feed61841a0/65b8e12a56259feed61841c6_review-vecotr.svg";

const blobClass =
    "pointer-events-none absolute h-[164px] w-[160px] bg-contain bg-no-repeat sm:h-[205px] sm:w-[200px] md:h-[243px] md:w-[237px]";

export function SectionVectorBlobs() {
    return (
        <>
            <span aria-hidden className={`${blobClass} right-0 top-0`} style={{ backgroundImage: `url(${SECTION_VECTOR})` }} />
            <span aria-hidden className={`${blobClass} bottom-0 left-0 rotate-180`} style={{ backgroundImage: `url(${SECTION_VECTOR})` }} />
        </>
    );
}
