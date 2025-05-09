import type {
  HydrogenComponentProps,
  HydrogenComponentSchema,
} from "@weaverse/hydrogen";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { forwardRef } from "react";

let variants = cva("grid lg:grid-cols-3", {
  variants: {
    gap: {
      16: "gap-4",
      24: "gap-6",
      32: "gap-8",
      40: "gap-10",
    },
  },
  defaultVariants: {
    gap: 32,
  },
});

interface TestimonialsItemsProps
  extends VariantProps<typeof variants>,
    HydrogenComponentProps {}

let TestimonialsItems = forwardRef<HTMLDivElement, TestimonialsItemsProps>(
  (props, ref) => {
    let { gap, children, ...rest } = props;

    return (
      <div ref={ref} {...rest} className={clsx(variants({ gap }))}>
        <div className="space-y-6">
          {children?.filter((_, i) => i % 3 === 0)}
        </div>
        <div className="space-y-6">
          {children?.filter((_, i) => i % 3 === 1)}
        </div>
        <div className="space-y-6">
          {children?.filter((_, i) => i % 3 === 2)}
        </div>
      </div>
    );
  },
);

export default TestimonialsItems;

export let schema: HydrogenComponentSchema = {
  type: "testimonials-items",
  title: "Items",
  childTypes: ["testimonial--item"],
  inspector: [
    {
      group: "Items",
      inputs: [
        {
          type: "range",
          name: "gap",
          label: "Items gap",
          configs: {
            min: 16,
            max: 40,
            step: 8,
            unit: "px",
          },
          defaultValue: 32,
        },
      ],
    },
  ],
};
