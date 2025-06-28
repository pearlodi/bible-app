import { books } from "@/data/books";
import { useBibleStore } from "@/hooks/useBibleStore";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  testament: "Old" | "New";
};

export default function BookTileGrid({ testament }: Props) {
  const { selectedBook, setPendingBook } = useBibleStore();
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(() =>
    books.filter((b) => b.testament === testament)
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = books.filter(
        (b) =>
          b.testament === testament &&
          b.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredBooks(result);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, testament]);

  return (
    <div>
      <Input
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {filteredBooks.map((book) => (
          <button
            key={book.name}
            onClick={() => setPendingBook(book.name)}
            className={cn(
              "p-3 border rounded text-left transition text-sm",
              book.name === selectedBook && "border-blue-500 font-semibold bg-blue-50"
            )}
          >
            {book.name}
          </button>
        ))}
      </div>
    </div>
  );
}
