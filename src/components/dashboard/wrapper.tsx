export const DashboardContent = (props: JSX.HtmlTag) => {
  return (
    <div class="mx-auto max-w-8xl px-2 sm:px-6 lg:px-16 xl:px-20">
      {props.children}
    </div>
  );
};
