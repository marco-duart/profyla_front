import { Component, type ErrorInfo, type PropsWithChildren } from "react";
import { ActionButton, Actions, Card, Screen, Text, Title } from "./styles";

type State = { hasError: boolean };

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Erro de renderização capturado:", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <Screen>
        <Card role="alert">
          <Title>Algo deu errado</Title>
          <Text>
            Ocorreu um erro inesperado ao exibir esta tela. Você pode tentar novamente ou voltar ao início.
          </Text>
          <Actions>
            <ActionButton type="button" tone="brand" onClick={() => this.setState({ hasError: false })}>
              Tentar novamente
            </ActionButton>
            <ActionButton type="button" onClick={() => window.location.assign("/")}>
              Ir para o início
            </ActionButton>
          </Actions>
        </Card>
      </Screen>
    );
  }
}
