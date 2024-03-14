import { FC, ReactNode, HTMLProps } from "react";

// Define the possible typography variants
type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

// Define the TypographyProps interface extending HTMLProps to accept standard HTML attributes
interface TypographyProps extends HTMLProps<HTMLDivElement> {
  variant: TypographyVariant;
  children: ReactNode;
}

// Define the Typography component
export const Typography: FC<TypographyProps> = ({
  variant,
  children,
  ...rest
}) => {
  // Map the variant to the corresponding HTML element
  const Element = variant;

  // Apply styles based on the variant
  const styles = {
    h1: { fontSize: "2rem", fontWeight: "bold" },
    h2: { fontSize: "1.8rem", fontWeight: "bold" },
    h3: { fontSize: "1.6rem", fontWeight: "bold" },
    h4: { fontSize: "1.4rem", fontWeight: "bold" },
    h5: { fontSize: "1.2rem", fontWeight: "bold" },
    h6: { fontSize: "1rem", fontWeight: "bold" },
    p: { fontSize: "1rem" },
  }[variant];

  return (
    <Element style={styles} {...rest}>
      {children}
    </Element>
  );
};

export default Typography;
