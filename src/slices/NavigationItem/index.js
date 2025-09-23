import Link from "next/link";
import RichText from "@/components/RichText";

/**
 * @typedef {import("@prismicio/client").Content.NavigationItemSlice} NavigationItemSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<NavigationItemSlice>} NavigationItemProps
 * @param {NavigationItemProps}
 */

const NavigationItem = ({ slice }) => {
  // Protection contre les données manquantes
  if (!slice || !slice.primary) {
    return null;
  }

  return (
    <li
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.variation === "default" ? (
        <Link href={slice.primary.link?.url || "#"}>
          <RichText field={slice.primary.label} />
        </Link>
      ) : slice.variation === "withSubMenu" ? (
        <>
          <Link href={slice.primary.link?.url || "#"}>
            <RichText field={slice.primary.label} />
          </Link>

          {slice.items?.length > 0 && (
            <ul>
              {slice.items.map((subItem, index) => (
                <li key={index}>
                  <Link href={subItem.link?.url || "#"}>
                    <RichText field={subItem.label} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>Unsupported variation</p>
      )}
    </li>
  );
};

export default NavigationItem;

