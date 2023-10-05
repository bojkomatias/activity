export const DashboardHeading = (props: {
  title: string;
  action?: JSX.Element;
}) => {
  return (
    <div class="mb-4 border-b border-border bg-card py-6">
      <div class="mx-auto flex max-w-8xl items-center px-4 sm:px-6 lg:px-16 xl:px-20">
        <h1
          class="flex-grow text-2xl font-black lowercase leading-loose first-letter:capitalize"
          safe
        >
          {props.title}
        </h1>
        {props.action}
      </div>
    </div>
  );
};
