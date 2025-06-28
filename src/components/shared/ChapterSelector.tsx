import { books } from "@/data/books";
import { useBibleStore } from "@/hooks/useBibleStore";

type Props = {
  onClose: () => void;
};

export default function ChapterSelector({ onClose }: Props) {
  const { pendingBook, finalizeSelection } = useBibleStore();
  const book = books.find((b) => b.name === pendingBook);

  if (!book) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Select Chapter of {book.name}</h2>
      <div className="grid grid-cols-6 gap-2 max-h-[300px] overflow-y-auto">
        {Array.from({ length: book.chapters }, (_, i) => (
          <button
            key={i}
            onClick={() => {
              finalizeSelection(i + 1);
              onClose();
            }}
            className="p-2 bg-gray-100 rounded hover:bg-blue-200"
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
