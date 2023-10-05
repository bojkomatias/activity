import { cx } from "@/utils/cx";

/** A Wrapper to have nice mouseover transition
 * @indicator is a class list prefixed by . to customize
 * @default .bg-muted
 */
export const Hover = ({
  indicator = ".bg-muted",
  ...props
}: JSX.HtmlTag & { indicator?: string }) => {
  let script =
    "on move(x,y,w,h) set my.style.transform to 'translate(' + x + 'px,' + y + 'px)' set my.style.height to h set my.style.width to w";

  return (
    <div class={cx("relative h-fit", props.class?.includes("flex") && "w-fit")}>
      <div
        class={cx(
          "hover-indicator absolute -z-10 rounded-md opacity-50 transition ease-in-out",
          props.class?.includes("flex") ? "inset-y-0" : "inset-x-0",
        )}
        _={script}
      />
      <ul
        {...props}
        _={`on mouseenter wait 0.1s then tell previous .hover-indicator add ${indicator} end
         on mouseleave tell previous .hover-indicator remove ${indicator} end`}
      >
        {props.children}
      </ul>
    </div>
  );
};

/** Wrap items with this to take effect */
Hover.Item = ({ ...props }: JSX.HtmlTag & { vertical?: boolean }) => {
  let script =
    "on mouseenter measure my x measure my y measure my width measure my height tell my parentElement measure my left tell my parentElement measure my top send move(x:(x-left),y:(y-top),w:width, h:height) to previous .hover-indicator end";

  return (
    <li _={script} {...props}>
      {props.children}
    </li>
  );
};
