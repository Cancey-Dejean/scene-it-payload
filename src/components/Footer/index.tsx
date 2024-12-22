import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/container";

export default function Footer() {
  return (
    <footer className="bg-black py-10 text-white">
      <Container className="flex flex-wrap items-center justify-center gap-6">
        <Link href="https://www.themoviedb.org/?language=en-US" target="_blank">
          <Image
            src="/images/tmdb-logo.svg"
            alt="TMDB"
            width={200}
            height={100}
          />
        </Link>
      </Container>
    </footer>
  );
}
