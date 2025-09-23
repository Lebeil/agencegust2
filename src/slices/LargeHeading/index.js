import RichText from "@/components/RichText";

const LargeHeading = ({ slice }) => {
  const sectionContainerStyle = "px-12 pb-36";
  const maxWidthStyle = "mx-auto max-w-7xl";
  const gridStyle = "grid gap-8";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className={`${sectionContainerStyle}`}>
        {slice.variation === "default" && (
          <div className={`${gridStyle} ${maxWidthStyle}`}>
            {slice.primary.rich_text?.map((item, index) => (
              <RichText
                key={index}
                field={item}
                components={{
                  heading1: ({ children }) => (
                    <h1 className="text-7xl font-bold font-avenir uppercase">
                      {children}
                    </h1>
                  ),
                  heading2: ({ children }) => (
                    <h2 className="text-7xl font-bold font-avenir uppercase">
                      {children}
                    </h2>
                  ),
                  paragraph: ({ children }) => (
                    <p className={`max-w-4xl text-md font-avenir`}>
                      {children}
                    </p>
                  ),
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LargeHeading;
