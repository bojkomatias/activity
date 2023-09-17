export function Input(props: JSX.HtmlInputTag) {
  return (
    <div class="group relative flex flex-col-reverse bg-white px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 first-of-type:rounded-t last-of-type:rounded-b focus-within:z-10 focus-within:ring-2 focus-within:ring-cyan-600 dark:bg-gray-950 dark:ring-gray-600 dark:focus-within:ring-cyan-700">
      <input
        {...props}
        class="peer block w-full border-0 bg-transparent p-0 text-sm placeholder:text-xs placeholder:font-light placeholder:text-gray-500/50 focus:ring-0 sm:leading-loose"
      />
      <label
        htmlFor={props.name}
        class="block text-xs font-medium text-gray-500 first-letter:capitalize after:ml-0.5 group-focus-within:text-cyan-600 peer-placeholder-shown:!text-inherit peer-required:after:content-['*'] peer-invalid:text-red-600 dark:group-focus-within:text-cyan-700"
      >
        {props.label}
      </label>
    </div>
  );
}
