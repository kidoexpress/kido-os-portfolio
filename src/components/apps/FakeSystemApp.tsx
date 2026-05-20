type Props = {
  title: string;
  subtitle: string;
  lines: string[];
};

export function FakeSystemApp({ title, subtitle, lines }: Props) {
  return (
    <div className="fake-app app-scroll">
      <div className="fake-app-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="fake-lines">
        {lines.map((line) => <div key={line}>{line}</div>)}
      </div>
    </div>
  );
}
