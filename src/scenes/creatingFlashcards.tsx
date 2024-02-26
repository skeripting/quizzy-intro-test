import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import {
  Circle,
  Grid,
  Img,
  Layout,
  QuadBezier,
  Rect,
  Txt,
  Video,
} from "@motion-canvas/2d/lib/components";
import { createRef, makeRef, range } from "@motion-canvas/core/lib/utils";
import { all, waitFor, waitUntil } from "@motion-canvas/core/lib/flow";
import creatingSet from "/creating_set.mp4";

import { Direction, slideTransition, useRandom } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const LIGHT_PURPLE = "#b391ff";
  const QUIZZY_PURPLE = "#8358E8";
  const DARK_PURPLE = "#3B276B";
  const BLACK = "#000000";
  const WHITE = "#FFFFFF";

  const MAXIMUM_WIDTH = 1920;
  const MAXIMUM_HEIGHT = 1080;
  const purpleBackground = createRef<Rect>();
  const creatingSetRef = createRef<Video>();
  const createStudySetsText = createRef<Txt>();
  const createStudySetsCaption = createRef<Txt>();
  const bezier1 = createRef<QuadBezier>();
  const bezier2 = createRef<QuadBezier>();

  view.add(
    <Rect
      ref={purpleBackground}
      fill={QUIZZY_PURPLE}
      width={MAXIMUM_WIDTH}
      height={MAXIMUM_HEIGHT}
    />
  );

  view.add(<Video src={creatingSet} ref={creatingSetRef} />);

  creatingSetRef().seek(20);
  creatingSetRef().play();

  // perform a slide transition to the left:
  yield* slideTransition(Direction.Left);

  yield waitUntil("text event 1");

  view.add(
    <Rect
      direction={"column"}
      x={600}
      y={200}
      fill={"#FFFFFF"}
      shadowBlur={50}
      shadowColor={"rgba(0, 0, 0, 0.2)"}
      radius={20}
      padding={40}
      layout
    >
      <Txt
        ref={createStudySetsText}
        fontFamily={"Plus Jakarta Sans"}
        fontWeight={700}
        fill={"#464646"}
        fontSize={48}
      ></Txt>
      <Rect direction={"row"} alignItems={"center"} gap={20} layout>
        <Circle fill={QUIZZY_PURPLE} size={10}></Circle>
        <Txt
          ref={createStudySetsCaption}
          fontFamily={"Plus Jakarta Sans"}
          fontWeight={600}
          fill={"#7B7B7B"}
          fontSize={28}
          textWrap={true}
          width={400}
          marginTop={15}
        ></Txt>
      </Rect>
    </Rect>
  );

  yield* all(
    createStudySetsText().opacity(1, 0.5),
    createStudySetsText().text("Create Flashcards", 2),
    createStudySetsCaption().text(
      "Use Quizzy's Create page to create your Flashcards for your Study Set.",
      2
    ),

    creatingSetRef().scale(1.5, 0.6)
  );
  yield* waitFor(3);
  // yield waitUntil("cut 1");

  creatingSetRef().seek(50);
  yield* all(
    createStudySetsText().text("Study", 2),
    createStudySetsCaption().text("Study your newly created flashcards!", 2)
  );
  yield* creatingSetRef().scale(2, 0.6);
  yield* waitFor(6);
});
