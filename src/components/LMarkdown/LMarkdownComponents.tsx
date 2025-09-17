import React from 'react';
import { Highlight } from 'prism-react-renderer';

// 自定义主题
export const customTheme = {
  plain: {
    color: '#393A34',
    backgroundColor: '#fff3f6', // 浅粉色背景
  },
  styles: [
    {
      types: ['comment', 'cdata', 'doctype', 'prolog', 'block-comment'],
      style: {
        color: '#7F848E',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#D19A66',
      },
    },
    {
      types: ['boolean', 'constant', 'deleted', 'function-name', 'property', 'symbol', 'tag'],
      style: {
        color: '#d55f69',
      },
    },
    {
      types: ['number'],
      style: {
        color: '#be8550',
      },
    },
    {
      types: ['attr-name', 'builtin', 'char', 'inserted', 'string'],
      style: {
        color: '#4da736',
      },
    },
    {
      types: ['selector'],
      style: {
        color: '#af7137',
      },
    },
    {
      types: ['function'],
      style: {
        color: '#4284f5',
      },
    },
    {
      types: ['entity', 'operator', 'url'],
      style: {
        color: '#56B6C2',
      },
    },
    {
      types: ['variable'],
      style: {
        color: '#E06C75',
      },
    },
    {
      types: ['atrule', 'attr-value'],
      style: {
        color: '#61AFEF',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: '#9e32d4',
      },
    },
    {
      types: ['keyword'],
      style: {
        color: '#c37429',
      },
    },
    {
      types: ['important', 'regex'],
      style: {
        color: '#e90',
      },
    },
    {
      types: ['important'],
      style: {
        fontWeight: "400" as const,
      },
    },
    {
      types: ['bold'],
      style: {
        fontWeight: "700" as const,
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic' as const,
      },
    },
    {
      types: ['entity'],
      style: {
        cursor: 'help' as const,
      },
    },
    {
      types: ['namespace'],
      style: {
        color: '#9e32d4',
        opacity: 0.7,
      },
    },
  ],
};

// 代码块渲染组件 - 完全重写以修复行内代码问题
export const CodeBlockComponent = (props: any) => {
  const { node, className, children, ...rest } = props;

  const isInlineCode = className === undefined || !className?.includes('language-');

  // 行内代码直接返回code标签
  if (isInlineCode) {
    return (
      <code
        {...rest}
      >
        {children}
      </code>

    );
  }

  // 获取语言
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'tsx';
  const code = String(children).replace(/\n$/, '');

  // 代码块使用高亮渲染
  return (
    <div >
      <Highlight
        theme={customTheme}
        code={code}
        language={language as string}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre>
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} style={{ wordBreak: 'break-word' }}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
};

