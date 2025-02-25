import "../../styles/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="chakra-ui">
      {children}
    </div>
  );
}

