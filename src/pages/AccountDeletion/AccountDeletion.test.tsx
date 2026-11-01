import { screen } from "@testing-library/react";
import { AccountDeletionPage } from "./index";
import { renderPage } from "../../test/render";

describe("AccountDeletionPage", () => {
  it("explains the three ways to ask for the deletion, with the contact e-mail", () => {
    renderPage(<AccountDeletionPage />, { path: "/exclusao-de-conta" });

    expect(screen.getByRole("heading", { name: "Exclusão de conta no Profyla" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "1. Pelo aplicativo (mais rápido)" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "2. Pelo site" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "3. Por e-mail" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "maaxis.tech@gmail.com" })[0]).toHaveAttribute("href", "mailto:maaxis.tech@gmail.com");
  });
});
