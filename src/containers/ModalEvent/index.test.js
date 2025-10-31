import { render, screen } from "@testing-library/react";
import ModalEvent from "./index";

const data = {
  type: "soiree entreprise",
  date: "2022-04-29T20:28:45.744Z",
  title: "Conference #productCON",
  cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
  description:
    "Presentation des outils analytics aux professionnels du secteur",
  nb_guesses: 1300,
  periode: "24-25-26 Fevrier",
  prestations: [
    "1 espace d'exposition",
    "1 scene principale",
    "2 espaces de restaurations",
    "1 site web dedie",
  ],
};

describe("When Modal data is created", () => {
  it("a list of mandatories data is displayed", async () => {
    render(<ModalEvent event={data} />);
    await screen.findByText("1 espace d'exposition");
    await screen.findByText("24-25-26 Fevrier");
    await screen.findByText(
      "Presentation des outils analytics aux professionnels du secteur"
    );
    await screen.findByText("Conference #productCON");
  });
});
