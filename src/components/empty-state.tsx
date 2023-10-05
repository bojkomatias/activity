export const EmptyState = (props: JSX.HtmlTag) => {
  return (
    <div class="m-4 rounded bg-card py-20 text-center font-light leading-loose ring-1 ring-inset ring-border">
      {props.children}
    </div>
  );
};
