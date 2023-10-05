import { cx } from "@/utils/cx";
import { dict } from "@/utils/dictionary";

type Props = JSX.HtmlInputTag &
  JSX.HtmlSelectTag & {
    options?: { id: number; name: string }[];
    values?: number[];
    valueIsJson?: true;
    rt?: boolean;
    rb?: boolean;
    label?: string;
    inputClass?: string;
    labelClass?: string;
  };
export function Input({ options, ...props }: Props) {
  return (
    <div
      class={cx(
        "group relative -my-px flex flex-col-reverse bg-background px-3 pb-1 pt-2 ring-1 ring-inset ring-border focus-within:z-10 focus-within:ring-2 focus-within:ring-ring/50",
        props.rt && "rounded-t-lg",
        props.rb && "rounded-b-lg",
        props.class,
      )}
    >
      {options ? (
        <select
          id={props.name}
          {...props}
          class="peer block w-full border-0 bg-transparent p-0 text-sm placeholder:font-light placeholder:text-foreground/50 focus:ring-0"
        >
          {options.map(({ id, name }) => (
            <option
              value={
                props.valueIsJson
                  ? `{ "id": ${id}, "name": "${name}" }`
                  : id.toString()
              }
              class="capitalize"
              // Default select previous values on edit
              selected={
                props.values && props.values.includes(id) ? "true" : undefined
              }
            >
              {name}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={props.name}
          {...props}
          class={cx(
            "peer block w-full border-0 bg-transparent p-0 text-sm text-foreground placeholder:font-light placeholder:text-muted-foreground focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 sm:leading-loose",
            props.type == "checkbox" &&
              "absolute left-3 top-2.5 mt-px h-3.5 w-3.5 rounded-sm border border-border text-primary focus:ring-2 focus:ring-border focus:ring-offset-background",
            props.inputClass,
          )}
          safe
        />
      )}
      <label
        for={props.name}
        class={cx(
          "z-20 block select-none text-xs font-medium text-muted-foreground first-letter:capitalize after:ml-0.5 group-focus-within:text-foreground peer-placeholder-shown:!text-accent-foreground peer-required:after:content-['*'] peer-invalid:text-destructive",
          props.type == "checkbox" && "mb-1 ml-6 mt-px",
          props.labelClass,
        )}
      >
        {props.label ?? dict.get(props.name)}
        <span class="float-right -mt-0.5 text-[0.6rem] text-muted-foreground">
          {options &&
            props.multiple &&
            "Shift o Ctrl para seleccionar multiples"}
          {props.title}
        </span>
      </label>
    </div>
  );
}