// 图片渲染组件
export const ImageComponent = ({ node, ...props }: any) => {
  return (
    <div className="relative rounded-lg mb-2">
      <img
        className="rounded-[1em] max-w-full text-center mb-[30px]"
        style={{
          transition: 'all 0.3s linear',
          WebkitTransition: 'all 0.3s linear',
          MozTransition: 'all 0.3s linear',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `
            0 0 25px var(--shadow-color),
            0 0 25px var(--shadow-color),
            0 0 25px var(--shadow-color),
            0 0 25px var(--shadow-color)
          `;
          e.currentTarget.style.transition = 'all 0.3s linear';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
        {...props}
        alt={props.alt || '图片'}
      />
    </div>
  );
};

// 段落渲染组件
export const ParagraphComponent = ({ node, children, className, ...props }: any) => {
  // 判断 children 是否是 ImageComponent
  const hasImage =
    React.Children.toArray(children).some(
      (child) =>
        React.isValidElement(child) &&
        (child.type as any).name === "ImageComponent" // 匹配组件名
    );

  if (className === "img-caption") {
    return (
      <div className="w-full text-center mb-4">
        <p
          className="inline-block text-gray-700 text-xl"
          style={{
            borderBottom: "2px solid var(--shadow-color)",
          }}
          {...props}
        >
          {children}
        </p>
      </div>
    );
  }

  // 如果包含 ImageComponent，就不能用 <p>
  if (hasImage) {
    return <div className="my-6" {...props}>{children}</div>;
  }

  return (
    <div className="my-6" {...props}>
      <p>{children}</p>
    </div>
  );
};
// 引用块渲染组件
export const BlockquoteComponent = ({ node, children, ...props }: any) => {
  return (
    <blockquote style={{
      // padding: '1rem 1.5rem',
      // fontStyle: 'italic',
      // color: '#4b5563',
      // borderLeft: '6px solid rgba(128, 30, 255, 1)',
      // borderRadius: '0.7em',
    }} {...props}>
      {children}
    </blockquote>
  );
};

// 表格相关组件
export const TableComponent = ({ children }: any) => {
  return (
    <div className="my-8 rounded-2xl shadow-sm p-4">
      <table className="w-full">
        {children}
      </table>
    </div>
  );
};

export const TableHeadComponent = ({ children }: any) => {
  return (
    <thead className="bg-purple-500 text-white font-medium font-black text-lg">
      {children}
    </thead>
  );
};

export const TableHeaderCellComponent = ({ children }: any) => {
  return (
    <th className="py-5 px-6 text-center text-lg text-bold" style={{
      border: '1px solid transparent',
      height: '30px',
      borderRadius: '.5em',
      transition: 'all 0.3s linear',
      backgroundColor: 'var(--shadow-color)',
      fontSize: '20px',
      color: 'white',
      fontWeight: 'bolder',
      width: '100px',
      textAlign: 'center',
      verticalAlign: 'middle',
      padding: '10px',
      font: 'var(--base-font)',
    }}>
      {children}
    </th>
  );
};

export const TableBodyComponent = ({ children }: any) => {
  const rows = React.Children.toArray(children);
  return (
    <tbody className="divide-y divide-gray-100/10">
      {rows.map((child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { index } as any)
          : child
      )}
    </tbody>
  );
};

export const TableRowComponent = ({ children, index = 0 }: any) => {
  const isEven = index % 2 === 0;
  return (
    <tr className={`${isEven ? 'bg-white/20' : 'bg-purple-50/70'} transition-colors`}>
      {children}
    </tr>
  );
};

export const TableCellComponent = ({ children }: any) => {
  return (
    <td className="py-5 px-6 text-center text-gray-700 font-black text-lg
    border-0 border-transparent h-[30px]
    rounded-md transition-all duration-300 ease-linear"
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--shadow-color)';
        e.currentTarget.style.boxShadow = '0 6px 16px 8px var(--shadow-color)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      {children}
    </td>
  );
};

// 列表相关组件
export const UnorderedListComponent = ({ children }: any) => {
  return (
    <ul className="list-disc pl-8 my-4 space-y-2">
      {children}
    </ul>
  );
};

export const OrderedListComponent = ({ children }: any) => {
  return (
    <ol className="list-decimal pl-8 my-4 space-y-2">
      {children}
    </ol>
  );
};

export const ListItemComponent = ({ children }: any) => {
  return (
    <li className="text-gray-800 font-medium">
      {children}
    </li>
  );
};
export const LinkComponent = ({ href, children }: any) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

// 获取自定义组件映射
export const getMarkdownComponents = () => {
  return {
    code: CodeBlockComponent,
    blockquote: BlockquoteComponent,
    img: ImageComponent,
    p: ParagraphComponent,
    table: TableComponent,
    thead: TableHeadComponent,
    th: TableHeaderCellComponent,
    tbody: TableBodyComponent,
    tr: TableRowComponent,
    td: TableCellComponent,
    ul: UnorderedListComponent,
    ol: OrderedListComponent,
    li: ListItemComponent,
    a: LinkComponent,
  };
};

