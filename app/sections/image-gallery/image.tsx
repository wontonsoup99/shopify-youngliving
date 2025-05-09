import { useHref } from "@remix-run/react";
import type {
  HydrogenComponentProps,
  HydrogenComponentSchema,
  WeaverseImage,
} from "@weaverse/hydrogen";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { forwardRef } from "react";
import { Image } from "~/components/image";

let variants = cva("relative h-[--image-height]", {
  variants: {
    columnSpan: {
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-3",
      4: "col-span-4",
    },
    borderRadius: {
      0: "",
      2: "rounded-sm",
      4: "rounded",
      6: "rounded-md",
      8: "rounded-lg",
      10: "rounded-[10px]",
      12: "rounded-xl",
      14: "rounded-[14px]",
      16: "rounded-2xl",
      18: "rounded-[18px]",
      20: "rounded-[20px]",
      22: "rounded-[22px]",
      24: "rounded-3xl",
    },
    hideOnMobile: {
      true: "hidden sm:block",
      false: "",
    },
  },
  defaultVariants: {
    columnSpan: 1,
    borderRadius: 8,
    hideOnMobile: false,
  },
});

interface ImageGalleryItemProps
  extends VariantProps<typeof variants>,
    HydrogenComponentProps {
  src: WeaverseImage;
  label?: string;
  labelFontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  labelColor?: string;
  labelFontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

let ImageGalleryItem = forwardRef<HTMLImageElement, ImageGalleryItemProps>(
  (props, ref) => {
    let { 
      src, 
      columnSpan, 
      borderRadius, 
      hideOnMobile, 
      label, 
      labelFontSize = 'base', 
      labelColor,
      labelFontWeight = 'normal',
      ...rest 
    } = props;
    let data = typeof src === "object" ? src : { url: src, altText: src };

    const fontSizeClasses = {
      'xs': 'text-xs',
      'sm': 'text-sm',
      'base': 'text-base',
      'lg': 'text-lg',
      'xl': 'text-xl',
    };

    const fontWeightClasses = {
      'normal': 'font-normal',
      'medium': 'font-medium',
      'semibold': 'font-semibold',
      'bold': 'font-bold',
    };

    return (
      <div className="flex flex-col">
        <div className={clsx(
          "relative overflow-hidden",
          variants({ columnSpan, borderRadius, hideOnMobile })
        )}>
          <Image
            ref={ref}
            {...rest}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            data-motion="slide-in"
            loading="lazy"
            data={data}
            width={800}
            height={600}
            sizes="(min-width: 45em) 50vw, 100vw"
          />
        </div>
        {label && (
          <div
            className={clsx(
              "mt-2 text-center font-sans",
              fontSizeClasses[labelFontSize],
              fontWeightClasses[labelFontWeight]
            )}
            style={labelColor ? { color: labelColor } : undefined}
          >
            {label}
          </div>
        )}
      </div>
    );
  },
);

export default ImageGalleryItem;

export let schema: HydrogenComponentSchema = {
  type: "image-gallery--item",
  title: "Image",
  inspector: [
    {
      group: "Image gallery item",
      inputs: [
        {
          type: "image",
          name: "src",
          label: "Image",
          defaultValue:
            "https://cdn.shopify.com/s/files/1/0838/0052/3057/files/h2-placeholder-image.svg",
        },
        {
          type: "text",
          name: "label",
          label: "Label",
          defaultValue: "",
        },
        {
          type: "url",
          name: "to",
          label: "Link to",
          defaultValue: "/products",
          placeholder: "/products",
        },
        {
          type: "range",
          label: "Column span",
          name: "columnSpan",
          configs: {
            min: 1,
            max: 4,
            step: 1,
          },
          defaultValue: 1,
        },
        {
          type: "range",
          label: "Border radius",
          name: "borderRadius",
          configs: {
            min: 0,
            max: 24,
            step: 2,
            unit: "px",
          },
          defaultValue: 0,
        },
        {
          type: "switch",
          label: "Hide on mobile",
          name: "hideOnMobile",
          defaultValue: false,
        },
        {
          type: "select",
          name: "labelFontSize",
          label: "Label Font Size",
          configs: {
            options: [
              { label: "Extra Small", value: "xs" },
              { label: "Small", value: "sm" },
              { label: "Base", value: "base" },
              { label: "Large", value: "lg" },
              { label: "Extra Large", value: "xl" },
            ],
          },
          defaultValue: "base",
        },
        {
          type: "select",
          name: "labelFontWeight",
          label: "Label Font Weight",
          configs: {
            options: [
              { label: "Normal", value: "normal" },
              { label: "Medium", value: "medium" },
              { label: "Semibold", value: "semibold" },
              { label: "Bold", value: "bold" },
            ],
          },
          defaultValue: "normal",
        },
        {
          type: "color",
          name: "labelColor",
          label: "Label Color",
          defaultValue: "",
        },
      ],
    },
  ],
};
