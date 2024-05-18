import React from "react";
import Typography from "../Typography";
import theme from "@styles/index";
import render from "@tests/helper";

describe("Unit::Component::CustomText", () => {
  describe("when render", () => {
    it("text", () => {
      const tree = render(<Typography>olá, mundo</Typography>);
      const text = tree.getByText("olá, mundo");
      expect(text).toBeTruthy();
    });

    it("text with color", () => {
      const tree = render(
        <Typography color="primary.light">olá, mundo</Typography>
      );
      const text = tree.getByText("olá, mundo");
      expect(text).toHaveStyle({ color: theme.colors.primary.light });
    });
    it("text with color default", () => {
      const tree = render(<Typography>olá, mundo</Typography>);
      const text = tree.getByText("olá, mundo");
      expect(text).toHaveStyle({ color: theme.colors.text.default });
    });
    it("text with color light", () => {
      const tree = render(<Typography light>olá, mundo</Typography>);
      const text = tree.getByText("olá, mundo");
      expect(text).toHaveStyle({ color: theme.colors.text.light });
    });

    it("text with size", () => {
      const tree = render(<Typography size="lg">olá, mundo</Typography>);
      const text = tree.getByText("olá, mundo");
      expect(text).toHaveStyle({ fontSize: 16 });
    });

    it("uppercase", () => {
      const tree = render(<Typography uppercase>olá, mundo</Typography>);
      const text = tree.getByText("olá, mundo");
      expect(text).toHaveStyle({ textTransform: "uppercase" });
    });
  });
});
