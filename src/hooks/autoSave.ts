import { useEffect, useRef } from "react";
import debounce from "lodash.debounce";

export function useAutoSaveFileName(fileName: string) {
  const lastSavedFileName = useRef<string>("");
  const LOCAL_KEY = "autosave-filename";
  const queryClient = useQueryClient();
  const params = useParams();
  const docId = Array.isArray(params.id) ? params.id[0] : params.id;


  useEffect(() => {
    if (!docId || !fileName) return;

    const saveToLocal = debounce(() => {
      const draft = { id: docId, fileName };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(draft));
    }, 1000);

    saveToLocal();
    return () => saveToLocal.cancel();
  }, [docId, fileName]);

}
