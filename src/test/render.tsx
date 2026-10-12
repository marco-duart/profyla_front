import { type ReactElement } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

type AuthValue = Parameters<typeof AuthContext.Provider>[0]["value"];

export const guestAuth = (overrides: Partial<AuthValue> = {}): AuthValue => ({
  user: null,
  loading: false,
  signInWithEmail: vi.fn(),
  signOutSession: vi.fn(),
  ...overrides,
});

// Renders a page inside a router (at `path`) and an auth context, with a marker page at each
// destination so tests can assert where the user was sent.
export function renderPage(ui: ReactElement, { path = "/", auth = guestAuth(), destinations = [] as string[] } = {}) {
  return render(
    <AuthContext.Provider value={auth}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path={path.split("?")[0]} element={ui} />
          {destinations.map((destination) => (
            <Route key={destination} path={destination} element={<p>Destino: {destination}</p>} />
          ))}
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  );
}
