import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { PHOTO_CHANGED_EVENT } from "../../hooks/useAccountPhoto";
import { deletePhoto, uploadPhoto } from "../../services/account";
import { styled } from "../../theme/stitches";
import { getApiErrorMessage } from "../../utils/api-error";
import { Avatar } from "../Avatar";

const Row = styled("div", { display: "flex", gap: "$4", alignItems: "center", flexWrap: "wrap" });
const Actions = styled("div", { display: "flex", gap: "$2", flexWrap: "wrap" });
const Note = styled("p", { color: "$textMuted", fontSize: "$xs" });
const Btn = styled("button", {
  border: "1px solid $border",
  borderRadius: "$md",
  padding: "$2 $4",
  fontWeight: "$bold",
  fontSize: "$sm",
  backgroundColor: "$surface",
  color: "$text",
  '&:hover:not(:disabled)': { borderColor: "$borderStrong", backgroundColor: "$surfaceStrong" },
  '&:disabled': { opacity: 0.55, cursor: "not-allowed" },
  variants: {
    tone: {
      brand: { backgroundColor: "$brand", borderColor: "$brandStrong" },
      danger: { backgroundColor: "$errorSubtle", borderColor: "$error", color: "$error" },
    },
  },
});

const MAX_BYTES = 2 * 1024 * 1024;

// Choose -> preview -> save. The server validates type (JPG/PNG) and size (2 MB) too.
export function PhotoUploader({ name, currentUrl }: { name: string; currentUrl: string | null }) {
  const input = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  // undefined = show what the parent loaded; a value = what this component just saved/removed.
  const [override, setOverride] = useState<string | null | undefined>(undefined);
  const photoUrl = override !== undefined ? override : currentUrl;
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleChoose(chosen: File | undefined) {
    if (!chosen) return;
    if (!["image/jpeg", "image/png"].includes(chosen.type)) {
      toast.error("A foto deve ser JPG ou PNG.");
      return;
    }
    if (chosen.size > MAX_BYTES) {
      toast.error("A foto deve ter no máximo 2 MB.");
      return;
    }
    setFile(chosen);
  }

  async function save() {
    if (!file) return;
    setSaving(true);
    try {
      const account = await uploadPhoto(file);
      setOverride(account.photo_url ?? null);
      setFile(null);
      window.dispatchEvent(new Event(PHOTO_CHANGED_EVENT));
      toast.success("Foto atualizada.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível enviar a foto."));
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    setSaving(true);
    try {
      await deletePhoto();
      setOverride(null);
      window.dispatchEvent(new Event(PHOTO_CHANGED_EVENT));
      toast.success("Foto removida.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível remover a foto."));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Row>
      <Avatar src={preview ?? photoUrl} name={name} size={88} />
      <div style={{ display: "grid", gap: "8px" }}>
        <input ref={input} type="file" accept="image/jpeg,image/png" hidden onChange={(event) => handleChoose(event.target.files?.[0])} />
        <Actions>
          {file ? (
            <>
              <Btn type="button" tone="brand" disabled={saving} onClick={() => void save()}>{saving ? "Enviando..." : "Salvar foto"}</Btn>
              <Btn type="button" disabled={saving} onClick={() => setFile(null)}>Cancelar</Btn>
            </>
          ) : (
            <>
              <Btn type="button" onClick={() => input.current?.click()}>{photoUrl ? "Trocar foto" : "Escolher foto"}</Btn>
              {photoUrl ? <Btn type="button" tone="danger" disabled={saving} onClick={() => void remove()}>Remover</Btn> : null}
            </>
          )}
        </Actions>
        <Note>JPG ou PNG, até 2 MB.</Note>
      </div>
    </Row>
  );
}
