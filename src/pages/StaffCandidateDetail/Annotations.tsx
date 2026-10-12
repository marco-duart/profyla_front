import { type FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { addNote, listNotes, removeNote, setTags } from "../../services/admin/annotations";
import type { CandidateAnnotation } from "../../services/admin/annotations/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import { formatDateTime } from "../../utils/format";
import { ConfirmDialog } from "../StaffKit/ConfirmDialog";
import {
  Actions, Badge, Button, Chip, ChipRow, Empty, Field, Input, Item, ItemTop, List, Meta, Panel, PanelTitle, Textarea,
} from "../StaffKit/styles";

// Internal notes and tags: visible to the staff only, never to the candidate. Every change is audited.
export function Annotations({ userId, initialTags }: { userId: number; initialTags: string[] }) {
  const { user } = useAuth();
  const [tags, setTagList] = useState<string[]>(initialTags);
  const [newTag, setNewTag] = useState("");
  const [notes, setNotes] = useState<CandidateAnnotation.Note[]>([]);
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [pendingRemove, setPendingRemove] = useState<CandidateAnnotation.Note | null>(null);

  useEffect(() => {
    listNotes(userId).then(setNotes).catch((error) => toast.error(getApiErrorMessage(error, "Erro ao carregar as notas.")));
  }, [userId]);

  async function saveTags(next: string[]) {
    try {
      setTagList(await setTags(userId, next));
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível salvar as tags."));
    }
  }

  function handleAddTag(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = newTag.trim().toLowerCase();
    if (!name || tags.includes(name)) return;
    setNewTag("");
    void saveTags([...tags, name]);
  }

  async function handleAddNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!body.trim()) return;
    setSaving(true);
    try {
      const note = await addNote(userId, body);
      setNotes((current) => [note, ...current]);
      setBody("");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível salvar a nota."));
    } finally {
      setSaving(false);
    }
  }

  async function confirmRemove() {
    if (!pendingRemove) return;
    try {
      await removeNote(userId, pendingRemove.id);
      setNotes((current) => current.filter((note) => note.id !== pendingRemove.id));
      setPendingRemove(null);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível remover a nota."));
      setPendingRemove(null);
    }
  }

  return (
    <>
      <Panel>
        <PanelTitle>Tags internas</PanelTitle>
        <Meta>Só a equipe vê. Use para organizar (ex.: "bom para vendas", "retornar em 2027").</Meta>
        <ChipRow>
          {tags.map((tag) => (
            <Chip key={tag} type="button" selected aria-label={`Remover a tag ${tag}`} onClick={() => void saveTags(tags.filter((entry) => entry !== tag))}>
              #{tag} ×
            </Chip>
          ))}
          {tags.length === 0 ? <Meta>Nenhuma tag.</Meta> : null}
        </ChipRow>
        <form onSubmit={handleAddTag}>
          <Field>
            Nova tag
            <Input value={newTag} maxLength={40} onChange={(event) => setNewTag(event.target.value)} placeholder="Digite e tecle Enter" />
          </Field>
        </form>
      </Panel>

      <Panel>
        <PanelTitle>Notas internas</PanelTitle>
        <Meta>Só a equipe vê. Cada nota guarda autor e data, e as alterações ficam na auditoria.</Meta>
        <form onSubmit={handleAddNote}>
          <Field>
            Nova nota
            <Textarea value={body} maxLength={2000} onChange={(event) => setBody(event.target.value)} placeholder="Impressões, combinados, próximos passos..." />
          </Field>
          <Actions>
            <Button type="submit" tone="brand" disabled={saving || !body.trim()}>{saving ? "Salvando..." : "Adicionar nota"}</Button>
          </Actions>
        </form>

        {notes.length === 0 ? <Empty>Nenhuma nota ainda.</Empty> : null}
        <List>
          {notes.map((note) => (
            <Item key={note.id}>
              <ItemTop>
                <Badge tone="neutral">{note.author_name ?? "Usuário removido"}</Badge>
                <Meta>{formatDateTime(note.created_at)}</Meta>
              </ItemTop>
              <p style={{ whiteSpace: "pre-line" }}>{note.body}</p>
              {note.author_user_id === user?.id || user?.role === "ti" ? (
                <Actions>
                  <Button type="button" tone="danger" onClick={() => setPendingRemove(note)}>Remover</Button>
                </Actions>
              ) : null}
            </Item>
          ))}
        </List>
      </Panel>

      <ConfirmDialog
        open={pendingRemove !== null}
        title="Remover nota"
        message="A nota será apagada para toda a equipe. Essa ação não pode ser desfeita."
        confirmLabel="Remover"
        onConfirm={() => void confirmRemove()}
        onCancel={() => setPendingRemove(null)}
      />
    </>
  );
}
