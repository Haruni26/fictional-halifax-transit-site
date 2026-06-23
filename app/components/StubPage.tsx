import Header from "./header";

interface StubPageProps {
  title: string;
  description: string;
  placeholder: string;
}

export default function StubPage({
  title,
  description,
  placeholder,
}: StubPageProps) {
  return (
    <>
      <Header />
      <main>
        <div>
          <p>Halifax Transit</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <div>{placeholder}</div>
        </div>
      </main>
    </>
  );
}
