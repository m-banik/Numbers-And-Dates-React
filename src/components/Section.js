import React from "react";
const Section = props => {
  const { title, content } = props;
  return (
    <section>
      <h1>
        Fact from category <em>{title}</em>:
      </h1>
      <h2>"{content}"</h2>
    </section>
  );
};
export default Section;
