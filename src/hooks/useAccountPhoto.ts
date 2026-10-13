import { useEffect, useState } from "react";
import { getAccount } from "../services/account";

export const PHOTO_CHANGED_EVENT = "profyla:photo-changed";

// Current user's profile photo (for the shells). Refreshes when the photo is changed elsewhere.
export function useAccountPhoto(): string | null {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const load = () => getAccount().then((account) => setPhotoUrl(account.photo_url ?? null)).catch(() => undefined);
    void load();
    window.addEventListener(PHOTO_CHANGED_EVENT, load);
    return () => window.removeEventListener(PHOTO_CHANGED_EVENT, load);
  }, []);

  return photoUrl;
}
