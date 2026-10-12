import { useMemo, useState } from "react";
import {
  addMonths, addWeeks, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, isToday,
  parseISO, startOfMonth, startOfWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import type { AdminInterview } from "../../services/admin/interviews/dto";
import { formatDateTimeLong } from "../../utils/format";
import { interviewMethodLabel, interviewStatusLabel, interviewTypeLabel } from "../../utils/labels";
import {
  Actions, Badge, Button, CalendarDay, CalendarDayNumber, CalendarEvent, CalendarGrid, CalendarHead, Empty, Meta, Panel, PanelTitle,
  Tab, Tabs,
} from "../StaffKit/styles";

type Mode = "week" | "month";

const WEEK_OPTIONS = { weekStartsOn: 1 as const, locale: ptBR };
const WEEKDAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const toneFor = (status?: string) =>
  status === "aceita" ? "positive" : status === "recusada" ? "negative" : status === "reagendamento_solicitado" ? "warning" : "neutral";

type Props = {
  interviews: AdminInterview.Item[];
  onDownloadIcs: (interview: AdminInterview.Item) => void;
};

// Week / month agenda built with date-fns only (no calendar library).
export function InterviewCalendar({ interviews, onDownloadIcs }: Props) {
  const [mode, setMode] = useState<Mode>("month");
  const [cursor, setCursor] = useState(() => new Date());
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const days = useMemo(() => {
    if (mode === "week") {
      return eachDayOfInterval({ start: startOfWeek(cursor, WEEK_OPTIONS), end: endOfWeek(cursor, WEEK_OPTIONS) });
    }
    return eachDayOfInterval({ start: startOfWeek(startOfMonth(cursor), WEEK_OPTIONS), end: endOfWeek(endOfMonth(cursor), WEEK_OPTIONS) });
  }, [mode, cursor]);

  const byDay = useMemo(() => {
    const map = new Map<string, AdminInterview.Item[]>();
    for (const interview of interviews) {
      const key = format(parseISO(interview.date_time), "yyyy-MM-dd");
      map.set(key, [...(map.get(key) ?? []), interview].sort((a, b) => a.date_time.localeCompare(b.date_time)));
    }
    return map;
  }, [interviews]);

  const selected = interviews.find((interview) => interview.id === selectedId) ?? null;
  const title = mode === "week"
    ? `${format(days[0], "dd/MM", { locale: ptBR })} a ${format(days[6], "dd/MM/yyyy", { locale: ptBR })}`
    : format(cursor, "MMMM 'de' yyyy", { locale: ptBR });

  function move(direction: 1 | -1) {
    setCursor((current) => (mode === "week" ? addWeeks(current, direction) : addMonths(current, direction)));
  }

  return (
    <Panel>
      <Actions css={{ justifyContent: "space-between", alignItems: "center" }}>
        <Actions>
          <Button type="button" aria-label="Período anterior" onClick={() => move(-1)}>‹</Button>
          <Button type="button" onClick={() => setCursor(new Date())}>Hoje</Button>
          <Button type="button" aria-label="Próximo período" onClick={() => move(1)}>›</Button>
        </Actions>
        <PanelTitle aria-live="polite">{title.charAt(0).toUpperCase() + title.slice(1)}</PanelTitle>
        <Tabs role="group" aria-label="Visualização">
          <Tab type="button" active={mode === "week"} aria-pressed={mode === "week"} onClick={() => setMode("week")}>Semana</Tab>
          <Tab type="button" active={mode === "month"} aria-pressed={mode === "month"} onClick={() => setMode("month")}>Mês</Tab>
        </Tabs>
      </Actions>

      <CalendarGrid stackOnMobile={mode === "week"}>
        {mode === "month" ? WEEKDAYS.map((name) => <CalendarHead key={name}>{name}</CalendarHead>) : null}
        {days.map((day, index) => {
          const events = byDay.get(format(day, "yyyy-MM-dd")) ?? [];
          return (
            <CalendarDay
              key={day.toISOString()}
              muted={mode === "month" && !isSameMonth(day, cursor)}
              today={isToday(day)}
              selected={selected ? isSameDay(parseISO(selected.date_time), day) : false}
            >
              <CalendarDayNumber>
                {mode === "week" ? `${WEEKDAYS[index]} ` : ""}{format(day, "d", { locale: ptBR })}
              </CalendarDayNumber>
              {events.map((interview) => (
                <CalendarEvent
                  key={interview.id}
                  type="button"
                  tone={toneFor(interview.status)}
                  aria-label={`${format(parseISO(interview.date_time), "HH:mm")} ${interview.candidate_name ?? "Sem candidato"}`}
                  onClick={() => setSelectedId(interview.id)}
                >
                  {format(parseISO(interview.date_time), "HH:mm")} {interview.candidate_name ?? "Sem candidato"}
                </CalendarEvent>
              ))}
            </CalendarDay>
          );
        })}
      </CalendarGrid>

      {selected ? (
        <Panel aria-live="polite">
          <PanelTitle>{selected.candidate_name ?? "Entrevista sem candidato"}</PanelTitle>
          <Meta>{formatDateTimeLong(selected.date_time)} · {selected.stage_title}</Meta>
          <Meta>
            {interviewTypeLabel(selected.interview_type)} · {interviewMethodLabel(selected.interview_method)} · Entrevistador: {selected.interviewer}
          </Meta>
          {selected.status ? <Badge tone={toneFor(selected.status)}>{interviewStatusLabel(selected.status, "staff")}</Badge> : null}
          {selected.resume ? <Meta>{selected.resume}</Meta> : null}
          <Actions>
            <Button type="button" onClick={() => onDownloadIcs(selected)}>Baixar .ics</Button>
            {selected.google_calendar_url ? (
              <Button as="a" href={selected.google_calendar_url} target="_blank" rel="noreferrer">Google Agenda</Button>
            ) : null}
          </Actions>
        </Panel>
      ) : (
        interviews.length === 0 ? <Empty>Nenhuma entrevista agendada.</Empty> : <Meta>Selecione uma entrevista para ver os detalhes.</Meta>
      )}
    </Panel>
  );
}

