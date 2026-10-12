import { Link } from "react-router-dom";
import { ActionButton, Actions, Card, Text, Title } from "../ErrorBoundary/styles";

export function NotFound({ homePath, homeLabel }: { homePath: string; homeLabel: string }) {
  return (
    <Card>
      <Title>Página não encontrada</Title>
      <Text>O endereço que você abriu não existe ou foi movido.</Text>
      <Actions>
        <Link to={homePath}>
          <ActionButton type="button" tone="brand">{homeLabel}</ActionButton>
        </Link>
      </Actions>
    </Card>
  );
}
