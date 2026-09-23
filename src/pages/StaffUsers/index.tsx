import { type FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createRecruiter } from "../../services/admin/recruiters";
import { banUser, listUsers, unbanUser } from "../../services/admin/users";
import type { AdminUser } from "../../services/admin/users/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import {
  Actions,
  Badge,
  Button,
  Empty,
  Field,
  Grid,
  Hero,
  Input,
  Item,
  ItemTop,
  Lead,
  List,
  Meta,
  Page,
  Panel,
  PanelTitle,
} from "../StaffKit/styles";

export function StaffUsersPage() {
  const [users, setUsers] = useState<AdminUser.Item[]>([]);
  const [promotingId, setPromotingId] = useState<number | null>(null);
  const [position, setPosition] = useState("");
  const [banningId, setBanningId] = useState<number | null>(null);
  const [banReason, setBanReason] = useState("");

  async function loadUsers() {
    const response = await listUsers();
    setUsers(response);
  }

  useEffect(() => {
    void loadUsers();
  }, []);

  async function handlePromote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!promotingId) return;

    try {
      await createRecruiter({ user_id: promotingId, position });
      toast.success("Usuario promovido a recrutador.");
      setPromotingId(null);
      setPosition("");
      await loadUsers();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao promover usuario."));
    }
  }

  async function handleBan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!banningId || !banReason) return;

    try {
      await banUser(banningId, banReason);
      toast.success("Usuario banido.");
      setBanningId(null);
      setBanReason("");
      await loadUsers();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao banir usuario."));
    }
  }

  async function handleUnban(userId: number) {
    try {
      await unbanUser(userId);
      toast.success("Usuario desbanido.");
      await loadUsers();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao desbanir usuario."));
    }
  }

  return (
    <Page>
      <Hero>
        <h2>Usuarios</h2>
        <Lead>Promova recrutadores e gerencie o acesso de contas bloqueadas.</Lead>
      </Hero>

      <Panel>
        <PanelTitle>Todas as contas</PanelTitle>
        {users.length === 0 ? (
          <Empty>Nenhum usuario cadastrado.</Empty>
        ) : (
          <List>
            {users.map((item) => (
              <Item key={item.id}>
                <ItemTop>
                  <strong>{item.name}</strong>
                  <Actions>
                    <Badge tone={item.role === "user" ? "neutral" : "positive"}>{item.role}</Badge>
                    {item.is_recruiter ? <Badge tone="positive">Recrutador</Badge> : null}
                    {item.banned ? <Badge tone="negative">Banido</Badge> : null}
                  </Actions>
                </ItemTop>
                <Meta>{item.email}</Meta>

                <Actions>
                  {!item.is_recruiter && item.role !== "user" ? (
                    <Button type="button" onClick={() => { setPromotingId(item.id); setBanningId(null); }}>
                      Promover a recrutador
                    </Button>
                  ) : null}
                  {item.banned ? (
                    <Button type="button" tone="brand" onClick={() => void handleUnban(item.id)}>
                      Desbanir
                    </Button>
                  ) : (
                    <Button type="button" tone="danger" onClick={() => { setBanningId(item.id); setPromotingId(null); }}>
                      Banir
                    </Button>
                  )}
                </Actions>

                {promotingId === item.id ? (
                  <form onSubmit={handlePromote}>
                    <Grid>
                      <Field>
                        Cargo do recrutador
                        <Input required value={position} onChange={(event) => setPosition(event.target.value)} placeholder="Ex: Recrutador Tecnico" />
                      </Field>
                    </Grid>
                    <Actions>
                      <Button type="submit" tone="brand">Confirmar promocao</Button>
                      <Button type="button" tone="ghost" onClick={() => setPromotingId(null)}>Cancelar</Button>
                    </Actions>
                  </form>
                ) : null}

                {banningId === item.id ? (
                  <form onSubmit={handleBan}>
                    <Grid>
                      <Field>
                        Motivo do banimento
                        <Input required value={banReason} onChange={(event) => setBanReason(event.target.value)} />
                      </Field>
                    </Grid>
                    <Actions>
                      <Button type="submit" tone="danger">Confirmar banimento</Button>
                      <Button type="button" tone="ghost" onClick={() => setBanningId(null)}>Cancelar</Button>
                    </Actions>
                  </form>
                ) : null}
              </Item>
            ))}
          </List>
        )}
      </Panel>
    </Page>
  );
}
