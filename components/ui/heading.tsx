// extend your interface to be sure your heading element can have stuff like a className and children
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as: React.ElementType;
}

export const Heading: React.FC<HeadingProps> = ({
  as,
  children,
  className,
}) => {
  const Heading = as;
  return <Heading className={className}>{children}</Heading>;
};
