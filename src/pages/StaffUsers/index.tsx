import type { Pagination as PaginationData } from "../../services/pagination";
import { Pagination } from "../StaffKit/Pagination";
import { type FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createRecruiter } from "../../services/admin/recruiters";
import { banUser, listUsersPage, unbanUser } from "../../services/admin/users";
import type { AdminUser } from "../../services/admin/users/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import { ConfirmDialog } from "../StaffKit/ConfirmDialog";
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
  const [banningUser, setBanningUser] = useState<AdminUser.Item | null>(null);
  const [banReason, setBanReason] = useState("");
  const [banning, setBanning] = useState(false);
  const [unbanningUser, setUnbanningUser] = useState<AdminUser.Item | null>(null);
  const [unbanning, setUnbanning] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginationData | null>(null);

  async function loadUsers(targetPage = page) {
    const response = await listUsersPage(targetPage, search);
    if (response.records.length === 0 && targetPage > 1) {
      setPage(targetPage - 1);
      return;
    }
    setUsers(response.records);
    setPagination(response.pagination);
  }

  useEffect(() => {
    const timeout = setTimeout(() => void loadUsers(page), 250);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  async function handlePromote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!promotingId) return;

    try {
      await createRecruiter({ user_id: promotingId, position });
      toast.success("Usuário promovido a recrutador.");
      setPromotingId(null);
      setPosition("");
      await loadUsers();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao promover usuário."));
    }
  }

  async function confirmBan() {
    if (!banningUser || !banReason) return;
    setBanning(true);

    try {
      await banUser(banningUser.id, banReason);
      toast.success("Usuário banido.");
      setBanningUser(null);
      setBanReason("");
      await loadUsers();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao banir usuário."));
    } finally {
      setBanning(false);
    }
  }

  async function confirmUnban() {
    if (!unbanningUser) return;
    setUnbanning(true);

    try {
      await unbanUser(unbanningUser.id);
      toast.success("Usuário desbanido.");
      setUnbanningUser(null);
      await loadUsers();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao desbanir usuário."));
    } finally {
      setUnbanning(false);
    }
  }

  return (
    <Page>
      <Hero>
        <h2>Usuários</h2>
        <Lead>Promova recrutadores e gerencie o acesso de contas bloqueadas.</Lead>
      </Hero>

      <Panel>
        <PanelTitle>Todas as contas</PanelTitle>
        <Field>
          Buscar
          <Input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Nome ou e-mail" />
        </Field>
        {users.length === 0 ? (
          <Empty>Nenhum usuário encontrado.</Empty>
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
                    <Button type="button" onClick={() => setPromotingId(item.id)}>
                      Promover a recrutador
                    </Button>
                  ) : null}
                  {item.banned ? (
                    <Button type="button" tone="brand" onClick={() => setUnbanningUser(item)}>
                      Desbanir
                    </Button>
                  ) : (
                    <Button type="button" tone="danger" onClick={() => { setBanningUser(item); setBanReason(""); }}>
                      Banir
                    </Button>
                  )}
                </Actions>

                {promotingId === item.id ? (
                  <form onSubmit={handlePromote}>
                    <Grid>
                      <Field>
                        Cargo do recrutador
                        <Input required value={position} onChange={(event) => setPosition(event.target.value)} placeholder="Ex: Recrutador Técnico" />
                      </Field>
                    </Grid>
                    <Actions>
                      <Button type="submit" tone="brand">Confirmar promoção</Button>
                      <Button type="button" tone="ghost" onClick={() => setPromotingId(null)}>Cancelar</Button>
                    </Actions>
                  </form>
                ) : null}
              </Item>
            ))}
          </List>
        )}
        <Pagination pagination={pagination} onChange={setPage} />
      </Panel>

      <ConfirmDialog
        open={banningUser !== null}
        title={`Banir ${banningUser?.name ?? "usuário"}`}
        message="Uma conta banida perde acesso imediatamente. Informe o motivo do banimento."
        confirmLabel="Banir"
        confirming={banning}
        confirmDisabled={!banReason.trim()}
        onConfirm={() => void confirmBan()}
        onCancel={() => setBanningUser(null)}
      >
        <Field>
          Motivo do banimento
          <Input required value={banReason} onChange={(event) => setBanReason(event.target.value)} />
        </Field>
      </ConfirmDialog>

      <ConfirmDialog
        open={unbanningUser !== null}
        title={`Desbanir ${unbanningUser?.name ?? "usuário"}`}
        message="Essa conta voltará a ter acesso normal ao sistema."
        confirmLabel="Desbanir"
        tone="brand"
        confirming={unbanning}
        onConfirm={() => void confirmUnban()}
        onCancel={() => setUnbanningUser(null)}
      />
    </Page>
  );
}
