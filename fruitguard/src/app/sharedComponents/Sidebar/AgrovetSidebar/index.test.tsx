import { render, screen, fireEvent } from "@testing-library/react";
import AgrovetSidebar from ".";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("AgrovetSidebar", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReset();
  });

  test("renders sidebar with navigation items and logout button", () => {
    (usePathname as jest.Mock).mockReturnValue("/farmer-registration");
    render(<AgrovetSidebar />);

    expect(screen.getByAltText("FruitGuard logo")).toBeInTheDocument();
    expect(screen.getByText("FruitGuard")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  test("clicking navigation links changes active state", () => {
    (usePathname as jest.Mock).mockReturnValue("/farmer-registration");
    const { rerender } = render(<AgrovetSidebar />);

    const homeLink = screen.getByRole("link", { name: /home/i });
    const profileLink = screen.getByRole("link", { name: /profile/i });

    expect(homeLink).toHaveAttribute("aria-current", "page");
    expect(profileLink).not.toHaveAttribute("aria-current");

    (usePathname as jest.Mock).mockReturnValue("/agrovet-profile");
    rerender(<AgrovetSidebar />);

    expect(profileLink).toHaveAttribute("aria-current", "page");
    expect(homeLink).not.toHaveAttribute("aria-current");
  });

  test("clicking logout shows confirmation modal", () => {
    (usePathname as jest.Mock).mockReturnValue("/farmer-registration");
    render(<AgrovetSidebar />);

    expect(screen.queryByText("Do you want to logout?")).toBeNull();
    fireEvent.click(screen.getByText("Log out"));

    expect(screen.getByText("Do you want to logout?")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Proceed")).toBeInTheDocument();
  });

  test("clicking cancel hides the logout confirmation modal", () => {
    (usePathname as jest.Mock).mockReturnValue("/farmer-registration");
    render(<AgrovetSidebar />);

    fireEvent.click(screen.getByText("Log out"));
    fireEvent.click(screen.getByText("Cancel"));

    expect(screen.queryByText("Do you want to logout?")).toBeNull();
  });

  test("proceed button links to /Login", () => {
    (usePathname as jest.Mock).mockReturnValue("/farmer-registration");
    render(<AgrovetSidebar />);

    fireEvent.click(screen.getByText("Log out"));

    const proceedLink = screen.getByRole("link", { name: "Proceed" });
    expect(proceedLink).toHaveAttribute("href", "/Login");
  });
});