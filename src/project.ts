import { makeProject } from "@motion-canvas/core";

import welcome from "./scenes/welcome";
import creatingFlashcards from "./scenes/creatingFlashcards";

export default makeProject({
  scenes: [welcome, creatingFlashcards],
});
