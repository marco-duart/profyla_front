import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { listNotifications, markAllNotificationsRead, markNotificationRead } from "../../services/notifications";
import type { NotificationList } from "../../services/notifications/dto";
import { styled } from "../../theme/stitches";
import { formatDateTime } from "../../utils/format";

const POLL_MS = 60_000;

const Wrapper = styled("div", { position: "relative" });

const BellButton = styled("button", {
  position: "relative",
  display: "grid",
  placeItems: "center",
  width: "40px",
  height: "40px",
  border: "1px solid $border",
  borderRadius: "$sm",
  backgroundColor: "$surface",
  color: "$text",
  '&:hover': { borderColor: "$borderStrong", backgroundColor: "$surfaceStrong" },
  '&:focus-visible': { outline: "2px solid $brand", outlineOffset: "2px" },
});

const Badge = styled("span", {
  position: "absolute",
  top: "-6px",
  right: "-6px",
  minWidth: "18px",
  height: "18px",
  padding: "0 4px",
  display: "grid",
  placeItems: "center",
  fontSize: "10px",
  fontWeight: "$bold",
  fontFamily: "$mono",
  color: "$text",
  backgroundColor: "$accent",
  border: "1px solid $canvas",
});

const Panel = styled("div", {
  position: "absolute",
  top: "calc(100% + 8px)",
  right: 0,
  zIndex: 60,
  width: "min(92vw, 360px)",
  maxHeight: "70dvh",
  overflowY: "auto",
  display: "grid",
  gap: "$2",
  padding: "$3",
  border: "1px solid $border",
  borderRadius: "$md",
  backgroundColor: "$canvasAlt",
  boxShadow: "$medium",
  variants: {
    // In the desktop sidebar the panel opens to the right of the bell instead.
    side: { left: { right: "auto", left: 0 }, right: {} },
  },
});

const Header = styled("div", { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "$2" });
const TextButton = styled("button", {
  border: "none",
  background: "none",
  color: "$brand",
  fontSize: "$sm",
  fontWeight: "$semibold",
  '&:disabled': { opacity: 0.5, cursor: "default" },
});
const Entry = styled("button", {
  display: "grid",
  gap: "2px",
  textAlign: "left",
  width: "100%",
  padding: "$3",
  border: "1px solid $border",
  borderRadius: "$sm",
  backgroundColor: "$surface",
  color: "$text",
  '&:hover': { borderColor: "$borderStrong" },
  variants: { unread: { true: { borderColor: "$brand", backgroundColor: "$brandSoft" } } },
});
const Small = styled("span", { fontSize: "$xs", color: "$textMuted" });

// The bell with unread counter. Polls lightly (every 60s, only while the tab is visible).
export function NotificationBell({ side = "right" }: { side?: "left" | "right" }) {
  const navigate = useNavigate();
  const [data, setData] = useState<NotificationList.Response>({ unread_count: 0, records: [] });
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const refresh = useCallback(async () => {
    try {
      setData(await listNotifications());
    } catch {
      // A failed poll must never bother the user.
    }
  }, []);

  useEffect(() => {
    let active = true;
    const load = () =>
      listNotifications()
        .then((response) => {
          if (active) setData(response);
        })
        .catch(() => undefined);
    const poll = () => {
      if (document.visibilityState === "visible") void load();
    };

    void load();
    const timer = window.setInterval(poll, POLL_MS);
    document.addEventListener("visibilitychange", poll);
    return () => {
      active = false;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", poll);
    };
  }, []);

  // Close on outside click / Esc.
  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function handleOpenEntry(entry: NotificationList.Item) {
    if (!entry.read) {
      const result = await markNotificationRead(entry.id).catch(() => null);
      if (result) {
        setData((current) => ({
          unread_count: result.unread_count,
          records: current.records.map((item) => (item.id === entry.id ? { ...item, read: true } : item)),
        }));
      }
    }
    setOpen(false);
    if (entry.link) navigate(entry.link);
  }

  async function handleMarkAll() {
    await markAllNotificationsRead();
    setData((current) => ({ unread_count: 0, records: current.records.map((item) => ({ ...item, read: true })) }));
  }

  const count = data.unread_count;

  return (
    <Wrapper ref={wrapperRef}>
      <BellButton
        ref={buttonRef}
        type="button"
        aria-label={count > 0 ? `Notificações: ${count} não lida${count > 1 ? "s" : ""}` : "Notificações"}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => {
          setOpen((value) => !value);
          void refresh();
        }}
      >
        <FiBell size={18} />
        {count > 0 ? <Badge aria-hidden="true">{count > 9 ? "9+" : count}</Badge> : null}
      </BellButton>

      {open ? (
        <Panel side={side} role="region" aria-label="Notificações">
          <Header>
            <strong>Notificações</strong>
            <TextButton type="button" disabled={count === 0} onClick={() => void handleMarkAll()}>Marcar todas como lidas</TextButton>
          </Header>
          {data.records.length === 0 ? <Small>Nenhuma notificação por enquanto.</Small> : null}
          {data.records.map((entry) => (
            <Entry key={entry.id} type="button" unread={!entry.read} onClick={() => void handleOpenEntry(entry)}>
              <strong>{entry.title}</strong>
              {entry.body ? <Small>{entry.body}</Small> : null}
              <Small>{formatDateTime(entry.created_at)}</Small>
            </Entry>
          ))}
        </Panel>
      ) : null}
    </Wrapper>
  );
}
