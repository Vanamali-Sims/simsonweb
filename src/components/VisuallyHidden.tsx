type Props = {
  children: React.ReactNode;
  as?: 'span' | 'p';
};

export default function VisuallyHidden({ children, as: Tag = 'span' }: Props) {
  return <Tag className="sr-only">{children}</Tag>;
}
