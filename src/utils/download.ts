import api from "../configs/api";

// Files behind authentication are fetched with the API client (so the auth headers go along)
// and then saved through a temporary link; a plain <a href> could not carry the headers.
export async function downloadFile(path: string, fallbackName: string): Promise<void> {
  const response = await api.get<Blob>(path, { responseType: "blob" });
  const disposition = String(response.headers["content-disposition"] ?? "");
  const filename = /filename="?([^";]+)"?/i.exec(disposition)?.[1] ?? fallbackName;
  const url = URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = url;
  link.download = decodeURIComponent(filename);
  link.click();
  URL.revokeObjectURL(url);
}
