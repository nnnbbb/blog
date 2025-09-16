import { TocItem } from "../ArticleToc";

export const getTocItem = (headingIdPrefix = "category-") => {
  let headingIndex = 0;
  const toc: TocItem[] = [];

  const components = {
    h2: ({ children, ...props }: any) => {
      headingIndex++;
      const title = children.join ? children.join("") : children;
      const id = `#${headingIdPrefix}${headingIndex}`;
      toc.push({ id, title, level: 0 });
      return <h2 id={id.slice(1)} >{children}</h2>;
    },
    h3: ({ children, ...props }: any) => {
      headingIndex++;
      const title = children.join ? children.join("") : children;
      const id = `#${headingIdPrefix}${headingIndex}`;
      toc.push({ id, title, level: 1 });
      return <h3 id={id.slice(1)}>{children}</h3>;
    },
    h4: ({ children, ...props }: any) => {
      headingIndex++;
      const title = children.join ? children.join("") : children;
      const id = `#${headingIdPrefix}${headingIndex}`;
      toc.push({ id, title, level: 2 });
      return <h4 id={id.slice(1)}>{children}</h4>;
    },
  };
  return { components, toc }
}
