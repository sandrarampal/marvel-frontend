import { quantum } from "ldrs";

const Loading = () => {
  quantum.register();
  return (
    <section className="load">
      <l-quantum size="70" speed="1.75" color="white"></l-quantum>
    </section>
  );
};

export default Loading;
